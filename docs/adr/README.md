# ADR (Architecture Decision Records)

**되돌리기 어렵거나**, 여러 기능에 걸치거나, 나중에 「왜 이렇게 했지?」가 나올 선택만 기록합니다.

| ID | 제목 | 상태 |
| --- | --- | --- |
| [0001](./0001-single-user-lock-not-team-product.md) | 1인 현관문 vs 팀 협업 제품 아님 | Accepted |
| [0002](./0002-openai-two-model-stack.md) | OpenAI API + STT/LLM 2모델 | Accepted |
| [0003](./0003-supabase-with-aws-migration-path.md) | MVP Supabase, AWS 이사 경로 | Accepted |
| [0004](./0004-indexeddb-recording-buffer.md) | 녹음 중 IndexedDB 버퍼 | Accepted |
| [0005](./0005-direct-to-object-storage-upload.md) | 오디오 Storage 직접 업로드 | Accepted |
| [0006](./0006-inngest-background-jobs.md) | Inngest 백그라운드 처리 | Accepted |
| [0007](./0007-transcript-internal-only.md) | 받아쓰기 저장·UI 미노출 | Accepted |
| [0008](./0008-app-auth-no-rls-no-supabase-auth.md) | 앱 비밀번호 세션, RLS·Supabase Auth 없음 | Accepted |
| [0009](./0009-nextjs-app-framework.md) | 앱 프레임워크 Next.js (TypeScript) | Accepted |
| [0010](./0010-tailwind-with-handoff-tokens.md) | Tailwind v4, 디자인 시스템 중심 report-base.css | Accepted |
| [0011](./0011-sql-without-orm.md) | DB 접근 ORM 없이 SQL, Storage 어댑터 | Accepted |

**형식:** 배경 → 결정 → 이유 → 결과(트레이드오프) → 관련 문서

**Superseded** 시 상단에 대체 ADR 링크.
