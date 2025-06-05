const express = require('express')
const Router = express.Router();
const userRouter = require('./users');
const plantsRouter = require('./plants');
const isLogged = require('../middleware/isLogged');


Router.use((req, res, next) => {
    if(req.method === 'GET' || req.method === 'POST')
        next();
    else {
        res.status(405).send('method not supported');
    }
});
Router.use('/users', userRouter);

Router.use('/plants',isLogged,plantsRouter);

Router.all('/{*any}', (req, res,next) => {
    res.status(404).render('notfound');
    next();
})
module.exports = Router;
