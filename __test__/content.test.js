import fetchMock from 'jest-fetch-mock';
import { loadContent, buildContentUrl } from '../js/content.js';

beforeAll(() => {
  fetchMock.enableMocks();
});

describe('loadContent', () => {
  test('returns a valid response', async () => {
    fetch.mockResponseOnce(JSON.stringify({"response": "ok"}));
    const content = await loadContent('/content');
    expect(content.response).toBe('ok');
  });

  test('throws an exception if fetching content fails', async () => {
    fetch.mockReject(new Error('Content API error'))
    await expect(loadContent('/content')).rejects.toThrow();
  });
});

describe('buildContentUrl', () => {
  test('returns a valid content API URL', () => {
    const section = 'uk-news';
    const expectedUrl = `http://content.guardianapis.com/search?section=${section}&order-by=newest&show-fields=trail-text&page-size=5`

    expect(buildContentUrl(section)).toMatch(expectedUrl);
  })
});
