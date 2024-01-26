const supertest = require("supertest");
const createApp = require('../src/app');

describe('Tests for /users path', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeEach(() => {
    app = createApp();
    server = app.listen(9000);
    api = supertest(app);
  });

  describe('GET /users', () => {

  });

  describe('POST /users', () => {
    const executeTest = async (inputData, expectedErrorMessage) => {
      const { statusCode, body } = await api.post('/api/v1/users').send(inputData);
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(expectedErrorMessage);
    };

    test('should return a 400 Bad Request with invalid password', async () => {
      const inputData = {
        email: 'mike@mail.com',
        password: '-----'
      };
      await executeTest(inputData, /password/);
    });

    test('should return a 400 Bad Request with invalid email', async () => {
      const inputData = {
        email: '----',
        password: 'jkh34kj23h4234923h4234'
      };
      await executeTest(inputData, /email/);
    });
  });


  describe('PUT /users', () => {

  });

  describe('DELETE /users', () => {

  });

  afterEach(() => {
    server.close();
  });
});
