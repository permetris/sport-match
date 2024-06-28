const { getOne, deleteOne, createOne, updateOne } = require('./crudController');
const { CityModel } = require('../models/City');
const { HTTP_STATUS } = require('../constants/httpCodes');
const exclude = '-updatedAt -createdAt -password -role';
const createCity = async (req, res) => {
    await createOne(CityModel, req, res);
};

const viewAllCitys = async (req, res) => {
    const { page = 1, size = 10 } = req.query;
    const skip = (page - 1) * size;

    const dataFound = await CityModel.find({}, exclude)
        .lean()
        .skip(skip)
        .limit(size);

    const totalItems = await CityModel.countDocuments();

    res.status(HTTP_STATUS.OK).json({ success: true, data: dataFound, totalItems });
};

const viewSingleCity = async (req, res) => {
    await getOne(CityModel, req, res);
};

const updateCity = async (req, res) => {
    await updateOne(CityModel, req, res);
};

const deleteCity = async (req, res) => {
    await deleteOne(CityModel, req, res);
};

module.exports = {
    createCity,
    viewAllCitys,
    viewSingleCity,
    updateCity,
    deleteCity
};
