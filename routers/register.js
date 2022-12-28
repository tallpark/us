const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const {User} = require('../models');

router.post('/register', async (req, res) => {
    const { nickname, password, confirm } = req.body;
    const nkReg = /^[a-zA-Z0-9]{3,}$/g
    try {
        const overlapNk = await User.findAll({
            where: {nickname}
        })
        if (overlapNk.length) {
            return res.status(412).send({
                errorMessage: "중복된 닉네임입니다."
            })
        }
        if (password !== confirm) {
            return res.status(412).send({
                errorMessage: "패스워드가 일치하지 않습니다"
            })
        }
        if(!nkReg.test(nickname)) {
        return res.status(412).send({
            errorMessage: "닉네임 형식이 일치하지 않습니다."
            })
        }
        if(password.length < 4) {
            return res.status(412).send({
                errorMessage: "패스워드 형식이 일치하지 않습니다."
            })
        }
        if(password.includes(nickname)) {
            return res.status(412).send({
                errorMessage: "패스워드에 닉네임이 포함되어 있습니다."
            })
        }
        await User.create( {
            nickname, password
        })
        res.status(201).send({ errorMessage:"회원 가입에 성공하였습니다."})
    } catch(err) {
        return res.status(400).send({
            errorMessage: "요청한 데이터 형식이 올바르지 않습니다."
        })
    }
});

module.exports = router