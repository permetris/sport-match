const { deleteOne, createOne, updateOne } = require('./crudController');
const mongoose = require('mongoose');
const { ReservationModel } = require('../models/Reservation');
const { ErrorMessages } = require('../errors/ErrorMessages');
const { NotFoundError, AuthorizationError } = require('../errors/Errors');
const { HTTP_STATUS } = require('../constants/httpCodes');

const createReservation = async (req, res) => {
    await createOne(ReservationModel, req, res);
};

const viewAllReservations = async (req, res) => {
    const { city, date, page = 1, size = 10, status } = req.query;

    const query = {};

    if (city !== 'undefined' && city !== undefined && city !== '') {
        query['field.city.name'] = city;
    }
    if (status) {
        query.status = status;
    }
    if (date !== 'undefined' && date !== undefined && date !== '') {
        const dayFrom = new Date(date);
        const dayTo = new Date(dayFrom);
        dayTo.setDate(dayTo.getDate() + 1);

        query.time = {
            $gte: dayFrom.toISOString(),
            $lte: dayTo.toISOString()
        };
    }
    const skip = (page - 1) * size;
    const totalItems = await ReservationModel.countDocuments(query);

    const foundReservations = await ReservationModel.find(query)
        .sort({ time: 1 })
        .skip(skip)
        .limit(size)
    ;
    return res.status(HTTP_STATUS.OK).json({ data: foundReservations, totalItems });
};

const viewSingleReservation = async (req, res) => {
    const { id } = req.params;

    const reservation = await ReservationModel.findOne({ _id: id }, '-color');

    if (!reservation) throw new NotFoundError(ErrorMessages.dataNotFound);

    res.status(HTTP_STATUS.OK).json(reservation);
};

const updateReservation = async (req, res) => {
    await updateOne(ReservationModel, req, res);
};

const deleteReservation = async (req, res) => {
    await deleteOne(ReservationModel, req, res);
};

const cancelReservation = async (req, res) => {
    const { id } = req.params;

    const dataUpdated = await ReservationModel.findByIdAndUpdate(id, { isCanceled: true }, {
        new: true
    });

    if (!dataUpdated) throw new NotFoundError(ErrorMessages.dataNotFound);

    res.status(HTTP_STATUS.OK).json({ success: true, data: dataUpdated });
};

const addPlayerToReservation = async (req, res) => {
    const player = req.params.playerId;

    const find = await ReservationModel
        .findByIdAndUpdate(
            { _id: req.params.id },
            { $addToSet: { registeredPlayers: mongoose.Types.ObjectId(player) } }
        );

    if (!find) throw new NotFoundError(ErrorMessages.dataNotFound);

    res.status(HTTP_STATUS.OK).json({ success: true });
};

const removePlayerFromReservation = async (req, res) => {
    const player = req.params.playerId;
    if (player !== req.user.id && req.user.role !== 'ADMIN') {
        throw new AuthorizationError(ErrorMessages.unauthorized);
    }

    const find = await ReservationModel
        .findByIdAndUpdate({ _id: req.params.id },
            {
                $pull: { registeredPlayers: mongoose.Types.ObjectId(player) }
            }
        );

    if (!find) throw new NotFoundError(ErrorMessages.dataNotFound);

    res.status(HTTP_STATUS.OK).json({ success: true });
};

const filterReservation = async (req, res) => {
    const { hour, dayOfWeek, date } = req.query;
    const exclude = '-registeredPlayers';
    const startDateTime = new Date(`${date}T00:00:00.000+00:00`);
    const endDateTime = new Date(`${date}T23:59:00.000+00:00`);

    const findQuery = {};
    const andCond = [];

    if (hour && hour !== '') {
        andCond.push({ $expr: { $eq: [{ $hour: '$time' }, hour] } });
    }
    if (dayOfWeek && dayOfWeek !== '') {
        andCond.push({ $expr: { $eq: [{ $dayOfWeek: '$time' }, parseInt(dayOfWeek)] } });
    }
    if (andCond.length > 0) findQuery.$and = andCond;

    if (date && date !== '') {
        findQuery.time = { $gte: startDateTime, $lte: endDateTime };
    }

    const filteredReservation = await ReservationModel.find(findQuery, exclude);

    if (!filteredReservation.length) throw new NotFoundError(ErrorMessages.dataNotFound);

    res.status(HTTP_STATUS.OK).json({ filteredReservation });
};

module.exports = {
    createReservation,
    viewAllReservations,
    viewSingleReservation,
    updateReservation,
    deleteReservation,
    cancelReservation,
    addPlayerToReservation,
    removePlayerFromReservation,
    filterReservation
};
