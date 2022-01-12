const supertest = require('supertest');
const app = require('./app');
const request = supertest(app);

it('Gets online response', async () => {
  const res = await request.get('/')
  expect(res.status).toBe(200);
  expect(res.text).toBe('online');
})

it('Gets pong response', async () => {
  const res = await request.get('/ping')
  expect(res.status).toBe(200);
  expect(res.text).toBe('pong');
})