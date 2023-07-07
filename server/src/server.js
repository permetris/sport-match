require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./app');

const PORT = process.env.PORT;

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/`)
  .then(() => {
    console.log('Connected!');
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch(err => console.log(err.message));
