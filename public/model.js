const baseUrl = '../db.json';

export const getAllData = async () => {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Failed to fetch data:', error.message);
  }
};

console.log('model.js loaded');
