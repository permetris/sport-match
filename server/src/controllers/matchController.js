const { getAll, deleteOne, updateOne } = require('./crudController');
const Match = require('../models/Match');
const Result = require('../models/Result');
const mongoose = require('mongoose');
const { ErrorMessages } = require('../errors/errorMessages');
const { NotFoundError } = require('../errors/Errors');
const { HTTP_STATUS } = require('../utils/httpCodes');

const viewAllMacthes = async (req, res) => {
  await getAll(Match, req, res);
};

const viewSingleMatch = async (req, res) => {
  const { id } = req.params;

  const matchDetails = await Match.findOne({ _id: id })
    .populate('result')
    .populate('blackTeam')
    .populate('whiteTeam');

  if (!matchDetails) throw new NotFoundError(ErrorMessages.dataNotFound);
  res.status(HTTP_STATUS.OK).json({ success: true, data: matchDetails });
};

const updateMatch = async (req, res) => {
  await updateOne(Match, req, res);
};

const deleteMatch = async (req, res) => {
  await deleteOne(Match, req, res);
};

const addResult = async (req, res) => {
  const { id } = req.params;

  const result = await Result.create(req.body);
  const addResultToMatch = await Match.findByIdAndUpdate({ _id: id }, {
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
