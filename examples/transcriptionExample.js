const SambanovaAPIClient = require('../apiClient');
const Transcription = require('../transcription');

async function runTranscriptionExample() {
    const client = new SambanovaAPIClient('your_api_key');
    const messages = ['Transcribe this audio file.'];
    const model = 'transcription-model';

    try {
        const result = await Transcription.create(client, messages, model);
        console.log('Transcription result:', result);
    } catch (error) {
        console.error('Error running transcription example:', error);
    }
}

runTranscriptionExample();