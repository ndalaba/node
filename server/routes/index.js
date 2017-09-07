var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Application parc auto',description:"Application parc auto" });
});

module.exports = router;
