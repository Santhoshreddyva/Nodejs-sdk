const SambanovaAPIClient = require('./apiClient');
const fs = require('fs');

class Translation {
    static async create(client, audioFilePath, model, language = 'english', responseFormat = 'json', stream = true) {
        const headers = client.headers();
        delete headers['Content-Type'];

        const formData = new FormData();
        formData.append('file', fs.createReadStream(audioFilePath));
        formData.append('model', model);
        formData.append('language', language);
        formData.append('response_format', responseFormat);
        formData.append('stream', stream.toString());

        try {
            const response = await axios.post(
                client.url('/v1/audio/translations'),
                formData,
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error('Error creating translation:', error);
            throw error;
        }
    }
}

module.exports = Translation;