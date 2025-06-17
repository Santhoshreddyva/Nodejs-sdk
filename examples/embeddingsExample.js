const SambanovaAPIClient = require('../apiClient');
const Embeddings = require('../embeddings');
const { apiKey } = require('../config');

async function runEmbeddingsExample() {
    const client = new SambanovaAPIClient(apiKey);
    const messages = ['What is the capital of France?'];
    const model = 'E5-Mistral-7B-Instruct';

    try {
        const result = await Embeddings.create(client, messages, model);
        console.log('Embeddings result:', JSON.stringify(result));
    } catch (error) {
        console.error('Error running embeddings example:', error);
    }
}

runEmbeddingsExample();