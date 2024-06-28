const { checkConditionsAndNotify } = require('./src/utils/checkEligibleReservations');
const { ReservationModel } = require('./src/models/Reservation');
const mongoose = require('mongoose');
mongoose.connect('mongodb://root:root@localhost:27017/')
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(err => console.log(err.message));

async function run (id) {
    const reservation = await ReservationModel.find({ num: id });
    checkConditionsAndNotify(reservation);
}
run(4);
