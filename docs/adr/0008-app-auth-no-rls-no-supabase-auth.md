# ADR-0008: 앱 세션 인증 — RLS·Supabase Auth 미사용

- **상태:** Accepted
- **날짜:** 2026-09-17

## 배경

MVP는 1인용이지만 데이터는 Supabase(Postgres·Storage)에 둔다. Supabase **RLS**와 **Supabase Auth**에 묶이면 AWS(RDS·S3·Cognito 등) 이관 시 정책·사용자 ID 모델을 함께 뜯어고쳐야 한다. 팀 RBAC은 도메인상 불필요하다.

접근 통제를 **애플리케이션(서버) 한 겹**으로 통일하고, DB는 **RLS에 의존하지 않는다**.

## 결정

- **Postgres RLS:** 사용하지 않는다.
- **Supabase Auth:** 사용하지 않는다 (가입·OAuth·`auth.users`·JWT 연동 없음).
- **인증:** 앱이 **비밀번호 1개**로 로그인 → **서버 발급 세션**(httpOnly 쿠키 등). 허용 비밀번호는 서버 환경 설정(해시 저장, 평문 저장 금지).
- **데이터 접근:** 브라우저는 **Next.js API·Inngest 워커**만 호출. DB·Storage **서버 측 자격**으로만 접근.
- **Storage 업로드:** 「직접 업로드」는 유지하되, **signed URL은 세션 검증 후 API가 발급** (공개 버킷·anon 키로 테이블/버킷 직접 노출 금지).
- **owner_id:** 행에는 소유자 식별자를 둘 수 있으나 MVP는 **상수 1명**; 모든 쿼리는 API에서 owner 조건을 적용.

## 이유

- RDS에는 Supabase식 RLS 정책 이식이 **선택**이지 필수가 아니다. 지금부터 **API 경계**를 고정하면 AWS 이사 시 Cognito + RDS 패턴과 같다.
- Supabase Auth를 쓰지 않으면 `auth.uid()`·RLS·Storage policy가 한 묶음이 되는 coupling을 피한다.
- 1인 비밀번호는 Google·회사 PC 계정 이슈 없이 **veto rule**에 맞게 「가끔만」 보이게 할 수 있다.

## 결과 (트레이드오프)

- **장점:** 이관·멘탈 모델 단순, Supabase Auth/RLS 학습·운영 부담 없음.
- **단점:** DB에 **실수로** service role·직접 클라이언트 접근이 생기면 RLS가 없어 **전량 노출**. convention·리뷰로 **금지**해야 한다.
- AWS 이후: **Cognito(또는 동급) + 동일 API 게이트**; RLS 도입은 **선택**(멀티 유저 ADR 시 재검토).

## 관련

- [conventions/access-control.md](../conventions/access-control.md)
- [ADR-0001](./0001-single-user-lock-not-team-product.md)
- [ADR-0003](./0003-supabase-with-aws-migration-path.md)
- [ADR-0005](./0005-direct-to-object-storage-upload.md)
