# Conventions (운영·제품 규칙)

코드에서 grep으로 찾을 수 있는 UI ID·라우트·토큰은 **ui-ux handoff**에만 둡니다.  
여기는 **판단이 필요한 규칙** — 신뢰, 실패, 비용, 불변식 — 만 모읍니다.

| 문서 | 내용 |
| --- | --- |
| [product-invariants.md](./product-invariants.md) | veto rule, 1인용, 챗 범위 |
| [access-control.md](./access-control.md) | 비밀번호 로그인, RLS 미사용, 서버만 DB/Storage |
| [ai-behavior.md](./ai-behavior.md) | 메모 vs AI, 재생성, 모델 역할 |
| [recording-resilience.md](./recording-resilience.md) | IndexedDB, 업로드, 상태, 브라우저 |
| [cost-and-retention.md](./cost-and-retention.md) | API 비용, 저장 한도, AWS 이사 |
