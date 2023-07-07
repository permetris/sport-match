const { HTTP_STATUS } = require('../../utils/httpCodes');

const postReservationData = [
  [{
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
  },
  HTTP_STATUS.CREATED],
  [{
    field: '63eb76f1c6a15537f1bbb5a0sdf',
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
  },
  HTTP_STATUS.INVALID],
  [{
    field: '',
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
  },
  HTTP_STATUS.INVALID],
  [{
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
  },
  HTTP_STATUS.INVALID],
  [{
    field: '63eb76f1c6a15537f1bbb5a0',
    match: '63eb7f4a8bda2a035ce6454c',
    isCanceled: false,
    isScheduled: false,
    registeredPlayers: [
      '63eb6abf9792291234cd6a75',
      '63eb6abf9792291234cd6a76',
      '63eb6abf9792291234cd6a77',
      '63eb788d339bb827e5fe77d2'
    ]
  },
  HTTP_STATUS.INVALID],
  [{
    field: '63eb76f1c6a15537f1bbb5a0',
    match: '63eb7f4a8bda2a035ce6454c',
    time: '23645236574',
    isCanceled: false,
    isScheduled: false,
    registeredPlayers: [
      '63eb6abf9792291234cd6a75',
      '63eb6abf9792291234cd6a76',
      '63eb6abf9792291234cd6a77',
      '63eb788d339bb827e5fe77d2'
    ]
  },
  HTTP_STATUS.INVALID],
  [{
    field: '63eb76f1c6a15537f1bbb5a0',
    match: '63eb7f4a8bda2a035ce6454c',
    time: '2023-03-27T19:00:00Z',
    isCanceled: '234',
    isScheduled: false,
    registeredPlayers: [
      '63eb6abf9792291234cd6a75',
      '63eb6abf9792291234cd6a76',
      '63eb6abf9792291234cd6a77',
      '63eb788d339bb827e5fe77d2'
    ]
  },
  HTTP_STATUS.INVALID],
  [{
    field: '63eb76f1c6a15537f1bbb5a0',
    match: '63eb7f4a8bda2a035ce6454c',
    time: '2023-03-27T19:00:00Z',
    isCanceled: false,
    isScheduled: 'hti',
    registeredPlayers: [
      '63eb6abf9792291234cd6a75',
      '63eb6abf9792291234cd6a76',
      '63eb6abf9792291234cd6a77',
      '63eb788d339bb827e5fe77d2'
    ]
  },
  HTTP_STATUS.INVALID],
  [{
    field: '63eb76f1c6a15537f1bbb5a0',
    match: '63eb7f4a8bda2a035ce6454c',
    time: '2023-03-27T19:00:00Z',
    isCanceled: false,
    isScheduled: false,
    registeredPlayers: [
      '63eb6abf9792291234cd6a75',
      '63eb6abf9792291234cd6a76',
      '63eb6abf9792291234cd6a77',
      '63eb788d339bb827e5fe77d2',
      '63eb6abf9792291234cd6a76',
      '63eb6abf9792291234cd6a77',
      '63eb788d339bb827e5fe77d2',
      '63eb788d339bb827e5fe77d3',
      '63eb788d339bb827e5fe77d4'
    ]
  },
  HTTP_STATUS.INVALID],
  [{
    field: 5,
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
  },
  HTTP_STATUS.INVALID],
  [{
    field: '63eb76f1c6a15537f1bbb5a0',
    match: 3,
    time: '2023-03-27T19:00:00Z',
    isCanceled: false,
    isScheduled: false,
    registeredPlayers: [
      '63eb6abf9792291234cd6a75',
      '63eb6abf9792291234cd6a76',
      '63eb6abf9792291234cd6a77',
      '63eb788d339bb827e5fe77d2'
    ]
  },
  HTTP_STATUS.INVALID],
  [{
    field: '63eb76f1c6a15537f1bbb5a0',
    match: '63eb7f4a8bda2a035ce6454c',
    time: '2023-03-27T19:00:00Z',
    isCanceled: false,
    isScheduled: false,
    registeredPlayers: {
      test: '32'
    }
  },
  HTTP_STATUS.INVALID]
];

module.exports = postReservationData;
