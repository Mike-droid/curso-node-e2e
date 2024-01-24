const supertest = require("supertest");
const express = require('express');

const app = express();

app.get('/hello', (req, res) => res.status(200).json({name: 'mike'}));

app.listen(9000);
const api = supertest(app);

describe('Tests for app', () => {
  test('GET /hello', async () => {
    const response = await api.get('/hello');
    expect(response).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual('mike');
    expect(response.headers['content-type']).toMatch(/json/);
  });
});
