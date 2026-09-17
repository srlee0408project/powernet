# ADR-0009: 앱 프레임워크는 Next.js (TypeScript)

- **상태:** Accepted
- **날짜:** 2026-09-17

## 배경

제품은 데스크톱 브라우저에서 도는 1인용 웹 서비스다. 화면(①~⑦)과 함께 **서버 쪽 코드**가 반드시 필요하다. 접근 통제상 브라우저는 DB·Storage에 직접 붙을 수 없고, OpenAI 키도 서버에만 둬야 한다([ADR-0008](./0008-app-auth-no-rls-no-supabase-auth.md)). 즉 **화면 + 서버 API**를 한 저장소에서 다루는 구조가 필요하다.

## 결정

- **Next.js (App Router) + TypeScript** 단일 애플리케이션으로 구현한다.
- **서버 코드도 Next.js 안에** 둔다. 브라우저 → Next.js 서버 → (Postgres · Storage · OpenAI) 경로만 사용한다. 별도 백엔드 서버를 두지 않는다.
- **MVP 배포:** Vercel. 긴 작업은 Next.js 요청 안에서 처리하지 않고 Inngest로 넘긴다([ADR-0006](./0006-inngest-background-jobs.md)).
- 언어는 TypeScript로 통일한다.

## 이유

- 화면과 API가 한 프로젝트에 있어 1인 개발에서 왕복이 적다.
- 서버 전용 코드 경계가 프레임워크에 내장되어 있어, **키·DB 접근이 브라우저로 새는 실수**를 구조적으로 줄인다.
- 이미 확정된 UX(데스크톱 라우트 중심, 모바일·SEO 비요구)에 과하지 않다.
- AWS로 옮길 때 컨테이너 이미지로 그대로 실행할 수 있어, 앱을 다시 쓰지 않아도 된다.

## 결과 (트레이드오프)

- Vercel의 요청 시간·용량 제한은 **업로드 직접 전송**([ADR-0005](./0005-direct-to-object-storage-upload.md))과 **백그라운드 job**으로 회피한다. 이 두 결정은 Next.js 선택과 한 묶음이다.
- Vercel 전용 기능에 의존하지 않는다. AWS 이전 시 ECS Fargate 등에서 컨테이너로 구동하거나 Amplify를 쓴다.
- 프런트 전용 SPA + 별도 API 서버 구조는 채택하지 않는다. 필요해지면 새 ADR로 분리한다.

## 관련

- [plans/mvp-engineering/plan.md](../plans/mvp-engineering/plan.md) §3
- [conventions/access-control.md](../conventions/access-control.md)
- [architecture/system-overview.md](../architecture/system-overview.md)
