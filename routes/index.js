'use strict'

const express = require('express'),
	router = express.Router()

var wol = require('node-wol')
var mysql = require('mysql')

//Connect to db
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'toor'
})

/* GET home page. */
router.get('/', function(req, res) {
	res.render('login', {
		title: 'Please Authentify'
	})
})

router.get('/interface', function(req, res) {
	if (req.session.loggedin) {
		res.render('index', {
			title: 'AutoRoom'
		})
	} else {
		res.redirect('/')
	}
})

router.post('/auth', function(req, res) {
	var password = req.body.password
	if (password) {
		con.query('SELECT * FROM autoroom.accesses WHERE access_code = ?', password, function(
			error,
			results,
			fields
		) {
			console.log(results)
			if (results.length > 0) {
				req.session.loggedin = true
				res.redirect('/interface')
			} else {
				res.redirect('/')
			}
			res.end()
		})
	} else {
		res.redirect('/')
		res.end()
	}
})

router.post('/WOL', function(req, res) {
	if (req.session.loggedin) {
		wol.wake('30-9C-23-02-C8-AB', function(error) {
			if (error) {
				console.log(error)
			} else {
				console.log('WOL sent !')
			}
		})
	}
})

module.exports = router
