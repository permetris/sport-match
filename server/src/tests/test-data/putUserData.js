const { HTTP_STATUS } = require('../../utils/httpCodes.js');

module.exports.putUserData = [
  ['63eb6abf9792291234cd6a77', {
    username: 'updusr',
    surname: 'Success',
    email: 'iburazin@test.com',
    password: 'password',
    phone: '+385993404888',
    role: 'USER'
  }, HTTP_STATUS.INVALID],
  ['63eb6abf9792291234cd6a77', {
    name: 'Update',
    surname: 'Success',
    email: 'iburazin@test.com',
    password: 'password',
    phone: '+385993404888',
    role: 'USER'
  }, HTTP_STATUS.INVALID],
  ['63eb6abf9792291234cd6a77', {
    username: 'User',
    name: 'Update',
    surname: 'Success',
    email: 'iburazin@test.com',
    password: 'password',
    phone: '+385993404888',
    role: 'USER'
  }, HTTP_STATUS.ACCEPTED],
  ['63eb6abf9792291234cd62aa', {
    username: 'User',
    name: 'Update',
    surname: 'Success',
    email: 'success@email.com',
    password: 'password123',
    phone: '+385993404888',
    role: 'ADMIN'
  }, HTTP_STATUS.NO_AUTH],
  ['63eb788d339bb827e5fe77df', {
    username: 'User',
    name: 'Update',
    surname: 'Success',
    email: 'success@email.com',
    password: 'password123',
    phone: '+385993404888',
    role: 'ADMIN'
  }, HTTP_STATUS.NO_AUTH]

];
