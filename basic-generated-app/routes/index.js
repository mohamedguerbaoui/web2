var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('exercices/1.1/index');
});

module.exports = router;
