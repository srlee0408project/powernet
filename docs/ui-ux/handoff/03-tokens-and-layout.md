# 03 — Design Tokens & Layout

[← 화면 스펙](./02-screen-spec.md) · [다음: 컴포넌트 →](./04-components.md)

**디자인 시스템 중심:** [../assets/report-base.css](../assets/report-base.css) — 토큰·레이아웃 수치의 **유일한 기준**. 아래 표는 설명용이며, 값이 다르면 **CSS 파일이 맞다.**

**앱 구현:** `app/globals.css`의 Tailwind v4 `@theme` / `:root`는 report-base.css와 **동일 키·값** — [ADR-0010](../../adr/0010-tailwind-with-handoff-tokens.md). 토큰을 바꿀 때는 **CSS → 앱 → 이 문서** 순서.

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

| Role | Font | Size (report-base.css 기준) |
| --- | --- | --- |
| Body | IBM Plex Sans KR (`--font-sans`) | **16px** (`body`) |
| UI / 본문 컴포넌트 | IBM Plex Sans KR | 14–15px (mockup 클래스) |
| Display | Literata (`--font-display`) | 1.2–1.35rem |
| Meta / tag | IBM Plex Sans KR | 11–13px |

---

## Radius & layout

`:root` 변수는 report-base.css와 동일.

| Token | Value | Usage |
| --- | --- | --- |
| `--radius-sm` | 8px | |
| `--radius-md` | 14px | |
| `--radius-lg` | 20px | |
| `--radius-full` | 9999px | pill |
| `--sidebar-w` | **240px** | 사이드바 |
| `--read-max` | **680px** | 읽기 폭 (④ 등) |
| `--mock-max` | **1120px** | mockup 전체 폭 |

- **Hub·목록 mock:** `.hub-body` 등 preview CSS는 **max-width 960px** (변수 아님). 앱 ⑤는 `--mock-max` 또는 화면 스펙(02)을 따른다.
- **사이드바 접힘:** MVP 토큰에 없음. 필요 시 report-base.css에 변수 추가 후 여기 반영.
