const mongoose = require('mongoose');
const { UserModel } = require('./user.model');
const { RestaurantModel } = require('./restaurant.model');

const itemSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
}, {
    versionKey: false
})

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: RestaurantModel
    },
    items: [itemSchema],
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    status: {
        type: String,
        enum: ["placed", "preparing", "on the way", "delivered"],
        default: "preparing"
    }
}, {
    versionKey: false
})



const OrderModel = mongoose.model('orders', orderSchema);

module.exports = { OrderModel };