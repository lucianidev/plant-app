const express = require('express')
const Router = express.Router();
const bcrypt = require('bcrypt');
//const saltRounds = process.env.BCRYPT_ROUNDS;
const sequelize = require('../helpers/dbInit');
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const generateCsrfToken = require("../helpers/generateCSRF");


Router.get('/login', async (req, res) => {
    // CSRF PROTECTION
    try {
        res.render('login', {
            error : ''
        });
    } catch (error) {
        res.render('error');
    }
})

Router.post('/login', async (req, res) => {
    // CSRF PROTECTION
    try {
        console.log(req.body);
        
        if (!req.body?.username || typeof (req.body?.username) != 'string') return res.render('login',{ error: 'please insert the username' });
        if (!req.body?.password || typeof (req.body?.password) != 'string') return res.render('login', { error: 'please insert the password' });
        const { username, password } = req.body;


        // logic part
        const user = await models.users.findAll({ where: { username: username} });

        if(user?.length === 0) return res.render('login',{error : 'wrong username or password',})
        console.log(user[0].dataValues);
        const userData = user[0].dataValues;
        const match = await bcrypt.compare(password, userData.password);

        if(!match) return res.render('login',{error : 'wrong username or password',})

        req.session.username = username;
        req.session.userId = userData.idusers;
        req.session.csrf = generateCsrfToken();
        console.log(req.session);

        res.redirect('/plants');

    } catch (error) {
        res.render('error');
    }
})


Router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect(`/login`);
})


module.exports = Router;