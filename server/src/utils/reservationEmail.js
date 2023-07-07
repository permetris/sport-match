const { sendEmail } = require('./nodemailerSetup');

const notifyPlayers = async (reservation, context) => {
  const players = reservation.registeredPlayers;
  const info = {
    time: reservation.time.toLocaleString(),
    location: reservation.field.name
  };
  players.forEach(async player => {
    const text = generateEmailText(player, context, info);
    await sendEmail(player.email, context.subject, text);
  });
};

const generateEmailText = (player, context, info) => {
  const reason = context.cancelationReason;
  return reason
    ? `<p>${player.name} ${player.surname}, <br> <br>
    We are informing you that the match scheduled for ${info.time} at ${info.location} is canceled due to ${reason}.</p>
    <br> <br> <p>Sports Matches Organizer Support</p>`
    : `<p>${player.name} ${player.surname}, <br> <br>
    We are informing you that the match scheduled for ${info.time} at ${info.location} will be played on schedule.</p>
    <br> <br> <p>Sports Matches Organizer Support</p>`;
};

module.exports.notifyPlayers = notifyPlayers;
