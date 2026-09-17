# UI/UX — 회의록 에이전트

**개발자 진입:** [handoff/00-start.md](./handoff/00-start.md)

---

## 폴더 구조

```
docs/ui-ux/
├── README.md                 ← 지금 문서 (맵)
├── DESIGN_SYSTEM.md          ← 디자인 시스템 진입
├── globals-css-sync.md       ← app/globals.css 1:1 규칙·템플릿 (코드 착수)
├── handoff/                  ← 화면·동작 스펙
│   ├── 00-start.md … 07-implementation-roadmap.md
├── assets/
│   ├── report-base.css       ← :root 토큰 유일한 기준
│   └── report-shared.js
└── preview/                  ← 기획·QA mockup
```

---

## 역할 분리

| 대상 | 어디를 보나 |
| --- | --- |
| **코드 착수 (스타일)** | [globals-css-sync.md](./globals-css-sync.md) → [report-base.css](./assets/report-base.css) |
| **화면·동작** | [handoff/00-start.md](./handoff/00-start.md) → 01~07 |
| **기획·QA** | [preview/index.html](./preview/index.html) |
| **엔지니어링** | [../plans/mvp-engineering/plan.md](../plans/mvp-engineering/plan.md) · [../adr/](../adr/README.md) |

**충돌 우선순위:** 토큰·레이아웃 → **report-base.css** · 화면·정책 → **handoff** · mockup → 참고.

---

## 30분 온보딩 (개발)

1. [handoff/01-principles-and-routes.md](./handoff/01-principles-and-routes.md) — veto rule, 라우트  
2. [handoff/02-screen-spec.md](./handoff/02-screen-spec.md) — ①~⑦  
3. [handoff/07-implementation-roadmap.md](./handoff/07-implementation-roadmap.md) — 슬라이스 0(globals) + 1~6  
4. Next.js 생성 후: [globals-css-sync.md](./globals-css-sync.md)  
5. 구현 중: [03](./handoff/03-tokens-and-layout.md) · [04](./handoff/04-components.md) · [05](./handoff/05-product-policies.md) · [06](./handoff/06-states-errors-non-goals.md)

---

## 로컬 미리보기

```bash
cd docs/ui-ux && python3 -m http.server 8765
```

| URL | 용도 |
| --- | --- |
| http://localhost:8765/preview/index.html | UX 보고서 목록 |
| http://localhost:8765/handoff/00-start.md | handoff (IDE) |
