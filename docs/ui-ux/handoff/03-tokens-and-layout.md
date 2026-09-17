# 03 — Design Tokens & Layout

[← 화면 스펙](./02-screen-spec.md) · [다음: 컴포넌트 →](./04-components.md)

**소스 of truth:** [../assets/report-base.css](../assets/report-base.css) — 앱 CSS 변수는 여기와 **동일 키·값** 유지.

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

| Role | Font | Size |
| --- | --- | --- |
| UI | IBM Plex Sans KR | 15px base |
| Display | Literata | 1.2–1.35rem |
| Meta / tag | IBM Plex Sans KR | 11–13px |

---

## Radius & layout

- **Radius:** sm 8px · md 14px · lg 20px · pill `9999px`
- **Sidebar:** 220px (접힘 68px)
- **Content:** max ~960px (④), mock full ~1120px
