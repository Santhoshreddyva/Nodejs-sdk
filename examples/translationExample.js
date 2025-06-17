const SambanovaAPIClient = require('../apiClient');
const Translation = require('../translation');
const { apiKey } = require('../config');

async function runTranslationExample() {
    const client = new SambanovaAPIClient(apiKey);
    const audioFilePath = 'examples/testdata/translation/sample_audio3.mp3';
    const model = 'Whisper-Large-v3';

    try {
        const result = await Translation.create(client, audioFilePath, model);
        console.log('Translation result:', result);
    } catch (error) {
        console.error('Error running translation example:', error);
    }
}

runTranslationExample();