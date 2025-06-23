import axios from 'axios';

export async function getAvailableModels(client) {
  try { 
    const response = await axios.get(
      client.url('/v1/models'),
      {},
      { headers: client.headers() }
    );

    return response.data;
  } catch (error) {
    console.error('Error getting models:', error);
    throw error;
  }
}

export async function getModelDetails(client, modelId) {
  try {
    const response = await axios.get(
      client.url(`/v1/models/${modelId}`),
      {},
      { headers: client.headers() }
    );

    return response.data;
  } catch (error) {
    console.error('Error getting models:', error);
    throw error;
  }
}
