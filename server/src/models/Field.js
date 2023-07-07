const mongoose = require('mongoose');

const fieldSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 50,
    unique: true
  },
  city: {
    type: String,
    minLength: 3,
    maxLength: 50
  },
  address: {
    type: String,
    minLength: 8,
    maxLength: 50,
    unique: true

  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  maxPlayers: {
    type: Number,
    default: 0,
    validate: {
      validator: function () {
        return this.maxPlayers % 2 === 0;
      }
    }
  }

}, {
  timestamps: true,
  strict: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.createdAt;
      delete ret.updatedAt;
    }
  }
});

module.exports = mongoose.model('Field', fieldSchema);
