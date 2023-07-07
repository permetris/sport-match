const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({

  whiteTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'

  },
  blackTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'

  },
  result: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result'

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

matchSchema.pre('find', function () {
  this.populate('result').populate('whiteTeam').populate('blackTeam');
});

module.exports = mongoose.model('Match', matchSchema);
