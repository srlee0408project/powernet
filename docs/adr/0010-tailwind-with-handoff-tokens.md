# ADR-0010: 스타일링은 Tailwind CSS v4 — 디자인 시스템 중심은 report-base.css

- **상태:** Accepted
- **날짜:** 2026-09-17

## 배경

디자인 시스템의 **단일 기준(source of truth)** 은 [ui-ux/assets/report-base.css](../ui-ux/assets/report-base.css)이다. `:root`에 색·radius·그림자·폰트·레이아웃 변수가 정의되어 있고, UX preview·mockup도 이 파일을 공유한다.

[03-tokens-and-layout.md](../ui-ux/handoff/03-tokens-and-layout.md)는 **읽기 쉬운 인덱스**이며, handoff Markdown과 CSS가 어긋나면 **항상 report-base.css가 이긴다.**

화면은 ①~⑦ 7개, 데스크톱 Chrome 전용이고 모바일·다크 모드·테마 전환은 non-goal이다. 필요한 것은 새 팔레트가 아니라 **이 CSS를 앱 코드로 옮기는 수단**이다.

## 결정

- **디자인 토큰 변경 순서:** (1) `report-base.css` `:root` 수정 → (2) 앱 `globals.css`의 `@theme` / `:root`를 **동일 키·값**으로 맞춤 → (3) handoff 03 표·설명 갱신. **앱만 먼저 바꾸지 않는다.**
- **Tailwind CSS v4**를 쓴다. 앱 토큰은 `app/globals.css`에서 `@theme`으로 선언하되, **값은 report-base.css에서 복사·동기화**한다(향후 공통 파일 import로 한 곳만 편집해도 됨).
- Tailwind 네임스페이스와 맞는 토큰(`--color-*` · `--radius-*` · `--font-*` · `--shadow-*`)은 `@theme`에 둔다. `bg-surface` · `text-ai` · `rounded-md` 같은 유틸이 자동 생성된다.
- 유틸이 필요 없는 레이아웃 수치(`--sidebar-w` · `--read-max` · `--mock-max`)는 `:root`에 일반 CSS 변수로 두고 `w-[var(--sidebar-w)]`로 참조한다.
- **UI 컴포넌트 라이브러리(shadcn/ui 등)는 도입하지 않는다.** handoff 04의 버튼·회의 표·할 일 행·챗 위젯·오디오 플레이어는 직접 만든다.
- **아이콘은 `lucide-react`**. handoff 04가 버튼별 Lucide 아이콘 이름을 이미 지정하고 있다.
- **다크 모드·테마 전환 없음.** 팔레트는 한 벌이다.
- 토큰에 없는 색·radius를 하드코딩하지 않는다. 필요하면 **`report-base.css`에 변수를 먼저 추가**한 뒤 앱·handoff 03을 맞춘다.

```css
  @import "tailwindcss";

  /* 유틸 클래스가 생겨야 하는 토큰 — report-base.css와 동일 키·값 */
  @theme {
    --color-bg: #f4f1ea;
    --color-surface: #fffcf7;
    --color-ai: #6b6560;
    --radius-md: 14px;
    --shadow-sm: 0 1px 3px rgba(26, 26, 24, 0.06);
    --font-sans: "IBM Plex Sans KR", system-ui, sans-serif;
    /* … 나머지 토큰 동일하게 이어짐 */
  }

  /* 유틸이 필요 없는 레이아웃 수치는 일반 변수로 */
  :root {
    --sidebar-w: 240px;
    --read-max: 680px;
  }
```

## 이유

- report-base.css 변수명이 Tailwind v4 `@theme` 네임스페이스와 맞물려 **변환표가 필요 없다.** `@theme` 출력은 다시 `:root` CSS 변수이므로 mockup·앱·preview가 같은 이름을 쓴다.
- 토큰 밖 값을 쓰려면 `[#abc123]` 같은 임의 값 표기를 써야 해서 **디자인 이탈이 코드 리뷰에서 눈에 띈다.**
- 1인 개발에서 컴포넌트 파일과 CSS 파일 사이 왕복이 줄어든다.
- shadcn/ui 등은 자체 토큰 이름(`--background`·`--foreground`)과 radius 스케일을 함께 들여온다. 이미 확정된 팔레트와 **진실이 두 개**가 된다. 화면 7개 규모에서는 이득보다 정리 비용이 크다.

## 결과 (트레이드오프)

- `--radius-sm/md/lg`와 `--shadow-sm/md`는 Tailwind **기본값을 덮어쓴다.** 이 프로젝트에서 `rounded-md`는 **14px**이다(Tailwind 기본값이 아니다). 모르고 쓰면 디자인이 미묘하게 어긋난다.
- 토큰명이 짧아서 `bg-bg` · `text-text` 같은 어색한 클래스가 생긴다. 그래도 **report-base.css 변수명과 맞추는 쪽**을 택한다.
- 접근성 위젯(포커스 트랩·키보드 내비)이 필요해지면 직접 구현해야 한다. MVP 화면에는 모달이 없고 챗 위젯도 비모달이라 범위 안에서 감당한다. 필요해지면 headless 라이브러리 도입을 **새 ADR**로 결정한다.
- Tailwind를 걷어내도 **토큰은 CSS 변수로 남는다.** lock-in이 낮다.
- 버전은 **Tailwind 4.x로 고정**한다(작성 시점 4.3.x).

## 관련

- [ui-ux/handoff/03-tokens-and-layout.md](../ui-ux/handoff/03-tokens-and-layout.md) · [04-components.md](../ui-ux/handoff/04-components.md)
- [ADR-0009](./0009-nextjs-app-framework.md)
- [plans/mvp-engineering/plan.md](../plans/mvp-engineering/plan.md) §3
