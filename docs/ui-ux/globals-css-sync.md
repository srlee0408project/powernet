# app/globals.css ↔ report-base.css 동기화

- **상태:** 확정 (MVP 구현 규칙)
- **결정 근거:** [ADR-0010](../adr/0010-tailwind-with-handoff-tokens.md)
- **토큰 기준 파일:** [assets/report-base.css](./assets/report-base.css)

---

## 1. 역할 (세 파일)

| 순위 | 파일 | 역할 |
| --- | --- | --- |
| 1 | `docs/ui-ux/assets/report-base.css` | 디자인 시스템 **유일한 기준**. `:root` 변수 정의. preview·mockup도 사용. |
| 2 | `app/globals.css` (구현 시) | Next.js 앱 전역 스타일. report-base.css `:root`와 **키·값 1:1**. |
| 3 | [handoff/03-tokens-and-layout.md](./handoff/03-tokens-and-layout.md) | 토큰 **용도 설명**. 값이 CSS와 다르면 **CSS가 맞다**. |

**변경 순서 (고정):** report-base.css → globals.css → handoff 03

---

## 2. 언제 (구현 순서)

[handoff/07-implementation-roadmap.md](./handoff/07-implementation-roadmap.md) **슬라이스 0** — Next.js 프로젝트 생성 직후, **Shell·화면 UI 전에** globals.css를 작성한다.

1. report-base.css `:root` 확인  
2. `app/globals.css` 작성 (아래 §4 템플릿)  
3. `app/layout.tsx`에서 globals import + IBM Plex Sans KR · Literata 로드  

---

## 3. 규칙

| # | 규칙 |
| --- | --- |
| R1 | report-base.css `:root`의 **모든 변수**가 globals에 **동일 이름·동일 값**으로 존재한다. |
| R2 | `--color-*` · `--radius-*` · `--shadow-*` · `--font-*` → Tailwind v4 **`@theme`**. |
| R3 | `--sidebar-w` · `--read-max` · `--mock-max` → **`@theme` 밖 `globals.css`의 `:root`** (레이아웃 전용, `var(--sidebar-w)` 등으로 참조). |
| R4 | 컴포넌트에 `#hex`·임의 px 하드코딩 금지. 없으면 **report-base.css에 변수 추가** 후 R1~R3 반영. |
| R5 | shadcn/ui 등 **별도 디자인 토큰 체계** 도입 금지 ([ADR-0010](../adr/0010-tailwind-with-handoff-tokens.md)). |

---

## 4. 시작 템플릿 (`app/globals.css`)

report-base.css `:root`(2026-09-17)와 동기화된 **전체** 예시. `:root`가 바뀌면 이 블록과 **함께** 갱신한다.

```css
@import "tailwindcss";

@theme {
  --color-bg: #f4f1ea;
  --color-surface: #fffcf7;
  --color-surface-muted: #ebe6dc;
  --color-border: #ddd8cc;
  --color-text: #1a1a18;
  --color-text-secondary: #4a4843;
  --color-text-muted: #7a776f;
  --color-primary: #3d5a40;
  --color-primary-soft: #e4ebe5;
  --color-accent-lime: #b8c95a;
  --color-recording: #c45c4a;
  --color-ai: #6b6560;
  --color-danger: #b42318;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 3px rgba(26, 26, 24, 0.06);
  --shadow-md: 0 12px 40px rgba(26, 26, 24, 0.08);
  --font-sans: "IBM Plex Sans KR", system-ui, sans-serif;
  --font-display: "Literata", Georgia, serif;
}

:root {
  --sidebar-w: 240px;
  --read-max: 680px;
  --mock-max: 1120px;
}

body {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.65;
  color: var(--color-text);
  background: var(--color-bg);
}
```

**Tailwind 참고:** 이 프로젝트에서 `rounded-md`는 **14px** (`--radius-md`). Tailwind 기본값과 다르다.

---

## 5. 변수 ↔ 앱 위치 (체크리스트)

| report-base.css `:root` | 앱 위치 |
| --- | --- |
| `--color-bg` ~ `--color-danger` (14개) | `@theme` |
| `--radius-sm` ~ `--radius-full` | `@theme` |
| `--shadow-sm`, `--shadow-md` | `@theme` |
| `--font-sans`, `--font-display` | `@theme` |
| `--sidebar-w`, `--read-max`, `--mock-max` | `:root` (globals.css) |

---

## 6. 완료 기준 (DoD)

Shell 슬라이스(07 §1) 시작 **전**:

- [ ] §4 템플릿과 report-base.css `:root` **키·값 일치** (누락 0건)
- [ ] `layout.tsx`에서 globals + 웹폰트 연결
- [ ] 토큰 변경 시 §1 변경 순서 준수

MVP UX 전체 DoD에도 동일 항목 포함 → [07 § Definition of Done](./handoff/07-implementation-roadmap.md)

---

## 7. 관련 문서

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — 디자인 시스템 맵  
- [handoff/03-tokens-and-layout.md](./handoff/03-tokens-and-layout.md) — 색·타이포·레이아웃 용도  
- [ADR-0010](../adr/0010-tailwind-with-handoff-tokens.md) — Tailwind·토큰 정책  
- [plans/mvp-engineering/plan.md](../plans/mvp-engineering/plan.md) §3 — 기술 방향 요약  
