---
layout: post
date: 2023-11-10
title: "[Notion] 노션과 깃블로그 연동하기(Jekyll 기반)"
tags: [PJT, Notion, web, ]
categories: [PJT, Notion, Web, ]
---



## 📎 Notion 환경 설정


> 💡 Notion API 통합 생성(API 시크릿 키 구하기)


아래 사이트에 접속 후 API를 통합한다.


[https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)


![0](/assets/img/2023-11-10-[Notion]-노션과-깃블로그-연동하기(Jekyll-기반).md/0.png)


블로그에 자동 포스팅 할 본인의 워크 스페이스의 통합 API를 생성하고 
**프라이빗 API 통합 시크릿**을 따로 저장한다.


> 💡 블로그 템플릿 추가


아래와 같은 템플릿을 생성한다. 노션에서 DB테이블을 생성하는 것이다.


![1](/assets/img/2023-11-10-[Notion]-노션과-깃블로그-연동하기(Jekyll-기반).md/1.png)


> 💡 노션 DataBase ID 구하기


![2](/assets/img/2023-11-10-[Notion]-노션과-깃블로그-연동하기(Jekyll-기반).md/2.png)


생성한 DB 테이블에서 오른쪽 위 … 버튼을 누르면 통합 api를 연결 하는 부분이 있는데, 방금 만든 통합api를 연결 해준다.


그리고 링크 복사 라는 부분을 클릭하면 아래와 같은 데이터 포맷으로 링크가 복사 된다.



{% raw %}
```javascript
[https://www.notion.so/](https://www.notion.so/)<database_id>?v=<long_hash>
```
{% endraw %}



여기서 **database_id** 를 안전한 곳에 보관해둔다.



## 📎 Github 환경 설정


> 💡 Github에서 환경변수 등록하기


![3](/assets/img/2023-11-10-[Notion]-노션과-깃블로그-연동하기(Jekyll-기반).md/3.png)


이제 자신의 Jekyll 블로그의 Setting > Secrets and variables > Actions 에서 New repository secret을 클릭해 위의 노션에서 얻은 Notion 시크릿 키(NOTION_TOKEN), DataBase ID(DATABASE_ID)를 등록 해준다.

