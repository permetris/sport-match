const mongoose = require('mongoose');

const User = require('../models/User');
const Team = require('../models/Team');
const Reservation = require('../models/Reservation');
const Match = require('../models/Match');
const Result = require('../models/Result');
const Field = require('../models/Field');

const unseedDB = async () => {
  await Promise.all([
    User.deleteMany(),
    Team.deleteMany(),
    Match.deleteMany(),
    Field.deleteMany(),
    Result.deleteMany(),
    Reservation.deleteMany()
  ]).catch(err => { throw new Error(err); });
};

const runUnseed = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/`);
  await unseedDB();
  await mongoose.connection.close();
};

module.exports.runUnseed = runUnseed;

if (require.main === module) {
  runUnseed().then(() => {
    console.log('done');
  }).catch((err) => {
    console.error(err);
  });
}
