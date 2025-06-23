import SambanovaAPIClient from '../apiClient.js';
import { getAvailableModels } from '../models.js'; 
import apiKey from '../config.js';

async function main() { 
  if (!apiKey) {
    console.error("Missing SN_API_KEY environment variable");
    process.exit(1);
  }

  const client = new SambanovaAPIClient(apiKey);

  try {
    const models = await getAvailableModels(client); 
    if (models?.data.length === 0) {
      console.log("No models found.");
      return;
    }

    console.log(`${'Model Name'.padEnd(32)} ${'Context'.padEnd(8)} ${'Max Tokens'.padEnd(12)} ${'Prompt $'.padEnd(12)} ${'Completion $'.padEnd(12)}`);
    console.log("-".repeat(80));

    for (const model of models.data) {
      const name = model.id || "N/A";
      const context = model.context_length ?? "N/A";
      const maxTokens = model.max_completion_tokens ?? "N/A";
      const pricing = model.pricing || {};
      const promptPrice = pricing.prompt ?? "N/A";
      const completionPrice = pricing.completion ?? "N/A";

      console.log(`${name.padEnd(32)} ${String(context).padEnd(8)} ${String(maxTokens).padEnd(12)} ${String(promptPrice).padEnd(12)} ${String(completionPrice).padEnd(12)}`);
    }
  } catch (err) {
    console.error("Error fetching models:", err.message);
  }
}

main();
