# MVP 엔지니어링 PRD

- **작성·갱신:** 2026-09-17
- **상태:** 설계·정책 확정 (구현 완료 아님)
- **도메인:** [domain_story_meeting_agent.md](../../domain_story_meeting_agent.md)
- **UX:** [ui-ux/handoff/00-start.md](../../ui-ux/handoff/00-start.md)

---

## 1. 목적

매주 수요일 오프라인 회의(1~2시간)에서 **노트북 하나**로 녹음·메모·종료 직후 요약·할 일 확인·며칠 뒤 회의 단위 챗봇·구간 재생까지 이어지는 **1인용 데스크톱 웹 서비스**를 MVP로 만든다.

성공 기준은 기능 개수가 아니라 **「손이 더 가지 않는다」**는 도메인 veto rule을 지키면서 AS-IS 통증(P1~P6)을 TO-BE로 대체하는 것이다.

---

## 2. MVP 범위 (엔지니어링 관점)

### 포함

- 데스크톱 웹 (handoff 기준 1280px+, Chrome 우선)
- 녹음 시작/종료, 녹음 중 메모
- 종료 후 AI 처리(받아쓰기 → 제목·요약·할 일), 로딩 정책(~2분 / 5분+)
- 회의 목록·상세, 미완료 할 일 필터, 구간 재생, 회의 1건 챗봇
- **1인 현관문** (팀 공유·권한·알림 없음, 인터넷에 올릴 때 본인만 접근)
- 클라우드 보관 + **녹음 중 로컬 임시 저장**(IndexedDB) — [ADR-0004](../../adr/0004-indexeddb-recording-buffer.md)
- **오디오 90일 자동 정리 job** — [conventions/cost-and-retention.md](../../conventions/cost-and-retention.md)

### 제외 (Non-goals, handoff와 동일)

- 모바일, 팀 공유, 발언자 UI, 전사 풀뷰, 회의 간 검색 챗, 푸시, Zoom/온라인 봇
- 녹음 자동 시작 감지, MVP 일시정지

---

## 3. 기술 방향 (요약)

| 영역 | MVP 선택 | ADR |
| --- | --- | --- |
| 앱 | **Next.js (App Router) + TypeScript**, 화면·서버 API 한 프로젝트 | [0009](../../adr/0009-nextjs-app-framework.md) |
| 배포 | Vercel (Vercel 전용 기능 의존 금지) | [0009](../../adr/0009-nextjs-app-framework.md) |
| DB·파일 | Supabase (Postgres + Storage) | [0003](../../adr/0003-supabase-with-aws-migration-path.md) |
| 긴 작업 | Inngest | [0006](../../adr/0006-inngest-background-jobs.md) |
| 로그인 | **앱 비밀번호** + 서버 세션 (Supabase Auth 없음) | [0001](../../adr/0001-single-user-lock-not-team-product.md), [0008](../../adr/0008-app-auth-no-rls-no-supabase-auth.md) |
| 접근 통제 | **RLS 없음**, API·워커만 DB/Storage | [0008](../../adr/0008-app-auth-no-rls-no-supabase-auth.md) |
| AI | OpenAI API, 받아쓰기 + 텍스트 2모델 | [0002](../../adr/0002-openai-two-model-stack.md) |
| 업로드 | 브라우저 → Storage 직접 | [0005](../../adr/0005-direct-to-object-storage-upload.md) |
| 원문 | DB 저장, UI 미노출 | [0007](../../adr/0007-transcript-internal-only.md) |

별도 백엔드 서버는 두지 않는다. 브라우저는 **Next.js 서버**만 호출하고, Postgres·Storage·OpenAI 접근은 모두 서버 쪽에서 일어난다. 오래 걸리는 작업만 Inngest로 넘긴다.

상세 흐름: [architecture/system-overview.md](../../architecture/system-overview.md)

---

## 4. AI 운영 정책 (한 줄)

- **공급자:** OpenAI만 (Groq·Gemini 등 혼합하지 않음).
- **받아쓰기:** `gpt-transcribe` (조각 업로드, 재생 시각은 조각 기준 부여).
- **요약·할 일·챗봇:** `gpt-5.6-luna` (회의 1건 텍스트 컨텍스트).
- **예비:** 받아쓰기 품질·재생 정확도가 부족하면 받아쓰기만 `whisper-1`(구간/단어 타임스탬프)로 교체 검토.

비용·무료 기대: OpenAI API는 **무료 티어가 없음**. 주 1회 90분 기준 **월 수 USD 단위**를 가정한다. [conventions/cost-and-retention.md](../../conventions/cost-and-retention.md)

---

## 5. 회의 상태 (제품·UX·백엔드 공통 언어)

상태는 **두 축**이다. 하나로 섞지 않는다.

**① 처리 상태** — AI 파이프라인이 어디까지 갔는가

| 상태 | 사용자가 보는 것 |
| --- | --- |
| `recording` | ② 녹음 중 |
| `uploading` | 종료 직후 업로드 (실패 시 재시도 안내) |
| `processing` | ③ 단계 UI, 목록 ghost 이동 가능 |
| `ready` | AI 요약·할 일 사용 가능 |
| `ai_failed` | 메모 유지, AI 영역 재시도 |

**② 오디오 보유** — 지금 들을 수 있는가

| 값 | 의미 |
| --- | --- |
| `available` | 재생·구간 seek 가능 |
| `expired` | **90일 보관 종료로 삭제됨** — 요약·할 일·챗봇은 그대로 |
| `none` | 처음부터 녹음이 없음 (memo-only 저장) |

