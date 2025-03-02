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
  let eventTextContent = "# 작업공간찾았또 공간 정보\n\n";

  allEventData.forEach((eventData, index) => {
    eventTextContent += `## Row ${index + 1}\n`;

    const desiredOrder = [
      "Space Name",
      "Created Date",
      "Last Modified Date",
      "Location URL",
      "Review URL",
      "Source URL",
    ];

    const urlMappings: { [key: string]: string } = {
      "Location URL": "📍 위치",
      "Review URL": "📝 리뷰",
      "Source URL": "🔗 출처",
    };

    desiredOrder.forEach((key) => {
      if (eventData[key]) {
        let value = eventData[key];

        if (key.includes("URL")) {
          value = `[${urlMappings[key] || key}](${value})`;
        }

        eventTextContent += `- ${key}: ${value}\n`;
      }
    });

    eventTextContent += "\n---\n\n";
  });

  saveTextFiles(folderPath, "README.md", eventTextContent);
}
