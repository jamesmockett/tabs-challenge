import { CONFIG } from './config.js';

const loadContent = async (url) => {
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }

  throw new Error(response.statusText);
};

const buildContentUrl = (section) => {
  const options = {
    'section': section,
    'order-by': 'newest',
    'show-fields': 'trail-text',
    'page-size': 5,
    'api-key': CONFIG.apiKey
  };

  const query = Object.keys(options).map(key => `${key}=${options[key]}`).join('&');
  return `${CONFIG.apiEndpoint}?${query}`;
};

export { loadContent, buildContentUrl };
