const JoiBase = require('joi');
const JoiDate = require('@joi/date');

const Joi = JoiBase.extend(JoiDate);

const idSchema = Joi.object({
    id: Joi.string().min(24).max(24).hex().required()
});

const passwordSchema = Joi.object({
    password: Joi.string().min(8).max(20).required(),
    repeatPassword: Joi.string().min(8).max(20).required(),
    id: Joi.string().min(24).max(24).hex().required(),
    emailToken: Joi.string().min(64).max(64).hex().required()
});

const emailSchema = Joi.object({
    email: Joi.string().min(3).max(50).email({ minDomainSegments: 2 }).required()
});

const resetParamsSchema = Joi.object({
    id: Joi.string().min(24).max(24).hex().required(),
    emailToken: Joi.string().min(64).max(64).hex().required()

});

const doubleIdSchema = Joi.object({
    id: Joi.string().min(24).max(24).hex().required(),
    playerId: Joi.string().min(24).max(24).hex().required()
}).options({ abortEarly: false });

const querySchema = Joi.object({
    hour: Joi.number().min(0).max(24),
    dayOfWeek: Joi.number().min(1).max(7),
    date: Joi.date().format('YYYY-MM-DD')
}).options({ abortEarly: false });

const fieldSchema = Joi.object({
    _id: Joi.string().min(24).max(24).hex(),
    name: Joi.string().min(5).max(50).required(),
    address: Joi.string().min(4).max(50).required(),
    maxPlayers: Joi.number().min(6).max(22).multiple(2).required(),
    city: Joi.object({
        _id: Joi.string().min(24).max(24).hex().required(),
        name: Joi.string().min(5).max(50).required(),
        createdAt: Joi.string(),
        updatedAt: Joi.string()
    }),
    owner: Joi.string().min(24).max(24).hex().required(),
    isDeleted: Joi.boolean(),
    isOutdoor: Joi.boolean()
}).options({ abortEarly: false });

const matchSchema = Joi.object({
    whiteTeam: Joi.string().min(24).max(24).hex().required(),
    blackTeam: Joi.string().min(24).max(24).hex().required(),
    result: Joi.string().min(24).max(24).hex().required()
}).options({ abortEarly: false });

const reservationSchema = Joi.object({
    field: Joi.string().min(24).max(24).hex().required(),
    time: Joi.string().isoDate().required(),
    match: Joi.string(),
    isCanceled: Joi.boolean(),
    isScheduled: Joi.boolean(),
    registeredPlayers: Joi.array().items(Joi.string()),
    openEntry: Joi.boolean()
}).options({ abortEarly: false });

const resultSchema = Joi.object({
    whiteTeamScore: Joi.number().min(0).max(30).required(),
    blackTeamScore: Joi.number().min(0).max(30).required()
}).options({ abortEarly: false });

const teamSchema = Joi.object({
    players: Joi.array().items(Joi.string()).max(3),
    color: Joi.string().valid('white', 'black').required()
}).options({ abortEarly: false });

const userSchema = Joi.object({
    _id: Joi.string().min(24).max(24).hex(),
    username: Joi.string().min(2).max(50).required(),
    name: Joi.string().min(3).max(25).pattern(/[A-Za-z]+( [A-Za-z]+)*$/).required(),
    surname: Joi.string().min(3).max(25).pattern(/[A-Za-z]+( [A-Za-z]+)*$/).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(8).max(20),
    phone: Joi.string().required(),
    role: Joi.string().valid('ADMIN', 'USER', 'FIELD_OWNER'),
    isDeleted: Joi.boolean()

}).options({ abortEarly: false });
const citySchema = Joi.object({
    _id: Joi.string().min(24).max(24).hex(),
    name: Joi.string().min(5).max(50).required()
}).options({ abortEarly: false });

module.exports = {
    idSchema,
    passwordSchema,
    emailSchema,
    resetParamsSchema,
    querySchema,
    fieldSchema,
    matchSchema,
    reservationSchema,
    resultSchema,
    teamSchema,
    userSchema,
    doubleIdSchema,
    citySchema
};
