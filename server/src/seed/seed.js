const mongoose = require('mongoose');

const generateFakeData = require('./generateData');

const runSeed = async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/`);
    await generateFakeData();
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
