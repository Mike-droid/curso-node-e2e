const supertest = require('supertest');
const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

describe('Tests for /profile', () => {
  let app = null;
  let server = null;
  let api = null;
  let accessToken = null;
  const apiUrlBase = '/api/v1/profile/';

  beforeAll(async () => {
    app = createApp();
    server = app.listen(9000);
    api = supertest(app);
    await upSeed();
  });

  describe('GET /profile/my-user (login with admin user)', () => {
    //* login is required to get access_token
    beforeAll(async () => {
      const user = await models.User.findByPk('1');
      const inputData = {
        email: user.email,
        password: 'admin123',
      };
      const { body: bodyLogin } = await api
        .post(`/api/v1/auth/login`)
        .send(inputData);
      accessToken = bodyLogin.access_token;
    });

    test('should return a user', async () => {
      const user = await models.User.findByPk('1');
      const { statusCode, body } = await api.get(`${apiUrlBase}my-user`).set({
        Authorization: `Bearer ${accessToken}`,
      });
      expect(statusCode).toEqual(200);
      expect(body.email).toEqual(user.email);
    });

    test('should return a 401 with invalid access token', async () => {
      const { statusCode } = await api.get(`${apiUrlBase}my-user`).set({
        Authorization: `Bearer whatever`,
      });
      expect(statusCode).toEqual(401);
    });

    afterAll(() => {
      accessToken = null;
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
