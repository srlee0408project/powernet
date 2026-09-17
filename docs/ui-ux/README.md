# UI/UX — 회의록 에이전트

**개발자 진입:** [handoff/00-start.md](./handoff/00-start.md)

---

## 폴더 구조

```
docs/ui-ux/
├── README.md              ← 지금 문서 (맵)
├── DESIGN_SYSTEM.md       ← handoff로 리다이렉트 (구 링크 호환)
├── handoff/               ← 구현 스펙 (Markdown, 순서대로 읽기)
│   ├── 00-start.md
│   ├── 01-principles-and-routes.md
│   ├── 02-screen-spec.md
│   ├── 03-tokens-and-layout.md
│   ├── 04-components.md
│   ├── 05-product-policies.md
│   ├── 06-states-errors-non-goals.md
│   └── 07-implementation-roadmap.md
├── assets/                ← CSS·JS (토큰 source of truth)
│   ├── report-base.css
│   └── report-shared.js
└── preview/               ← 기획·QA용 HTML mockup
    ├── index.html
    ├── playbook.html
    ├── screens.html
    ├── design-system.html
    └── flow.html
```

---

## 역할 분리

| 대상 | 어디를 보나 |
| --- | --- |
| **개발** | `handoff/` 00 → 07 (짧게는 01·02·07) + `assets/report-base.css` |
| **기획·QA** | `preview/index.html` (브라우저) |
| **도메인 배경** | [../domain_story_meeting_agent.md](../domain_story_meeting_agent.md) |
| **엔지니어링·ADR** | [../README.md](../README.md) · [../plans/mvp-engineering/plan.md](../plans/mvp-engineering/plan.md) |

HTML은 **참고 mockup**이며, 구현 충돌 시 **handoff Markdown**이 우선합니다.

---

## 로컬 미리보기

```bash
cd docs/ui-ux && python3 -m http.server 8765
```

| URL | 용도 |
| --- | --- |
| http://localhost:8765/ | → preview 허브로 이동 |
| http://localhost:8765/preview/index.html | UX 보고서 목록 |
| http://localhost:8765/handoff/00-start.md | IDE에서 열거나 raw로 확인 |

---

## 30분 온보딩 (개발)

1. [handoff/01-principles-and-routes.md](./handoff/01-principles-and-routes.md) — veto rule + 라우트  
2. [handoff/02-screen-spec.md](./handoff/02-screen-spec.md) — ①~⑦ Must-have  
3. [handoff/07-implementation-roadmap.md](./handoff/07-implementation-roadmap.md) — 슬라이스 순서  
4. 구현 중: 03 토큰 · 04 컴포넌트 ID · 05 정책 · 06 empty/error  
