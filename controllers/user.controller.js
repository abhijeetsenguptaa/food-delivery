const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


class User_Controller {
    static async registeringUser(req, res) {
        try {
            const { name, email, password, address } = req.body;
            const searchUser = await UserModel.find({ email });
            if (searchUser.length >= 1) {
                res.status(409).send({
                    status: false,
                    msg: 'User already Registered.'
                })
            } else {
                bcrypt.hash(password, 6, async (err, hash) => {
                    const user = new UserModel({ name, email, password: hash, address });
                    await user.save();
                    res.status(200).send({
                        status: true,
                        msg: 'User Successfully Registered.'
                    })
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            })
        }
    }


    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const loginUser = await UserModel.find({ email });
            if (loginUser.length >= 1) {
                bcrypt.compare(password, loginUser[0].password, async (err, result) => {
                    if (result) {
                        const token = jwt.sign({ "user-id": loginUser[0]._id }, process.env.secret_key, { expiresIn: '7d' });
                        res.cookie('token', token)
                        return res.status(200).send({
                            status: true,
                            msg: 'Login Successful',
                            token: token,
                            data: loginUser[0]
                        })
                    } else {
                        return res.status(404).send({
                            status: false,
                            msg: 'Wrong Credentials.'
                        })
                    }
                })
            }
        } catch {
            res.status(404).send({
                status: false,
                msg: 'Error in Login..Please try again..'
            })
        }
    }


    static async resetPassword(req, res) {
        try {
            const id = req.params.id;
            const { password } = req.body;
            const hashPassword = bcrypt.hashSync(password, 6);
            await UserModel.updateOne({ _id: id }, { $set: { password: hashPassword } });
            res.status(200).send({
                status: true,
                msg: 'Password has been updated'
            })
        } catch {
            res.status(404).send({
                status: false,
                msg: 'Error while updating the password.'
            })
        }
    }
}


module.exports = User_Controller