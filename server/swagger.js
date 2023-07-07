/* eslint-disable no-useless-escape */
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Sports Match Organizer Aplication',
    description: 'Simple API overview'
  },
  host: 'localhost:8000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer'
    }
  },
  definitions: {
    LoginBody: {
      $email: 'admin@test.com',
      $password: 'password'
    },
    LoginResponse: {
      success: true,
      message: 'User admin logged in successfully!'
    },
    ForgottenPassBody: {
      $email: 'admin@test.com'
    },
    ForgottenPassResponse: {
      success: true,
      message: 'Password reset link sent to your email account!'
    },
    PasswordUpdateBody: {
      $password: '12341234'
    },
    PasswordUpdatedResponse: {
      success: true,
      message: 'Password successfully updated'
    },
    FieldList: {
      success: true,
      data: [
        {
          _id: '63eb76f1c6a15537f1bbb59f',
          name: 'Test Field 1',
          city: 'Split',
          address: 'Test Address 1',
          maxPlayers: 10
        }
      ]
    },
    FieldBody: {
      $name: 'Test Field 1',
      $address: 'Test Address 1',
      $city: 'Split',
      $maxPlayers: 10
    },
    FieldResponse: {
      success: true,
      data: {
        _id: '63e37f4a8bda2a935ce6454c',
        name: 'Test Field 1',
        city: 'Split',
        address: 'Test Address 1',
        maxPlayers: 10
      }
    },
    MatchList: {
      success: true,
      data: [
        {
          _id: '63eb7f4a8bda2a035ce6454c',
          whiteTeam: {
            _id: '63eb7aa9dda73e59e84aa443',
            players: [
              {
                _id: '63eb6abf9792291234cd6a75',
                username: 'jops12'
              },
              {
                _id: '63eb6abf9792291234cd6a76',
                username: 'marks'
              },
              {
                _id: '63eb6abf9792291234cd6a77',
                username: 'ivks3'
              }
            ]
          },
          blackTeam: {
            _id: '63eb7aa9dda73e59e84aa444',
            players: [
              {
                _id: '63eb788d339bb827e5fe77d2',
                username: 'franks'
              },
              {
                _id: '63eb788d339bb827e5fe77d3',
                username: 'lovrks'
              },
              {
                _id: '63eb788d339bb827e5fe77d4',
                username: 'karlks'
              }
            ],
            color: 'black'
          },
          result: {
            _id: '63eb7dfe5f58194a262d8276',
            whiteTeamScore: 5,
            blackTeamScore: 3
          }
        }
      ]
    },
    MatchResponse: {
      success: true,
      data: {
        _id: '63eb7f4a8bda2a035ce6454c',
        whiteTeam: {
          _id: '63eb7aa9dda73e59e84aa443',
          players: [
            {
              _id: '63eb6abf9792291234cd6a75',
              username: 'jops12'
            },
            {
              _id: '63eb6abf9792291234cd6a76',
              username: 'marks'
            },
            {
              _id: '63eb6abf9792291234cd6a77',
              username: 'ivks3'
            }
          ]
        },
        blackTeam: {
          _id: '63eb7aa9dda73e59e84aa444',
          players: [
            {
              _id: '63eb788d339bb827e5fe77d2',
              username: 'franks'
            },
            {
              _id: '63eb788d339bb827e5fe77d3',
              username: 'lovrks'
            },
            {
              _id: '63eb788d339bb827e5fe77d4',
              username: 'karlks'
            }
          ],
          color: 'black'
        },
        result: {
          _id: '63eb7dfe5f58194a262d8276',
          whiteTeamScore: 5,
          blackTeamScore: 3
        }
      }
    },
    MatchBody: {
      success: true,
      data: {
        _id: '63eb7f4a8bda2a035ce6454c',
        whiteTeam: {
          _id: '63eb7aa9dda73e59e84aa443',
          players: [
            '63eb6abf9792291234cd6a75',
            '63eb6abf9792291234cd6a76',
            '63eb6abf9792291234cd6a77'
          ]
        },
        blackTeam: {
          _id: '63eb7aa9dda73e59e84aa444',
          players: [
            '63eb788d339bb827e5fe77d2',
            '63eb788d339bb827e5fe77d3',
            '63eb788d339bb827e5fe77d4'
          ],
          color: 'black'
        },
        result: {
          _id: '63eb7dfe5f58194a262d8276'
        }
      }
    },
    ResultList: {
      success: true,
      data: [
        {
          _id: '63eb7dfe5f58194a262d8276',
          whiteTeamScore: 5,
          blackTeamScore: 3
        },
        {
          _id: '63eb7dfe5f58194a262d8277',
          whiteTeamScore: 5,
          blackTeamScore: 4
        }
      ]
    },
    ResultResponse: {
      success: true,
      data: {
        whiteTeamScore: 5,
        blackTeamScore: 4,
        _id: '64006e682fca7ee5155cae3c'
      }
    },
    ResultBody: {
      $whiteTeamScore: 5,
      $blackTeamScore: 3
    },
    TeamList: {
      success: true,
      data: [
        {
          _id: '63eb7aa9dda73e59e84aa443',
          players: [
            { _id: '63eb6abf9792291234cd6a75', username: 'Username1' },
            { _id: '63eb6abf9792291234cd6a76', username: 'Username2' },
            { _id: '63eb6abf9792291234cd6a77', username: 'Username3' }
          ],
          color: 'white'
        },
        {
          _id: '63eb7aa9dda73e59e84aa444',
          players: [
            { _id: '63eb788d339bb827e5fe77d2', username: 'Username4' },
            { _id: '63eb788d339bb827e5fe77d3', username: 'Username5' },
            { _id: '63eb788d339bb827e5fe77d4', username: 'Username6' }
          ],
          color: 'black'
        }
      ]
    },
    TeamResponse: {
      success: true,
      data:
        {
          _id: '63eb7aa9dda73e59e84aa443',
          players: [
            { _id: '63eb6abf9792291234cd6a75', username: 'Username1' },
            { _id: '63eb6abf9792291234cd6a76', username: 'Username2' },
            { _id: '63eb6abf9792291234cd6a77', username: 'Username3' }
          ],
          color: 'white'
        }

    },
    TeamBody: {
      _id: '63eb7aa9dda73e59e84aa443',
      players: [
        '63eb6abf9792291234cd6a75',
        '63eb6abf9792291234cd6a76',
        '63eb6abf9792291234cd6a77'
      ],
      color: 'white'

    },
    UserList: {
      success: true,
      data: [{
        _id: '63eb788d339bb827e5fe72d5',
        username: 'user1',
        name: 'user1',
        surname: 'user',
        email: 'user1@test.com',
        phone: '+1993288858',
        role: 'USER'
      }
      ]
    },
    UserBody: {
      $username: 'user1',
      $name: 'user1',
      $surname: 'user',
      $password: 'password',
      $email: 'user1@test.com',
      $phone: '+1993288858',
      $role: 'USER'
    },
    UserResponse: {
      success: true,
      data: {
        _id: '63eb788d339bb827e5fe72d5',
        username: 'user1',
        name: 'user1',
        surname: 'user',
        email: 'user1@test.com',
        phone: '+1993288858',
        role: 'USER'
      }
    },
    UserHistory:
      [
        {
          _id: '63eb7dfe5f58194a262d8222',
          field: {
            _id: '63eb76f1c6a15537f1bbb59f',
            name: 'Test Field 1'
          },
          match: {
            _id: '63eb7f4a8bda2a035ce6454c',
            whiteTeam: {
              _id: '63eb7aa9dda73e59e84aa443',
              players: [
                {
                  _id: '63eb6abf9792291234cd6a75',
                  username: 'jops',
                  isDeleted: true
                },
                {
                  _id: '63eb6abf9792291234cd6a76',
                  username: 'marks',
                  isDeleted: false
                },
                {
                  _id: '63eb6abf9792291234cd6a77',
                  username: 'ivks3',
                  isDeleted: false
                }
              ]
            },
            blackTeam: {
              _id: '63eb7aa9dda73e59e84aa444',
              players: [
                {
                  _id: '63eb788d339bb827e5fe77d2',
                  username: 'franks',
                  isDeleted: false
                },
                {
                  _id: '63eb788d339bb827e5fe77d3',
                  username: 'lovrks',
                  isDeleted: false
                },
                {
                  _id: '63eb788d339bb827e5fe77d4',
                  username: 'karlks',
                  isDeleted: false
                }
              ]
            },
            result: {
              _id: '63eb7dfe5f58194a262d8276',
              whiteTeamScore: 5,
              blackTeamScore: 3
            }
          },
          time: '2023-05-27T12:00:00.000Z'
        }
      ],
    ReservationList: {
      success: true,
      data: [{
        _id: '63eb7dfe5f58194a262d8222',
        field: '63eb76f1c6a15537f1bbb59f',
        match: '63eb7f4a8bda2a035ce6454c',
        num: 0,
        time: '2023-05-27T12:00:00.000Z',
        isCanceled: false,
        isFinished: true,
        isScheduled: true,
        registeredPlayers: [
          '63eb6abf9792291234cd6a75',
          '63eb6abf9792291234cd6a76',
          '63eb6abf9792291234cd6a77',
          '63eb788d339bb827e5fe77d2',
          '63eb788d339bb827e5fe77d3',
          '63eb788d339bb827e5fe77d4'
        ]
      }]
    },
    ReservationFilteredList: {
      filteredReservation: [
        {
          _id: '63eb7dfe5f58194a262d8225',
          field: '63eb76f1c6a15537f1bbb5a0',
          match: '63eb7f4a8bda2a035ce6454e',
          time: '2023-05-24T19:00:00.000Z',
          isCanceled: true,
          isFinished: false,
          isScheduled: true
        }
      ]
    },
    ReservationResponse: {
      success: true,
      data: {
        _id: '63eb7dfe5f58194a262d8226',
        field: '63eb76f1c6a15537f1bbb5a0',
        match: '63eb7f4a8bda2a035ce6454f',
        num: 0,
        time: '2023-05-23T12:00:00.000Z',
        isCanceled: false,
        isFinished: false,
        isScheduled: true,
        registeredPlayers: [
          '63eb788d339bb827e5fe77da',
          '63eb788d339bb827e5fe77db',
          '63eb788d339bb827e5fe77dc',
          '63eb788d339bb827e5fe77dd',
          '63eb788d339bb827e5fe77de',
          '63eb788d339bb827e5fe77df'
        ]
      }
    },
    ReservationPlayerResponse: {
      success: true
    },
    ReservationBody: {
      $field: '63eb76f1c6a15537f1bbb59f',
      $match: '63eb7f4a8bda2a035ce6454c',
      $time: '2023-05-27T12:00:00.000+00:00',
      $isCanceled: false,
      $isFinished: true,
      $isScheduled: true,
      $registeredPlayers: ['63eb6abf9792291234cd6a75']
    },
    httpNotFound: {
      success: false,
      message: 'Data not found'
    },
    httpInternalError: {
      message: 'Something went wrong!'
    },
    httpUnauthenticated: {
      success: false,
      message: 'You must be logged in to view this page!'
    },
    httpUnauthorized: {
      success: false,
      message: 'You are not authorized to view this page!'
    },
    UserNotFound: {
      message: 'User not found!'
    },
    InvalidField: {
      message: [
        '"name" length must be at least 5 characters long',
        '"address" is required',
        '"maxPlayers" is required',
        '"city" is required'
      ]
    },
    InvalidTeam: {
      message: [
        '"color" must be one of [white, black]'
      ]
    },
    InvalidMatch: {
      message: [
        '"whiteTeam" must be a string',
        '"blackTeam" must be a string',
        '"result" is required'
      ]
    },
    InvalidUser: {
      message: [
        '\"username\" is required',
        '\"name\" is required',
        '\"email\" must be a valid email',
        '\"password\" length must be at least 8 characters long',
        '\"phone\" with value \"385993404575\" fails to match the required pattern: /^\\+(?:\\d\\s?){6,14}\\d$/'
      ]
    },
    InvalidId: {
      message: '\"id\" length must be at least 24 characters long'
    },
    InvalidResetPassword: {
      message: '\"password\" length must be at least 8 characters long'
    },
    InvalidReservation: {
      message: [
        '"field" length must be at least 24 characters long',
        '"time" must be in iso format',
        '"match" must be a string',
        '"isCanceled" must be a boolean',
        '"isScheduled" must be a boolean',
        '"isFinished" is not allowed'
      ]
    },
    InvalidDoubleId: {
      message: [
        '"id" length must be at least 24 characters long',
        '"playerId" length must be at least 24 characters long'
      ]
    },
    InvalidFilterQuery: {
      message: [
        '"hour" must be less than or equal to 24',
        '"dayOfWeek" must be less than or equal to 7',
        '"date" must be in YYYY-MM-DD format'
      ]
    },
    InvalidPassword: {
      message: 'Incorrect password!'
    },
    InvalidResult: {
      message: [
        '"whiteTeamScore" must be a number',
        '"blackTeamScore" must be less than or equal to 30'
      ]
    },
    InvalidEmail: {
      message: [
        '\"email\" must be a valid email'
      ]
    }
  },

  security: [{
    bearerAuth: []
  }]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
