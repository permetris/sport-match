const { getOne, createOne, getAll, updateOne } = require('./crudController');
const User = require('../models/User');
const Reservation = require('../models/Reservation');
const { ErrorMessages } = require('../errors/ErrorMessages');
const { NotFoundError } = require('../errors/Errors');
const { HTTP_STATUS } = require('../utils/httpCodes.js');
const { successMessages } = require('../utils/successMessages');

const registerUser = async (req, res) => {
  await createOne(User, req, res);
};

const viewAllUsers = async (req, res) => {
  await getAll(User, req, res);
};

const viewSingleUser = async (req, res) => {
  await getOne(User, req, res);
};

const updateUser = async (req, res) => {
  await updateOne(User, req, res);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const userToDelete = await User.findByIdAndUpdate(id, { isDeleted: true });

  if (userToDelete) {
    await Reservation.updateMany({
      registeredPlayers: { $in: [id] }
    },
    {
      $pull: { registeredPlayers: id }
    });
  } else {
    throw new NotFoundError(ErrorMessages.dataNotFound);
  }

  res.status(HTTP_STATUS.OK).json({ success: true, message: successMessages.userDeleted(userToDelete.username) });
};

const viewHistory = async (req, res) => {
  const { id } = req.params;
  const exclude = ' -isScheduled -isCanceled -isFinished -registeredPlayers';

  // eslint-disable-next-line max-len
  const userHistory = await Reservation.find({ registeredPlayers: { $in: [id] }, isFinished: true }, exclude)
    .populate('field', 'name')
    .populate({
      path: 'match',
      populate: {
        path: 'whiteTeam',
        populate: {
          path: 'players'
        }
      }
    })
    .populate({
      path: 'match',
      populate: {
        path: 'blackTeam',
        populate: {
          path: 'players'
        }
      }
    })
    .populate({
      path: 'match',
      populate: {
        path: 'result'
      }
    }).lean();

  if (!userHistory.length) throw new NotFoundError(ErrorMessages.dataNotFound);

  res.status(HTTP_STATUS.OK).json(userHistory);
};

module.exports = {
  registerUser,
  viewAllUsers,
  viewSingleUser,
  updateUser,
  deleteUser,
  viewHistory
};
