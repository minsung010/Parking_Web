# Parking Web Service

공유누리 공공데이터 API를 활용한 실시간 모든 지역의 공영주차장 정보 조회 및 예약 서비스입니다. 주차장 정보를 지도에 표시하며, 개인별 예약 관리 기능을 제공합니다.

## 기술 스택

### Frontend
- HTML5 / CSS3 (Tailwind CSS)
- JavaScript
- Kakao Maps API (지도 기반 서비스)

### Backend
- Node.js / Express.js (API 프록시 서버)
- Axios (공공데이터 API 통신)

### Database & Auth
- Firebase Authentication (사용자 인증)
- Firebase Realtime Database (예약 데이터 관리)

## 주요 기능

1. 실시간 주차장 검색: 모든 지역 공영주차장 정보를 실시간으로 조회하여 지도에 마커로 표시합니다.
2. 주차장 상세 정보: 공유누리에서 제공하는 각 주차장의 세부 정보 등을 제공합니다.
3. 예약 시스템: 로그인한 사용자가 원하는 주차장을 선택하여 예약할 수 있습니다.
4. 개인 예약 관리: 사용자는 본인이 예약한 내역만 필터링하여 확인할 수 있습니다.

## 시스템 아키텍처
<img width="1116" height="583" alt="image" src="https://github.com/user-attachments/assets/6f492d7a-9261-4f0a-a4b9-58dfb3d9ce57" />

서비스는 브라우저 보안 정책(CORS)을 준수하기 위해 Node.js 프록시 서버를 통해 외부 API와 통신하며, 사용자 데이터 및 예약 내역은 Firebase를 통해 안전하게 관리됩니다.
브라우저에서 실시간으로 API를 호출하여 주차장의 정보들을 가져오며 Kakao Maps 지도에 뿌려지게 됩니다.

