const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { postUserData } = require('./test-data/postUserData');
const { putUserData } = require('./test-data/putUserData');
const { runSeed } = require('../seed/seed');
const { runUnseed } = require('../seed/unseed');
const { HTTP_STATUS } = require('../utils/httpCodes.js');

describe('Test /user routes', () => {
  beforeAll(async () => {
    await runSeed();
    mongoose.set('strictQuery', true);
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/`);
  });

  afterAll(async () => {
    await runUnseed();
    await mongoose.connection.close();
  });

  describe('Test GET requests for /user route', () => {
    test('GET on /user route returns 200 status code', async () => {
      const { body, headers, statusCode } = await request(app).get('/user');

      expect(body).toEqual(expect.any(Object));
      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.OK);
    });
    test('GET on user/63eb6abf9792291234cd6a77 returns appropriate data types', async () => {
      const { body, headers } = await request(app).get('/user/63eb6abf9792291234cd6a77');

      expect(headers['content-type']).toMatch(/json/);
      expect(body).toEqual(expect.objectContaining(
        {
          success: expect.any(Boolean),
          data: expect.objectContaining(
            {
              _id: expect.any(String),
              username: expect.any(String),
              name: expect.any(String),
              surname: expect.any(String),
              email: expect.any(String),
              phone: expect.any(String)
            })
        })
      );
    });
  });

  describe('Test GET requests for /user/63eb6abf9792291234cd6a77/history route', () => {
    test('Should return 200 status for a logged in user with valid credentials', async () => {
      const login = await request(app).post('/login').send({ email: 'iburazin@test.com', password: 'password' });
      const token = login.headers.authorization;

      const { headers, statusCode } = await request(app)
        .get('/user/63eb6abf9792291234cd6a77/history').set('Authorization', `${token}`);

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.OK);
    });
  });

  describe('Test POST on /user route', () => {
    describe.each(postUserData)('POST on /user route returns appropriate status code and data format',
      (userData, expectedStatus) => {
        test(`POST request returns ${expectedStatus} status code`, async () => {
          const { statusCode, headers, body } = await request(app).post('/user')
            .send(userData);
          expect(headers['content-type']).toMatch(/json/);
          expect(body).toEqual(expect.any(Object));
          expect(statusCode).toBe(expectedStatus);
        });
      });
  });

  describe('Test PUT on /user route', () => {
    describe.each(putUserData)('PUT on /user route returns appropriate status code and data format',
      (userId, userData, expectedStatus) => {
        test(`PUT request returns ${expectedStatus} status code`, async () => {
          const login = await request(app).post('/login').send({ email: 'iburazin@test.com', password: 'password' });
          const token = login.headers.authorization;
          const { statusCode, headers, body } = await request(app)
            .put(`/user/${userId}`)
            .set('Authorization', `${token}`)
            .send(userData);

          expect(headers['content-type']).toMatch(/json/);
          expect(body).toEqual(expect.any(Object));
          expect(statusCode).toBe(expectedStatus);
        });
      });
  });

  describe('Test DELETE request for /user route with invalid and valid ID', () => {
    describe.each([
      ['22eb6abf9792291234cd6a75', HTTP_STATUS.NO_AUTH, 'iburazin@test.com'],
      ['63eb6abf9792291234cd6a75', HTTP_STATUS.FORBIDDEN, 'admin@test.com'],
      ['63eb6abf9792291234cd6a75', HTTP_STATUS.OK, 'jboguno@test.com'],
      ['a', HTTP_STATUS.INVALID, 'admin@test.com'],
      [0, HTTP_STATUS.INVALID, 'iburazin@test.com']
    ])('DELETE on /user route returns expected status code', (id, expectedStatus, email) => {
      test(`DELETE request returns ${expectedStatus} status code`, async () => {
        const login = await request(app).post('/login').send({ email: `${email}`, password: 'password' });

        const token = login.headers.authorization;
        const { statusCode } = await request(app)
          .delete(`/user/${id}`).set('Authorization', `${token}`);

        expect(statusCode).toBe(expectedStatus);
      });
    });
  });
});
