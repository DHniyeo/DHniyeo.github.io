---
layout: post
date: 2024-01-06
title: "[Notion] 노션 API 연동으로 데이터베이스 사용하기"
tags: [PJT, Notion, web, ]
categories: [PJT, Notion, Web, ]
---

# 🐿️ 노션 통합 API 생성하기


아래 사이트에 접속 후 API를 통합한다.


[https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)


![0](/assets/img/2024-01-06-[Notion]-노션-API-연동으로-데이터베이스-사용하기.md/0.png)


블로그에 자동 포스팅 할 본인의 워크 스페이스의 통합 API를 생성하고


**프라이빗 API 통합 시크릿**을 따로 저장한다.


# 🐿️ 데이터 베이스 생성하기


![1](/assets/img/2024-01-06-[Notion]-노션-API-연동으로-데이터베이스-사용하기.md/1.png)


DB로 사용할 페이지에서 방금 생성한 통합 API를 연결 해준다.


그리고 링크 복사 라는 부분을 클릭하면 아래와 같은 데이터 포맷으로 링크가 복사 된다.


> [https://www.notion.so/](https://www.notion.so/)<database_id>?v=<long_hash>


여기서 **database_id** 를 안전한 곳에 보관해둔다.


# 🐿️ Postman 에서 데이터 읽어보기


[bookmark](https://www.postman.com/)


먼저 위의 사이트에서 Postman을 다운 받는다. 설치 방법은 간단하므로 스킵 한다.


> 💡 Postman에서 노션 DB 가져와서 읽어보기


> https://api.notion.com/v1/databases/{{**database_id**}}/query


![2](/assets/img/2024-01-06-[Notion]-노션-API-연동으로-데이터베이스-사용하기.md/2.png)

1. POST 로 설정한 뒤, database_id 부분에 아까 저장한 database_id를 넣는다.
2. Headers를 클릭한 후 Notion DB를 불러오기에 필요한 파라미터 3개를 입력해준다.

	![3](/assets/img/2024-01-06-[Notion]-노션-API-연동으로-데이터베이스-사용하기.md/3.png)


파라미터는 다음과 같다.


| **Authorization**  | - api 시크릿 키를 입력해야 합니다.
Bearer {{api 시크릿 키}}                                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Notion-Version** | - 노션 api 버전입니다. 최신버전으로 하시면 됩니다.
버전은 아래 링크에서 확인할 수 있습니다.
[https://developers.notion.com/reference/changes-by-version](https://developers.notion.com/reference/changes-by-version) |
| **Content-Type**   | application/json                                                                                                                                                                 |

undefined1. Send 버튼을 누르면 Body에서 데이터 구조를 확인 할 수 있다.

![4](/assets/img/2024-01-06-[Notion]-노션-API-연동으로-데이터베이스-사용하기.md/4.png)


---


참고 사이트


[https://developers.notion.com/reference/intro](https://developers.notion.com/reference/intro)


[https://wooncloud.tistory.com/131](https://wooncloud.tistory.com/131)

