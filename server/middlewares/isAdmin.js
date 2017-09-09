let isAdmin = function (req, res, next) {
    if (req.session.user && req.session.user.roles === "ROLE_ADMIN") {
        next();
    } else
        res.redirect('/auth/login');
        //res.send({ success: 0, message: "Espace reservé à l'administrateur "});
}

module.exports = isAdmin;