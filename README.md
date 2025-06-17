# nodejs-sdk

A Node.js SDK for interacting with Sambanova's REST APIs, including chat, image, audio, transcription, translation, and embeddings.

## Installation

```bash
npm install .
```

## About Sambanova

Sambanova provides advanced AI infrastructure and models for generative AI, vision, audio, and language tasks. The Sambanova SDK enables seamless integration with Sambanova's REST APIs, allowing you to build, deploy, and scale AI-powered applications efficiently.

With Sambanova, you can:

- Access high-performance AI inference and training
- Use state-of-the-art models for chat, vision, audio, and more
- Scale your AI workloads with robust cloud and on-premise solutions

## Documentation

The REST API documentation can be found on the [Sambanova documentation portal](https://docs.sambanova.ai). The full API of this library can be found in `api.md`.

## Usage Examples

### Chat Completion

```js
const { SambanovaAPIClient } = require('sambanova-nodejs-sdk');
const { ChatCompletion } = require('sambanova-nodejs-sdk/chat');

const client = new SambanovaAPIClient('your_api_key');
const messages = [{ role: 'user', content: 'Hello, how are you?' }];
const stream = ChatCompletion.create({
  client,
  messages,
  model: 'Llama-4-Maverick-17B-128E-Instruct',
  stream: true
});
let response = '';
for await (const chunk of stream) {
  const choices = chunk.choices || [];
  if (!choices.length) continue;
  const delta = choices[0].delta || {};
  const content = delta.content || '';
  response += content;
}
console.log('Assistant:', response);
```

### Image Completion

```js
const { SambanovaAPIClient } = require('sambanova-nodejs-sdk');
const { Image } = require('sambanova-nodejs-sdk/image');
const fs = require('fs');

const client = new SambanovaAPIClient('your_api_key');
const imageBuffer = fs.readFileSync('path/to/image.jpg');
const base64Image = imageBuffer.toString('base64');
const messages = [
  {
    role: 'user',
    content: [
      { type: 'text', text: 'Describe this image.' },
      { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
    ]
  }
];
const response = await Image.create({
  client,
  messages,
  model: 'Llama-4-Maverick-17B-128E-Instruct',
  max_tokens: 300,
  temperature: 0.7,
  stream: false
});
console.log(response);
```

### Embeddings

```js
const { SambanovaAPIClient } = require('sambanova-nodejs-sdk');
const { Embeddings } = require('sambanova-nodejs-sdk/embeddings');

const client = new SambanovaAPIClient('your_api_key');
const messages = [
  'Our solar system orbits the Milky Way galaxy at about 515,000 mph',
  "Jupiter's Great Red Spot is a storm that has been raging for at least 350 years."
];
const response = await Embeddings.create({
  client,
  messages,
  model: 'E5-Mistral-7B-Instruct'
});
console.log(response);
```

### Audio Reasoning

```js
const { SambanovaAPIClient } = require('sambanova-nodejs-sdk');
const { Audio } = require('sambanova-nodejs-sdk/audio');
const fs = require('fs');

const client = new SambanovaAPIClient('your_api_key');
const audioBuffer = fs.readFileSync('path/to/audio.mp3');
const base64Audio = audioBuffer.toString('base64');
const messages = [
  { role: 'assistant', content: 'You are a helpful assistant.' },
  {
    role: 'user',
    content: [
      { type: 'audio_content', audio_content: { content: `data:audio/mp3;base64,${base64Audio}` } }
    ]
  },
  { role: 'user', content: 'What is in this audio?' }
];
const response = await Audio.create({
  client,
  messages,
  model: 'Qwen2-Audio-7B-Instruct',
  max_tokens: 200
});
console.log(response);
```

### Transcription

```js
const { SambanovaAPIClient } = require('sambanova-nodejs-sdk');
const { Transcription } = require('sambanova-nodejs-sdk/transcription');

const client = new SambanovaAPIClient('your_api_key');
const audioFilePath = 'path/to/audio.mp3';
const response = await Transcription.transcribeAudioFile({
  client,
  model: 'Whisper-Large-v3',
  audioFilePath,
  language: 'english',
  response_format: 'text'
});
console.log(response);
```

## API Key

Get an API Key from your Sambanova account and add it to your environment variables:

```bash
export SN_API_KEY="your-api-key-here"
```

Or pass it directly to the client constructor.

To run your script:

```bash
export SN_API_KEY=your-api-key-here
node your-script.js
```

## Advanced Usage

### Streaming Responses

The SDK supports streaming responses for chat and other endpoints. When streaming, usage and timing information will only be included in the final chunk.

```js
const stream = ChatCompletion.create({
  client,
  messages,
  model: 'Llama-4-Maverick-17B-128E-Instruct',
  stream: true
});
for await (const chunk of stream) {
  process.stdout.write(chunk.choices?.[0]?.delta?.content || '');
}
```

### Error Handling

When the SDK is unable to connect to the API (e.g., network issues or timeouts), a `SambanovaAPIConnectionError` is thrown.

When the API returns a non-success status code (4xx or 5xx), a `SambanovaAPIStatusError` is thrown, containing `statusCode` and `response` properties.

All errors inherit from `SambanovaAPIError`.

```js
const { SambanovaAPIClient, SambanovaAPIError } = require('sambanova-nodejs-sdk');

const client = new SambanovaAPIClient('your_api_key');
try {
  // ...your API call...
} catch (e) {
  if (e instanceof SambanovaAPIError) {
    console.error('An error occurred:', e);
  } else {
    throw e;
  }
}
```

Common error codes:

| Status Code | Error Type                  |
|-------------|----------------------------|
| 400         | BadRequestError             |
| 401         | AuthenticationError         |
| 403         | PermissionDeniedError       |
| 404         | NotFoundError               |
| 422         | UnprocessableEntityError    |
| 429         | RateLimitError              |
| >=500       | InternalServerError         |
| N/A         | SambanovaAPIConnectionError |

### Retries and Timeouts

The SDK automatically retries certain errors (connection errors, timeouts, 429, >=500) up to 2 times by default, with exponential backoff. You can configure retries and timeouts globally or per request.

```js
const client = new SambanovaAPIClient('your_api_key', { maxRetries: 3, timeout: 30000 });
```

### Logging

Enable logging by setting the environment variable:

```bash
export SAMBANOVA_LOG=info
```

Or use `debug` for more verbose output.

### Custom Requests

You can make custom requests to undocumented endpoints using the `request` method:

```js
const response = await client.request('POST', '/custom-endpoint', { json: { param: 'value' } });
console.log(response);
```

### Managing Resources

The SDK manages HTTP connections automatically. You can manually close the client if needed:

```js
await client.close();
```

Or use with async resource management (if supported):

```js
// Example: using top-level await or inside an async function
const client = new SambanovaAPIClient('your_api_key');
try {
  // make requests
} finally {
  await client.close();
}
```

## Requirements

- Node.js 16 or higher

## Contributing

Contributions are welcome! Please read our [contributing guide](CONTRIBUTING.md) for more information on how to get started.