`ai_failed`는 「AI가 실패」, `none`은 「녹음이 없음」, `expired`는 「있었지만 정리됨」이다. 세 가지를 같은 단어로 쓰지 않는다.

정의·예외: [conventions/recording-resilience.md](../../conventions/recording-resilience.md) · [conventions/cost-and-retention.md](../../conventions/cost-and-retention.md)

---

## 6. 문서에서 다룬 예외 (MVP 정책)

| 상황 | 정책 |
| --- | --- |
| 탭 종료·크롬 충돌·절전 | IndexedDB 조각으로 복구·이어 업로드 |
| 업로드 실패 | 재녹음 요구 금지, 재업로드만 |
| 마이크 거부 | ② 진입 차단 (handoff) |
| AI 실패 | memo + audio 유지, 요약만 재생성 |
| 오디오 만료(90일) | 회의·할 일·요약·챗 유지, **재생만** 불가 |
| 요약 재생성 | 사용자 메모·할 일 완료 표시·수정본 보존 |
| 동시 녹음 2탭 | 두 번째 시작 차단 |
| 녹음 3시간 초과 | 자동 종료 (비용·실수 방지) |
| 재생 시각 | 초 단위 정확도 약속 없음, 가장 가까운 조각/구간 |
| 브라우저 | MVP는 Chrome 데스크톱만 보장 |
| 저장 용량 | **90일 후 오디오만** 자동 삭제; 목록·할 일·요약·챗은 유지 — [cost-and-retention](../../conventions/cost-and-retention.md) |

---

## 7. 확정 사항

| # | 주제 | 결정 | 비고 |
| --- | --- | --- | --- |
| 1 | OpenAI로 음성·텍스트 처리 | **확정 — 사용** | 별도 로컬 STT·다중 AI 공급자 불필요 |
| 2 | 지난 회의를 **어디서** 보나 | **확정 — 회의한 노트북 중심** | 집·다른 PC는 MVP 필수 아님. 클라우드는 **처리·백업**용으로 유지 |
| 3 | 회사 노트북 제약 | **확정** | Chrome 사용 가능 · 마이크 허용 가능 · OpenAI API **개인 카드** 결제 |
| 4 | 로그인·접근 | **확정** | **앱 비밀번호** 세션 · **RLS·Supabase Auth 없음** · [access-control](../../conventions/access-control.md) |
| 5 | Storage 보관 | **확정** | **90일 후 음성 파일만** 자동 삭제 · [cost-and-retention](../../conventions/cost-and-retention.md) |

### 2번 결정이 의미하는 것 (비개발자용)

- **제품:** 「어디서든 동기화」를 MVP 목표로 두지 않는다. 북마크해 둔 **회의용 노트북 Chrome**이 일상적인 사용 장소다.
- **그래도 Supabase·인터넷이 필요한 이유:** 녹음 종료 후 받아쓰기·요약은 OpenAI와 서버 작업이 필요하고, 노트북 고장 시 **클라우드에 남은 회의**를 같은 기기에서 다시 열 수 있게 하기 위함이다. (IndexedDB는 녹음 **중** 임시 저장만.)
- **비밀번호 로그인:** 다른 PC용이 아니라 **URL이 새어도 남이 못 보게** 하는 현관문. 녹음 화면이 아닌 **별도 로그인** → 세션 유지. [conventions/access-control.md](../../conventions/access-control.md)

### 3번 결정이 의미하는 것

- MVP **공식 지원 브라우저:** Chrome (회사 노트북).
- 녹음 전 **마이크 허용** 1회 필요 (거부 시 ② 진입 불가 — handoff).
- OpenAI 비용은 **개인 API 계정** 기준으로 설계; 회사 경비·법인 카드는 MVP 범위 밖.

### UX handoff에 아직 없는 화면 (구현 시 한 줄 추가 필요)

정책은 확정됐지만 ①~⑦ 화면 스펙에는 없는 것들이다. 구현 슬라이스에서 handoff에 반영한다.

| 필요 | 근거 |
| --- | --- |
| **로그인 화면** (비밀번호 1개, 녹음 홈과 분리) | [ADR-0008](../../adr/0008-app-auth-no-rls-no-supabase-auth.md) |
| **오디오 만료 표시** (⑥ 오디오 탭·`play_clip` 비활성 + 안내) | [cost-and-retention](../../conventions/cost-and-retention.md) |
| **업로드 실패·재업로드** 안내 | [recording-resilience](../../conventions/recording-resilience.md) |

---

## 8. AWS 확장 (MVP 이후 방향)

MVP는 Supabase·Vercel·Inngest로 **비용·속도**를 우선한다. 이사 시 **데이터와 파일 규격을 바꾸지 않고** 매핑만 바꾼다.

| MVP | AWS 쪽 대응 |
| --- | --- |
| Supabase Postgres | RDS / Aurora |
| Supabase Storage | S3 |
| Vercel (앱) | ECS Fargate / Amplify |
| Inngest | SQS + Lambda / Step Functions |
| 앱 비밀번호 세션 | Cognito 등 (AuthProvider 교체, API 경계 유지) |

OpenAI는 Bedrock 경유 등 **동일 모델 family**로 유지 가능하도록 AI 호출을 한 계층으로 둔다. [ADR-0002](../../adr/0002-openai-two-model-stack.md)

---

## 9. 관련 문서

- [conventions/](../../conventions/README.md)
- [architecture/](../../architecture/README.md)
- [adr/](../../adr/README.md)
