const supertest = require('supertest');
const createApp = require('../src/app');
const { config } = require('../src/config/config');

describe('Tests for app', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(9000);
    api = supertest(app);
  });

  describe('GET /hello', () => {
    test('should return correct info  when requesting hello route', async () => {
      const response = await api.get('/hello');
      expect(response).toBeTruthy();
      expect(response.statusCode).toEqual(200);
      expect(response.body.name).toEqual('mike');
      expect(response.headers['content-type']).toMatch(/json/);
    });
  });

  describe('GET /nueva-ruta', () => {
    test('should return status code of 401 without api key', async () => {
      const { statusCode } = await api.get('/nueva-ruta');
      expect(statusCode).toEqual(401);
    });

    test('should return status code of 401 with invalid api key', async () => {
      const { statusCode } = await api.get('/nueva-ruta').set({ api: 'nope' });
      expect(statusCode).toEqual(401);
    });

    test('should return status code of 200 with correct api key', async () => {
      const { statusCode } = await api
        .get('/nueva-ruta')
        .set({ api: config.apiKey });
      expect(statusCode).toEqual(200);
    });
  });

  afterAll(() => {
    server.close();
  });
});
