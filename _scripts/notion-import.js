const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const fs = require("fs");
const moment = require("moment");
const path = require("path");
const axios = require("axios");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Escape code blocks with Jekyll raw tags
function escapeCodeBlock(body) {
  const regex = /```([\s\S]*?)```/g;
  return body.replace(regex, (match, htmlBlock) => {
    return `\n{% raw %}\n\`\`\`${htmlBlock.trim()}\n\`\`\`\n{% endraw %}\n`;
  });
}

// Replace H1 titles outside raw blocks with H2
function replaceTitleOutsideRawBlocks(body) {
  const rawBlocks = [];
  const placeholder = "%%RAW_BLOCK%%";
  body = body.replace(/{% raw %}[\s\S]*?{% endraw %}/g, (match) => {
    rawBlocks.push(match);
    return placeholder;
  });

  body = body.replace(/\n#[^\n]+\n/g, (match) => {
    return `\n${match.replace("\n#", "\n##")}`;
  });

  rawBlocks.forEach(block => {
    body = body.replace(placeholder, block);
  });

  return body;
}

// Create directory if it doesn't exist
function ensureDirectoryExists(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

// Fetch Notion pages with filter
async function fetchNotionPages(databaseId) {
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
    response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: response.next_cursor,
      filter: {
        property: "공개",
        checkbox: {
          equals: true,
        },
      },
    });
    pages.push(...response.results);
  }
  return pages;
}

// Extract page properties
function extractPageProperties(page) {
  const id = page.id;
  let date = moment(page.created_time).format("YYYY-MM-DD");
  const pdate = page.properties?.["날짜"]?.["date"]?.["start"];
  if (pdate) {
    date = moment(pdate).format("YYYY-MM-DD");
  }

  let title = id;
  const ptitle = page.properties?.["게시물"]?.["title"];
  if (ptitle?.length > 0) {
    title = ptitle[0]?.["plain_text"];
  }

  const tags = page.properties?.["태그"]?.["multi_select"]?.map(t => t?.["name"]).filter(Boolean) || [];
  const categories = page.properties?.["카테고리"]?.["multi_select"]?.map(t => t?.["name"]).filter(Boolean) || [];

  return { id, date, title, tags, categories };
}

// Generate frontmatter
function generateFrontmatter(date, title, tags, categories) {
  const fmtags = tags.length > 0 ? `\ntags: [${tags.join(", ")}]` : "";
  const fmcats = categories.length > 0 ? `\ncategories: [${categories.join(", ")}]` : "";

  return `---
layout: post
date: ${date}
title: "${title}"${fmtags}${fmcats}
---
`;
}

// Download images and replace image links in Markdown
async function downloadAndReplaceImages(md, ftitle) {
  let index = 0;
  return md.replace(/!\[(.*?)\]\((.*?)\)/g, (match, p1, p2) => {
    const dirname = path.join("assets/img", ftitle);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    const filename = path.join(dirname, `${index}.png`);

    axios.get(p2, { responseType: "stream" })
      .then(response => {
        const file = fs.createWriteStream(filename);
        response.data.pipe(file);
      })
      .catch(console.error);

    const altText = p1 ? `_${p1}_` : "";
    return `![${index++}](/${filename})${altText}`;
  });
}

// Write content to file
function writeToFile(directory, filename, content) {
  fs.writeFile(path.join(directory, filename), content, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

(async () => {
  // Ensure root directory exists
  const root = "_posts";
  ensureDirectoryExists(root);

  // Fetch pages from Notion
  const databaseId = process.env.DATABASE_ID;
  const pages = await fetchNotionPages(databaseId);

  // Process each page
  for (const page of pages) {
    const { id, date, title, tags, categories } = extractPageProperties(page);
    const frontmatter = generateFrontmatter(date, title, tags, categories);

    // Convert Notion page to Markdown
    const n2m = new NotionToMarkdown({ notionClient: notion });
    const mdblocks = await n2m.pageToMarkdown(id);
    let md = n2m.toMarkdownString(mdblocks)["parent"];
    if (!md) continue;

    // Process Markdown content
    md = escapeCodeBlock(md);
    md = replaceTitleOutsideRawBlocks(md);
    const ftitle = `${date}-${title.replaceAll(" ", "-")}.md`;
    md = await downloadAndReplaceImages(md, ftitle);

    // Write Markdown file
    writeToFile(root, ftitle, frontmatter + md);
  }
})();
