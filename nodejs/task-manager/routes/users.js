var express = require('express');
var router = express.Router();
 
router.get('/login', function(req, res, next) {
  res.send('You called LOG-IN');
});

router.get('/logout', function(req, res, next) {
  res.send('You called LOG-OUT');
});

module.exports = router;
