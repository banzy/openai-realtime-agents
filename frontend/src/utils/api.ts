const API_URL = process.env.REACT_APP_API_URL;

export const api = {
  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  async get(endpoint: string) {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};
