# 문서 맵 — 회의록 에이전트

이 저장소의 문서는 **역할별로 나뉘며**, 같은 규칙을 여러 곳에 복사하지 않습니다. 충돌 시 우선순위는 아래와 같습니다.

1. **제품 불변식** — [conventions/product-invariants.md](./conventions/product-invariants.md), [domain_story_meeting_agent.md](./domain_story_meeting_agent.md)
2. **UX handoff** — [ui-ux/handoff/00-start.md](./ui-ux/handoff/00-start.md) (화면·동작)
3. **엔지니어링 계획** — [plans/mvp-engineering/plan.md](./plans/mvp-engineering/plan.md)
4. **ADR** — 되돌리기 어려운 선택의 이유 — [adr/README.md](./adr/README.md)
5. **아키텍처·데이터 의미** — [architecture/README.md](./architecture/README.md)

구현 세부(폴더 구조, API 목록, 컴포넌트 ID)는 **코드와 ui-ux handoff**가 기준입니다. 이 폴더에는 **코드만으로는 알기 어려운 정책·결정·예외**만 둡니다.

---

## 읽는 사람별 진입

| 대상 | 먼저 읽을 것 |
| --- | --- |
| **비개발자(기획·본인)** | [domain_story_meeting_agent.md](./domain_story_meeting_agent.md) → [plans/mvp-engineering/plan.md](./plans/mvp-engineering/plan.md) |
| **개발·AI 에이전트** | [plan.md](./plans/mvp-engineering/plan.md) → [system-overview.md](./architecture/system-overview.md) → [handoff/00-start.md](./ui-ux/handoff/00-start.md) · 스타일 착수 [globals-css-sync.md](./ui-ux/globals-css-sync.md) |
| **결정 이력** | [adr/README.md](./adr/README.md) |

---

## 폴더 구조

```
docs/
├── README.md                 ← 지금 문서
├── domain_story_meeting_agent.md
├── plans/
│   └── mvp-engineering/
│       └── plan.md           ← MVP 엔지니어링 PRD (범위·미정·비용)
├── architecture/
│   ├── README.md
│   ├── system-overview.md    ← 한 장 아키텍처·흐름
│   └── data-semantics.md     ← 데이터가 의미하는 것 (스키마 코드 아님)
├── conventions/
│   ├── README.md
│   ├── product-invariants.md
│   ├── ai-behavior.md
│   ├── recording-resilience.md
│   ├── access-control.md
│   └── cost-and-retention.md
├── adr/                      ← Architecture Decision Records
│   └── README.md + 0001…
└── ui-ux/                    ← report-base.css · globals-css-sync.md · handoff · preview
```

---

## 문서 작성 원칙 (이 프로젝트)

- **코드로 확인 가능한 것**은 문서에 적지 않는다. (라우트 목록, 버튼 ID, CSS 변수 키 등은 handoff·코드가 기준.)
- **정책·예외·신뢰 규칙·비용·보안·이사 전략**은 문서에 남긴다.
- ADR은 **왜 이 선택을 했는지**만 짧게; 구체 규칙은 convention·handoff를 참조한다.
- 합의만 된 내용과 **구현 완료**를 구분한다. 이 문서 세트는 **설계·정책 확정** 단계 기준이다.

---

## 확정 정책 (요약)

[plans/mvp-engineering/plan.md](./plans/mvp-engineering/plan.md) §7 — OpenAI, 회의 노트북 중심, Chrome·마이크·개인 API 결제.

**접근·로그인:** 앱 **비밀번호** + 서버 세션 · **RLS·Supabase Auth 미사용** · DB/Storage는 API·워커만 — [conventions/access-control.md](./conventions/access-control.md), [adr/0008](./adr/0008-app-auth-no-rls-no-supabase-auth.md).

**보관:** 회의 종료 후 **90일이면 음성만** 자동 삭제; 목록·할 일·요약·챗봇은 유지 — [conventions/cost-and-retention.md](./conventions/cost-and-retention.md).

**앱:** **Next.js (App Router) + TypeScript** 한 프로젝트에 화면과 서버 API — [adr/0009](./adr/0009-nextjs-app-framework.md).
