const mailContexts = {
  badWeather: {
    cancelationReason: 'bad weather',
    subject: 'Match Canceled - Bad weather'
  },
  notEnoughPlayers: {
    cancelationReason: 'insufficent number of registered players',
    subject: 'Match Canceled - Insufficet players'
  },
  scheduled: {
    subject: 'Match Confiramtion'
  }
};

module.exports = { mailContexts };
