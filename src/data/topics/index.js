import { cTopics } from "./c";
import { cppTopics } from "./cpp";
import { javaTopics } from "./java";
import { pythonTopics } from "./python";
import { javascriptTopics } from "./javascript";
import { htmlTopics } from "./html";
import { sqlTopics } from "./sql";
import { dsaTopics } from "./dsa";

const topicsMap = {
  c: cTopics,
  cpp: cppTopics,
  java: javaTopics,
  python: pythonTopics,
  javascript: javascriptTopics,
  html: htmlTopics,
  sql: sqlTopics,
  dsa: dsaTopics,
};

export function getTopicData(langId) {
  return topicsMap[langId] || null;
}

export default topicsMap;