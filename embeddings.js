const axios = require('axios');

class Embeddings {
    static async create(client, messages, model) {
        const payload = {
            input: messages,
            model
        };

        try {
            const response = await axios.post(
                client.url('/v1/embeddings'),
                payload,
                { headers: client.headers() }
            );
            return response.data;
        } catch (error) {
            console.error('Error creating embeddings:', error);
            throw error;
        }
    }
}

module.exports = Embeddings;