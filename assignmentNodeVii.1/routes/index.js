var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
  console.log(req.params);
  console.log(req.body);
  console.log(req.url);
  console.log(req.query);
});

/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
  console.log(req.url);
});


module.exports = router;
