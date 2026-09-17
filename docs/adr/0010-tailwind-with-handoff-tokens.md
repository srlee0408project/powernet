# ADR-0010: 스타일링 — Tailwind v4, 디자인 시스템 중심 report-base.css

- **상태:** Accepted
- **날짜:** 2026-09-17

## 배경

디자인 토큰은 [ui-ux/assets/report-base.css](../ui-ux/assets/report-base.css) `:root`에 이미 있다. preview·mockup과 앱이 **같은 이름·값**을 써야 한다.

앱은 Next.js([ADR-0009](./0009-nextjs-app-framework.md)) + Tailwind v4. **구현 규칙·전체 globals 템플릿**은 ADR이 아니라 [ui-ux/globals-css-sync.md](../ui-ux/globals-css-sync.md)에 둔다 (중복 방지).

## 결정

- **토큰 기준:** `report-base.css` `:root`만 수정한다. 변경 순서: **CSS → `app/globals.css` → handoff 03**.
- **Tailwind CSS v4.** 색·radius·shadow·font → `@theme`; `--sidebar-w` · `--read-max` · `--mock-max` → globals `:root` ([globals-css-sync](../ui-ux/globals-css-sync.md) §3).
- **코드 착수:** 슬라이스 0에서 globals 1:1 완료 후 Shell ([07](../ui-ux/handoff/07-implementation-roadmap.md)).
- **UI 컴포넌트 라이브러리(shadcn/ui 등) 없음.** handoff 04 직접 구현.
- **아이콘:** `lucide-react` only.
- **다크 모드·테마 전환 없음.**

## 이유

- report-base 변수명이 Tailwind v4 `@theme`와 맞물려 변환표 불필요.
- shadcn 등은 별도 토큰 체계를 들여와 **진실이 두 개**가 됨.
- globals 1:1 규칙을 한 문서([globals-css-sync](../ui-ux/globals-css-sync.md))에 모아 ADR·handoff·plan이 같은 링크를 가리키게 함.

## 결과 (트레이드오프)

- `rounded-md` = **14px** (Tailwind 기본과 다름).
- `bg-bg` · `text-text` 등 어색한 유틸 이름을 report-base 변수명에 맞춰 수용.
- Tailwind 4.x. 토큰은 CSS 변수로 남아 lock-in 낮음.

## 관련

- [ui-ux/globals-css-sync.md](../ui-ux/globals-css-sync.md) — **앱 globals 1:1 (실무 스펙)**
- [ui-ux/handoff/03-tokens-and-layout.md](../ui-ux/handoff/03-tokens-and-layout.md) · [04-components.md](../ui-ux/handoff/04-components.md)
- [ADR-0009](./0009-nextjs-app-framework.md)
- [plans/mvp-engineering/plan.md](../plans/mvp-engineering/plan.md) §3
