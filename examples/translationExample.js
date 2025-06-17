const SambanovaAPIClient = require('../apiClient');
const Translation = require('../translation');
const { apiKey } = require('./config');

async function runTranslationExample() {
    const client = new SambanovaAPIClient(apiKey);
    const audioFilePath = 'path/to/audio/file.wav';
    const model = 'translation-model';

    try {
        const result = await Translation.create(client, audioFilePath, model);
        console.log('Translation result:', result);
    } catch (error) {
        console.error('Error running translation example:', error);
    }
}

runTranslationExample();