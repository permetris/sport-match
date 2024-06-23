const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        autopupulate: true
    }],
    color: {
        type: String,
        enum: ['white', 'black']
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
// teamSchema.pre('find', async function () {
//     this.populate({
//         path: 'players',
//         model: 'User',
//         select: 'username isDeleted'
//     });
// });
teamSchema.plugin(require('mongoose-autopopulate'));

module.exports = { TeamModel: mongoose.model('Team', teamSchema), teamSchema };
