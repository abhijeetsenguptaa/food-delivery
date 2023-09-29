const express = require('express');
const { RestaurantModel } = require('../models/restaurant.model');

class Restaurant_Controller {
    static async fetchingRestaurants(req, res) {
        try {
            const data = await RestaurantModel.find();
            return res.status(200).json({
                status: true,
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error in fetching all the data of the restaurant.'
            })
        }
    }

    static async fetchingOneRestaurant(req, res) {
        try {
            const id = req.params.id;
            const data = await RestaurantModel.find({ _id: id });
            return res.status(200).json({
                status: true,
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error in fetching  the specific data of the restaurant.'
            })
        }
    }


    static async addingRestaurant(req, res) {
        try {
            const { name, address, menu } = req.body;
            const addRestaurant = new RestaurantModel({ name, address, menu });
            await addRestaurant.save();
            return res.status(200).json({
                status: true,
                message: 'Your restaurant has been added.'
            })
        } catch {
            return res.status(404).json({
                status: false,
                message: 'Error in adding the restaurant.'
            })
        }
    }

    static async addingMenuToRestaurant(req, res) {
        try {
            const id = req.params.id;
            const { menu } = req.body;
            await RestaurantModel.updateOne({ _id: id }, { $push: { menu: menu } });
            return res.status(200).json({
                status: true,
                message: 'Your Menu has been Updated.',
                data: await RestaurantModel.find({ _id: id })
            })
        } catch {
            return res.status(500).json({
                status: false,
                message: 'Error in adding data in the Menu.'
            })
        }
    }


    static async deletingMenuFromRestaurant(req, res) {
        try {
            const id1 = req.params.id1;
            const id2 = req.params.id2;
            await RestaurantModel.updateOne({ _id: id1 }, { $pull: { menu: { _id: id2 } } });
            res.status(202).json({
                status: true,
                message: `Menu with ID : ${id2} has been deleted.`
            })
        } catch {
            res.status(500).json({
                status: false,
                message: 'Error in deleting the specific data from the Menu.'
            })
        }
    }
}



module.exports = Restaurant_Controller;