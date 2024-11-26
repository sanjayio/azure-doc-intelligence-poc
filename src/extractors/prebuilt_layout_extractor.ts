import { getAzureClient } from "../utils/helpers";
import * as fs from "fs";

type PrebuiltLayoutExtractorType = {
  textContent: string;
  tableContent: string;
}

export async function prebuiltLayoutExtractor(filePath: string): Promise<PrebuiltLayoutExtractorType> {

  const client = getAzureClient();

  const stream = fs.createReadStream(filePath);

  const poller = await client.beginAnalyzeDocument("prebuilt-layout", stream, {
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    },
  });

  const { pages, tables } = await poller.pollUntilDone();

  if (!pages || pages.length === 0) {
    throw new Error("No pages found");
  }

  let textContent = ""

  for (const page of pages) {
    textContent += `Page Number: ${page.pageNumber}\n`;
    
    if (page.lines) {
      for (const line of page.lines) {
        textContent += `${line.content}\n`;
      }
    }

  }

  return {
    textContent: textContent,
    tableContent: "",
  };
}
