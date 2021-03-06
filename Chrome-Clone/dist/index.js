"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');
const express = require('express');
const app = express();
const port = 4000;
const cookieParser = require('cookie-parser');
// application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: true }));
// application/json
app.use(body_parser_1.default.json());
app.use(cookieParser());
const mongoose = require('mongoose');
const config = require('./config/key');
mongoose.connect(config.mongoURI, {
//useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected')).catch((err) => console.log(err));
app.post('/api/users/register', (req, res) => {
    // 회원가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body);
    user.save((err, user) => {
        if (err)
            return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    });
});
app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            });
        }
        // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
            // // 비밀번호까지 같다면 토큰을 생성하기.
            user.generateToken((err, user) => {
                if (err)
                    return res.status(400).send(err);
                // 토큰을 저장한다. 어디에? - 캐쉬, 로컬스토리지, 세션, 쿠키 등 저장을 할 수 있다.
                console.log(user.token);
                res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});
app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True.
    res.status(200).json({
        _id: req.user._id,
        // role 0 : 일반 유저, 아니면 관리자
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
});
app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err)
            return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});
app.get('/api/hello', (req, res) => {
    res.send("안녕하세요");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
