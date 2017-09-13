module.exports = (app) => {
    app.use('/', require('./index.route'));
    app.use('/utilisateurs', require('./users.route'));
    app.use('/marques', require('./brands.route'));
    app.use('/models', require('./models.route'));
    app.use('/auth', require('./auth'));
}