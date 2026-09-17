# ADR-0002: OpenAI API — 받아쓰기·텍스트 2모델

- **상태:** Accepted
- **날짜:** 2026-09-17

## 배경

사용자는 AI 공급자를 **OpenAI(GPT)로 통일**하기를 원했다. 한 모델 이름으로 녹음·요약·챗을 모두 처리할 수는 없다. OpenAI는 **Transcription API**와 **Chat/Responses API**를 분리한다.

## 결정

- **단일 공급자:** OpenAI API (키 하나).
- **받아쓰기:** `gpt-transcribe` — 녹음 파일 조각(25MB 이하) 단위.
- **제목·안건 요약·할 일·챗봇:** `gpt-5.6-luna` — 회의 1건 텍스트 컨텍스트.
- **예비 STT:** 재생 시각 정확도·한국어 품질 부족 시 `whisper-1` (segment/word timestamps)로 **STT만** 교체.

**하지 않는 것:** Groq/Gemini 혼합; ChatGPT Plus 웹만으로 파이프라인; `gpt-4o-mini-audio`에 2시간 원본 직접 투입; 발언자 diarization.

## 이유

- `gpt-5.6-luna`: 저비용·대용량 컨텍스트·structured output — 회의 1건 챗에 적합.
- `gpt-transcribe`: OpenAI가 파일 받아쓰기 기본 모델로 권장, 분당 단가 예측 가능.
- `gpt-4o-mini-transcribe` 등은 **~25분/파일** 제한 보고가 있어 1~2시간 회의와 맞지 않음.
- Luna는 **오디오 입력 미지원** — STT 후 텍스트 파이프라인이 자연스럽다.

## 결과

- 구현은 **AIProvider 추상화** 한 겹만 두고, MVP는 OpenAI 구현 하나.
- AWS 이전 시 Bedrock 등 동일 family로 매핑 가능.
- API **유료** — [conventions/cost-and-retention.md](../conventions/cost-and-retention.md).
- 팀원 음성 포함 오디오를 OpenAI로 전송하는 것은 **제품 확정 범위** (별도 로컬 STT 분기 없음).

## 관련

- [conventions/ai-behavior.md](../conventions/ai-behavior.md)
- [plans/mvp-engineering/plan.md](../plans/mvp-engineering/plan.md)
