/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
        trim: true,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 25,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 25,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 75,
        trim: true,

        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 60
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER', 'FIELD_OWNER']
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
            delete ret.password;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }
});
userSchema.plugin(require('mongoose-autopopulate'));

module.exports = { UserModel: mongoose.model('User', userSchema), userSchema };
