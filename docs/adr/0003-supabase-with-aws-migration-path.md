# ADR-0003: MVP는 Supabase — AWS 이사 경로 유지

- **상태:** Accepted
- **날짜:** 2026-09-17

## 배경

MVP는 비용·속도 우선. 추후 AWS 확장을 고려. 1인용이라 멀티 리전·엔터프라이즈 기능은 불필요.

## 결정

- **Postgres + Storage:** Supabase 무료/저비용 티어. **Supabase Auth는 사용하지 않음** ([ADR-0008](./0008-app-auth-no-rls-no-supabase-auth.md)).
- **앱 호스팅:** Vercel (Next.js).
- **의미 있는 데이터:** Postgres(메타·텍스트), Storage(오디오). Supabase 전용 기능에 **핵심 로직을 묶지 않음**.

## 이유

- Postgres → RDS/Aurora 이전이 직관적.
- Storage → S3 + presigned URL 패턴 동일.
- MVP에서 ECS/K8s를 깔면 「손이 더 감」이 **개발자**에게로 이동.

## 결과

- **RLS 미사용** — 접근은 앱 API만 ([ADR-0008](./0008-app-auth-no-rls-no-supabase-auth.md)).
- 이사 시 마이그레이션 runbook은 별도 (MVP 범위 외).
- Supabase vendor lock-in을 줄이려면 Storage API를 S3 호환 개념으로만 다룬다.

## 관련

- [architecture/system-overview.md](../architecture/system-overview.md)
- [plans/mvp-engineering/plan.md](../plans/mvp-engineering/plan.md) §8
