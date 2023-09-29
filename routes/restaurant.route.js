const express = require('express');
const Restaurant_Controller = require('../controllers/restaurant.controller');

class Restaurant_Route {
    constructor() {
        this.router = express.Router();
        this.initializeRouter();
    }

    initializeRouter() {
        this.router.get('/restaurants', Restaurant_Controller.fetchingRestaurants)
        this.router.get('/restaurants/:id', Restaurant_Controller.fetchingOneRestaurant)
        this.router.post('/restaurants/:id', Restaurant_Controller.addingRestaurant)
        this.router.post('/restaurants/:id/menu', Restaurant_Controller.addingMenuToRestaurant)
        this.router.delete('/restaurants/:id1/menu/:id2', Restaurant_Controller.deletingMenuFromRestaurant)
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new Restaurant_Route