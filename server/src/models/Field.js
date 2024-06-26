const mongoose = require('mongoose');
const { citySchema } = require('./City');

const fieldSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 50,
        unique: true
    },
    city: {
        type: citySchema
    },
    address: {
        type: String,
        minLength: 8,
        maxLength: 50
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    maxPlayers: {
        type: Number,
        default: 0,
        validate: {
            validator: function () {
                return this.maxPlayers % 2 === 0;
            }
        }
    },
    isOutdoor: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
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

module.exports = { FieldModel: mongoose.model('Field', fieldSchema), fieldSchema };
