

class SambanovaAPIClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.sambanova.ai';
    }

    headers() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        };
    }

    url(path) {
        return `${this.baseUrl}${path}`;
    }
}

module.exports = SambanovaAPIClient;