

# HTML



## \- html 태그 정리

![그림입니다.  원본 그림의 이름: CLP00012dbc4db0.bmp  원본 그림의 크기: 가로 933pixel, 세로 290pixel](file:///C:\Users\ehdgn\AppData\Local\Temp\tmp1408.jpg)

### 기본태그들

`<html>` : 웹페이지의 시작 과 끝

​	`<! doctype>`는 문서 유형을 지정한다. 웹페이지가 페이지를 어떻게 해석할 지를 알려줌.

​	ex) `<! doctype html>` : 이 페이지를 html로 해석.

`<head>` : 웹페이지의 정보, 문서에서 사용할 외부 파일들을 링크할 때 사용

`<title>` : 문서 제목

`<body>` : **브라우저에 실제 표시되는 내용 (대부분의 내용이 여기에 들어감)**

`<meta>` : 문자 인코딩 및 문서 키워드, 요약 정보

​	ex) `<meta charset="utf-8>` : 웹 페이지의 문자 인코딩 방식을 utf-8로 지정해라.



### 시멘틱 웹 (body의 전체적인 구조)

기계가 쉽게 알아 들을 수 있는 웹

![image-20220124015751202](C:\Users\ehdgn\AppData\Roaming\Typora\typora-user-images\image-20220124015751202.png)

`<header>`  : 제목 지정(여러번 쓰일 수 있음.)



`<nav>` : 문서연결 링크, 같은 사이트 안의 페이지 또는 특정 지점으로 이동할 수 있는 링크를 말함.

위치에 상관없이 `<header>`나 `<footer>` 또는 `<aside>` 에 포함 시키거나 따로 사용할 수 있음.



`<section>`  : 주제별로 컨텐츠를 묶음.

`<article>` : 독립된 내용의 실제 컨텐츠 내용들을 넣을 때 사용.



`<aside>` : 본문 이외의 내용

 \+  `<address>` : 사이트 제작자 정보, 연락처정보, 이메일 주소 등등..



`<footer>` : 제작 정보와 저작권 정보



### body내 태그

`<style>` : 스타일 정보를 정의할 때 사용하는 태그

`<link>` : 외부 파일을 연결할 때 사용한다.

`<script>` : Javascript 코드 삽입



`<div>` : 아무런 의미 X, 컨텐츠들을 어떤 목적에 따라 묶어야 할 때 사용 (block 속성(줄 바꿈O))

`<span>` : 아무런 의미 X, 컨텐츠들을 어떤 목적에 묶어야 할 때 사용 (inline 속성(줄 바꿈X))



`<br>` : 줄바꿈

`<p>` : 단락. 사용하면 내용 앞뒤로 빈줄로 단락이 생긴다. (block level 태그)



`<hn>` : 제목 `<h1>` ~ `<h6>` 숫자가 높을수록 글자 크기가 작아진다.



`<strong>` : 내용 강조를 위해 진하게 표시

`<em>` : 내용 강조를 위해서 기울임 꼴로 표시

`<b>` : 글자만 진하게 표시

`<i>` : 의미 없이 기울임 꼴로 표시하는 경우



`<a>` : anchor, 웹 페이지나 외부 사이트로 연결

\- 속성값 :

​	target : 새 창 or 새 탭에서 링크를 열 때 사용

​		<img src="C:\Users\ehdgn\AppData\Roaming\Typora\typora-user-images\image-20220123215554136.png" alt="image-20220123215554136" style="zoom: 80%;" />

​	title : 링크의 툴팁을 표시(커서를 올렸을 때 나오는 설명)



\+ 아래에 나오는 `<iframe>`을 이용해서 다음과 같이 a링크로 target된 iframe에 이미지를 띄워 줄 수 있다.

---

