const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { runSeed } = require('../seed/seed');
const { runUnseed } = require('../seed/unseed');
const { HTTP_STATUS } = require('../utils/httpCodes');

describe('Testing all auth validations', () => {
  beforeAll(async () => {
    await runSeed();
    mongoose.set('strictQuery', true);
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/`);
  });

  afterAll(async () => {
    await runUnseed();
    await mongoose.connection.close();
  });

  describe('Testing login route', () => {
    describe.each([
      [{ email: 'iburazin@test.com', password: 'password' }, HTTP_STATUS.OK],
      [{ email: 'mvukusic@test.com', password: 'password' }, HTTP_STATUS.OK],
      [{ email: 'iburazin@example.com', password: 'password' }, HTTP_STATUS.NOT_FOUND],
      [{ email: 'iburazin@test.com', password: 'test124' }, HTTP_STATUS.NO_AUTH]
    ])('Testing login route with valid and invalid credentials', (userBody, expectedStatus) => {
      test(`Should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app).post('/login').send(userBody);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(expectedStatus);
      });
    });
  });
});
