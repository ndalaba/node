var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middlewares/isAuthenticated');

/* GET home page. */
router.get('/',isAuthenticated ,function(req, res, next) {
  res.render('layout', { title: 'Application parc auto',description:"Application parc auto" });
});

module.exports = router;
