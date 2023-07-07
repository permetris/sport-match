require('dotenv').config({
  path: '.env.test'
});

const config = {
  reporters: [
    'default'
  ],
  verbose: true
};

module.exports = config;
