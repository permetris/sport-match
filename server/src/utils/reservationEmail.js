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
const notifyPlayersOpenEntry = async (reservation, context) => {
    const info = {
        time: reservation.time.toLocaleString(),
        location: reservation.field.name
    };
    reservation.match.blackTeam.players.forEach(async player => {
        const text = generateEmailText(player, context, info);
        await sendEmail(player.email, context.subject, text);
    });
    reservation.match.whiteTeam.players.forEach(async player => {
        const text = generateEmailText(player, context, info);
        await sendEmail(player.email, context.subject, text);
    });
};

const generateEmailText = (player, context, info) => {
    const reason = context.cancelationReason;
    return reason
        ? `<p>${player.name} ${player.surname}, <br> <br>
    We are informing you that the match scheduled for ${info.time} at ${info.location} is canceled due to ${reason}.</p>
    <br> <br> <p>Game Finder Support</p>`
        : `<p>${player.name} ${player.surname}, <br> <br>
    We are informing you that the match scheduled for ${info.time} at ${info.location} will be played on schedule.</p>
    <br> <br> <p>Game Finder Support</p>`;
};

module.exports.notifyPlayers = notifyPlayers;
module.exports.notifyPlayersOpenEntry = notifyPlayersOpenEntry;
