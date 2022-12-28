const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const {User} = require('../models');
const jwt = require('jsonwebtoken');
const SECRET_KEY = `us`;

router.post('/login', async (req, res) => {
    const { nickname, password} = req.body;
    try {
        const overlap = await User.findOne({
            where: {nickname}
        })
        if (!overlap || overlap.password !== password) {
            return res.status(412).send({
                errorMessage: "닉네임 또는 패스워드를 확인해주세요."
            })
        }
        const token = jwt.sign({ nickname : nickname }, SECRET_KEY, { expiresIn: '60m'})
        res.cookie('token', token)
        return res.json({token:token});
    } catch(err) {
        return res.status(400).send({
            errorMessage: "로그인에 실패하였습니다."
        })
    }
})

module.exports = router