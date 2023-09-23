const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = [
  {
    _id: new ObjectId('63eb76f1c6a15537f1bbb59f'),
    name: 'Test Field 1',
    address: 'Test Address 1',
    city: 'Split',
    maxPlayers: 10,
    owner: new ObjectId('63eb6abf9792291234cd6a75')
  },
  {
    _id: new ObjectId('63eb76f1c6a15537f1bbb5a0'),
    name: 'Test Field 3',
    address: 'Test Address 3',
    city: 'Split',
    maxPlayers: 8,
    owner: new ObjectId('63eb6abf9792291234cd6a75')
  },
  {
    _id: new ObjectId('63eb76f1c6a15537f1bbb5a1'),
    name: 'Test Field 2',
    address: 'Test Address 2',
    city: 'Split',
    maxPlayers: 6,
    owner: new ObjectId('63eb6abf9792291234cd6a75')
  }
];
