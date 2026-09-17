# 02 — 화면별 스펙 (확정안)

[← 원칙·라우트](./01-principles-and-routes.md) · [다음: 토큰 →](./03-tokens-and-layout.md)

Mockup: [../preview/screens.html](../preview/screens.html)

---

## 체크리스트

| # | ID | Must have |
| --- | --- | --- |
| ① | 1a | Sidebar + center `record_start_xl` |
| ② | 2a | Split: timer + stop \| memo editor; **no REC icon** above timer |
| ③ | 3a | Steps + topbar ghost list link (no large secondary button in body) |
| ④ | 4a | Title → todos → split AI/memo → save |
| ⑤ | 5b | Table aligned columns + filter toggle |
| ⑥ | 6a | Tabs todos/summary/audio + chat toggle |
| ⑦ | 7a | Floating chat on ④⑤⑥ |

---

## 화면별 한 줄

| # | 핵심 |
| --- | --- |
| ① | Primary는 녹음 XL 하나만 |
| ② | 메모는 우측, 녹음 중에도 편집 |
| ③ | 사용자는 ghost로 목록 갈 수 있음 (처리는 백그라운드) |
| ④ | 저장 전 제목·할 일 확인; AI/메모 2열 |
| ⑤ | 행 클릭 → ⑥; 필터는 미완료 할 일만 |
| ⑥ | 전사 리스트 없음; 오디오 탭 = 미니 플레이어 |
| ⑦ | `meeting_id` 단위; 다른 회의로 이동 시 닫기·스레드 초기화 |

정책 상세(제목 형식, 로딩 타이밍 등)는 [05-product-policies.md](./05-product-policies.md).
