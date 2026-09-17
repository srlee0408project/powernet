# 04 — 컴포넌트

[← 토큰](./03-tokens-and-layout.md) · [다음: 정책 →](./05-product-policies.md)

버튼 미리보기: [../preview/design-system.html](../preview/design-system.html)

---

## Button ID

| ID | Style | Lucide | When |
| --- | --- | --- | --- |
| `record_start_xl` | pill XL, recording | `mic` | ① |
| `record_stop_xl` | pill XL, recording | `square` | ② |
| `record_pause` | ghost sm (optional) | `pause` | ② |
| `save` | primary pill | `check` | ④ |
| `cancel` | secondary | — | ④ |
| `goto_list_while_processing` | ghost sm | — | ③ topbar |
| `filter_open_todos` | secondary sm, toggle | `filter` | ⑤ |
| `play_clip` | ghost sm | `play` | 할 일·요약 |
| `open_player` | secondary sm | `headphones` | ⑥ 오디오 |
| `toggle_chat` | secondary sm | `message-circle` | ⑥ |
| `chat_launcher` | circle 52px | `message-circle` | ⑦ |
| `chat_send` | primary icon | `send` | 플로팅 |
| `back` | ghost sm | `arrow-left` | ⑥ |
| `regenerate` | ghost sm | `rotate-cw` | AI 실패 시 |

**규칙:** 화면당 **primary 1개**. ①②는 녹음 XL만 primary.

---

## Meeting table (⑤)

- `table-layout: fixed`
- Columns: **제목** (left) · **날짜** (center, 120px) · **미완료 할 일** (center, 120px)
- Row hover: `--color-primary-soft` · click → `/meetings/:id`

---

## Title input (④·⑥)

- Stored: `{YYYY-MM-DD} ({요일}) · {topic}`
- Prefill: 앱이 날짜 접두 + AI topic
- Empty save → `{date} ({요일}) · 회의`

---

## Action item row

- Checkbox · title · meta (마감 · 요청 추정 · 안건)
- `play_clip` → `timestamp_ms` seek
- AI 요청자 → 라벨 「요청 추정」

---

## AI summary block

- `sections[]`: `title`, `bullets[]`, optional `decision`
- Max ~8 sections
- Render: h5 (dark), bullets (`--color-ai`), `.decision-line` (primary)

---

## User memo panel

- Textarea (② live, ④ right)
- Color: `--color-text` — **재생성해도 덮어쓰지 않음**

---

## Floating chat (⑦)

- 360×420px, 우하단, launcher 52px 위
- Header: 「이 회의만」+ `lock` + `x`
- Scope: `meeting_id` only; 타 회의 질문 → 거절 메시지
- **다른 `meetingId`로 라우트 변경:** 위젯 닫기 + in-memory 스레드 초기화 (optional: localStorage per id)

---

## Audio (⑥ 「오디오」)

- play/pause, seek, speed 1x / 1.5x
- **전사 리스트 없음**
- `play_clip`과 **동일 플레이어** seek