```
    <div>
        <h1>여행 사진</h1>
        다음 사진을 클릭하면, 확대된 사진을 볼 수 있습니다.<br><br>
        <a href="./img/pic1.jpg" target="photo" >
            <img width="80" height="50" alt="" src="./img/pic1.jpg" />
        </a>
        <a href="./img/pic2.jpg" target="photo" >
            <img width="80" height="50" alt="" src="./img/pic2.jpg" />
        </a>
        <a href="./img/pic3.jpg" target="photo">
            <img width="80" height="50" alt="" src="./img/pic3.jpg" />
        </a>
        <a href="./img/pic4.jpg" target="photo" >
            <img width="80" height="50" alt="" src="./img/pic4.jpg" />
        </a>
        
        <br><br><br>

        <iframe width="720" height="480" src="./img/existed_pic.jpg" name = "photo" frameborder="0"></iframe>
        
        <br>
    </div>
```

결과 페이지 :

![image-20220124023043062](C:\Users\ehdgn\AppData\Roaming\Typora\typora-user-images\image-20220124023043062.png)



---



`<iframe>` : 외부 페이지를 삽입

​	ex) `<iframe src="삽입할 페이지 주소" [속성="속성값"]>

\- 속성 :

​	width : 너비

​	height : 높이

​	name : 프레임의 이름

​	seamless : 테두리 없애기(속성값없음)

​	src : 프레임에 표기할 페이지의 주소 지정



\+ 가져올 유튜브 링크에서 "공유>퍼가기" 를 누르면 다음과 같이 iframe을 이용해서 유튜브화면을 가져올 수 있다.

![image-20220123232443941](C:\Users\ehdgn\AppData\Roaming\Typora\typora-user-images\image-20220123232443941.png)



`<img>` : 이미지 삽입

\- 속성값 :

​	width : 너비

​	height : 높이

​	alt : 이미지를 설명해주는 대체 텍스트 추가

​	title : 링크의 툴팁을 표시 (커서를 올렸을 때 나오는 설명)

​	usemap : 이미지 맵 (하나의 이미지에 여러 개의 링크를 만드는 것)



`<form>` : 데이터 통신을 하기 위해서 사용하는 형식태그

\- 동작방식 :

1. form 안에 있는 모든 데이터를 웹서버로 보냄
2. 웹 서버는 form 데이터를 처리하기 위해서 웹 프로그램으로 데이터를 넘김
3. 웹 프로그램이 form 데이터를 처리함
4. 처리 결과에 따른 새로운 html 페이지를 웹 서버에 보낸다.
5. 웹 서버는 받은 html 페이지를 브라우저에 보낸다.
6. 브라우저는 받은 html 페이지를 보여준다.

\- 속성 :

​	action : 폼을 전송할 서버 쪽 스크립트 파일을 지정함.

​	name : 폼을 식별하기 위한 이름을 지정한다.

​	accept-charset : 폼 전송에 사용할 문자 인코딩을 지정함.

​	target : action에서 지정한 스크립트 파일을 현재 창이 아닌 다른 위치에 열도록 지정



`<input>` : form 요소중의 하나. 사용자가 정보를 입력하는 부분을 만들어야 할 때 사용한다.

​	ex) `<input type ="유형" 속성="속성값">`

\- 유형 :

|       키워드       |                             설명                             |
| :----------------: | :----------------------------------------------------------: |
|     **hidden**     |   서버로 보내는 값들을 보내는 필드(사용자에게는 보이지 X)    |
|      **text**      |        한 줄짜리 텍스트를 입력할 수 있는 텍스트 상자         |
|     **search**     |                           검색상자                           |
|      **tel**       |                      전화번호 입력 필드                      |
|      **url**       |                     URL 주소를 입력 필드                     |
|     **email**      |                      메일주소 입력 필드                      |
|    **password**    |                      비밀번호 입력 필드                      |
|     **number**     |                 숫자를 조절할 수 있는 화살표                 |
|     **range**      |             숫자를 조절할 수 있는 슬라이드 막대              |
|     **color**      |                            색상표                            |
|    **checkbox**    |                 체크박스 (2개이상 선택 가능)                 |
|     **radio**      | 라디오 버튼 (1개만 선택 가능) (name 속성값을 일치 시켜줘야함.) |
|    **datetime**    | 국제 표준시(UTC)로 설정된 날짜와 시간(연, 월, 일, 시, 분, 초, 분할 초) |
| **datetime-local** | 사용자가 있는 지역을 기준으로 한 날짜와 시간(연, 월, 일, 시, 분, 초, 분할 초) |
|      **date**      |          사용자 지역을 기준으로 한 날짜(연, 월, 일)          |
|     **month**      |            사용자 지역을 기준으로 한 날짜(연, 월)            |
|      **week**      |            사용자 지역을 기준으로 한 날짜(연, 주)            |
|      **time**      |     사용자 지역을 기준으로 한 시간(시, 분, 초, 분할 초)      |
|     **button**     |                             버튼                             |
|      **file**      |                  파일을 첨부할 수 있는 버튼                  |
|     **submit**     |                        서버전송 버튼                         |
|     **image**      |                submit 버튼 대신 사용할 이미지                |
|     **reset**      |                          리셋 버튼                           |

\- 속성 :

|     속성이름     |                             설명                             |
| :--------------: | :----------------------------------------------------------: |
|   **readonly**   |                   읽기 전용 필드로 만들기                    |
| **placeholder**  |              힌트 표시(필드 클릭시 내용 사라짐)              |
|  **autofocus**   | 페이지를 불러오자 마자 특정 부분에 마우스 커서가 표시되도록 하는 것 |
| **autocomplete** |                        자동완성 설정                         |
|  **max / min**   |            `<input>` 필드의 최대값과 최소값 지정             |
|  **maxLength**   |     텍스트 필드에 최대로 입력할 수 있는 문자의 개수 지정     |
|     **step**     | 숫자의 간격 설정  `<input>` 이 date, datetime, datetime-local, month, week,time, number, range일 경우만 사용가능 |
|   **required**   |           필수 입력 필드 지정(빈칸이면 안 넘어감)            |



`<select>`, `<option>` : form 요소중의 하나. 드롭다운 목록이나 데이터목록을 사용하여 여러 옵션 중에서 하나를 선택하는 형태이다.

```html
<select>
    <option value = "값1"> 내용 1</option>
    <option value = "값2"> 내용 2</option>
    ...
