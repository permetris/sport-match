const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { runSeed } = require('../seed/seed');
const { runUnseed } = require('../seed/unseed');
const { HTTP_STATUS } = require('../utils/httpCodes.js');

describe('Field', () => {
  beforeAll(async () => {
    await runSeed();
    mongoose.set('strictQuery', true);
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/`);
  });

  afterAll(async () => {
    await runUnseed();
    await mongoose.connection.close();
  });
  describe('GET', () => {
    test('when id is valid, should respond with 200 and an object containing success and data attributes', async () => {
      const { body, headers, statusCode } = await request(app).get('/field/63eb76f1c6a15537f1bbb59f');

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.OK);
      expect(body)
        .toEqual({
          success: expect.any(Boolean),
          data: expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
            address: expect.any(String)
          })
        });
    });
    test('when the id doesnt exist should respond with 404', async () => {
      const { headers, statusCode } = await request(app).get('/field/63eb76f1c6a12337f1bbb59f');

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.NOT_FOUND);
    });
    test('when the is isnt valid should respond with 400', async () => {
      const { headers, statusCode } = await request(app).get('/field/123123');

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.INVALID);
    });
    test('should respond with 200 and an object which has a success and data attribute that is an array', async () => {
      const { body, headers, statusCode } = await request(app).get('/field');

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.OK);
      expect(body).toEqual(expect.any(Object));
      expect(body).toEqual({
        success: expect.any(Boolean),
        data: expect.any(Array)
      });
    });
  });

  describe('POST ', () => {
    const longString = '1234567890123456789012345678901123456789012345678901';
    describe.each([
      [{ city: 'test', name: 'test repeat', address: 'address repeat', maxPlayers: 10 }, HTTP_STATUS.CREATED],
      [{ city: 'test', name: 'test repeat', address: 'address not repeat', maxPlayers: 10 }, HTTP_STATUS.CONFLICT],
      [{ city: 'test', name: 'test not repeat', address: 'address repeat', maxPlayers: 10 }, HTTP_STATUS.CONFLICT],
      [{ city: 'test', name: 'four', address: 'four1234', maxPlayers: 10 }, HTTP_STATUS.INVALID],
      [{ city: 'test', name: 'four1', address: 'seven12', maxPlayers: 10 }, HTTP_STATUS.INVALID],
      [{ city: 'test', name: 'four1', address: longString, maxPlayers: 10 }, HTTP_STATUS.INVALID],
      [{ city: 'test', name: longString, address: 'test1242', maxPlayers: 10 }, HTTP_STATUS.INVALID],
      [{ city: 'test', name: 'test repeat', address: 'address repeat' }, HTTP_STATUS.INVALID]

    ])('Testing field creation with various paramaters', (fieldBody, expectedStatus) => {
      test(`Should respond with a ${expectedStatus} status code`, async () => {
        const login = await request(app).post('/login').send({ email: 'admin@test.com', password: 'password' });
        const token = login.headers.authorization;
        const { headers, statusCode } =
          await request(app).post('/field').send(fieldBody).set('Authorization', `${token}`);
        expect(headers['content-type']).toMatch(/json/);
        expect(statusCode).toBe(expectedStatus);
      });
    });
    test('when requested by a user role, should respond with 403', async () => {
      const body = {
        city: 'blabla',
        name: 'blablabla',
        address: 'blablabla',
        maxPlayers: 10
      };
      const login = await request(app).post('/login').send({ email: 'jboguno@test.com', password: 'password' });
      const token = login.headers.authorization;
      const { headers, statusCode } = await request(app)
        .post('/field').set('Authorization', `${token}`).send(body);

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.FORBIDDEN);
    });
    test('when requested without an authenticated user, should respond with 401', async () => {
      const body = {
        name: 'test repeat update user',
        address: 'address repeat update user'
      };

      const { headers, statusCode } = await request(app)
        .post('/field').send(body);

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.NO_AUTH);
    });
  });

  describe('PUT ', () => {
    const id = '63eb76f1c6a15537f1bbb59f';
    const conflictId = '63eb76f1c6a15537f1bbb5a0';
    const notExist = '13eb76f1caa15537f1bbb5a0';

    const longString = '1234567890123456789012345678901123456789012345678901';

    describe.each([
      [id, { city: 'test', name: 'test repeat update', address: 'address repeat update', maxPlayers: 10 }, HTTP_STATUS.ACCEPTED],
      [conflictId, { city: 'test', name: 'test repeat', address: 'address not repeat', maxPlayers: 10 }, HTTP_STATUS.SERVER_ERROR],
      [conflictId, { city: 'test', name: 'test not repeat', address: 'address repeat', maxPlayers: 10 }, HTTP_STATUS.SERVER_ERROR],
      [id, { city: 'test', name: 'four', address: 'four1234', maxPlayers: 10 }, HTTP_STATUS.INVALID],
      [id, { city: 'test', name: 'four1', address: 'seven12', maxPlayers: 10 }, HTTP_STATUS.INVALID],
      [id, { city: 'test', name: 'four1', address: longString, maxPlayers: 10 }, HTTP_STATUS.INVALID],
      [id, { city: 'test', name: longString, address: 'longString', maxPlayers: 10 }, HTTP_STATUS.INVALID],
      ['id', { city: 'test', name: 'longString', address: 'test1242', maxPlayers: 10 }, HTTP_STATUS.INVALID],
      ['id', { city: 'test', name: 'longString', address: 'test1242', maxPlayers: 10 }, HTTP_STATUS.INVALID],
      [notExist, { city: 'test', name: 'longString', address: 'test1242', maxPlayers: 10 }, HTTP_STATUS.NOT_FOUND],
      [notExist, { city: 'test', name: 'longString', address: 'test1242', maxPlayers: 10 }, HTTP_STATUS.NOT_FOUND],
      [id, { city: 'test', name: 'test repeat update', address: 'address repeat update' }, HTTP_STATUS.INVALID]

    ])('Testing field creation with various paramaters', (id, fieldBody, expectedStatus) => {
      test(`Should respond with a ${expectedStatus} status code`, async () => {
        const login = await request(app).post('/login').send({ email: 'admin@test.com', password: 'password' });
        const token = login.headers.authorization;
        const { headers, statusCode } =
          await request(app).put(`/field/${id}`).set('Authorization', `${token}`).send(fieldBody);
        expect(headers['content-type']).toMatch(/json/);
        expect(statusCode).toBe(expectedStatus);
      });
    });
    test('when requested by a user role, should respond with 403', async () => {
      const body = {
        city: 'test',
        name: 'test repeat update user',
        address: 'address repeat update user'
      };
      const login = await request(app).post('/login').send({ email: 'jboguno@test.com', password: 'password' });
      const token = login.headers.authorization;
      const { headers, statusCode } = await request(app)
        .put('/field/63eb76f1c6a15537f1bbb59f').set('Authorization', `${token}`).send(body);

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.FORBIDDEN);
    });
    test('when requested without an authenticated user, should respond with 401', async () => {
      const body = {
        name: 'test repeat update user',
        address: 'address repeat update user'
      };

      const { headers, statusCode } = await request(app)
        .put('/field/63eb76f1c6a15537f1bbb59f').send(body);

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.NO_AUTH);
    });
  });
  describe('DELETE', () => {
    test('when requested by admin role, shoudl respond with 200', async () => {
      const login = await request(app).post('/login').send({ email: 'admin@test.com', password: 'password' });
      const token = login.headers.authorization;
      const { headers, statusCode } = await request(app)
        .delete('/field/63eb76f1c6a15537f1bbb59f').set('Authorization', `${token}`);

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.OK);
    });
    test('when requested by user role, should respond with 403', async () => {
      const login = await request(app).post('/login').send({ email: 'jboguno@test.com', password: 'password' });
      const token = login.headers.authorization;
      const { headers, statusCode } = await request(app)
        .delete('/field/63eb76f1c6a15537f1bbb59f').set('Authorization', `${token}`);

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.FORBIDDEN);
    });
    test('when there is no user authenticated, should respond with 401', async () => {
      const { headers, statusCode } = await request(app)
        .delete('/field/63eb76f1c6a15537f1bbb59f');

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.NO_AUTH);
    });
    test('when the field id doesnt exist, should respond with 404', async () => {
      const login = await request(app).post('/login').send({ email: 'admin@test.com', password: 'password' });
      const token = login.headers.authorization;
      const { headers, statusCode } = await request(app)
        .delete('/field/63eb21f1c6a15537f1bbb59f').set('Authorization', `${token}`);

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.NOT_FOUND);
    });
    test('when the param id isnt valid, should respond with a 400 status code', async () => {
      const login = await request(app).post('/login').send({ email: 'admin@test.com', password: 'password' });
      const token = login.headers.authorization;
      const { headers, statusCode } = await request(app)
        .delete('/field/63eb21fb59f').set('Authorization', `${token}`);

      expect(headers['content-type']).toMatch(/json/);
      expect(statusCode).toBe(HTTP_STATUS.INVALID);
    });
  });
});
