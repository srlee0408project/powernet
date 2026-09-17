# ADR-0004: 녹음 중 IndexedDB 버퍼

- **상태:** Accepted
- **날짜:** 2026-09-17

## 배경

회의는 1~2시간. 브라우저만으로 녹음할 때 탭 종료·크래시·절전·업로드 전 연결 끊김이 있으면 **전체 원본 손실**이 된다. 제품 veto상 「다시 2시간 녹음」은 사용 중단급이다.

## 결정

- 녹음 중 음성을 **10~30초 조각**으로 **IndexedDB**에 지속 flush.
- 업로드 **성공 확인 후** 해당 회의 로컬 버퍼 삭제.
- localStorage는 용량(약 MB급)상 사용하지 않음.

## 이유

- RAM만 쓰면 프로세스 종료 시 소멸.
- 웹앱은 사용자 동의 없이 「내 문서」 폴더에 mp3를 쓰지 못함 — 브라우저 허용 저장소가 IndexedDB.
- 회의 중 **서버 업로드 필수**로 두면 와이파이 불안 시 사용자 부담 증가 (오프라인 회의실).

## 결과

- 다른 PC에는 로컬 버퍼 없음 — 클라우드 업로드가 진실의 원천.
- Safari 등 비보장 브라우저는 MVP 범위 외.
- IndexedDB는 **임시**; 장기 보관은 Storage.

## 관련

- [conventions/recording-resilience.md](../conventions/recording-resilience.md)
- [architecture/system-overview.md](../architecture/system-overview.md)
