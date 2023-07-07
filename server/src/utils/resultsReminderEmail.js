const User = require('../models/User');
const Match = require('../models/Match');
const Reservation = require('../models/Reservation');
const { sendEmail } = require('./nodemailerSetup');

const checkFinishedMatchResults = async () => {
  const adminUsers = await User.find({ role: 'ADMIN' });
  const finishedGames = await Reservation.find({ isFinished: true });
  for (const game of finishedGames) {
    const match = await Match.find({ id: game.match });
    if (!match.result) {
      for (const admin of adminUsers) {
        const recipient = admin.email;
        const subject = 'Pending match results';
        const link = `${process.env.BASE_URL}/match/${game.match}/result`;
        const text = `<p>${admin.username}, <br> <br> please fill in the results for the following <a href=${link}>match</a>.</p>
            <br> <br> <p>Sports Matches Organizer Support</p>`;

        await sendEmail(recipient, subject, text);
      }
    }
  }
};

module.exports.checkFinishedMatchResults = checkFinishedMatchResults;
