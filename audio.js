
class Audio {
    static async create(client, messages, model, options = {}) {
        const payload = {
            messages,
            model,
            max_tokens: options.max_tokens || 1024,
            temperature: options.temperature || 0.01,
            stream: options.stream || true
        };

        try {
            const response = await axios.post(
                client.url('/v1/audio/reasoning'),
                payload,
                { headers: client.headers() }
            );
            return response.data;
        } catch (error) {
            console.error('Error creating audio:', error);
            throw error;
        }
    }
}

module.exports = Audio;