# Design System

**중심 파일:** [assets/report-base.css](./assets/report-base.css) — 색·radius·그림자·폰트·레이아웃 `:root` 변수. preview HTML과 앱이 **같은 이름·값**을 쓴다.

**읽기 순서 (개발):**

1. [assets/report-base.css](./assets/report-base.css) — 토큰 확인·수정
2. [handoff/03-tokens-and-layout.md](./handoff/03-tokens-and-layout.md) — 용도 설명 (CSS와 충돌 시 CSS 우선)
3. [handoff/04-components.md](./handoff/04-components.md) — 컴포넌트·버튼 ID
4. [ADR-0010](../adr/0010-tailwind-with-handoff-tokens.md) — 앱에서 Tailwind `@theme`로 옮기는 규칙

**Handoff 전체:** [handoff/00-start.md](./handoff/00-start.md)

| 이전 섹션 | 새 위치 |
| --- | --- |
| 원칙 · 라우트 | [01-principles-and-routes.md](./handoff/01-principles-and-routes.md) |
| 화면 체크리스트 | [02-screen-spec.md](./handoff/02-screen-spec.md) |
| Tokens | **report-base.css** + [03-tokens-and-layout.md](./handoff/03-tokens-and-layout.md) |
| 컴포넌트 | [04-components.md](./handoff/04-components.md) |
| UX 정책 | [05-product-policies.md](./handoff/05-product-policies.md) |
| Empty · Non-goals · Lucide | [06-states-errors-non-goals.md](./handoff/06-states-errors-non-goals.md) |
| 구현 순서 | [07-implementation-roadmap.md](./handoff/07-implementation-roadmap.md) |

전체 맵: [README.md](./README.md)
