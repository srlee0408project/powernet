# 접근 통제 (Access Control)

Supabase **RLS·Supabase Auth는 사용하지 않는다.** [ADR-0008](../adr/0008-app-auth-no-rls-no-supabase-auth.md)

---

## 원칙

| # | 규칙 |
| --- | --- |
| 1 | **브라우저는 DB·Storage에 직접 붙지 않는다.** (Supabase JS client로 테이블 select/insert 금지) |
| 2 | 읽기·쓰기·파일 URL 발급은 **세션이 있는 API** 또는 **Inngest 워커**만 수행한다. |
| 3 | Postgres **RLS는 켜지 않거나**, 켜더라도 **제품 정책상 의존하지 않는다** — 접근 판단은 항상 앱 코드. |
| 4 | Storage 버킷 **공개 읽기 금지**. 재생·다운로드는 **짧은 수명 signed URL** (API가 세션 확인 후 발급). |
| 5 | MVP 데이터는 **owner_id = 단일 사용자**; API는 모든 쿼리에 동일 owner 조건을 적용한다. |
| 6 | 정리·삭제 job은 **서버 자격으로만** 실행한다. 보관 기한 계산·삭제를 브라우저가 요청하게 만들지 않는다. |

위 규칙을 깨는 PR(프론트에 service role, anon으로 RLS 기대 등)은 **거부**한다.

---

## 인증 (로그인)

| 항목 | 정책 |
| --- | --- |
| 방식 | **비밀번호 1개** (회원가입·이메일 인증·Supabase Auth 없음) |
| 비밀번호 저장 | 서버 환경 변수 등에 **해시**만; 저장소·로그에 평문 금지 |
| 세션 | 로그인 성공 후 **httpOnly·Secure(프로덕션) 쿠키** 등 서버 검증 가능한 세션 |
| UX | **녹음 홈(①)은 로그인 화면이 아님.** 세션 없으면 **별도 로그인 경로**로 보낸 뒤, 성공 시 녹음 홈으로. (veto rule) |
| 지속 | 회의 노트북 Chrome에서 **세션 장기 유지** — 수요일마다 비밀번호 입력하지 않게 |
| 실패 | 일반적인 오류 문구; 「비밀번호 틀림」 정도만 (계정 존재 여부 노출 최소화) |

확장: 멀티 유저·Cognito 도입 시 **AuthProvider**만 교체; API 경계는 유지. [ADR-0001](../adr/0001-single-user-lock-not-team-product.md)

---

## AWS 이관 시

| MVP | 이후 |
| --- | --- |
| 앱 비밀번호 세션 | Cognito 등 + 동일 API |
| Supabase Postgres (RLS 없음) | RDS (앱 WHERE owner) |
| Supabase Storage + signed URL | S3 + presigned URL |

RLS를 RDS에 **새로 도입**할지는 멀티 유저·규정 요구가 생길 때 **별 ADR**로 결정한다. MVP 문서 범위에서는 **앱 레이어만** 확정.

---

## 관련

- [product-invariants.md](./product-invariants.md)
- [architecture/system-overview.md](../architecture/system-overview.md)
