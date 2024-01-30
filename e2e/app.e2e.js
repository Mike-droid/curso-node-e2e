const supertest = require("supertest");
const createApp = require('../src/app');

describe('Tests for app', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(9000);
    api = supertest(app);
  });

  test('GET /hello', async () => {
    const response = await api.get('/hello');
    expect(response).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual('mike');
    expect(response.headers['content-type']).toMatch(/json/);
  });

  afterAll(() => {
    server.close();
  });
});
