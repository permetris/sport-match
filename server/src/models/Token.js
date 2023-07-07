const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
  },
  expireAt: {
    type: Date,
    default: new Date(),
    expires: 360
  }
});

module.exports = mongoose.model('Token', tokenSchema);
