const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 50

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

module.exports = { CityModel: mongoose.model('City', citySchema), citySchema };
