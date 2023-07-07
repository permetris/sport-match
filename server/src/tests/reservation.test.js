/* eslint-disable max-len */
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { runSeed } = require('../seed/seed');
const { runUnseed } = require('../seed/unseed');
const postReservationData = require('./test-data/postReservationData');
const putReservationData = require('./test-data/putReservationData');
const { HTTP_STATUS } = require('../utils/httpCodes');

describe('Testing all RESERVATION routes', () => {
  beforeAll(async () => {
    await runSeed();
    mongoose.set('strictQuery', true);
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/`);
  });

  afterAll(async () => {
    await runUnseed();
    await mongoose.connection.close();
  });

  describe('Testing GET RESERVATION route', () => {
    test(`should respond with a ${HTTP_STATUS.OK} status code to GET all reservations`, async () => {
      const response = await request(app).get('/reservation');
      expect(response.statusCode).toBe(HTTP_STATUS.OK);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toEqual(
        {
          success: expect.any(Boolean),
          data: expect.any(Array)
        });
    });
  });
  describe.each([
    ['63f354c2255f21a3f4605fff', HTTP_STATUS.NOT_FOUND],
    ['63f354c2255f21a3f46xxxxf', HTTP_STATUS.INVALID],
    [0, HTTP_STATUS.INVALID],
    ['a', HTTP_STATUS.INVALID]
  ])(`Testing GET ONE RESERVATION route with invalid reservation id, should respond with a ${HTTP_STATUS.INVALID}/${HTTP_STATUS.NOT_FOUND} status code to GET one reservation`, (reservationId, expectedStatus) => {
    test(`should respond with a ${expectedStatus} status code`, async () => {
      const response = await request(app).get(`/reservation/${reservationId}`);
      expect(response.statusCode).toBe(expectedStatus);
      expect(response.headers['content-type']).toMatch(/json/);
    });
    test(`Testing GET ONE RESERVATION route, should respond with a ${HTTP_STATUS.OK} status code to GET one reservation`, async () => {
      reservationId = '63eb7dfe5f58194a262d8226';
      const response = await request(app).get(`/reservation/${reservationId}`);
      expect(response.statusCode).toBe(HTTP_STATUS.OK);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe('Testing POST RESERVATION route', () => {
    describe.each(postReservationData)('Testing POST RESERVATION route ADMIN role', (newReservation, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const login = await request(app).post('/login').send({ email: 'admin@test.com', password: 'password' });
        const token = login.headers.authorization;
        const response = await request(app)
          .post('/reservation')
          .set('Authorization', `${token}`)
          .send(newReservation);
        expect(response.statusCode).toBe(expectedStatus);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.headers['content-type']).toMatch(/json/);
      });
    });
    test(`Testing POST RESERVATION route with USER role. Should respond with a ${HTTP_STATUS.FORBIDDEN} status code to POST reservation`, async () => {
      const login = await request(app).post('/login').send({ email: 'user9@test.com', password: 'password' });
      const token = login.headers.authorization;
      const newReservation = {
        field: '63eb76f1c6a15537f1bbb5a0',
        match: '63eb7f4a8bda2a035ce6454c',
        time: '2023-03-27T19:00:00Z',
        isCanceled: false,
        isScheduled: false,
        registeredPlayers: [
          '63eb6abf9792291234cd6a75',
          '63eb6abf9792291234cd6a76',
          '63eb6abf9792291234cd6a77',
          '63eb788d339bb827e5fe77d2'
        ]
      };
      const response = await request(app)
        .post('/reservation')
        .set('Authorization', `${token}`)
        .send(newReservation);
      expect(response.statusCode).toBe(HTTP_STATUS.FORBIDDEN);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toEqual(
        {
          message: expect.any(String)
        });
    });
    test(`Testing POST RESERVATION route, not logged in. Should respond with a ${HTTP_STATUS.NO_AUTH} status code to POST reservation`, async () => {
      const newReservation = {
        field: '63eb76f1c6a15537f1bbb5a0',
        match: '63eb7f4a8bda2a035ce6454c',
        time: '2023-03-27T19:00:00Z',
        isCanceled: false,
        isScheduled: false,
        registeredPlayers: [
          '63eb6abf9792291234cd6a75',
          '63eb6abf9792291234cd6a76',
          '63eb6abf9792291234cd6a77',
          '63eb788d339bb827e5fe77d2'
        ]
      };
      const response = await request(app)
        .post('/reservation')
        .send(newReservation);
      expect(response.statusCode).toBe(HTTP_STATUS.NO_AUTH);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toEqual(
        {
          message: expect.any(String)
        });
    });
  });

  describe('Testing PUT RESERVATION route', () => {
    test(`Testing PUT RESERVATION route, not logged in. Should respond with a ${HTTP_STATUS.NO_AUTH} status code to PUT reservation`, async () => {
      const reservationId = '63eb7dfe5f58194a262d8224';
      const updatedReservation = {
        field: '63eb76f1c6a15537f1bbb59f',
        match: '63eb7f4a8bda2a035ce6454c',
        time: '2023-03-26T17:00:00Z',
        isCanceled: false,
        isScheduled: true,
        registeredPlayers: [
          '63eb6abf9792291234cd6a75',
          '63eb6abf9792291234cd6a76',
          '63eb6abf9792291234cd6a77',
          '63eb788d339bb827e5fe77d2',
          '63eb788d339bb827e5fe77d3',
          '63eb788d339bb827e5fe77d4'
        ]
      };
      const response = await request(app)
        .put(`/reservation/${reservationId}`)
        .send(updatedReservation);
      expect(response.statusCode).toBe(HTTP_STATUS.NO_AUTH);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.headers['content-type']).toMatch(/json/);
    });

    test(`Testing PUT RESERVATION route with USER role. Should respond with a ${HTTP_STATUS.FORBIDDEN} status code to PUT reservation`, async () => {
      const login = await request(app).post('/login').send({ email: 'user9@test.com', password: 'password' });
      const token = login.headers.authorization;
      const reservationId = '63eb7dfe5f58194a262d8224';
      const updatedReservation = {
        field: '63eb76f1c6a15537f1bbb59f',
        match: '63eb7f4a8bda2a035ce6454c',
        time: '2023-03-26T17:00:00Z',
        isCanceled: false,
        isScheduled: true,
        registeredPlayers: [
          '63eb6abf9792291234cd6a75',
          '63eb6abf9792291234cd6a76',
          '63eb6abf9792291234cd6a77',
          '63eb788d339bb827e5fe77d2',
          '63eb788d339bb827e5fe77d3',
          '63eb788d339bb827e5fe77d4'
        ]
      };
      const response = await request(app)
        .put(`/reservation/${reservationId}`)
        .set('Authorization', `${token}`)
        .send(updatedReservation);
      expect(response.statusCode).toBe(HTTP_STATUS.FORBIDDEN);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.headers['content-type']).toMatch(/json/);
    });

    describe.each(putReservationData)('Testing PUT RESERVATION route ADMIN role', (reservationId, updatedReservation, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const login = await request(app).post('/login').send({ email: 'admin@test.com', password: 'password' });
        const token = login.headers.authorization;
        const response = await request(app)
          .put(`/reservation/${reservationId}`)
          .set('Authorization', `${token}`)
          .send(updatedReservation);
        expect(response.statusCode).toBe(expectedStatus);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.headers['content-type']).toMatch(/json/);
      });
    });
  });

  describe('Testing DELETE RESERVATION route', () => {
    describe.each([
      ['63f354c2255f21a3f4605fff', HTTP_STATUS.NOT_FOUND],
      ['63f354c2255f21a3f46xxxxf', HTTP_STATUS.INVALID],
      [0, HTTP_STATUS.INVALID],
      ['a', HTTP_STATUS.INVALID]
    ])('Test DELETE request for /reservation route with invalid and valid ID', (id, expectedStatus) => {
      test(`with invalid ID, should respond with a ${expectedStatus} status code`, async () => {
        const login = await request(app).post('/login').send({ email: 'admin@test.com', password: 'password' });
        const token = login.headers.authorization;
        const response = await request(app)
          .delete(`/reservation/${id}`)
          .set('Authorization', `${token}`);
        expect(response.statusCode).toBe(expectedStatus);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(expect.any(Object));
      });
    });
    test(`with valid ID, should respond with a ${HTTP_STATUS.OK} status code`, async () => {
      const login = await request(app).post('/login').send({ email: 'admin@test.com', password: 'password' });
      const token = login.headers.authorization;
      const id = '63eb7dfe5f58194a262d8226';
      const response = await request(app)
        .delete(`/reservation/${id}`)
        .set('Authorization', `${token}`);
      expect(response.statusCode).toBe(HTTP_STATUS.OK);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toEqual(
        {
          success: expect.any(Boolean),
          data: expect.objectContaining(
            {
              _id: expect.any(String),
              field: expect.any(String),
              match: expect.any(String),
              time: expect.any(String),
              isCanceled: expect.any(Boolean),
              isFinished: expect.any(Boolean),
              isScheduled: expect.any(Boolean),
              registeredPlayers: expect.any(Array)
            })
        });
    });
  });

  describe('Testing CANCEL RESERVATION route', () => {
    describe.each([
      ['63f354c2255f21a3f4605fff', HTTP_STATUS.NOT_FOUND],
      ['63f354c2255f21a3f46xxxxf', HTTP_STATUS.INVALID],
      [0, HTTP_STATUS.INVALID],
      ['a', HTTP_STATUS.INVALID]
    ])(`Testing CANCEL ONE RESERVATION route with invalid reservation id, should respond with a ${HTTP_STATUS.INVALID}/${HTTP_STATUS.NOT_FOUND} status code to CANCEL one reservation`, (reservationId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const login = await request(app).post('/login').send({ email: 'admin@test.com', password: 'password' });
        const token = login.headers.authorization;
        const response = await request(app).put(`/reservation/cancel/${reservationId}`)
          .set('Authorization', `${token}`);
        expect(response.statusCode).toBe(expectedStatus);
        expect(response.headers['content-type']).toMatch(/json/);
      });
      test(`Testing CANCEL ONE RESERVATION route, should respond with a ${HTTP_STATUS.OK} status code to CANCEL one reservation`, async () => {
        const login = await request(app).post('/login').send({ email: 'admin@test.com', password: 'password' });
        const token = login.headers.authorization;
        reservationId = '63eb7dfe5f58194a262d8224';
        const response = await request(app).put(`/reservation/cancel/${reservationId}`)
          .set('Authorization', `${token}`);
        expect(response.statusCode).toBe(HTTP_STATUS.OK);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toEqual(
          {
            success: expect.any(Boolean),
            data: expect.objectContaining(
              {
                _id: expect.any(String),
                field: expect.any(String),
                match: expect.any(String),
                time: expect.any(String),
                isCanceled: expect.any(Boolean),
                isFinished: expect.any(Boolean),
                isScheduled: expect.any(Boolean),
                registeredPlayers: expect.any(Array)
              })
          });
      });
    });
  });

  describe('Testing ADD PLAYER RESERVATION route', () => {
    describe.each([
      ['63f354c2255f21a3f4605fff', '63f354c2255f21a3f4605555', HTTP_STATUS.FORBIDDEN],
      ['63f354c2255f21a3f46xxxxf', '63f354c2255f21a3f4605fff', HTTP_STATUS.INVALID],
      ['63f354c2255f21a3f4605fff', '63f354c2255f21a3f46xxxxf', HTTP_STATUS.INVALID],
      [0, '63f354c2255f21a3f4605fff', HTTP_STATUS.INVALID],
      ['a', '63f354c2255f21a3f4605fff', HTTP_STATUS.INVALID],
      ['63f354c2255f21a3f4605fff', 0, HTTP_STATUS.INVALID],
      ['63f354c2255f21a3f4605fff', 'a', HTTP_STATUS.INVALID]
    ])(`Testing ADD PLAYER to RESERVATION route with invalid id, should respond with a ${HTTP_STATUS.INVALID}/${HTTP_STATUS.NOT_FOUND} status code to CANCEL one reservation`, (reservationId, playerId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const login = await request(app).post('/login').send({ email: 'admin@test.com', password: 'password' });
        const token = login.headers.authorization;
        const response = await request(app).put(`/reservation/${reservationId}/add-player/${playerId}`)
          .set('Authorization', `${token}`);
        expect(response.statusCode).toBe(expectedStatus);
        expect(response.headers['content-type']).toMatch(/json/);
      });
    });
    test(`Testing ADD PLAYER to RESERVATION route with valid id, should respond with a ${HTTP_STATUS.OK} status code to ADD PLAYER to reservation`, async () => {
      const login = await request(app).post('/login').send({ email: 'kdujemic@test.com', password: 'password' });
      const token = login.headers.authorization;
      const reservationId = '63eb7dfe5f58194a262d8223';
      const playerId = '63eb788d339bb827e5fe77d4';
      const response = await request(app).put(`/reservation/${reservationId}/add-player/${playerId}`)
        .set('Authorization', `${token}`);
      expect(response.statusCode).toBe(HTTP_STATUS.OK);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toEqual(
        {
          success: expect.any(Boolean)
        });
    });
  });

  describe('Testing WITHDRAW PLAYER RESERVATION route', () => {
    describe.each([
      ['63f354c2255f21a3f4605fff', '63f354c2255f21a3f4605fff', HTTP_STATUS.FORBIDDEN],
      ['63f354c2255f21a3f46xxxxf', '63f354c2255f21a3f4605fff', HTTP_STATUS.INVALID],
      ['63f354c2255f21a3f4605fff', '63f354c2255f21a3f46xxxxf', HTTP_STATUS.INVALID],
      [0, '63f354c2255f21a3f4605fff', HTTP_STATUS.INVALID],
      ['a', '63f354c2255f21a3f4605fff', HTTP_STATUS.INVALID],
      ['63f354c2255f21a3f4605fff', 0, HTTP_STATUS.INVALID],
      ['63f354c2255f21a3f4605fff', 'a', HTTP_STATUS.INVALID]
    ])(`Testing WITHDRAW PLAYER from RESERVATION route with invalid id, should respond with a ${HTTP_STATUS.INVALID}/${HTTP_STATUS.NOT_FOUND} status code to CANCEL one reservation`, (reservationId, playerId, expectedStatus) => {
      test(`should respond with a ${expectedStatus} status code`, async () => {
        const login = await request(app).post('/login').send({ email: 'admin@test.com', password: 'password' });
        const token = login.headers.authorization;
        const response = await request(app).put(`/reservation/${reservationId}/player-withdraw/${playerId}`)
          .set('Authorization', `${token}`);
        expect(response.statusCode).toBe(expectedStatus);
        expect(response.headers['content-type']).toMatch(/json/);
      });
    });
    test(`Testing WITHDRAW PLAYER from RESERVATION route with valid id, should respond with a ${HTTP_STATUS.OK} status code to WITHDRAW PLAYER from reservation`, async () => {
      const login = await request(app).post('/login').send({ email: 'iburazin@test.com', password: 'password' });
      const token = login.headers.authorization;
      const reservationId = '63eb7dfe5f58194a262d8225';
      const playerId = '63eb6abf9792291234cd6a77';
      const response = await request(app).put(`/reservation/${reservationId}/player-withdraw/${playerId}`)
        .set('Authorization', `${token}`);
      expect(response.statusCode).toBe(HTTP_STATUS.OK);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toEqual(
        {
          success: expect.any(Boolean)
        });
    });
  });

  describe('Testing FILTER RESERVATION route', () => {
    describe.each([
      ['dayOfWeek=7', HTTP_STATUS.OK],
      ['hour=13', HTTP_STATUS.OK]
    ])('Test FILTER request for /reservation/filter route with a valid query, data found', (query, expectedStatus) => {
      test(`with valid query, should respond with a ${expectedStatus} status code`, async () => {
        const response = await request(app)
          .get(`/reservation/filter/?${query}`);
        expect(response.statusCode).toBe(expectedStatus);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toEqual(
          {
            filteredReservation: expect.any(Array)
          });
      });
    });
    test('Test FILTER request for /reservation/filter route with a valid query, data not found', async () => {
      const query = 'dayOfWeek=7&hour=13';
      const response = await request(app)
        .get(`/reservation/filter/?${query}`);
      expect(response.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toEqual(
        {
          message: expect.any(String)
        });
    });
    test('Test FILTER request for /reservation/filter route with an invalid query', async () => {
      const query = '63eb7dfe5f58194a262d8226';
      const response = await request(app)
        .get(`/reservation/filter/?${query}`);
      expect(response.statusCode).toBe(HTTP_STATUS.INVALID);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toEqual(
        {
          message: expect.any(Array)
        });
    });
  });
});
