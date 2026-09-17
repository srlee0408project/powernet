# ADR-0011: DB 접근은 ORM 없이 SQL — Storage는 어댑터 한 겹

- **상태:** Accepted
- **날짜:** 2026-09-17

## 배경

DB·Storage는 Supabase지만 접근은 **서버(Next.js API·Inngest 워커)만** 한다([ADR-0008](./0008-app-auth-no-rls-no-supabase-auth.md), [conventions/access-control.md](../conventions/access-control.md)). [ADR-0003](./0003-supabase-with-aws-migration-path.md)은 Supabase 전용 기능에 핵심 로직을 묶지 말고 Postgres → RDS, Storage → S3 경로를 열어두라고 정했다.

남은 선택은 **「서버가 Postgres에 어떤 방식으로 말하나」** 하나다. MVP 데이터 모양은 [data-semantics.md](../architecture/data-semantics.md) 수준(회의·받아쓰기·요약·할 일·job)이고, 쿼리는 목록·상세·할 일 토글·상태 갱신·90일 정리 정도다. **테이블 6개 내외, 쿼리 수십 개** 규모다.

## 결정

- **ORM을 도입하지 않는다.** 드라이버 `postgres`(postgres.js) + SQL을 직접 쓴다.
- **SQL은 `lib/db/` 리포지토리 함수 안에만 쓴다.** 라우트 핸들러·서버 컴포넌트·Inngest 함수에 SQL 문자열을 직접 두지 않는다.
- **파라미터는 태그드 템플릿으로만 바인딩한다.** 문자열 더하기·보간으로 SQL을 만들지 않는다(1인용이라도 예외 없음).
- **스키마는 순수 SQL 마이그레이션 파일**로 저장소에 커밋하고(`supabase/migrations/*.sql`) Supabase CLI로 적용한다. **대시보드 테이블 에디터로 스키마를 바꾸지 않는다.**
- **행 타입은 `lib/db/types.ts`에 수동으로 정의한다.** 회의 상태 두 축([plan.md](../plans/mvp-engineering/plan.md) §5)은 **Postgres enum + TS union**으로 한 곳에서만 선언한다.
- **연결 URL 두 개를 분리한다.** 런타임은 Supabase 풀러(transaction mode, 6543) + `prepare: false`, 마이그레이션은 direct 연결(5432).
- **`supabase-js`의 테이블 API(`.from().select()`)는 쓰지 않는다.** `supabase-js`는 **Storage 전용**이다.
- **Storage는 `lib/storage/` 어댑터 한 겹** 뒤에 둔다. 앱 코드는 「업로드 signed URL 발급 / 재생 signed URL 발급 / 오디오 삭제」 함수만 호출하고, 버킷 이름과 SDK 호출은 이 모듈 밖으로 나가지 않는다.

```ts
  // lib/db/client.ts — 런타임 연결(풀러 경유)
  import postgres from "postgres";

  // 풀러 transaction mode는 prepared statement를 지원하지 않는다
  const db_client = postgres(process.env.DATABASE_URL!, { prepare: false });
  export default db_client;
```

```ts
  // lib/db/todos.ts — SQL은 리포지토리 함수 안에만, 값은 태그드 템플릿으로 바인딩
  export async function count_open_todos(meeting_id: string): Promise<number> {
    const rows = await db_client<{ open_count: number }[]>`
      select count(*)::int as open_count
      from todos
      where meeting_id = ${meeting_id} and is_done = false
    `;
    return rows[0].open_count;
  }
```

## 이유

- **MVP 규모가 ORM의 손익분기점 아래다.** 테이블 6개·단순 조회에 스키마 DSL·클라이언트 생성 단계·마이그레이션 엔진을 얹으면, 얻는 것보다 배우고 관리할 것이 많다.
- **표준 Postgres 프로토콜만 쓴다** → RDS/Aurora 이사가 연결 문자열 교체 수준이다. ADR-0003의 「핵심 로직을 Supabase에 묶지 않는다」를 코드에서 지킨다.
- `supabase-js` 테이블 API는 **PostgREST에 의존**한다. RDS에는 PostgREST가 없으므로 그렇게 쓴 쿼리는 이사 때 **전부 다시 써야** 한다. ORM을 피하려고 이쪽으로 가면 더 큰 lock-in을 얻는다.
- SQL이 문서와 1:1로 읽힌다. 「90일 지난 오디오」·「미완료 할 일 수」 같은 규칙은 SQL이 가장 짧고 명확하다.
- 의존성이 드라이버 1개라 번들·콜드스타트가 가볍다.

## 결과 (트레이드오프)

- **타입 안전이 자동이 아니다.** 컬럼을 바꾸면 `types.ts`를 손으로 맞춰야 하고, 놓치면 런타임에서 드러난다. 그래서 쿼리를 **리포지토리 계층에만** 모아 영향 범위를 좁힌다.
- **마이그레이션 롤백·drift 감지가 약하다.** 되돌릴 SQL은 필요할 때 직접 쓴다. 대시보드 수작업을 금지하는 이유가 여기 있다.
- 조인·부분 업데이트가 늘면 SQL 중복이 생길 수 있다. **같은 조회는 함수 하나**로 재사용한다(DRY).
- **URL 두 개를 헷갈리면 바로 사고다.** 런타임에서 `prepare: false`를 빼면 풀러에서 실패하고, 마이그레이션을 풀러로 돌리면 advisory lock 때문에 실패한다.
- `owner` 조건([access-control](../conventions/access-control.md) 규칙 5)이 SQL마다 흩어질 위험이 있다. 리포지토리 함수가 **유일한 통로**이므로 그 안에서 보장한다.
- DB·Storage 모듈은 **서버 전용 경계** 밖에서 import 금지. RLS가 없어서([ADR-0008](./0008-app-auth-no-rls-no-supabase-auth.md)) 자격 증명이 클라이언트로 새면 전량 노출이다.
- 규모가 커지거나 타입 수동 동기화가 실제로 버그를 만들기 시작하면 **ORM(Prisma·Drizzle) 도입을 새 ADR로 결정한다.** 교체 지점은 `lib/db/` 리포지토리 계층 하나다.

## 관련

- [ADR-0003](./0003-supabase-with-aws-migration-path.md) · [ADR-0005](./0005-direct-to-object-storage-upload.md) · [ADR-0008](./0008-app-auth-no-rls-no-supabase-auth.md) · [ADR-0009](./0009-nextjs-app-framework.md)
- [architecture/data-semantics.md](../architecture/data-semantics.md)
- [conventions/access-control.md](../conventions/access-control.md)
- [plans/mvp-engineering/plan.md](../plans/mvp-engineering/plan.md) §3
