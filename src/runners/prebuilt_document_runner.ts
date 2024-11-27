import { prebuiltDocumentExtractor } from "../extractors/prebuilt_document_extractor";

async function prebuiltDocumentRunner(filePath: string) {
  const documentContent = await prebuiltDocumentExtractor(filePath);

  console.log(documentContent);
}

prebuiltDocumentRunner("./docs/sample.pdf")
