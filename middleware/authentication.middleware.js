const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config()

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            jsonwebtoken.verify(token, process.env.secret_key, async (err, decode) => {
                if (decode) {
                    req.body.user = decode["user-id"]
                    req.userID = decode["user-id"]
                    next()
                }
            })
        } else {
            return res.status(404).send({
                status: false,
                msg: 'Please Login!'
            })
        }
    } catch {
        return res.status(404).send({
            status: false,
            msg: 'Please Login'
        })
    }
}


module.exports = { authentication };