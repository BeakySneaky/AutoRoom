'use strict'

const express = require('express'),
	router = express.Router()

var wol = require('node-wol')

/* GET home page. */
router.get('/', (req, res, next) =>
	res.render('index', {
		title: 'AutoRoom'
	})
)

router.post('/WOL', (req, res) =>
	wol.wake('30-9C-23-02-C8-AB', function(error) {
		if (error) {
			console.log(error)
		}
		else{
			console.log('WOL sent !')
		}
	})
)

module.exports = router
