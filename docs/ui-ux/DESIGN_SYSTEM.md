# Design System

디자인 시스템은 **한 CSS 파일**을 중심으로 돌아간다. 앱은 그 복사본을 Tailwind로 옮긴다.

---

## 중심 파일

**[assets/report-base.css](./assets/report-base.css)** — `:root`에 색·radius·그림자·폰트·레이아웃 변수.  
preview HTML·mockup·(구현 후) 앱이 **같은 변수 이름·값**을 쓴다.

---

## 개발자 읽기 순서

| 단계 | 문서 | 목적 |
| --- | --- | --- |
| 1 | [report-base.css](./assets/report-base.css) | 토큰 확인·수정 |
| 2 | [globals-css-sync.md](./globals-css-sync.md) | 코드 착수 시 **`app/globals.css` 1:1** 규칙·템플릿·DoD |
| 3 | [handoff/03-tokens-and-layout.md](./handoff/03-tokens-and-layout.md) | 토큰 **용도** (값 충돌 시 CSS 우선) |
| 4 | [handoff/04-components.md](./handoff/04-components.md) | 버튼 ID·패널·챗·오디오 |
| 5 | [ADR-0010](../adr/0010-tailwind-with-handoff-tokens.md) | Tailwind v4·컴포넌트 라이브러리 미사용 |

**Handoff 전체:** [handoff/00-start.md](./handoff/00-start.md)  
**구현 슬라이스:** [handoff/07-implementation-roadmap.md](./handoff/07-implementation-roadmap.md) (슬라이스 0 = globals)

---

## 충돌 시 우선순위

1. **토큰·레이아웃 수치** → `report-base.css`
2. **화면·동작·UX 정책** → `handoff/` Markdown
3. **HTML mockup** → 참고만 (`preview/`)

---

## handoff 맵 (구 링크 호환)

| 주제 | 위치 |
| --- | --- |
| 원칙 · 라우트 | [01-principles-and-routes.md](./handoff/01-principles-and-routes.md) |
| 화면 ①~⑦ | [02-screen-spec.md](./handoff/02-screen-spec.md) |
| Tokens | **report-base.css** + [03](./handoff/03-tokens-and-layout.md) + [globals-css-sync](./globals-css-sync.md) |
| 컴포넌트 | [04-components.md](./handoff/04-components.md) |
| UX 정책 | [05-product-policies.md](./handoff/05-product-policies.md) |
| Empty · Non-goals | [06-states-errors-non-goals.md](./handoff/06-states-errors-non-goals.md) |
| 구현 순서 | [07-implementation-roadmap.md](./handoff/07-implementation-roadmap.md) |

상위 맵: [README.md](./README.md)
