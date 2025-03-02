import { notion, databaseId } from "../config/config";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// Notion DB Property 데이터 가져오기
export async function fetchNotionPages(): Promise<PageObjectResponse[]> {
  const response = await notion.databases.query({ database_id: databaseId! });
  return response.results.filter(
    (result): result is PageObjectResponse => "properties" in result
  );
}
