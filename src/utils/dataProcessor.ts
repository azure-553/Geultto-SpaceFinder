import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export function extractPageData(page: PageObjectResponse) {
  let spaceLocation = "notion_data";
  let spaceData: { [key: string]: string } = {};

  Object.entries(page.properties).forEach(([key, value]) => {
    let output = "";

    switch (value.type) {
      case "title":
        output = value.title.map((item) => item.plain_text).join(" ");
        break;
      case "rich_text":
        output = value.rich_text.map((item) => item.plain_text).join(" ");
        break;
      case "date":
        output = value.date?.start || "";
        break;
      case "number":
        output = (value.number ?? "").toString();
        break;
      case "select":
        output = value.select?.name || "";
        break;
      case "multi_select":
        output = value.multi_select.map((item) => item.name).join(", ");
        break;
      case "checkbox":
        output = value.checkbox ? "True" : "False";
        break;
      case "url":
        output = value.url ?? "";
        break;
      case "email":
        output = value.email ?? "";
        break;
      case "phone_number":
        output = value.phone_number ?? "";
        break;
      case "created_time":
        output = page.created_time;
        break;
      case "last_edited_time":
        output = page.last_edited_time;
        break;
      default:
        output = `[${value.type} 데이터]`;
    }

    if (key === "Location" && output) {
      spaceLocation = output.replace(/[^a-zA-Z0-9가-힣 ]/g, "");
    }

    spaceData[key] = output;
  });

  return { spaceLocation, spaceData };
}
