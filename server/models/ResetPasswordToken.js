const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const moment = require("moment")

const resetPasswordTokenSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
    },
    token: {
        type: String
    },
    tokenIss: {
        type: Number,
        default: moment().unix(),
    },
    tokenExp: {
        type: Number,
        default: 300,
    }
})

resetPasswordTokenSchema.pre('save', function (next) {
    var resetPasswordToken = this;
    next();
})

resetPasswordTokenSchema.methods.generateToken = function (cb) {
    //jsonwebtoken을 이용해서 token을 생성하기
    var resetPasswordToken = this
    var token = jwt.sign(resetPasswordToken._id.toHexString(), 'resetPasswordToken')
    resetPasswordToken.token = token
    resetPasswordToken.save(function (err, resetPasswordToken) {
        if (err) return cb(err);
        cb(null, resetPasswordToken)
    })
}

const ResetPasswordToken = mongoose.model('ResetPasswordToken', resetPasswordTokenSchema)
module.exports = {
    ResetPasswordToken
}