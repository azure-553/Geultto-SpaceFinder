import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";

dotenv.config();

export const notion = new Client({ auth: process.env.NOTION_API_KEY });
export const databaseId = process.env.NOTION_DATABASE_ID;

if (!databaseId) {
  throw new Error("[ERROR] NOTION_DATABASE_ID 환경 변수가 존재하지 않습니다.");
}
