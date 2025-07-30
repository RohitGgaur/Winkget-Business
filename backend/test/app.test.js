const request = require('supertest');
const app = require('../app');
const mongoose = require('../DB/mongo.js');  // ✅ tumhare mongo.js ka path

afterAll(async () => {
  await mongoose.connection.close();  // ✅ test ke baad DB close
});
describe('API Health Check', () => {
  it('should return 200 for GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});


