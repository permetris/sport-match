const { fetchWeather } = require('./fetchWeather');
const { ReservationModel } = require('../models/Reservation');
const { notifyPlayers, notifyPlayersOpenEntry } = require('./reservationEmail');
const { mailContexts } = require('./mailContexts');

const checkEligibleReservations = async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const reservations = await ReservationModel.find({
        status: 'scheduled',
        time: {
            $gte: new Date().toISOString(),
            $lte: tomorrow.toISOString().slice(0, 10)
        }
    }).populate({
        path: 'field'
    }).populate({
        path: 'registeredPlayers',
        model: 'User'
    })
        .populate({
            path: 'match',
            populate:

        { path: 'blackTeam', populate: { path: 'players', model: 'User' } }

        });

    for (const reservation of reservations) {
        checkConditionsAndNotify(reservation);
    }
};

const createMatchForReservation = async (id) => {
    const res = await ReservationModel.findById(id);
    console.log(res);
    await res.createMatch();
};

const checkConditionsAndNotify = async (reservation) => {
    if (reservation.openEntry) {
        const amountRegistered = reservation.match.blackTeam.players.length + reservation.match.whiteTeam.players.length;
        if (amountRegistered !== reservation.field.maxPlayers) {
            await ReservationModel.findByIdAndUpdate(reservation._id, { status: 'canceled' }, { new: true });
            notifyPlayersOpenEntry(reservation, mailContexts.notEnoughPlayers);
            return;
        }
    } else {
        const amountRegistered = reservation.registeredPlayers.length;
        if (amountRegistered !== reservation.field.maxPlayers) {
            await ReservationModel.findByIdAndUpdate(reservation._id, { status: 'canceled' });
            notifyPlayers(reservation, mailContexts.notEnoughPlayers);
            return;
        }
    }

    if (!reservation.field.isOutdoor) {
        if (reservation.openEntry) {
            await ReservationModel.findByIdAndUpdate(reservation._id, { status: 'done' }, { new: true });
            notifyPlayersOpenEntry(reservation, mailContexts.scheduled);
        } else {
            await createMatchForReservation(reservation._id);
            notifyPlayers(reservation, mailContexts.scheduled);
        }
    } else {
        const isWeatherGood = await fetchWeather(reservation.field.city);
        if (isWeatherGood) {
            if (reservation.openEntry) {
                await ReservationModel.findByIdAndUpdate(reservation._id, { status: 'done' }, { new: true });
                notifyPlayersOpenEntry(reservation, mailContexts.scheduled);
            } else {
                await createMatchForReservation(reservation._id);
                notifyPlayers(reservation, mailContexts.scheduled);
            }
        } else {
            if (reservation.openEntry) {
                notifyPlayersOpenEntry(reservation, mailContexts.scheduled);
            } else {
                await createMatchForReservation(reservation._id);
                notifyPlayers(reservation, mailContexts.scheduled);
            }
        }
    }
};

module.exports.checkEligibleReservations = checkEligibleReservations;
module.exports.checkConditionsAndNotify = checkConditionsAndNotify;
