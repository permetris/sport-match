const { getOne, createOne, updateOne } = require('./crudController');
const { FieldModel } = require('../models/Field');
const { HTTP_STATUS } = require('../constants/httpCodes');

const createField = async (req, res) => {
    await createOne(FieldModel, req, res);
};

const viewAllFields = async (req, res) => {
    const { page = 1, size = 10, isDeleted, owner } = req.query;
    const skip = size !== 0 ? (page - 1) * size : 1000;
    const query = {};

    if (isDeleted !== 'undefined') {
        query.isDeleted = isDeleted;
    }

    if (owner && owner !== 'undefined') {
        query.owner = owner;
    }

    const dataFound = await FieldModel.find(query, '-createdAt -updatedAt -deletedAt')
        .lean()
        .populate('city')
        .populate('owner')
        .skip(skip)
        .limit(size);

    const totalItems = await FieldModel.countDocuments(query);

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
