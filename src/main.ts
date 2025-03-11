import { fetchNotionPages } from "./notion/notionService";
import { extractPageData } from "./utils/dataProcessor";
import { saveAllTextFile } from "./service/fileService";
import * as fs from "fs";
import * as path from "path";

async function fetchNotionData(): Promise<void> {
  try {
    const pages = await fetchNotionPages();
    let data: {
      [key: string]: { allSpaceData: object[] };
    } = {};

    pages.forEach((page) => {
      const { spaceLocation, spaceData } = extractPageData(page);

      const folderPath = path.join(__dirname, `../${spaceLocation}`);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`폴더 생성 완료: ${folderPath}`);
      }

      if (!data[spaceLocation]) {
        data[spaceLocation] = { allSpaceData: [] };
      }
      data[spaceLocation].allSpaceData.push(spaceData);
    });

    Object.entries(data).forEach(([spaceLocation, { allSpaceData }]) => {
      const folderPath = path.join(__dirname, `../${spaceLocation}`);
      saveAllTextFile(folderPath, allSpaceData);
    });
  } catch (error: any) {
    console.error(
      "[ERROR] Notion Database의 Data를 불러오는데 실패했습니다.",
      error.message
    );
  }
}

fetchNotionData();
