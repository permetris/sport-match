const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = [

  { // Finished reservation with result
    _id: ObjectId('63eb7dfe5f58194a262d8222'),
    field: new ObjectId('63eb76f1c6a15537f1bbb59f'),
    match: new ObjectId('63eb7f4a8bda2a035ce6454c'),
    time: '2023-11-27T12:00:00Z',
    isCanceled: false,
    isScheduled: true,
    isFinished: true,
    registeredPlayers: [
      new ObjectId('63eb6abf9792291234cd6a75'),
      new ObjectId('63eb6abf9792291234cd6a76'),
      new ObjectId('63eb6abf9792291234cd6a77'),
      new ObjectId('63eb788d339bb827e5fe77d2'),
      new ObjectId('63eb788d339bb827e5fe77d3'),
      new ObjectId('63eb788d339bb827e5fe77d4')
    ]

  },
  { // Finished reservation with result
    _id: ObjectId('63eb7dfe5f58194a262d8223'),
    field: new ObjectId('63eb76f1c6a15537f1bbb59f'),
    match: new ObjectId('63eb7f4a8bda2a035ce6454d'),
    time: '2023-11-25T13:00:00Z',
    isCanceled: false,
    isScheduled: true,
    isFinished: true,
    registeredPlayers: [
      new ObjectId('63eb6abf9792291234cd6a75'),
      new ObjectId('63eb788d339bb827e5fe77d3'),
      new ObjectId('63eb6abf9792291234cd6a77'),
      new ObjectId('63eb788d339bb827e5fe77d2'),
      new ObjectId('63eb788d339bb827e5fe77d3'),
      new ObjectId('63eb6abf9792291234cd6a76')
    ]

  },
  { // Reservation to be filled, no match created
    _id: ObjectId('63eb7dfe5f58194a262d8224'),
    field: new ObjectId('63eb76f1c6a15537f1bbb5a1'),
    time: '2023-11-28T10:00:00Z',
    isCanceled: false,
    isScheduled: false,
    isFinished: false,
    registeredPlayers: [
      new ObjectId('63eb6abf9792291234cd6a75'),
      new ObjectId('63eb788d339bb827e5fe77d3'),
      new ObjectId('63eb6abf9792291234cd6a77'),
      new ObjectId('63eb788d339bb827e5fe77d2')
    ]

  },
  { // Canceled reservation
    _id: ObjectId('63eb7dfe5f58194a262d8225'),
    field: new ObjectId('63eb76f1c6a15537f1bbb5a0'),
    match: new ObjectId('63eb7f4a8bda2a035ce6454e'),
    time: '2023-11-24T19:00:00Z',
    isCanceled: true,
    isScheduled: true,
    isFinished: false,
    registeredPlayers: [
      new ObjectId('63eb6abf9792291234cd6a75'),
      new ObjectId('63eb788d339bb827e5fe77d3'),
      new ObjectId('63eb6abf9792291234cd6a77'),
      new ObjectId('63eb788d339bb827e5fe77d2'),
      new ObjectId('63eb788d339bb827e5fe77d5'),
      new ObjectId('63eb788d339bb827e5fe77d6')
    ]

  },
  { // Reservation which has no result entered
    _id: ObjectId('63eb7dfe5f58194a262d8226'),
    field: new ObjectId('63eb76f1c6a15537f1bbb5a0'),
    match: new ObjectId('63eb7f4a8bda2a035ce6454f'),
    time: '2023-11-23T12:00:00Z',
    isCanceled: false,
    isScheduled: true,
    isFinished: false,
    registeredPlayers: [
      new ObjectId('63eb788d339bb827e5fe77da'),
      new ObjectId('63eb788d339bb827e5fe77db'),
      new ObjectId('63eb788d339bb827e5fe77dc'),
      new ObjectId('63eb788d339bb827e5fe77dd'),
      new ObjectId('63eb788d339bb827e5fe77de'),
      new ObjectId('63eb788d339bb827e5fe77df')
    ]
  }
];
