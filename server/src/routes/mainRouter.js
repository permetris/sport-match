const express = require('express');
const fieldRouter = require('./fieldRouter');
const matchRouter = require('./matchRouter');
const reservationRouter = require('./reservationRouter');
const teamRouter = require('./teamRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');

const router = express.Router();

router.use('/field', fieldRouter);
router.use('/match', matchRouter);
router.use('/reservation', reservationRouter);
router.use('/team', teamRouter);
router.use('/user', userRouter);
router.use('/', authRouter);

module.exports = router;
