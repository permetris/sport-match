const { HTTP_STATUS } = require('../../utils/httpCodes.js');

module.exports.postUserData = [
  [{
    username: 'uniqueusr',
    name: 'Unique',
    surname: 'Usr',
    email: 'uniqueusr@email.com',
    password: 'password',
    phone: '+385993404555',
    role: 'USER'
  }, HTTP_STATUS.CREATED],
  [{
    name: 'Unique',
    surname: 'Usr',
    email: 'uniqueusr@email.com',
    password: 'password',
    phone: '+385993404555',
    role: 'USER'
  }, HTTP_STATUS.INVALID],
  [{
    username: 'uniqueusr',
    surname: 'Usr',
    email: 'uniqueusr@email.com',
    password: 'password',
    phone: '+385993404555',
    role: 'USER'
  }, HTTP_STATUS.INVALID],
  [{
    username: 'uniqueusr',
    name: 'Unique',
    email: 'uniqueusr@email.com',
    password: 'password',
    phone: '+385993404555',
    role: 'USER'
  }, HTTP_STATUS.INVALID],
  [{
    username: 'uniqueusr',
    name: 'Unique',
    surname: 'Usr',
    password: 'password',
    phone: '+385993404555',
    role: 'USER'
  }, HTTP_STATUS.INVALID],
  [{
    username: 'uniqueusr',
    name: 'Unique',
    surname: 'Usr',
    email: 'uniqueusr@email.com',
    password: 'password',
    role: 'USER'
  }, HTTP_STATUS.INVALID],
  [{
    username: 'someuser',
    name: 'some',
    surname: 'name',
    email: 'uniqueusr@email.com',
    password: 'password',
    phone: '+385993404522',
    role: 'USER'
  }, 409],
  [{
    username: 'u',
    name: 'Unique',
    surname: 'Usr',
    email: 'uniqueusr@email.com',
    password: 'password',
    phone: '+385993404555',
    role: 'USER'
  }, HTTP_STATUS.INVALID],
  [{
    username: 'us',
    name: 'Unique',
    surname: 'Usr',
    email: 'uniqueusr@email.com',
    password: 'password',
    phone: '+385993404555',
    role: 'USER'
  }, HTTP_STATUS.INVALID],
  [{
    username: 'use',
    name: 'U',
    surname: 'Usr',
    email: 'uniqueusr@email.com',
    password: 'password',
    phone: '+385993404555',
    role: 'USER'
  }, HTTP_STATUS.INVALID],
  [{
    username: 'user1',
    name: 'Un',
    surname: 'Usr',
    email: 'uniqueusr@email.com',
    password: 'password',
    phone: '+385993404555',
    role: 'USER'
  }, HTTP_STATUS.INVALID],
  [{
    username: 'user1',
    name: 'Uni',
    surname: 'Us',
    email: 'uniqueusr@email.com',
    password: 'password',
    phone: '+385993404555',
    role: 'USER'
  }, HTTP_STATUS.INVALID],
  [{
    username: 'user1',
    name: 'u',
    surname: 'U',
    email: 'uniqueusr@email.com',
    password: 'password',
    phone: '+385993404555',
    role: 'USER'
  }, HTTP_STATUS.INVALID],
  [{
    username: 'user1',
    name: 'user',
    surname: 'Unique',
    email: 'uniqueusremail.com',
    password: 'password',
    phone: '+385993404555',
    role: 'USER'
  }, HTTP_STATUS.INVALID],
  [{
    username: 'user1',
    name: 'Unique',
    surname: 'Uni',
    email: 'uniqueusr@email.com',
    password: 'passwo',
    phone: '+385993404555',
    role: 'USER'
  }, HTTP_STATUS.INVALID],
  [{
    username: 'user1',
    name: 'Unique',
    surname: 'Uni',
    email: 'uniqueusr@email.com',
    password: 'password',
    phone: '385993404555',
    role: 'USER'
  }, HTTP_STATUS.INVALID]
];
