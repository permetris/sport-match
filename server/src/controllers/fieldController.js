const { getOne, getAll, deleteOne, createOne, updateOne } = require('./crudController');
const Field = require('../models/Field');

const createField = async (req, res) => {
  await createOne(Field, req, res);
};

const viewAllFields = async (req, res) => {
  await getAll(Field, req, res);
};

const viewSingleField = async (req, res) => {
  await getOne(Field, req, res);
};

const updateField = async (req, res) => {
  await updateOne(Field, req, res);
};

const deleteField = async (req, res) => {
  await deleteOne(Field, req, res);
};

module.exports = {
  createField,
  viewAllFields,
  viewSingleField,
  updateField,
  deleteField
};
