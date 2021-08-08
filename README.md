# Gonggol Team

![](https://github.com/wecode-bootcamp-korea/21-1st-gonggol-frontend/blob/master/public/images/common/logo_tm.png?raw=true)

- [캉골](https://kangolkorea.com/) 공식 온라인스토어 클론 프로젝트.
- 2주라는 짧은 기간 동안 기획, 디자인에 소요되는 시간을 단축시키고 화면 & 기능 구현에 중점을 두기 위한 클론 프로젝트입니다.
- 개발 초기 세팅부터 직접 구현하였으며, 아래 데모 영상에서 보이는 모든 부분은 모두 백엔드와 연결하여 실제 사용할 수 있는 서비스 수준으로 개발한 것입니다.
- 슬라이드 등 외부 라이브러리 사용 없이 바닐라 자바스크립트로 구현하였습니다.

## 프로젝트 기간 및 인원

### 2021.06.07 ~ 2021.06.18

### Frontend (3명)

- 김지민
- 오선주
- 이도윤

### Backend (3명)

- 배찬영
- 최승리
- 한성봉

#### [백엔드 Github 링크](https://github.com/wecode-bootcamp-korea/21-1st-gonggol-backend)

## 데모 영상

[![데모영상](http://img.youtube.com/vi/um9Wr2I_JRE/0.jpg)](https://www.youtube.com/watch?v=um9Wr2I_JRE)

## 적용 기술

- Front-End : React.js, sass, ES6+
- Back-End : Python, Django web framework, Bcrypt, My SQL
- 협업 Tool : Slack, Trello, Gitbook

## 구현 기능
## 👩🏻‍💻 내가 구현한 페이지 및 기능

### Header, Footer 구현

> - Header, Footer를 공통 컴포넌트화하여 여러 페이지에서 활용가능하도록 구현
> - Transition 효과를 통해 Header 내 navbar에 애니메이션 효과 구현

### 메인페이지

> - setInterval , setTimeout을 이용한 호출 스케줄링으로 무한 슬라이더, 좌우 이동 및 radio button을 외부 라이브러리 없이 구현
> - 베스트셀러, 신상품은 Grid를 사용하여 레이아웃 구성하였고, API 호출을 통해 구현
> - Scroll event와 transition 효과를 통해 floating sidebar 구현


## 👫 팀원들이 구현한 페이지 및 기능
### 상품목록

> - 상품은 기본목록, 서브 카테고리, 필터, 페이징네이션 액션 시 api를 호출하여 구현

### 상품상세

> - 동적 라우팅 기능을 사용하여 경로에 따라 다른 상품을 보여주도록 구현
> - 상품 이미지를 배열로 받아 이미지 슬라이드로 구현
> - 한 상품에서 여러개의 사이즈를 선택하여 한번에 구입이 가능하도록 기능 구현

### 로그인 & 회원가입

> - 회원가입 재사용할 수 있도록 컴포넌트화하여 레이아웃 구성
> - 회원가입 입력항목 유효성체크하여 유효할 경우에만 api 호출하도록 구현
> - 로그인 api 호출하여 정상 로그인 경우 Local Storage에 Response 받은 토큰 값을 저장하여 로그인 유지될 수 있도록 구현

## Reference

> 이 프로젝트는 캉골 사이트를 참조하여 학습목적으로 만들었습니다.
> 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
> 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
