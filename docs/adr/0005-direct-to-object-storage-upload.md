# ADR-0005: 오디오는 Storage 직접 업로드

- **상태:** Accepted
- **날짜:** 2026-09-17

## 배경

1~2시간 오디오는 수십 MB. Serverless HTTP(예: Vercel)는 **요청 크기·시간 제한**이 있어 본문을 앱 서버로 보내기 부적합.

## 결정

- 브라우저가 **presigned URL**(또는 Supabase signed upload)로 **Storage에 직접** PUT.
- signed URL은 **세션 검증 후 API가 발급** — 공개 버킷·무인증 업로드 금지 ([ADR-0008](./0008-app-auth-no-rls-no-supabase-auth.md)).
- 앱 서버는 **메타데이터·업로드 완료 신호**만 처리.

## 이유

- 대용량이 앱 인스턴스를 거치지 않음 → 타임아웃·비용 감소.
- AWS 이전 시 **S3 presigned**와 동일 패턴.

## 결과

- 업로드 진행률·재시도는 클라이언트 책임.
- 악의적 대용량 업로드 방지: 인증된 1인 + 파일 크기/회의당 상한 정책 (convention).

## 관련

- [conventions/recording-resilience.md](../conventions/recording-resilience.md)
- [ADR-0003](./0003-supabase-with-aws-migration-path.md)
