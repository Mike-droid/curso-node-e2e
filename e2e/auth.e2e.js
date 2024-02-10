const supertest = require('supertest');
const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

describe('Tests for /auth path', () => {
  let app = null;
  let server = null;
  let api = null;
  const apiUrlBase = '/api/v1/auth/';

  beforeAll(async () => {
    app = createApp();
    server = app.listen(9000);
    api = supertest(app);
    await upSeed();
  });

  describe('POST /login', () => {
    test('should return a 401 with invalid password', async () => {
      const inputData = {
        email: 'emailfake@mail.com',
        password: 'sdjfhsdjkfs',
      };
      const { statusCode } = await api
        .post(`${apiUrlBase}login`)
        .send(inputData);
      expect(statusCode).toBe(401);
    });

    test('should  return a 200 with a correct user', async () => {
      const user = await models.User.findByPk('1');
      const inputData = {
        email: user.email,
        password: 'admin123',
      };
      const { statusCode, body } = await api
        .post(`${apiUrlBase}login`)
        .send(inputData);
      expect(statusCode).toBe(200);
      expect(body.access_token).toBeTruthy();
      expect(body.user.email).toEqual(user.email);
      expect(body.user.password).toBe(undefined);
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
