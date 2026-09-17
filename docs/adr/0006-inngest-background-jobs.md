# ADR-0006: Inngest로 받아쓰기·LLM 체인

- **상태:** Accepted
- **날짜:** 2026-09-17

## 배경

종료 후 파이프라인: 분할 STT → 텍스트 병합 → 요약·할 일·제목 → DB 갱신. 총 **수 분** 걸릴 수 있음. UX는 ~2분 목표·5분+ fallback (handoff).

## 결정

- **Inngest**(또는 동급)로 단계형 워크플로 실행.
- HTTP 요청 안에서 90분 STT를 **동기 처리하지 않음**.

## 이유

- Vercel serverless 단일 요청으로 1~2시간 STT 불가.
- 상태 `processing` / `ready` / `ai_failed`와 UX ③④ 연동.
- MVP 무료 티어로 시작 가능.

## 결과

- AWS 이전 시 SQS + Lambda/Step Functions로 **동일 단계** 이식.
- Inngest vendor 종속은 **단계 이름·입출력**을 문서(data-semantics)로 고정해 완화.

## 관련

- [plans/mvp-engineering/plan.md](../plans/mvp-engineering/plan.md)
- [architecture/system-overview.md](../architecture/system-overview.md)
