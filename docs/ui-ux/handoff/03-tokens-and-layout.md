# 03 — Design Tokens & Layout

[← 화면 스펙](./02-screen-spec.md) · [다음: 컴포넌트 →](./04-components.md)

---

## 기준과 앱 반영

| | |
| --- | --- |
| **토큰 기준** | [../assets/report-base.css](../assets/report-base.css) `:root` |
| **앱 1:1 규칙** | [../globals-css-sync.md](../globals-css-sync.md) — `app/globals.css` 전체 템플릿·DoD |
| **스타일 ADR** | [ADR-0010](../../adr/0010-tailwind-with-handoff-tokens.md) |

아래 표는 **용도 설명**이다. 숫자·색이 CSS와 다르면 **report-base.css가 맞다.**

---

## Color

| Token | Value | Usage |
| --- | --- | --- |
| `--color-bg` | `#f4f1ea` | 페이지 배경 |
| `--color-surface` | `#fffcf7` | 카드·사이드바 |
| `--color-surface-muted` | `#ebe6dc` | 테이블 헤더·칩 |
| `--color-border` | `#ddd8cc` | 구분선 |
| `--color-text` | `#1a1a18` | 본문·**내 메모** |
| `--color-text-secondary` | `#4a4843` | 보조 |
| `--color-text-muted` | `#7a776f` | 메타·라벨 |
| `--color-primary` | `#3d5a40` | Primary pill, 링크, 결정 줄 |
| `--color-primary-soft` | `#e4ebe5` | active nav, hover |
| `--color-accent-lime` | `#b8c95a` | 배지 |
| `--color-recording` | `#c45c4a` | 녹음 XL CTA |
| `--color-ai` | `#6b6560` | **AI 생성 텍스트** |
| `--color-danger` | `#b42318` | destructive (최소) |

---

## Typography

report-base.css `body` 기준.

| Role | Font | Size |
| --- | --- | --- |
| Body | IBM Plex Sans KR (`--font-sans`) | **16px** |
| UI 블록 | IBM Plex Sans KR | 14–15px (mockup 클래스) |
| Display | Literata (`--font-display`) | 1.2–1.35rem |
| Meta / tag | IBM Plex Sans KR | 11–13px |

---

## Radius & layout (`:root`)

| Token | Value | Usage |
| --- | --- | --- |
| `--radius-sm` | 8px | |
| `--radius-md` | 14px | Tailwind `rounded-md` = **14px** |
| `--radius-lg` | 20px | |
| `--radius-full` | 9999px | pill |
| `--sidebar-w` | 240px | 사이드바 |
| `--read-max` | 680px | 읽기 폭 (④ 등) |
| `--mock-max` | 1120px | mockup 전체 폭 |

**Preview only:** `.hub-body` 등 일부 mockup은 **max-width 960px** (토큰 아님). 앱 ⑤는 [02-screen-spec](./02-screen-spec.md) + `--mock-max`를 따른다.

**사이드바 접힘:** MVP `:root` 토큰 없음. 필요 시 report-base.css에 변수 추가 → [globals-css-sync](../globals-css-sync.md) 갱신.
