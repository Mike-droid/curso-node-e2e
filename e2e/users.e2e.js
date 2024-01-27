const supertest = require('supertest');
const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');

describe('Tests for /users path', () => {
  let app = null;
  let server = null;
  let api = null;
  const apiUrlBase = '/api/v1/users/';

  beforeEach(() => {
    app = createApp();
    server = app.listen(9000);
    api = supertest(app);
  });

  describe('GET /users/{id}', () => {
    test('should return a user', async () => {
      const user = await models.User.findByPk('1');
      const { statusCode, body } = await api.get(`${apiUrlBase}${user.id}`);
      expect(statusCode).toEqual(200);
      expect(body.id).toEqual(1);
      expect(body.email).toEqual('admin@mail.com');
    });
  });

  describe('POST /users', () => {
    const executeTest = async (inputData, expectedErrorMessage) => {
      const { statusCode, body } = await api
        .post(`${apiUrlBase}`)
        .send(inputData);
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(expectedErrorMessage);
    };

    test('should return a 400 Bad Request with invalid password', async () => {
      const inputData = {
        email: 'mike@mail.com',
        password: '-----',
      };
      await executeTest(inputData, /password/);
    });

    test('should return a 400 Bad Request with invalid email', async () => {
      const inputData = {
        email: '----',
        password: 'jkh34kj23h4234923h4234',
      };
      await executeTest(inputData, /email/);
    });
  });

  describe('PUT /users', () => {});

  describe('DELETE /users', () => {});

  afterEach(() => {
    server.close();
  });
});
