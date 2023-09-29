require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connection = require('./configs/connection');
const userRoute = require('./routes/user.route');


class Server {
    constructor() {
        this.PORT = process.env.PORT || 8080;
        this.app = express();

        this.setMiddleware();

        this.app.get('/', this.handleEntry.bind(this))

        this.handleRoutes();

        this.startServer();
    }


    async setMiddleware() {
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(cors());
    }

    async handleEntry(req, res) {
        try {
            res.status(200).json({
                status: true,
                msg: 'Welcome to Food-Delivery Application.'
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                status: false,
                msg: error.message
            });
        }
    }

    async handleRoutes() {
        this.app.use('/api', userRoute.getRouter());
    }


    async startServer() {
        this.app.listen(this.PORT, async () => {
            try {
                await connection;
                console.log('Server is connected to the Database');
            } catch {
                console.log('Server could not connect to the Database.')
            }
            console.log(`Server is running at the port : ${this.PORT}`);
        })
    }
}



new Server()