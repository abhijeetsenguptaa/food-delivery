const express = require('express');
const Order_Controller = require('../controllers/order.controller');
const { authentication } = require('../middleware/authentication.middleware');

class Order_Route {
    constructor() {
        this.router = express.Router();
        this.initializeRouter();
    }

    initializeRouter() {
        this.router.post('/orders', authentication, Order_Controller.addingOrder);
        this.router.get('/orders/:id', authentication, Order_Controller.fetchingSpecificOrder);
        this.router.get('/orders', authentication, Order_Controller.fetchingOrders);
        this.router.patch('/orders/:id', authentication, Order_Controller.updatingOrder);
    }

    getRouter() {
        return this.router
    }
}


module.exports = new Order_Route;