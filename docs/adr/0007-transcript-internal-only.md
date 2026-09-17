# ADR-0007: 받아쓰기는 저장하되 UI에 풀뷰 없음

- **상태:** Accepted
- **날짜:** 2026-09-17

## 배경

도메인·handoff: 사용자는 긴 원문을 **읽지 않는다**. 접근은 구간 재생 + 회의 1건 챗봇. 동시에 「그 대목부터 재생」「고객 이슈가 뭐였지」는 **텍스트+시간** 근거가 필요.

## 결정

- 받아쓰기(구간별 텍스트·시각)를 **DB에 저장**.
- **전사 리스트·풀뷰 UI는 만들지 않음** (non-goal).
- 챗봇·재생 seek·(필요 시) 내부 디버그만 텍스트 사용.

## 이유

- UI에 풀뷰를 넣으면 AS-IS 「긴 글 읽기」와 제품 포지션이 어긋남.
- 텍스트 없이는 챗봇이 오디오만 듣게 되어 비용·지연·품질 모두 불리.

## 결과

- 검색 엔진·벡터 DB **MVP 불필요** — 1건 full text를 Luna에 넣음.
- 개인정보: 받아쓰기에 팀원 발화가 텍스트로 남는다. **90일 오디오 정리 대상이 아니며**, 회의를 삭제하기 전까지 보존된다. [cost-and-retention.md](../conventions/cost-and-retention.md)

## 관련

- [architecture/data-semantics.md](../architecture/data-semantics.md)
- [ui-ux/handoff/06-states-errors-non-goals.md](../ui-ux/handoff/06-states-errors-non-goals.md)
