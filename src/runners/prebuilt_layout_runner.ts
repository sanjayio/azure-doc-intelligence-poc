import { prebuiltLayoutExtractor } from "../extractors/prebuilt_layout_extractor";

async function prebuiltLayoutRunner(filePath: string) {
  const { textContent, tableContent } = await prebuiltLayoutExtractor(filePath);

  console.log(textContent);
}

prebuiltLayoutRunner("./docs/statement.pdf");