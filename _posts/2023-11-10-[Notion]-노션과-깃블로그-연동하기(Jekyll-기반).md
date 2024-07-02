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


> 💡 workflow 파일과 Notion page 내용을 읽어오는 스크립트 2개 추가


1️⃣ _scripts/notion-import.js


	
{% raw %}
```javascript
	const { Client } = require("@notionhq/client");
	const { NotionToMarkdown } = require("notion-to-md");
	const moment = require("moment");
	const path = require("path");
	const fs = require("fs");
	const axios = require("axios");
	// or
	// import {NotionToMarkdown} from "notion-to-md";
	
	const notion = new Client({
	  auth: process.env.NOTION_TOKEN,
	});
	
	function escapeCodeBlock(body) {
	  const regex = /
```
{% endraw %}
([\s\S]*?)
{% raw %}
```/g;
	  return body.replace(regex, function (match, htmlBlock) {
	    return "\n{% raw %}\n
```
{% endraw %}
" + htmlBlock.trim() + "\n
{% raw %}
```\n{% endraw %}\n";
	  });
	}
	
	function replaceTitleOutsideRawBlocks(body) {
	  const rawBlocks = [];
	  const placeholder = "{% raw %}[\s\S]*?{% endraw %}";
	  body = body.replace(/{% raw %}
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
{% endraw %}/g, (match) => {
	    rawBlocks.push(match);
	    return placeholder;
	  });
	
	  const regex = /\n#[^\n]+\n/g;
	  body = body.replace(regex, function (match) {
	    return "\n" + match.replace("\n#", "\n##");
	  });
	
	  rawBlocks.forEach(block => {
	    body = body.replace(placeholder, block);
	  });
	
	  return body;
	}
	
	// passing notion client to the option
	const n2m = new NotionToMarkdown({ notionClient: notion });
	
	(async () => {
	  // ensure directory exists
	  const root = "_posts";
	  fs.mkdirSync(root, { recursive: true });
	
	  const databaseId = process.env.DATABASE_ID;
	  let response = await notion.databases.query({
	    database_id: databaseId,
	    filter: {
	      property: "공개",
	      checkbox: {
	        equals: true,
	      },
	    },
	  });
	
	  const pages = response.results;
	  while (response.has_more) {
	    const nextCursor = response.next_cursor;
	    response = await notion.databases.query({
	      database_id: databaseId,
	      start_cursor: nextCursor,
	      filter: {
	        property: "공개",
	        checkbox: {
	          equals: true,
	        },
	      },
	    });
	    pages.push(...response.results);
	  }
	
	  for (const r of pages) {
	    const id = r.id;
	    // date
	    let date = moment(r.created_time).format("YYYY-MM-DD");
	    let pdate = r.properties?.["날짜"]?.["date"]?.["start"];
	    if (pdate) {
	      date = moment(pdate).format("YYYY-MM-DD");
	    }
	    // title
	    let title = id;
	    let ptitle = r.properties?.["게시물"]?.["title"];
	    if (ptitle?.length > 0) {
	      title = ptitle[0]?.["plain_text"];
	    }
	    // tags
	    let tags = [];
	    let ptags = r.properties?.["태그"]?.["multi_select"];
	    for (const t of ptags) {
	      const n = t?.["name"];
	      if (n) {
	        tags.push(n);
	      }
	    }
	    // categories
	    let cats = [];
	    let pcats = r.properties?.["카테고리"]?.["multi_select"];
	    for (const t of pcats) {
	      const n = t?.["name"];
	      if (n) {
	        cats.push(n);
	      }
	    }
	
	    // frontmatter
	    let fmtags = "";
	    let fmcats = "";
	    if (tags.length > 0) {
	      fmtags += "\ntags: [";
	      for (const t of tags) {
	        fmtags += t + ", ";
	      }
	      fmtags += "]";
	    }
	    if (cats.length > 0) {
	      fmcats += "\ncategories: [";
	      for (const t of cats) {
	        fmcats += t + ", ";
	      }
	      fmcats += "]";
	    }
	    const fm = `---
	layout: post
	date: ${date}
	title: "${title}"${fmtags}${fmcats}
	---
	
	`;
	    const mdblocks = await n2m.pageToMarkdown(id);
	    let md = n2m.toMarkdownString(mdblocks)["parent"];
	    if (md === "") {
	      continue;
	    }
	    md = escapeCodeBlock(md);
	    md = replaceTitleOutsideRawBlocks(md);
	
	    const ftitle = `${date}-${title.replaceAll(" ", "-")}.md`;
	
	    let index = 0;
	    let edited_md = md.replace(
	      /!\[(.*?)\]\((.*?)\)/g,
	      function (match, p1, p2, p3) {
	        const dirname = path.join("assets/img", ftitle);
	        if (!fs.existsSync(dirname)) {
	          fs.mkdirSync(dirname, { recursive: true });
	        }
	        const filename = path.join(dirname, `${index}.png`);
	
	        axios({
	          method: "get",
	          url: p2,
	          responseType: "stream",
	        })
	          .then(function (response) {
	            let file = fs.createWriteStream(`${filename}`);
	            response.data.pipe(file);
	          })
	          .catch(function (error) {
	            console.log(error);
	          });
	
	        let res;
	        if (p1 === "") res = "";
	        else res = `_${p1}_`;
	
	        return `![4](/assets/img/2023-11-10-[Notion]-노션과-깃블로그-연동하기(Jekyll-기반).md/4.png)_${index++}_${res}`;
	      }
	    );
	
	    //writing to file
	    fs.writeFile(path.join(root, ftitle), fm + edited_md, (err) => {
	      if (err) {
	        console.log(err);
	      }
	    });
	  }
	})();
```
{% endraw %}



위 Javascript 파일에 대한 dependencies를 설치해야 하는데 이때 `package.json` 파일의 내용에 아래 부분을 추가해주면 된다.



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



2️⃣ .github/workflows/pages-deploy.yml


	
%%RAW_BLOCK%%




## 📎 갱신 버튼 설정

