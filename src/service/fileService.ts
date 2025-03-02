import * as fs from "fs";
import * as path from "path";

export function saveTextFiles(
  folderPath: string,
  fileName: string,
  content: string
) {
  const filePath = path.join(folderPath, fileName);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`파일 생성 완료: ${filePath}`);
}

export function saveAllTextFile(folderPath: string, allEventData: object[]) {
  let spaceTextContent = "";

  allEventData.forEach((spaceData) => {
    const spaceName = spaceData["Space Name"] || "알 수 없는 공간";

    spaceTextContent += `## ${spaceName}\n`;

    const desiredOrder: { [key: string]: string } = {
      "Created Date": "생성 날짜",
      "Last Modified Date": "최근 수정 날짜",
    };

    Object.entries(desiredOrder).forEach(([key, label]) => {
      if (spaceData[key]) {
        let value = spaceData[key];

        value = value.slice(2, 10);

        spaceTextContent += `- ${label}: ${value}\n`;
      }
    });

    if (spaceData["Location URL"]) {
      spaceTextContent += `- [📍 위치](${spaceData["Location URL"]})\n`;
    }
    if (spaceData["Source URL"]) {
      spaceTextContent += `- [🔗 출처](${spaceData["Source URL"]})\n`;
    }

    spaceTextContent += "\n---\n\n";
  });

  saveTextFiles(folderPath, "README.md", spaceTextContent);
}
