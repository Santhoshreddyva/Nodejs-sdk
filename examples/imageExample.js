const SambanovaAPIClient = require('../apiClient');
const Image = require('../image');
const { apiKey } = require('./config');

async function runImageExample() {
    const client = new SambanovaAPIClient(apiKey);
    const messages = ['Generate an image of a sunset.'];
    const model = 'image-model';

    try {
        const result = await Image.create(client, messages, model);
        console.log('Image result:', result);
    } catch (error) {
        console.error('Error running image example:', error);
    }
}

runImageExample();