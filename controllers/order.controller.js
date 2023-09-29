class Order_Controller {
    static async addingOrder(req, res) {
        try {
            const { restaurant, items, totalPrice, deliveryAddress, status } = req.body;
            const newOrder = new OrderModel({ user: req.userID, restaurant, items, totalPrice, deliveryAddress, status });
            await newOrder.save()
            return res.status(201).send({
                status: true,
                msg: "Your Order has been Placed.",
                data: newOrder
            })
        } catch {
            return res.status(500).send({
                status: false,
                msg: 'Error in placing the Order.'
            })
        }
    }

    static async fetchingSpecificOrder(req, res) {
        try {
            const id = req.params.id
            const data = await OrderModel.find({ _id: id });
            return res.status(200).send({
                status: true,
                msg: `Order Details with the ID : ${id}`,
                data: data
            })
        } catch {
            return res.status(500).send({
                status: false,
                msg: 'Error in fetching the specific order Details.'
            })
        }
    }

    static async fetchingOrders(req, res) {
        try {
            const data = await OrderModel.find({ user: req.userID });
            return res.status(200).send({
                status: true,
                msg: `All the Order Details`,
                data: data
            })
        } catch {
            return res.status(500).send({
                status: false,
                msg: 'Error in fetching the order Details.'
            })
        }
    }

    static async updatingOrder(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            await OrderModel.findByIdAndUpdate({ _id: id }, data);
            return res.status(200).send({
                status: true,
                msg: "Your Order has been Updated!"
            })
        } catch {
            return res.status(500).send({
                status: false,
                msg: 'Error in Updating the Order.'
            })
        }
    }
}


module.exports = Order_Controller;