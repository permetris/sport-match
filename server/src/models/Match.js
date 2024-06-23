const mongoose = require('mongoose');
const { resultSchema } = require('./Result');
const { teamSchema } = require('./Team');

const matchSchema = mongoose.Schema({

    whiteTeam: {
        type: teamSchema,
        default: () => ({ })
    },
    blackTeam: {
        type: teamSchema,
        default: () => ({ })
    },
    result: {
        type: resultSchema,
        ref: 'Result'
    }
}, {
    timestamps: true,
    strict: true,
    versionKey: false,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }
});

module.exports = { MatchModel: mongoose.model('Match', matchSchema), matchSchema };
