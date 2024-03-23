const { getAll, deleteOne, updateOne } = require('./crudController');
const { TeamModel } = require('../models/Team');
const { ErrorMessages } = require('../errors/ErrorMessages');
const { NotFoundError } = require('../errors/Errors');
const { HTTP_STATUS } = require('../constants/httpCodes');

const viewAllTeams = async (req, res) => {
    await getAll(TeamModel, req, res);
};

const viewSingleTeam = async (req, res) => {
    const { id } = req.params;
    const dataFound = await TeamModel.findById(id).populate({
        path: 'players',
        select: 'username'
    });
    if (!dataFound) throw new NotFoundError(ErrorMessages.dataNotFound);

    res.status(HTTP_STATUS.OK).json({ success: true, data: dataFound });
};

const updateTeam = async (req, res) => {
    await updateOne(TeamModel, req, res);
};

const deleteTeam = async (req, res) => {
    await deleteOne(TeamModel, req, res);
};

module.exports = {
    viewAllTeams,
    viewSingleTeam,
    updateTeam,
    deleteTeam
};
