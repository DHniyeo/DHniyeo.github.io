const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const moment = require("moment");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

async function downloadImage(p2, ftitle, index) {
  const dirname = path.join("assets/img", ftitle);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }

  const filename = path.join(dirname, `${index}.png`);

  try {
    const response = await axios({
      method: "get",
      url: p2,
      responseType: "stream",
    });

    const file = fs.createWriteStream(filename);
    response.data.pipe(file);
  } catch (error) {
    console.error(`Error downloading image: ${error}`);
  }

  const res = index === 0 ? "" : `_${index}_`;
  return `![${index}](${filename})${res}`;
}

(async () => {
  const root = "_posts";
  fs.mkdirSync(root, { recursive: true });

  const databaseId = process.env.DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "공개",
      checkbox: { equals: true },
    },
  });

  for (const r of response.results) {
    const id = r.id;
    let date = moment(r.created_time).format("YYYY-MM-DD");
    let pdate = r.properties?.["날짜"]?.["date"]?.["start"];

    if (pdate) {
      date = moment(pdate).format("YYYY-MM-DD");
    }

    let title = id;
    let ptitle = r.properties?.["게시물"]?.["title"];

    if (ptitle?.length > 0) {
      title = ptitle[0]?.["plain_text"];
    }

    let tags = [];
    let ptags = r.properties?.["태그"]?.["multi_select"];

    for (const t of ptags) {
      const n = t?.["name"];

      if (n) {
        tags.push(n);
      }
    }

    let cats = [];
    let pcats = r.properties?.["카테고리"]?.["multi_select"];

    for (const t of pcats) {
      const n = t?.["name"];

      if (n) {
        cats.push(n);
      }
    }

    let fmtags = tags.length > 0 ? `\ntags: [${tags.join(", ")}]` : "";
    let fmcats = cats.length > 0 ? `\ncategories: [${cats.join(", ")}]` : "";

    const frontmatter = `---
layout: post
date: ${date}
title: "${title}"${fmtags}${fmcats}
---`;

    const mdblocks = await n2m.pageToMarkdown(id);
    const md = n2m.toMarkdownString(mdblocks)["parent"];
    const ftitle = `${date}-${title.replace(/ /g, "-")}.md`;

    let index = 0;
    const edited_md = md.replace(/!\[(.*?)\]\((.*?)\)/g, (match, p1, p2, p3) => {
      return downloadImage(p2, ftitle, index++);
    });

    const filePath = path.join(root, ftitle);
    
    fs.writeFile(filePath, `${frontmatter}\n\n${edited_md}`, (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}: ${err}`);
      } else {
        console.log(`File ${filePath} written successfully.`);
      }
    });
  }
})();
