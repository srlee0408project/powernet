# 07 — 구현 로드맵 (권장)

[← 상태·Non-goals](./06-states-errors-non-goals.md) · [시작으로 →](./00-start.md)

---

## 슬라이스 0 — globals (Shell 전 필수)

Next.js + TypeScript 프로젝트 생성 **직후**, 화면 UI 전에:

1. [report-base.css](../assets/report-base.css) `:root` 확인  
2. [globals-css-sync.md](../globals-css-sync.md) §4대로 **`app/globals.css` 1:1** 작성  
3. `app/layout.tsx` — globals import + 웹폰트  

**DoD:** report-base.css `:root` 변수 전부가 globals에 동일 키·값 ([globals-css-sync §6](../globals-css-sync.md#6-완료-기준-dod)).

---

## 슬라이스 1~6

| # | 이름 | 범위 |
| --- | --- | --- |
| 1 | **Shell** | sidebar / topbar (토큰은 슬라이스 0 완료 가정) |
| 2 | **Record** | ① → ②, local audio blob |
| 3 | **Pipeline** | ③ → ④ mock AI (title, todos, sections) |
| 4 | **List** | ⑤ + filter |
| 5 | **Detail** | ⑥ tabs, player, clip seek |
| 6 | **Chat** | ⑦ single-meeting context |

각 슬라이스 완료 시 [02-screen-spec.md](./02-screen-spec.md) 해당 행 체크.

---

## Definition of Done (MVP UX)

- [ ] [globals-css-sync.md](../globals-css-sync.md) §6 — `app/globals.css` ↔ report-base.css **1:1**  
- [ ] 모든 라우트 [01-principles-and-routes.md](./01-principles-and-routes.md) 와 일치  
- [ ] Button ID [04-components.md](./04-components.md) 와 1:1 (또는 코드 주석 매핑表)  
- [ ] [05-product-policies.md](./05-product-policies.md) 로딩·메모 vs AI 동작  
- [ ] ⑦은 ④⑤⑥에서만 노출  
- [ ] Non-goals [06](./06-states-errors-non-goals.md) UI 노출 없음  
