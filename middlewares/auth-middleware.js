const jwt = require("jsonwebtoken");
const {User} = require("../models");
const SECRET_KEY = 'us'

module.exports = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).send({
            errorMessage: "로그인이 필요합니다."
        })
    }
    try {
        const {nickname} = jwt.verify(token , SECRET_KEY);
        User.findByPk(nickname).then((User) =>{
            res.locals.User = User;
            return next();
        })
    
    } catch(err) {
        return res.status(412).send({
            errorMessage: "로그인이 되어있습니다.."
        })
    }
}