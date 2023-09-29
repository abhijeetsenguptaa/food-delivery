const express = require('express');
const User_Controller = require('../controllers/user.controller');


class User_Route {
    constructor() {
        this.router = express.Router();

        this.initializeRouter();
    }

    initializeRouter() {
        this.router.post('/login', User_Controller.loginUser);
        this.router.post('/register', User_Controller.registeringUser);
        this.router.patch('/user/:id/reset', User_Controller.resetPassword);
    }


    getRouter() {
        return this.router;
    }
}


module.exports = new User_Route;