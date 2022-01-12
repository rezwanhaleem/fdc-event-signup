const { app } = require('./index');
const request = require('supertest');

test('test ping', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual('pong');
});