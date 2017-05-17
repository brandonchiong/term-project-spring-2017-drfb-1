const express = require('express');
const router = express.Router();


router.post('/', function(req, res, next) {

	res.redirect('game');
});

module.exports = router;