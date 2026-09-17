# ADR-0001: 1인 현관문 — 팀 협업 제품이 아님

- **상태:** Accepted (2026-09-17 갱신: 비밀번호 세션)
- **날짜:** 2026-09-17

## 배경

도메인에서 사용자는 1명이며 회의록을 팀에 공유하지 않는다. 「계정/권한 체계 불필요」라는 표현은 **협업 RBAC이 필요 없다**는 뜻이지, 클라우드에 올릴 때 **누구나 URL로 들어오면 안 된다**는 뜻은 아니다.

## 결정

- **팀 기능 없음:** 공유, 댓글, 워크스페이스, 역할.
- **현관문 있음:** **앱 자체 비밀번호 로그인** + 서버 세션. Supabase Auth·Google OAuth MVP 미사용.
- 본인만 회의·오디오·받아쓰기 접근 (API에서 owner 단일 사용자).

## 이유

- 제품 veto: 사전 설정·멤버 초대·매주 긴 OAuth는 「손이 더 감」.
- Supabase/Vercel에 데이터를 두면 인증 없이는 개인정보·음성 유출 위험.
- 회사 노트북에서 개인 Google 로그인 없이 **비밀번호 1개**로 현관문 가능.
- MVP에서 Cognito·팀 ACL을 만들면 범위가 폭발 — 세션 형태만 두고 AWS 이관 시 교체.

## 결과

- 「1인용」과 「로그인 없음」을 혼동하지 않는다.
- RLS·Supabase Auth 정책은 [ADR-0008](./0008-app-auth-no-rls-no-supabase-auth.md).
- 나중에 가족/동료에게 공유하려면 **새 ADR** (멀티 유저) 필요.

## 관련

- [conventions/access-control.md](../conventions/access-control.md)
- [conventions/product-invariants.md](../conventions/product-invariants.md)
- [domain_story_meeting_agent.md](../domain_story_meeting_agent.md)
