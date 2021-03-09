# sleact

- [GIT Clone](https://github.com/ZeroCho/sleact.git)
- [MySQL 설치](https://thebook.io/080229/ch07/02/01/)

# 백그라운드 세팅

0. node 14버전(12나 15도 괜찮음)과 MySQL을 미리 설치하기
1. cd back
2. npm i
3. .env 작성하기(COOKIET_SECRET과 MYSQL_PASSWORD 비밀번호 설정)

```.env
COOKIE_SECRET=sleactcookie
MYSQL_PASSWORD=qwer1234
```

4. config/config.json 설정(MYSQL 접속 설정)
5. npx sequelize db:create(스키마 생성)

- sleact라는 데이터베이스가 생성됨

6. npm run dev했다가 ctrl + c로 끄기(테이블 생성)

- MySQL 워크벤치에서 생성된 테이블 확인

7. npx sequelize db:seed:all(기초 데이터 넣기)
8. npm run dev
9. localhost:3095에서 서버 돌아가는 중
10. 백엔드 개발자가 API.md와 typings/db.ts를 남겨둔 상황

### 그 밖의 지식

- 오라클은 데이터베이스안에 스키마, 그 안에 테이블
- MySQL에서는 데이터베이스와 스키마를 구별하지 않음
- 자바스크립트가 타입스크립트로 넘어가는 추세
- TS의 맛을 보고나면 다시는 JS로 돌아가지 않게된다.
- TS는 JS의 변수, 함수의 매개변수, 함수의 반환 값에 타입이 붙어있는 것이다.
- nest랑 typeorm은 타입스크립트를 꼭 써야한다.
- nest는 생산성이 안좋다. 안정성이 좋다. 생산성을 포기하고 안정성을 택함
- express가 생산성이 더 좋다.

- 백엔드가 없어도 있는 것처럼 프론트 개발을 할 수 있어야한다.
- 더미데이터 불러오는 식으로 개발하면 선개발 할 수 있다.

- 타입스크립트는 알아서 타입 추론을 한다. 그래서 안적어줘도 대부분 작동한다.
- 코드 스플리팅은 페이지들을 분리하면 된다. 그 다음은 SSR이 필요없는 애들은 코드 스플리팅 하면 된다.

# 강좌 순서

## 1일차

0. alecture 폴더 생성

- 여기에서 실습

1. package.json

- npm init으로 생성
- npm i react react-dom typescript
- npm i @types/react @types/react-dom
- 설치 후 package-lock.json과 node_modules 폴더가 생성됨

2. .eslintrc

- eslint 설정 파일

```.eslintrc
{
  "extends": ["plugin:prettier/recommended"]
}
```

- 코드 점검 도구, 직접 설정하면 팀원간 의견 충돌이 있으니 prettier에 위임
- npm i -D eslint

3. .prettierrc

- prettier 설정 파일

```.prettierrc
{
  "printWidth": 120,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true
}
```

- 저장하면 알아서 코드를 수정해줌(에디터 설정 필요)
- npm i -D prettier eslint-plugin-prettier eslint-config-prettier

4. tsconfig.json

- 타입스크립트 설정
- 언어 문법과 자바스크립트 결과물이 어떻게 나와야하는지 설정하는 파일
- lib은 ES2020, DOM(브라우저), module은 esnext처럼 최신 설정이지만 target은 es5로 IE 브라우저에서도 돌아갈 수 있게 변환
- strict: true를 켜놓아야 타입 체킹을 해줘서 의미가 있음.

5. webpack.config.ts

- 웹팩 설정
- ts, css, json, 최신 문법 js 파일들을 하나로 합쳐줌.
- npm i -D webpack @types/webpack @types/node
- entry에서 파일을 선택하면 module에 정해진 rules대로 js로 변환하여 하나의 파일로 합쳐줌(output). plugins는 합치는 중 부가적인 효과를 줌
- ts는 babel-loader로, css는 style-loader와 css-loader를 통해 js로 변환
- babel에서는 @babel/preset-env(최신문법 변환) @babel/preset-react(리액트 jsx 변환), @babel/preset-typescript(타입스크립트 변환)
- npm i -D css-loader style-loader @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/preset-typescript
- publicPath가 /dist/고 [name].js에서 [name]이 entry에 적힌대로 app으로 바뀌어 /dist/app.js가 결과물이 됨.

6. index.html 작성

- ./dist/app.js로 웹팩이 만들어낸 js파일 불러옴
- 아이콘, 폰트, 파비콘같은 것은 슬랙에서 그대로 사용
- #app 태그에 리액트가 렌더링됨.

7. client.tsx에 간단한 tsx 작성
8. tsconfig-for-webpack-config.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "Node",
    "target": "es5",
    "esModuleInterop": true
  }
}
```

- 개발용 서버인 devServer 옵션 추가(port는 3090, publicPath는 /dist/로
- webpack serve할 때 webpack.config.ts를 인식 못하는 문제
- npm i -D ts-node webpack-dev-server @types/webpack-dev-server webpack-cli
- npm i cross-env
- package.json의 scripts의 dev를 cross-env TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack serve --env development
- npm run dev하면 localhost:3090에서 서버 실행됨.

9. hot reloading 설정

- npm i -D @pmmmwh/react-refresh-webpack-plugin react-refresh
- webpack의 babel-loader 안에 설정(env) 및 plugin으로 추가

10. fork-ts-checker-webpack-plugin

- npm i -D fork-ts-checker-webpack-plugin
- webpack은 ts체크 후 eslint체크 후 빌드 시작
- ts랑 eslint는 동시에 체크하면 더 효율적
- 이 플러그인이 동시에 진행하게 해줌.

11. 폴더 구조 세팅

- 페이지들은 pages
- 페이지간 공통되는 틀은 layouts
- 개별 컴포넌트는 components
- 각 컴포넌트는 컴포넌트 폴더 아래 index.tsx(JSX)와 styles.tsx(스타일링)

12. ts와 webpack에서 alias 지정

- npm i -D tsconfig-paths
- tsconfig에서 baseUrl와 paths 설정
- webpack에서는 resolve안에 alias 설정
- ../layouts/App같은 것을 @layouts/App으로 접근 가능

14. @layouts/App 작성

- 리액트 라우터 적용하기
- npm i react-router react-router-dom @types/react-router @types/react-router-dom
- client.tsx에서 App을 BrowserRouter로 감싸기
- @layouts/App에 Switch, Redirect, Route 넣기

15. @loadable/component

- 라우터를 코드스플리팅 해줌
- 회원가입 페이지에 접근한 사람은 회원가입 페이지에 필요한 JS만 받음
- 3초 룰 기억하자!
- npm i @loadable/component @types/loadable\_\_component

16. emotion 세팅

- styled components와 비슷하지만 설정이 간단함.
- npm i @emotion/react @emotion/styled
- npm i -D babel-plugin-emotion (웹팩에 babel 설정 추가)
- 스타일드 컴포넌트로 만들 때 변수를 많이 만드는 셈이므로 & 같은 선택자 적극 활용해야 변수 이름짓기를 최소화할 수 있음.

17. @pages/SignUp 작성

## 2일차

18. 회원가입 axios로 진행

- npm i axios
- CORS 문제를 피하기 위해서 devServer에 proxy 세팅
- CORS는 브라우저에서 다른 도메인의 서버로 요청을 보낼 때 발생
- 같은 도메인의 서버로 요청을 보내거나, 서버끼리 요청을 보낼 때는 발생하지 않음
- 따라서 같은 도메인인 proxy서버를 띄워 CORS를 피해갈 수 있음.

19. useInput 커스텀 훅 만들기

- 커스텀 훅으로 훅들간에 중복된 것을 제거할 수 있음
- 훅 내부에 훅을 작성할 수 있는 유일한 케이스
- useCallback은 return 안에 들어있는 함수에 꼭 적용해주자
- useMemo는 return 안에 들어있는 값에 적용하자

20. @pages/LogIn 작성 및 SWR

- 로그인 한 사람이 회원가입/로그인 페이지에 접근한다면?
- GET 요청은 SWR로 하는 것도 괜찮음
- npm i swr
- SWR에 fetcher(axios를 사용)를 달아줌.
- 로그인했음을 증명하기 위해 withCredentials: true 잊으면 안 됨.
- swr 옵션들에 대한 설명

21. @layouts/Workspace 작성

- 눈에 띄는 구역 단위로 스타일드컴포넌트로 만들어둠.
- 구역 내부의 태그들은 스타일드컴포넌트로 만들면 변수명 지어야 하니 css선택자로 선택

### 그 밖의 지식

- localhost로 개발 시 로그인을 푸는 법

  - 백엔드 서버를 localhost로 돌릴 때는 대부분 로그인 된 사용자의 정보를 메모리에 저장하고 있기 때문에 서버를 재기동하면 로그인이 풀린다.
  - 백엔드 서버를 못끄는 상황에선? Application 탭에서 쿠키 정보 connect.sid(express passport에선)를 지워준다.

- 유저의 로그인 정보를 저장하고 있으려면 리덕스가 필요하다.
- 리덕스의 대안? contextAPI, SWR 등등이 있다.
- SWR: 요청을 보내서 받아온 데이터를 저장해둔다.
  - 보통은 통상적으로 GET 요청에 대한 데이터를 SWR이 저장하고 있다.
  - POST 요청은 SWR에 접목시키기 어렵다.
  - swr은 next 만든 곳에서 만듦. next와 잘 어울림. But next가 없어도 잘 돌아간다.
  - 프론트 서버와 백엔드 서버 주소가 다르면 쿠키가 생성해줄수도 없고, 보내줄 수도 없다. 그래서 axios 요청을 보낼 때 withCredentials 설정을 해줘야한다. get 요청에선 2번째 자리, post 요청에선 3번째 자리

```TypeScript
axios.get(url, { withCredentials: true })
axios.post('http://localhost:3095/api/users/login', { email, password }, { withCredentials: true })
```

    - swr의 mutate는 유용한 기능이다. 인스타그램에서 좋아요 누를 때 좋아요 손이 바로 들어옴. 그것이 바로 mutate, 서버에 요청이 가기도 전에 실제 데이터를 바꿔 버리고 요청은 나중에 보냄.
      - 내가 한 액션이 바로 서버에 반영된다고 착각한다.
      - mutate는 기본적으로 Pessimistic UI(비관적 UI) 이다.
      - mutate를 Optimistic UI(낙관적 UI)로 사용하고 싶으면 두번째 인자 값을 true로 설정하면 된다.
      - mutate는 서버 검사를 아예 안하고 싶으면 두번째 인자 값을 false로 설정하면 된다.
      - 가끔 서버에 에러가 터질 때가 있기 때문에 점검도 다시한다. (Optimistic UI)
      - Optimistic UI는 내가 보낸 요청이 성공할 것이라고 예상하고 그 다음 점검하겠다.
      - 내가 직접 만들면 Pessimistic UI가 된다. 실패할 것이라고 예상을 먼저함

    - 쿠키는 백엔드에서 생성, 브라우저가 기억하게금 만들고, 프론트엔드는 한번 기억한 쿠키를 매 요청마다 백엔드로 보내줌
    - 쿠키 생성은 백엔드, 보내는 것은 프론트엔드!
    - 로그인 정보는 거의 대부분 쿠키로 저장한다. 쿠키가 안전! 쿠키삭제를 하면 로그인이 풀림.
    - 리액트 네이티브에서는 CORS 에러같은 것이 없다. 브라우저를 쓰지 않기 때문에
    - 배포 환경에서 브라우저와 백엔드 소통할 때 proxy 사용하지 않음
    - proxy라는 개념은 백엔드 자체에서는 많이 쓰이는 개념이다.

    - graphql 사용하는 경우는 swr를 쓸 필요가 없다. 아폴로가 동일한 기능을 제공
    - useSWR 과 경쟁하는 react-query의 useQuery
    - swr을 배워놓으면 react-query는 공짜
    - swr로 로컬스토리지도 관리할 수 있다. swr이 항상 비동기 요청이랑만 관련이 있는 것은 아니다.
    - swr는 fetcher를 선언하는대로 알아서 관리해준다. 전역 데이터 관리자로 사용할 수 있다.

```TypeScript
const { data } = useSWR('hello', (key) => {
  localStorage.setItem('data', key);
  return localStorage.getItem('data');
});
```

    - return은 항상 hooks 보다 아래에 있어야한다. 그 위에 있으면 에러가 난다.
    - if문, 반복문 안에 hooks가 있을 떄도 에러가 난다.
    - 에러 메세지: Invalid hook call. Hooks can only be called inside of the body of a function copmonent.

## 3일차

22. 그라바타

- npm i gravatar @types/gravatar
- Github같은 아이콘을 만들 수 있음

23. 에러 디버깅 용으로 토스트 라이브러리 설치

- npm i react-toastify

### 그 밖의 지식

- 중첩된 route: 주소 구조가 계층적으로 되어있다면 사용해도 된다.
  - 주소 설계를 잘해놔야 route 구조 잡는 것이 원활하다.
- input 태그가 들어있는 경우 별도로 컴포넌트로 빼는 것이 좋다.

  - input 자체가 다른 컴포넌트들의 불필요한 리렌더링을 발생시킨다.
  - 화면이 너무 깜빡 거리면 성능 분석할 때 어려움이 있기 때문에

- useCallback은 async await를 사용할 수 있지만, useEffect는 에러가 난다.
- 아래와 같이 사용하는 것은 괜찮다.

```JavaScript
const a = useCallback(async () => {
}, [])
useEffect(() => {
  a().then()
}, [])
```

## 4일차

24. typescript 정의

- 기본적으로 변수, 매개변수, 리턴값에 타입을 붙여주면 됨.
- 남이 타이핑해둔 것 분석하는 게 어려움
- Go to Type Definition
- 자바스크립트 라이브러리 작성자와는 다른 사람이 만든 ts 라이브러리가 @types로 시작하는 것들

25. @components/DMList 작성

- 현재 채널 참여자 목록 가져오기

26. @pages/DirectMessage 작성

- Header와 ChatList, ChatBox로 구성

27. @components/ChatBox 먼저 작성

- react-mentions 활용
- DM에서는 멘션 기능이 없지만 Channel에서는 있을 것

28. autosize 설치 (ChatBox)

- npm i autosize @types/autosize
  - alecture/components/ChatBox: autosize 사용 컴포넌트

## 5일차

- 프론트 추가 설치
- npm i socket.io-client@2
- npm i -D @types/socket.io-client

- 백엔드 버전 수정
- npm i socket.io@2

29. DM 보내보기

- optimistic UI
- 먼저 프론트에서 표시하고, 서버로는 그 다음에 요청보냄
- 요청 실패하는 순간 프론트에서 제거하고 에러 메시지 띄움
- 보낼 때 에러가난 것은 서버쪽에서 socket 연결 여부를 확인하기 때문

30. DM 로딩은 useSWRInfinite 사용

- 결과물이 2차원 배열 꼴로 나옴.
- 첫 번째 인자가 주소 문자열이 아닌 주소를 리턴하는 함수
- 이 함수의 매개변수로 페이지가 들어있어서 현재 몇 페이지인지 알 수 있음.

31. Workspace에 소켓 연결하기

- socket.emit이 클라이언트에서 서버로, socket.on이 서버에서 클라이언트로

32. DMList에 onlineList, dm 이벤트 연결
33. @components/ChatList 작성 및 @components/Chat 구현

34. 디자인 스크롤바 적용 (ChatList)

- npm i react-custom-scrollbars @types/react-custom-scrollbars
  - alecture/components/ChatList: react-custom-scrollbars 사용 컴포넌트

35. 날짜 라이브러리 적용 (Chat)

- npm i dayjs
- dayjs는 moment를 대체함

  - alecture/components/Chat: dayjs 사용 컴포넌트

36. 멘션 기능 적용 (ChatBox)

- npm i react-mentions @types/react-mentions
  - alecture/components/ChatBox: react-mentions 사용 컴포넌트

37. 정규표현식 (Chat)

- npm i regexify-string
  - alecture/components/Chat: regexify-string 사용 컴포넌트

38. 프로파일링 하면서 Chat에 memo 적용하기

39. makeSection 구현

40. 인피니트 스크롤링 구현

## 6일차

41. @components/ChannelList 작성
42. @pages/ChannelMessage 작성
43. Channel Chat 보내보기

44. 빌드 설정

- npm i webpack-bundle-analyzer @types/webpack-bundle-analyzer
- npm run build

45. 빌드 결과물인 JS와 html을 서버개발자에게 전달하기

- dist 폴더와 index.html 파일을 전달하면 된다. (수동)
- cicd

### 그 밖의 지식

- moment는 불변성을 안 지키고 있다.
- dayjs는 moment와 api는 같으나, 불변성을 잘 지키고 있다. 그리고 매우 가볍다.
- 키워드: EachMention

# aNest

```command
npm i -g @nestjs/cli
nest new aNest
cd a-nest
npm run start
```

## Hot reload

```command
npm i --save-dev webpack-node-externals run-script-webpack-plugin webpack
npm run start:dev
```

- 아래 공식 문서보고 순서대로 진행하면 된다.
- [공식 문서](https://docs.nestjs.com/recipes/hot-reload)

# 강좌

- [슬랙 nest | 50:30](https://youtu.be/8jMAo5WI1Dg)
