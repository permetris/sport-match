const { getOne, getAll, deleteOne, createOne, updateOne } = require('./crudController');
const { FieldModel } = require('../models/Field');

const createField = async (req, res) => {
    await createOne(FieldModel, req, res);
};

const viewAllFields = async (req, res) => {
    await getAll(FieldModel, req, res);
};

const viewSingleField = async (req, res) => {
    await getOne(FieldModel, req, res);
};

const updateField = async (req, res) => {
    await updateOne(FieldModel, req, res);
};

const deleteField = async (req, res) => {
    await deleteOne(FieldModel, req, res);
};

module.exports = {
    createField,
    viewAllFields,
    viewSingleField,
    updateField,
    deleteField
};
