const axios = require('axios');
const SambanovaAPIClient = require('./apiClient');

class Image {
    static async create(client, messages, model, options = {}) {
        const payload = {
            messages,
            model,
            max_tokens: options.max_tokens || 300,
            temperature: options.temperature || 0.7,
            stream: options.stream || true
        };

        try {
            const response = await axios.post(
                client.url('/v1/chat/completions'),
                payload,
                { headers: client.headers() }
            );
            return response.data;
        } catch (error) {
            console.error('Error creating image:', error);
            throw error;
        }
    }
}

module.exports = Image;