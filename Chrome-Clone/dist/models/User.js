"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    }
});
userSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err)
                    return next(err);
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});
userSchema.methods.comparePassword = function (plainPassword, cb) {
    // plainPassword : 123456,  암호화된 비밀번호 : hash값.
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err, null);
        cb(null, isMatch);
    });
};
userSchema.methods.generateToken = function (cb) {
    const user = this;
    // JWT를 이용하여 token 생성하기
    // user._id + secretToken = token
    const token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function (err, user) {
        if (err)
            return cb(err, null);
        cb(null, user);
    });
};
userSchema.statics.findByToken = function (token, cb) {
    const user = this;
    // token를 decode 한다.
    // user.id + 'secretTocken' = token
    jwt.verify(token, 'secretToken', (err, decoded) => {
        // 유저 아이디를 이용하여 유저를 찾은 다음에.
        // 클라이언트에서 가져온 token과 DB에 보관된 토근이 일치하는지 확인.
        user.findOne({ "_id": decoded, "token": token }, (err, user) => {
            if (err)
                return cb(err, null);
            cb(null, user);
        });
    });
};
const User = mongoose.model('User', userSchema);
module.exports = { User };
