# 07 — 구현 로드맵 (권장)

[← 상태·Non-goals](./06-states-errors-non-goals.md) · [시작으로 →](./00-start.md)

---

## 슬라이스 순서

1. **Shell** — [03-tokens-and-layout.md](./03-tokens-and-layout.md) 토큰 + sidebar/topbar  
2. **Record** — ① → ②, local audio blob  
3. **Pipeline** — ③ → ④ mock AI (title, todos, sections)  
4. **List** — ⑤ + filter  
5. **Detail** — ⑥ tabs, player, clip seek  
6. **Chat** — ⑦ single-meeting context  

각 슬라이스 완료 시 [02-screen-spec.md](./02-screen-spec.md) 해당 행 체크.

---

## Definition of Done (MVP UX)

- [ ] 모든 라우트 [01-principles-and-routes.md](./01-principles-and-routes.md) 와 일치  
- [ ] Button ID [04-components.md](./04-components.md) 와 1:1 (또는 매핑表 in code comment)  
- [ ] [05-product-policies.md](./05-product-policies.md) 로딩·메모 vs AI 동작  
- [ ] ⑦은 ④⑤⑥에서만 노출  
- [ ] Non-goals [06](./06-states-errors-non-goals.md) UI 노출 없음  
