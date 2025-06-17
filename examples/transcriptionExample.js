const SambanovaAPIClient = require('../apiClient');
const Transcription = require('../transcription');
const { apiKey } = require('../config');

async function runTranscriptionExample() {
    const client = new SambanovaAPIClient(apiKey);
    const audioFilePath = 'examples/testdata/transcription/sample_audio2.mp3';
    const model = 'Whisper-Large-v3';

    try {
        const result = await Transcription.create(client, audioFilePath, model);
        console.log('Transcription result:', result);
    } catch (error) {
        console.error('Error running transcription example:', error);
    }
}

runTranscriptionExample();