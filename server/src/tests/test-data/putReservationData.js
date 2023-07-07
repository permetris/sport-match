const { HTTP_STATUS } = require('../../utils/httpCodes');

const putReservationData = [
  ['63eb7dfe5f58194a262d8224', {
    field: '63eb76f1c6a15537f1bbb59f',
    match: '63eb7f4a8bda2a035ce6454c',
    time: '2023-05-26T17:00:00Z',
    isCanceled: false,
    isScheduled: true,
    registeredPlayers: [
      '63eb6abf9792291234cd6a75',
      '63eb788d339bb827e5fe77d3',
      '63eb6abf9792291234cd6a77',
      '63eb788d339bb827e5fe77d2',
      '63eb788d339bb827e5fe77d4'
    ]
  },
  HTTP_STATUS.ACCEPTED],
  ['63eb7dfe5f581aaa262d8224', {
    field: '63eb76f1c6a15537f1bbb59f',
    match: '63eb7f4a8bda2a035ce6454c',
    time: '2023-05-26T17:00:00Z',
    isCanceled: false,
    isScheduled: true,
    num: 6,
    registeredPlayers: [
      '63eb6abf9792291234cd6a75',
      '63eb6abf9792291234cd6a76',
      '63eb6abf9792291234cd6a77',
      '63eb788d339bb827e5fe77d2',
      '63eb788d339bb827e5fe77d3',
      '63eb788d339bb827e5fe77d4'
    ]
  },
  HTTP_STATUS.NOT_FOUND],
  ['63eb7dfe5f58194a262d8224', {
    match: '63eb7f4a8bda2a035ce6454c',
    time: '2023-05-26T17:00:00Z',
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
  },
  HTTP_STATUS.INVALID],
  ['63eb7dfe5f58194a262d8224', {
    field: '63eb76f1c6a15537f1bbb59f',
    match: '63eb7f4a8bda2a035ce6454c',
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
  },
  HTTP_STATUS.INVALID],
  ['63eb7dfe5f58194a262d8224', {
    field: '63eb76f1c6a15537f1bbb59f',
    match: 5,
    time: '2023-05-26T17:00:00Z',
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
  },
  HTTP_STATUS.INVALID],
  ['63eb7dfe5f58194a262d8224', {
    field: '63eb76f1c6a15537f1bbb59f',
    match: '63eb7f4a8bda2a035ce6454c',
    time: '2023-05-26T17:00:00Z',
    isCanceled: 'rt',
    isScheduled: true,
    registeredPlayers: [
      '63eb6abf9792291234cd6a75',
      '63eb6abf9792291234cd6a76',
      '63eb6abf9792291234cd6a77',
      '63eb788d339bb827e5fe77d2',
      '63eb788d339bb827e5fe77d3',
      '63eb788d339bb827e5fe77d4'
    ]
  },
  HTTP_STATUS.INVALID],
  ['63eb7dfe5f58194a262d8224', {
    field: '63eb76f1c6a15537f1bbb59f',
    match: '63eb7f4a8bda2a035ce6454c',
    time: '2023-05-26T17:00:00Z',
    isCanceled: false,
    isScheduled: 'ad',
    registeredPlayers: [
      '63eb6abf9792291234cd6a75',
      '63eb6abf9792291234cd6a76',
      '63eb6abf9792291234cd6a77',
      '63eb788d339bb827e5fe77d2',
      '63eb788d339bb827e5fe77d3',
      '63eb788d339bb827e5fe77d4'
    ]
  },
  HTTP_STATUS.INVALID],
  ['63eb7dfe5f58194a262d8224222', {
    field: '63eb76f1c6a15537f1bbb59f',
    match: '63eb7f4a8bda2a035ce6454c',
    time: '2023-05-26T17:00:00Z',
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
  },
  HTTP_STATUS.INVALID],
  ['63eb7dfe5f58194a26224', {
    field: '63eb76f1c6a15537f1bbb59f',
    match: '63eb7f4a8bda2a035ce6454c',
    time: '2023-05-26T17:00:00Z',
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
  },
  HTTP_STATUS.INVALID],
  ['63eb7dfe5f58194a262d8224', {
    field: '63eb76f1c6a15537f1bbb59f',
    match: '63eb7f4a8bda2a035ce6454c',
    time: '2023-34-567',
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
  },
  HTTP_STATUS.INVALID],
  ['63eb7dfe5f58194a262d8224', {
    field: '63eb76f1c6a15537f1bbb59f',
    match: '63eb7f4a8bda2a035ce6454c',
    time: '2023-05-26T17:00:00Z',
    isCanceled: 3,
    isScheduled: true,
    registeredPlayers: [
      '63eb6abf9792291234cd6a75',
      '63eb6abf9792291234cd6a76',
      '63eb6abf9792291234cd6a77',
      '63eb788d339bb827e5fe77d2',
      '63eb788d339bb827e5fe77d3',
      '63eb788d339bb827e5fe77d4'
    ]
  },
  HTTP_STATUS.INVALID],
  ['63eb7dfe5f58194a262d8224', {
    field: '63eb76f1c6a15537f1bbb59f',
    match: '63eb7f4a8bda2a035ce6454c',
    time: '2023-05-26T17:00:00Z',
    isCanceled: false,
    isScheduled: 2,
    registeredPlayers: [
      '63eb6abf9792291234cd6a75',
      '63eb6abf9792291234cd6a76',
      '63eb6abf9792291234cd6a77',
      '63eb788d339bb827e5fe77d2',
      '63eb788d339bb827e5fe77d3',
      '63eb788d339bb827e5fe77d4'
    ]
  },
  HTTP_STATUS.INVALID],
  ['63eb7dfe5f58194a262d8226', {
    field: '63eb76f1c6a15537f1bbb5a0',
    match: '63eb7f4a8bda2a035ce6454f',
    time: '2023-03-28T19:30:00Z',
    isCanceled: false,
    registeredPlayers: [
      '63eb788d339bb827e5fe77da',
      '63eb788d339bb827e5fe77db',
      '63eb788d339bb827e5fe77dc',
      '63eb788d339bb827e5fe77dd',
      '63eb788d339bb827e5fe77de',
      '63eb788d339bb827e5fe77df',
      '63eb788d339bb827e5fe77d2',
      '63eb788d339bb827e5fe77d3',
      '63eb788d339bb827e5fe77d4'
    ]
  },
  HTTP_STATUS.INVALID]
];

module.exports = putReservationData;
