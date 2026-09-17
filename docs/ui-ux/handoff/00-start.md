# 개발 Handoff — 시작하기

- **버전:** 1.0.0  
- **플랫폼:** Desktop Web (1280px+, 노트북 브라우저)  
- **톤:** Granola (미니멀·여백·pill CTA)  
- **아이콘:** [Lucide](https://lucide.dev/) only  
- **도메인:** [domain_story_meeting_agent.md](../../domain_story_meeting_agent.md)  
- **디자인 시스템 (토큰 중심):** [../assets/report-base.css](../assets/report-base.css) — `:root` 변수가 기준. [03-tokens-and-layout.md](./03-tokens-and-layout.md)는 설명용.  
- **화면 mockup:** [../preview/screens.html](../preview/screens.html)

---

## 이 폴더 읽는 순서 (개발자)

| 순서 | 문서 | 할 일 |
| --- | --- | --- |
| 1 | [01-principles-and-routes.md](./01-principles-and-routes.md) | veto rule, 라우트·사이드바 |
| 2 | [02-screen-spec.md](./02-screen-spec.md) | ①~⑦ Must-have 체크리스트 |
| 3 | [report-base.css](../assets/report-base.css) + [03-tokens-and-layout.md](./03-tokens-and-layout.md) | 토큰 확인·수정 (CSS 우선) |
| 4 | [04-components.md](./04-components.md) | 버튼 ID, 테이블, 패널, 챗, 오디오 |
| 5 | [05-product-policies.md](./05-product-policies.md) | 제목·요약·로딩·메모 vs AI 등 |
| 6 | [06-states-errors-non-goals.md](./06-states-errors-non-goals.md) | Empty/Error, Lucide, MVP 제외 |
| 7 | [07-implementation-roadmap.md](./07-implementation-roadmap.md) | 권장 구현 슬라이스 |

**30분 온보딩:** 1 → 2 → 7만 읽고, 구현 중 3·4·5·6을 필요할 때 참조.

---

## 기획·QA (HTML)

브라우저 허브: [../preview/index.html](../preview/index.html)  
로컬: `cd docs/ui-ux && python3 -m http.server 8765` → http://localhost:8765/preview/index.html

| HTML | 용도 |
| --- | --- |
| playbook | 시간 순 동작 시뮬 |
| screens | 확정 mockup 7종 |
| design-system | 정책 표·버튼 미리보기 |
| flow | 여정 한눈에 |

---

## 변경 이력

| Version | Date | Notes |
| --- | --- | --- |
| 1.0.0 | 2026-09-17 | handoff 폴더 분리, v1 Desktop 확정 |
