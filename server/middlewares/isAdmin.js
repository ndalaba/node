let isAdmin = function (req, res, next) {
    next();
    //A DECOMMENTER APRES
    /*if (req.session.user && (req.session.user.roles === 'ROLE_ADMIN')) {
        next();
    }
    else {
        if (req.xhr)
            res.send({ success: 0, message: "Espace reservé à l'administrateur"});
        else res.redirect('/auth/login')
    }*/
}

module.exports = isAdmin;