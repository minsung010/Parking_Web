# Parking Web Service

공유누리 공공데이터 API를 활용한 실시간 주차장 정보 조회 및 예약 서비스입니다. 사용자의 위치를 기반으로 주변 주차장 정보를 지도에 표시하며, 개인별 예약 관리 기능을 제공합니다.

## 기술 스택

### Frontend
- HTML5 / CSS3 (Tailwind CSS)
- JavaScript (ES6+)
- Kakao Maps API (지도 기반 서비스)

### Backend
- Node.js / Express.js (API 프록시 서버)
- Axios (공공데이터 API 통신)

### Database & Auth
- Firebase Authentication (사용자 인증)
- Firebase Realtime Database (예약 데이터 관리)

## 주요 기능

1. 실시간 주차장 검색: 대전 지역 주차장 정보를 실시간으로 조회하여 지도에 마커로 표시합니다.
2. 주차장 상세 정보: 각 주차장의 이름, 주소, 주차면 수, 요금 정보, 운영 시간, 연락처 등을 제공합니다.
3. 예약 시스템: 로그인한 사용자가 원하는 주차장을 선택하여 예약할 수 있습니다.
4. 개인 예약 관리: 사용자는 본인이 예약한 내역만 필터링하여 확인할 수 있습니다.
5. 관리자 기능: 전체 예약 현황을 확인하고 삭제할 수 있는 관리 대시보드를 제공합니다.

## 시스템 아키텍처

서비스는 브라우저 보안 정책(CORS)을 준수하기 위해 Node.js 프록시 서버를 통해 외부 API와 통신하며, 사용자 데이터 및 예약 내역은 Firebase를 통해 안전하게 관리됩니다.

## 실행 방법

1. 의존성 설치
   ```bash
   npm install
   ```

2. 프록시 서버 실행
   ```bash
   node server.js
   ```

3. 서비스 접속
   `index.html` 파일을 브라우저로 열어 서비스를 실행합니다. (Live Server 권장)

## 주의사항
- 카카오 지도 API 및 Firebase 설정 값은 현재 테스트용으로 세팅되어 있습니다.
- 실제 서비스 운영 시 각 플랫폼의 콘솔에서 발급받은 본인의 API 키를 사용해야 합니다.
- 공공데이터 조회를 위해 `node server.js`가 반드시 실행 중이어야 합니다.
