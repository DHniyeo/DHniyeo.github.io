---
layout: post
date: 2023-11-10
title: "[Notion] 노션과 깃블로그 연동하기(Jekyll 기반)"
tags: [PJT, Notion, web, ]
categories: [PJT, Notion, Web, ]
---


# 📎 Notion 환경 설정


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


# 📎 Github 환경 설정


> 💡 Github에서 환경변수 등록하기


![3](/assets/img/2023-11-10-[Notion]-노션과-깃블로그-연동하기(Jekyll-기반).md/3.png)


이제 자신의 Jekyll 블로그의 Setting > Secrets and variables > Actions 에서 New repository secret을 클릭해 위의 노션에서 얻은 Notion 시크릿 키(NOTION_TOKEN), DataBase ID(DATABASE_ID)를 등록 해준다.


> 💡 workflow 파일과 Notion page 내용을 읽어오는 스크립트 2개 추가


1️⃣ _scripts/notion-import.js


[https://github.com/DHniyeo/DHniyeo.github.io/blob/master/_scripts/notion-import.js](https://github.com/DHniyeo/DHniyeo.github.io/blob/master/_scripts/notion-import.js)


위 Javascript 파일에 대한 dependencies를 설치해야 하는데 이때 `package.json` 파일의 내용에 아래 부분을 추가해주면 된다.



{% raw %}
```json
{
  "devDependencies": {
    "@notionhq/client": "^1.0.4",
    "@types/node-fetch": "^2.6.2",
    "moment": "^2.29.2",
    "node-fetch": "^2.6.7",
    "notion-to-md": "^2.5.5"
  }
}
```
{% endraw %}



2️⃣ .github/workflows/pages-deploy.yml



{% raw %}
```yaml
name: "Build and Deploy"
on:
  repository_dispatch:
    types: [RUN_WORKFLOW_DISPATCH]
      
permissions:
  contents: write
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  importer:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@master
    
      - name: Clean Directory
        run: |
          for file in assets/img/*
          do
              if [[ $file != "assets/img/favicons" ]]
              then
                  rm -rf "$file"
              fi
          done
          rm -rf _posts/*
      
      - uses: actions/setup-node@v2
        with:
          node-version: "17"

      - run: npm install

      - run: node _scripts/notion-import.js
        env:
          NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
          DATABASE_ID: ${{ secrets.DATABASE_ID }}

      - uses: stefanzweifel/git-auto-commit-action@v4
        env:
          GITHUB_TOKEN: $
        with:
          commit_message: "[배포] Notion 변경 사항 저장"
          branch: master
          commit_user_name: importer-bot 🤖
          commit_user_email: actions@github.com
          commit_author: importer-bot 🤖 <actions@github.com>
 
  build:
    needs: importer
    runs-on: ubuntu-latest

    steps:           
      - name: Checkout
        uses: actions/checkout@v3
        with:
          ref: master
          fetch-depth: 1
          # submodules: true
          # If using the 'assets' git submodule from Chirpy Starter, uncomment above
          # (See: https://github.com/cotes2020/chirpy-starter/tree/master/assets)

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v1

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1' # reads from a '.ruby-version' or '.tools-version' file if 'ruby-version' is omitted
          bundler-cache: true

      - name: Build site
        run: bundle exec jekyll b -d "_site$"
        env:
          JEKYLL_ENV: "production"
        
      #- name: Test site
      #  run: |
      #    bundle exec htmlproofer _site --disable-external --check-html --allow_hash_href

      - name: Upload site artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: "_site$"

  deploy:
    environment:
      name: github-pages
      url: $
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```
{% endraw %}



# 📎 갱신 버튼 설정


블로그 글이 업데이트 되는 조건은 아래와 같다.


> Dispatch를 통해 WorkFlow가 트리거 되었을 때


dispatch를 이용하면 버튼을 눌러서 게시글 업데이트를 진행할 수 있다.


> 💡 Github AccessToken 생성


먼저, Github AccessToken을 생성해주어야 한다.


![4](/assets/img/2023-11-10-[Notion]-노션과-깃블로그-연동하기(Jekyll-기반).md/4.png)


![5](/assets/img/2023-11-10-[Notion]-노션과-깃블로그-연동하기(Jekyll-기반).md/5.png)


![6](/assets/img/2023-11-10-[Notion]-노션과-깃블로그-연동하기(Jekyll-기반).md/6.png)


![7](/assets/img/2023-11-10-[Notion]-노션과-깃블로그-연동하기(Jekyll-기반).md/7.png)


`Settings`→`Developer settings`→`Personal access tokens`로 들어가서 새 토큰을 생성해준다.


scope는 `repo`, `workflow`, `admin:repo_hook`를 선택해준다.


이제 토큰을 안전한 곳에 복사해둔다.


> 💡 노션에서 갱신(Dispatch) 버튼 생성하기


이제 토큰을 활용하여 Dispatch를 시켜줄 버튼을 생성할 것인데, html코드로 노션에 바로 버튼을 생성할 수 없으므로, 아래의 사이트를 이용해 html코드를 노션에서 쓸 수 있도록 변환 시킨다.


[https://www.notion-tools.com/embeds/html](https://www.notion-tools.com/embeds/html)


html 코드는 아래와 같다.


(다음과 같이 코드에서 `USERNAME`, `REPO_NAME`, `GITHUB_ACCESS_TOKEN`을 변경한 후 링크를 생성한다.


`GITHUB_ACCESS_TOKEN`은 위에서 생성한 토큰을 작성하면 된다.)



{% raw %}
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    .trigger-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .trigger-button {
      display: inline-block;
      margin-bottom: 10px;
      padding: 10px 20px;
      background-color: #4c9aff;
      color: white;
      font-size: 16px;
      border: none;
      cursor: pointer;
      border-radius: 4px;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s;
    }

    .trigger-button:hover {
      background-color: #2e86ff;
    }

    .message {
      font-size: 16px;
      color: #333;
    }
  </style>
</head>
<body>
  <div class="trigger-container">
    <button id="triggerButton" class="trigger-button">갱신</button>
    <div id="message" class="message"></div>
  </div>

  <script>
  document.getElementById("triggerButton").addEventListener("click", function() {
    var messageElement = document.getElementById("message");
    messageElement.textContent = "요청 전송 중...";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.github.com/repos/USERNAME/REPO_NAME/dispatches", true);
    xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
    xhr.setRequestHeader("Authorization", "Bearer GITHUB_ACCESS_TOKEN");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function() {
      if (xhr.status === 204) {
        messageElement.textContent = "요청이 성공적으로 전송되었습니다." + xhr.status;
      } else {
        messageElement.textContent = "요청 전송에 실패했습니다.<br>상태 코드: " + xhr.status;
      }
    };

    xhr.onerror = function() {
      messageElement.textContent = "요청 전송 중 알 수 없는 오류가 발생했습니다.";
    };

    xhr.send(JSON.stringify({"event_type": "RUN_WORKFLOW_DISPATCH"}));
  });
</script>
</body>
</html>
```
{% endraw %}



노션에서 쓸 수 있도록 html코드를 링크로 변환 시켰다면 해당 링크를 노션 페이지에서 임베드를 통해 연결한다.


![8](/assets/img/2023-11-10-[Notion]-노션과-깃블로그-연동하기(Jekyll-기반).md/8.png)


![9](/assets/img/2023-11-10-[Notion]-노션과-깃블로그-연동하기(Jekyll-기반).md/9.png)


![10](/assets/img/2023-11-10-[Notion]-노션과-깃블로그-연동하기(Jekyll-기반).md/10.png)


> 💡 테스트 하기


정상적으로 잘된다면 갱신 버튼을 누른 후 Repository에서 Actions 부분에 들어가면 아래와 같이 정상적으로 동작이 완료된다.


![11](/assets/img/2023-11-10-[Notion]-노션과-깃블로그-연동하기(Jekyll-기반).md/11.png)


여기까지가 Notion에서 버튼을 통해 Gitblog 게시물을 자동 업로드 하는 방법이다.


> 💡 요약


![12](/assets/img/2023-11-10-[Notion]-노션과-깃블로그-연동하기(Jekyll-기반).md/12.png)

- _scripts/notion-import.js : Notion API, **`notion-to-md`**라이브러리 및 기타 종속성을 사용하여 Notion 데이터베이스 항목을 Markdown 파일로 변환합니다.
- .github/workflows/pages-deploy.yml : 이 GitHub Actions 워크플로는 Notion 데이터베이스의 변경 사항을 기반으로 Jekyll 사이트의 구축 및 배포 프로세스를 자동화하도록 설계되었습니다.
- html 코드 : 클릭 시 GitHub Actions 워크플로 전달 이벤트를 트리거하는 버튼입니다.

reference

- [https://ddooom.tistory.com/entry/파이썬으로-노션-데이터베이스-접근하기](https://ddooom.tistory.com/entry/%ED%8C%8C%EC%9D%B4%EC%8D%AC%EC%9C%BC%EB%A1%9C-%EB%85%B8%EC%85%98-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%A0%91%EA%B7%BC%ED%95%98%EA%B8%B0)
- [https://lourcode.kr/posts/Jekyll-기반-Github-Pages와-Notion-Page-연동/](https://lourcode.kr/posts/Jekyll-%EA%B8%B0%EB%B0%98-Github-Pages%EC%99%80-Notion-Page-%EC%97%B0%EB%8F%99/)
- [https://www.npmjs.com/package/notion-to-md](https://www.npmjs.com/package/notion-to-md)
- [https://uknowblog.tistory.com/37](https://uknowblog.tistory.com/37)
- [https://devshjeon.github.io/7](https://devshjeon.github.io/7)
- [https://docs.github.com/ko/actions/using-workflows/events-that-trigger-workflows#about-events-that-trigger-workflows](https://docs.github.com/ko/actions/using-workflows/events-that-trigger-workflows#about-events-that-trigger-workflows)
