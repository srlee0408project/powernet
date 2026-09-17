# 제품 불변식 (Product Invariants)

모든 기능·엔지니어링 선택은 아래를 **깨지 않는 범위**에서만 허용된다.

---

## Veto rule

> **손이 더 많이 가면 사용을 중단한다.**

- Cold start는 **녹음 CTA 하나** 중심. 대시보드·알림·사전 설정·참석자 등록 없음.
- 회의 중 추가 클릭·설정·「저장해 주세요」 요구 금지.
- 실패 시 **재녹음**보다 **재업로드·재시도**를 우선한다.

출처: [domain_story_meeting_agent.md](../domain_story_meeting_agent.md), [ui-ux/handoff/01-principles-and-routes.md](../ui-ux/handoff/01-principles-and-routes.md)

---

## 1인 개인용 (팀 제품 아님)

| 있음 | 없음 |
| --- | --- |
| 본인만 보는 기록 | 팀 공유, 댓글, @mention |
| 「현관문」 **앱 비밀번호** 세션 (Supabase Auth 아님) | 역할·권한·워크스페이스 |
| | 푸시·이메일 알림 |

「계정 없음」이 아니라 **「협업 계정 체계 없음」**이다. 클라우드에 올리면 **비밀번호 현관문**이 필요하다. RLS·Supabase Auth는 쓰지 않는다. [ADR-0001](../adr/0001-single-user-lock-not-team-product.md), [access-control.md](./access-control.md)

---

## 원문 접근 방식

- **전사 풀뷰 UI 없음.**
- 접근 창구는 **구간 재생** + **회의 1건 챗봇**만.
- 받아쓰기 텍스트는 백엔드에 두되, 사용자에게 긴 글 읽기를 강요하지 않는다.

---

## 챗봇

- **회의 1건**만. 회의 간 검색·비교 질문은 거절.
- ①②③에서는 플로팅 숨김 (handoff).

---

## 오프라인 회의 우선

- MVP: 노트북 마이크, 밀폐 회의실.
- 온라인 미팅 봇·Zoom 연동은 이후.

---

## 변경 시

이 문서의 규칙을 바꾸려면 **도메인 스토리 또는 handoff와 함께** ADR 또는 PRD 갱신이 필요하다.
