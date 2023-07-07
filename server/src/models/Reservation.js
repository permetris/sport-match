const mongoose = require('mongoose');
const { ValidationError } = require('../errors/Errors');
const { ErrorMessages } = require('../errors/ErrorMessages');

const Team = require('./Team');
const Match = require('./Match');
const Field = require('./Field');

const reservationSchema = mongoose.Schema({
  field: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Field',
    required: true
  },
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  },
  time: {
    type: Date,
    required: true,
    validate: {
      validator: function () {
        return this.time > new Date();
      }
    }
  },
  isCanceled: {
    type: Boolean,
    default: false
  },
  isFinished: {
    type: Boolean,
    default: false
  },
  isScheduled: {
    type: Boolean,
    default: false
  },
  registeredPlayers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
},
{
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

reservationSchema.method('createMatch', async function () {
  const blackTeam = new Team({ color: 'black' });
  const whiteTeam = new Team({ color: 'white' });
  if (this.registeredPlayers.length % 2 !== 0) throw new ValidationError(ErrorMessages.oddNumber);
  this.registeredPlayers.forEach(player => {
    const selector = Math.round(Math.random());
    if (selector === 0 && blackTeam.players.length < this.field.maxPlayers / 2) {
      blackTeam.players.push(player);
    } else if (selector === 1 && whiteTeam.players.length < this.field.maxPlayers / 2) {
      whiteTeam.players.push(player);
    } else {
      blackTeam.players.length === this.field.maxPlayers / 2
        ? whiteTeam.players.push(player)
        : blackTeam.players.push(player);
    }
  });
  Promise.all([blackTeam.save(), whiteTeam.save()]).catch(err => console.log(err));
  const match = new Match({ blackTeam, whiteTeam });
  await match.save();
  this.match = match._id;
  this.isScheduled = true;
});

reservationSchema.pre('findOneAndUpdate', async function (next) {
  const reservation = await this.model.findOne(this.getQuery()).populate('field');
  if (this._update.registeredPlayers) {
    const playersLengthFromPut = this._update.registeredPlayers.length;
    if (reservation && playersLengthFromPut > reservation.field.maxPlayers) throw new ValidationError(ErrorMessages.playerLimit);
  }
  if (reservation && reservation.registeredPlayers.length === reservation.field.maxPlayers) throw new ValidationError(ErrorMessages.playerLimit);
});

reservationSchema.pre('save', async function (next) {
  const field = await Field.findById(this.field);
  const maxPlayers = field.maxPlayers;
  if (this.registeredPlayers.length > maxPlayers) throw new ValidationError(ErrorMessages.playerLimit);
});

module.exports = mongoose.model('Reservation', reservationSchema);
