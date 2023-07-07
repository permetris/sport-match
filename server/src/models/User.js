/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const { hashPassword } = require('../utils/hashPassword');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
    maxLength: 16,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 25,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 25,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 25,
    trim: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 60
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\+(?:\d\s?){6,14}\d$/, 'Please enter a valid phone number']

  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER']
  },
  isDeleted: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true,
  strict: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
      delete ret.createdAt;
      delete ret.updatedAt;
    }
  }
});

userSchema.pre('save', async function (next) {
  this.password = hashPassword(this.password);
  next();
});

module.exports = mongoose.model('User', userSchema);
