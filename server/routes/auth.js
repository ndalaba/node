let express = require('express');
let auth = express.Router();
const User = require('../models').User;
let UserManager = require('../services/userManager');


/* GET home page. */
auth.get('/login', function (req, res, next) {
    res.render('layout', {
        title: 'Connexion',
        description: "Application parc auto"
    });
});

auth.post('/login', (req, res, next) => {
    UserManager.byMail(req.body.email).then(user => {
        if (user) {
            if (user.password === UserManager.hash(req.body.password)) {
                if (req.body.remember_me)
                    req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
                else
                    req.session.cookie.expires = false;
                user.update({
                    lastLogin: new Date().toString()
                }).then(() => {
                    req.session.user = user;
                    res.status(200).send({
                        success: 1,
                        loggedUser: user
                    });
                });

            } else
                res.send({
                    success: 0,
                    message: "Email ou mot de passe incorrect"
                });
        } else
            res.send({
                success: 0,
                message: "Email ou mot de passe incorrect"
            });
    }).catch(error => res.status(400).send(error));


});

auth.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.send({
        success: 1
    });
});

module.exports = auth;