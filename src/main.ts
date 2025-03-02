import { fetchNotionPages } from "./notion/notionService";
import { extractPageData } from "./utils/dataProcessor";
import { saveAllTextFile } from "./service/fileService";
import * as fs from "fs";
import * as path from "path";

async function fetchNotionData(): Promise<void> {
  try {
    const pages = await fetchNotionPages();
    let programData: {
      [key: string]: { allSpaceData: object[]; allWinnerData: object[] };
    } = {};

    pages.forEach((page) => {
      const { spaceLocation, spaceData, winnerData } = extractPageData(page);

      const folderPath = path.join(__dirname, `../${spaceLocation}`);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`폴더 생성 완료: ${folderPath}`);
      }

      if (!programData[spaceLocation]) {
        programData[spaceLocation] = { allSpaceData: [], allWinnerData: [] };
      }
      programData[spaceLocation].allSpaceData.push(spaceData);
      programData[spaceLocation].allWinnerData.push(winnerData);
    });

    Object.entries(programData).forEach(([spaceLocation, { allSpaceData }]) => {
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
