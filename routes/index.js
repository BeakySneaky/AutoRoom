'use strict'

const express = require('express'),
	router = express.Router(),
	wol = require('node-wol'),
	mysql = require('mysql')

/* Connect to db */
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'toor'
})

/* Login Page */
router.get('/', function(req, res) {
	res.render('login', {
		title: 'Please Authentify',
		valid: req.query.valid
	})
})

/* Interface */
router.get('/interface', function(req, res) {
	if (req.session.loggedin) {
		res.render('index', {
			title: 'AutoRoom'
		})
	} else {
		res.redirect('/')
	}
})

/* Check authentication */
router.post('/auth', function(req, res) {
	var password = req.body.password
	if (password) {
		con.query('SELECT * FROM autoroom.accesses WHERE access_code = ?', password, function(
			error,
			results,
			fields
		) {
			if (results.length > 0) {
				req.session.loggedin = true
				return res.send({ message: 'success' })
			}
			else{
				return res.send({ message: 'password_error' })
			}
		})
	}
	else{
		return res.send({ message: 'no_password' })
	}
})

/* Send WOL packets */
router.post('/WOL', function(req, res) {
	if (req.session.loggedin) {
		wol.wake('30-9C-23-02-C8-AB', function(error) {
			if (error) {
				console.log(error)
			} else {
				console.log('WOL sent !')
			}
			res.end()
		})
	}
})

module.exports = router
