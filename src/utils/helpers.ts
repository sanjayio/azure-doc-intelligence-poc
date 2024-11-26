import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import dotenv from "dotenv";

dotenv.config();

function getAzureCredentials() {
  const endpoint = process.env.AZURE_ENDPOINT!;
  const apiPrimaryKey = process.env.AZURE_API_PRIMARY_KEY!;
  const apiSecondaryKey = process.env.AZURE_API_SECONDARY_KEY!;

  if (!endpoint) {
    throw new Error("AZURE_ENDPOINT is not set");
  }

  if (!apiPrimaryKey && !apiSecondaryKey) {
    throw new Error("AZURE_API_PRIMARY_KEY or AZURE_API_SECONDARY_KEY is not set");
  }

  const apiKey = apiPrimaryKey || apiSecondaryKey;

  return {
    endpoint,
    credential: new AzureKeyCredential(apiKey),
  }
}

export function getAzureClient() {
  const { endpoint, credential } = getAzureCredentials();
  return new DocumentAnalysisClient(endpoint, credential);
}
