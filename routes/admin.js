var express = require('express');
var router = express.Router();
var menuModel = require('../models/admin/menu');

///////////////////////////////
/* POST home page. */
router.post('/', function(req, res) {
	
});

/* GET home page. */
router.get('/', function(req, res) {
	res.render('admin/menu', menuModel.model);
});

module.exports = router;

