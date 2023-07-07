const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Team = require('../models/Team');
const Reservation = require('../models/Reservation');
const Match = require('../models/Match');
const Result = require('../models/Result');
const Field = require('../models/Field');

const users = require('./seedData/users');
const teams = require('./seedData/teams');
const reservations = require('./seedData/reservations');
const matches = require('./seedData/matches');
const results = require('./seedData/results');
const fields = require('./seedData/fields');

const seedDB = async () => {
  const userWithHashPasswordPromiseArray = users.map(
    async (user) => {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      return user;
    }
  );

  const userWithHashedPasswordArray = await Promise.all(userWithHashPasswordPromiseArray);

  await Promise.all([
    User.deleteMany(),
    Team.deleteMany(),
    Match.deleteMany(),
    Field.deleteMany(),
    Result.deleteMany(),
    Reservation.deleteMany()
  ]).catch(err => { throw new Error(err); });

  await Promise.all([
    User.insertMany(userWithHashedPasswordArray),
    Team.insertMany(teams),
    Field.insertMany(fields),
    Match.insertMany(matches),
    Result.insertMany(results),
    Reservation.insertMany(reservations)
  ]).catch(err => { throw new Error(err); });
};

const runSeed = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/`);
  await seedDB();
  await mongoose.connection.close();
};
module.exports.runSeed = runSeed;

if (require.main === module) {
  runSeed().then(() => {
    console.log('done');
  }).catch((err) => {
    console.error(err);
  });
}
