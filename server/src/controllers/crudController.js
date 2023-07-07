const { ErrorMessages } = require('../errors/ErrorMessages');
const { NotFoundError } = require('../errors/Errors');
const { HTTP_STATUS } = require('../utils/httpCodes');

const exclude = '-updatedAt -createdAt -password -role';

const getOne = async (model, req, res) => {
  const { id } = req.params;
  const dataFound = await model.findById(id, exclude).lean();
  if (!dataFound) throw new NotFoundError(ErrorMessages.dataNotFound);

  res.status(HTTP_STATUS.OK).json({ success: true, data: dataFound });
};

const getAll = async (model, req, res) => {
  const dataFound = await model.find({}, exclude).lean();
  res.status(HTTP_STATUS.OK).json({ success: true, data: dataFound });
};

const deleteOne = async (model, req, res) => {
  const { id } = req.params;
  const dataDeleted = await model.findByIdAndDelete(id);
  if (!dataDeleted) throw new NotFoundError(ErrorMessages.dataNotFound);

  res.status(HTTP_STATUS.OK).json({ success: true, data: dataDeleted });
};

const createOne = async (model, req, res) => {
  const dataCreated = await model.create(req.body);
  res.status(HTTP_STATUS.CREATED).json({ success: true, data: dataCreated });
};

const updateOne = async (model, req, res) => {
  const { id } = req.params;
  const dataUpdated = await model.findByIdAndUpdate(id, req.body, {
    new: true
  });
  if (!dataUpdated) throw new NotFoundError(ErrorMessages.dataNotFound);

  res.status(HTTP_STATUS.ACCEPTED).json({ success: true, data: dataUpdated });
};

module.exports = {
  getOne,
  getAll,
  deleteOne,
  createOne,
  updateOne
};
