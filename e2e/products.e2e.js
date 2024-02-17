const supertest = require('supertest');
const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

describe('Tests for /products path', () => {
  let app = null;
  let server = null;
  let api = null;
  const apiUrlBase = '/api/v1/products/';

  beforeAll(async () => {
    app = createApp();
    server = app.listen(9000);
    api = supertest(app);
    await upSeed();
  });

  describe('GET /products', () => {
    test('should return an array of products', async () => {
      const { statusCode, body } = await api.get(`${apiUrlBase}`);
      expect(statusCode).toEqual(200);
      const products = models.Product.findAll();
      expect(body.length).toEqual((await products).length);
      expect(body[0].category).toBeTruthy();
    });

    test('should return first product in DB', async () => {
      const product = await models.Product.findByPk('1');
      const { statusCode, body } = await api.get(`${apiUrlBase}${product.id}`);
      expect(statusCode).toEqual(200);
      expect(body.name).toEqual(product.name);
    });

    function testWithLimitAndOffset(limit, offset) {
      test(`should return ${limit} products with limit = ${limit} and offset = ${offset}`, async () => {
        const { statusCode, body } = await api.get(`${apiUrlBase}?limit=${limit}&offset=${offset}`);
        expect(statusCode).toEqual(200);
        expect(body.length).toEqual(limit);
      }
    )}

    testWithLimitAndOffset(2, 0);
    testWithLimitAndOffset(2, 2);
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
