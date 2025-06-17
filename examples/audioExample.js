const SambanovaAPIClient = require('../apiClient');
const Audio = require('../audio');
const { apiKey } = require('../config');

async function runAudioExample() {
    const client = new SambanovaAPIClient(apiKey);
    const messages = [{ role: 'user', content: 'Hello, world!' }];
    const model = 'Qwen2-Audio-7B-Instruct';

    try {
        const result = await Audio.create(client, messages, model);
        console.log('Audio result:', result);
    } catch (error) {
        console.error('Error running audio example:', error);
    }
}

runAudioExample();