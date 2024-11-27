import { getAzureClient } from "../utils/helpers";
import * as fs from "fs";

export async function prebuiltDocumentExtractor(filePath: string): Promise<Record<string, string>> {

  const client = getAzureClient();

  const stream = fs.createReadStream(filePath);

  const poller = await client.beginAnalyzeDocument("prebuilt-document", stream, {
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    },
  });

  const { keyValuePairs } = await poller.pollUntilDone();

  if (!keyValuePairs || keyValuePairs.length === 0) {
    throw new Error("No key value pairs found");
  }

  let documentContent: Record<string, string> = {};
  for (const { key, value } of keyValuePairs) {
    documentContent[key.content] = value?.content ?? "";
  }

  return documentContent;
}
