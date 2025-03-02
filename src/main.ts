import { fetchNotionPages } from "./notion/notionService";

async function fetchNotionData(): Promise<void> {
  try {
    const pages = await fetchNotionPages();
    console.log(pages);
  } catch (error: any) {
    console.error(
      "[ERROR] Notion Database의 Data를 불러오는데 실패했습니다.",
      error.message
    );
  }
}

fetchNotionData();
