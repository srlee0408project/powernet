# 05 — 제품 UX 정책 (v1)

[← 컴포넌트](./04-components.md) · [다음: 상태·Non-goals →](./06-states-errors-non-goals.md)

동작 시뮬: [../preview/playbook.html](../preview/playbook.html)

---

## 제목

- Format: `{YYYY-MM-DD} ({요일}) · {AI topic}`
- AI는 topic만; 날짜 접두는 앱
- 사용자가 ④에서 최종 확인 후 저장

---

## AI 요약

- **안건(주제)별**, 등장 순
- 분 단위 타임라인·전사 풀뷰 아님
- bullets + optional `결정:` 줄; 할 일과 분리

---

## 로딩

| Phase | UX |
| --- | --- |
| 0–~2min | ③ steps → **title + todos** 준비 시 자동 ④ |
| 2–5min | ghost 목록 이동 허용; 행 배지 `처리 중` → `요약 준비됨` |
| 5min+ | ④: memo + audio OK; AI 영역 「다시 시도」 한 줄 |

Copy에 **「30초」 약속 금지**. 푸시 없음.

---

## 내 메모 vs AI

| Rule | Behavior |
| --- | --- |
| Layout | ④ **2열**: 좌 AI, 우 메모 |
| Color | AI `--color-ai`, 메모 `--color-text` |
| Conflict | **둘 다 표시**, 자동 병합 없음 |
| Trust | **사용자 편집 최종** |
| Regenerate | AI 열만; **메모 불변** |
| 표현만 다름 | 토스트 경고 없음 |

---

## 미완료 할 일

- ⑤ **필터 토글**, 기본 OFF
- ON: `open_todo_count === 0` 회의 숨김
- 푸시 없음; 사이드바 배지는 optional

---

## 일정·리마인더

- 메모·todo 마감 **텍스트만** — 캘린더 동기화·리마인더 없음

---

## 녹음 누락

- 회의 시작 자동 감지 없음
- 실패 시 retry + **memo-only** 저장 허용 (오디오 없음)
