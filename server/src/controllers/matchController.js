const { getAll, deleteOne, updateOne } = require('./crudController');
const { MatchModel } = require('../models/Match');
const Result = require('../models/Result');
const mongoose = require('mongoose');
const { ErrorMessages } = require('../errors/ErrorMessages');
const { NotFoundError } = require('../errors/Errors');
const { HTTP_STATUS } = require('../constants/httpCodes');

const viewAllMacthes = async (req, res) => {
    await getAll(MatchModel, req, res);
};

const viewSingleMatch = async (req, res) => {
    const { id } = req.params;

    const matchDetails = await MatchModel.findOne({ _id: id })
        .populate('result')
        .populate('blackTeam')
        .populate('whiteTeam');

    if (!matchDetails) throw new NotFoundError(ErrorMessages.dataNotFound);
    res.status(HTTP_STATUS.OK).json({ success: true, data: matchDetails });
};

const updateMatch = async (req, res) => {
    await updateOne(MatchModel, req, res);
};

const deleteMatch = async (req, res) => {
    await deleteOne(MatchModel, req, res);
};

const addResult = async (req, res) => {
    const { id } = req.params;

    const result = await Result.create(req.body);
    const addResultToMatch = await MatchModel.findByIdAndUpdate({ _id: id }, {
        $set: { result: mongoose.Types.ObjectId(result._id) }
    });

    if (!addResultToMatch) throw new NotFoundError(ErrorMessages.dataNotFound);

    res.status(HTTP_STATUS.ACCEPTED).json({ success: true, data: addResultToMatch });
};

const updateResult = async (req, res) => {
    const { resId } = req.params;

    const updatedResult = await Result.findByIdAndUpdate({ _id: resId }, req.body);

    if (!updatedResult) throw new NotFoundError(ErrorMessages.dataNotFound);

    res.status(HTTP_STATUS.OK).json({ success: true, data: updatedResult });
};

const deleteResult = async (req, res) => {
    const { resId } = req.params;

    const deletedResult = await Result.findByIdAndDelete({ _id: resId });

    if (!deletedResult) throw new NotFoundError(ErrorMessages.dataNotFound);

    res.status(HTTP_STATUS.OK).json({ success: true, data: deletedResult });
};

module.exports = {
    addResult,
    updateResult,
    deleteResult,
    viewAllMacthes,
    viewSingleMatch,
    updateMatch,
    deleteMatch
};
