const { getOne, deleteOne, createOne, updateOne } = require('./crudController');
const { FieldModel } = require('../models/Field');
const { HTTP_STATUS } = require('../constants/httpCodes');
const { successMessages } = require('../utils/successMessages');

const createField = async (req, res) => {
    await createOne(FieldModel, req, res);
};

const viewAllFields = async (req, res) => {
    const { page = 1, size = 10,isDeleted } = req.query;
    const skip = (page - 1) * size;
    const query = 

    const dataFound = await FieldModel.find({})
        .lean()
        .skip(skip)
        .limit(size);

    const totalItems = await FieldModel.countDocuments();

    res.status(HTTP_STATUS.OK).json({ success: true, data: dataFound, totalItems });
};

const viewSingleField = async (req, res) => {
    await getOne(FieldModel, req, res);
};

const updateField = async (req, res) => {
    await updateOne(FieldModel, req, res);
};

const deleteField = async (req, res) => {
    const { id } = req.params;

    const isDeleted = await FieldModel.findByIdAndUpdate(id, { isDeleted: true });

    if (isDeleted) {
        return res.status(HTTP_STATUS.OK).json({ success: true, message: 'Field deleted.' });
    }

    return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: 'Field not found' });
};

module.exports = {
    createField,
    viewAllFields,
    viewSingleField,
    updateField,
    deleteField
};