</select>
```

\- select 속성:

​	size : 화면에 표시할 드롭다운 항목의 개수를지정.

​	multiple : 드롭다운 목록에서 둘이상의 항목을 선택할 때 사용한다.

\- option 속성

​	value : 해당 항목을 선택할 때 서버로 넘겨줄 값을 지정.

​	selected : 드롭다운 메뉴를 삽입할 때 기본적으로 선택해서 보여 줄 항목을 지정.



`<button>` : form 요소중의 하나. 페이지에 버튼을 넣고 클릭이 가능하다. (input을 이용해서도 만들 수 있다.)



`<ul>` : unordered list, 순서가 없는 list

​	순서가 없기 때문에 앞에 ● 같은 불릿이 붙는다. (css 설정으로 없앨 수 있음. ex) list-style: none)

`<ol>` : ordered list, 순서가 있는 list

​	숫자나 영문 순서가 들어간다.

​	`<li>` : `<ul>` 과 `<ol>` 안에서 각 항목을 나열할 때 사용

\- 속성값 :

​	type : 앞에 붙는 order의 기호에 대해 결정한다. 

​		<img src="C:\Users\ehdgn\AppData\Roaming\Typora\typora-user-images\image-20220123230617699.png" alt="image-20220123230617699" style="zoom:80%;" />

​	start : 중간부터 시작해야 할 때 이 속성을 사용함.

​	reversed : 역순으로 할 때 사용한다.



## \- MDN (태그 검색)

MDN (HTML 공식 사이트) - 자료형에 관한 모든것 : https://developer.mozilla.org/ko/
