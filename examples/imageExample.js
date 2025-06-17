const SambanovaAPIClient = require('../apiClient');
const Image = require('../image');
const { apiKey } = require('../config');

async function runImageExample() {
    const client = new SambanovaAPIClient(apiKey);
    const messages = [{ role: 'user', content: 'Generate an image of a sunset.' }];
    const model = 'Llama-4-Maverick-17B-128E-Instruct';

    try {
        const result = await Image.create(client, messages, model);
        console.log('Image result:', result);
    } catch (error) {
        console.error('Error running image example:', error);
    }
}

runImageExample();