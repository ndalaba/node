var isAuthenticated = function (req, res, next) {

    next();
    //A DECOMMENTER APRES
   /* if (req.session.user) {
        next();
    } else {
        if (req.xhr)
            res.send({success: 0, message: "Veillez vous reconnecter"});
        else res.redirect('/auth/login')
    }*/
}

module.exports = isAuthenticated;