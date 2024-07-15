const { Client } = require("@notionhq/client"); // Notion API 클라이언트.
const { NotionToMarkdown } = require("notion-to-md"); // Notion 페이지를 Markdown 형식으로 변환하기 위한 라이브러리
const fs = require("fs"); // 파일 시스템 관련 모듈
const moment = require("moment"); // 날짜와 시간을 다루기 위한 모듈
const path = require("path"); // 파일 경로 관련 모듈
const axios = require("axios"); // HTTP 요청을 보내기 위한 모듈
// or
// import {NotionToMarkdown} from "notion-to-md";

const notion = new Client({ // Github 환경 변수에서 Notion API 토큰을 가져와 클라이언트를 초기화합니다. Node.js 환경변수 호출은 process.env
  auth: process.env.NOTION_TOKEN,
});

function escapeCodeBlock(body) { // Markdown 코드 블록을 Jekyll에서 사용 가능한 {% raw %} 태그로 감싸는 함수입니다.
  const regex = /```([\s\S]*?)```/g;
  return body.replace(regex, function (match, htmlBlock) {
    return "\n{% raw %}\n```" + htmlBlock.trim() + "\n```\n{% endraw %}\n";
  });
}

function replaceTitleOutsideRawBlocks(body) { // 제목 레벨을 변경하는 함수입니다. 블록 내부의 내용은 건드리지 않습니다.
  const rawBlocks = [];
  const placeholder = "%%RAW_BLOCK%%";
  body = body.replace(/{% raw %}[\s\S]*?{% endraw %}/g, (match) => {
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
  fs.mkdirSync(root, { recursive: true }); // recursive 를 true 로 두면 내부 디렉토리 자동 생성해줌.

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
  while (response.has_more) { // 다음 페이지가 남아 있해

    let edited_title = title.replaceAll(" ", "-"); // 공백변환
    const ftitle = `${date}-${edited_title}.md`;     

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

        return `![${index++}](/${filename})${res}`;
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
