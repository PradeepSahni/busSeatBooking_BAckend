
const express = require('express'); 
const Router = express.Router(); 
const UserController = require('../controllers/UserController');
const {authMiddleWare} = require('../middleware/auth');
const initApiRoutes = (app)=>{
    Router.post('/createUser', UserController.createUser);
    Router.post('/login', UserController.login);
    Router.get('/getProfile',authMiddleWare,UserController.getProfile)
    Router.get('/getBusSeats',authMiddleWare,UserController.getBusSeats)
    Router.post('/bookBusSeat',authMiddleWare,UserController.bookBusSeat)
    Router.post('/resetBusSeat',authMiddleWare,UserController.resetBusSeat)
    app.use('/api/', Router);
}

module.exports = initApiRoutes;