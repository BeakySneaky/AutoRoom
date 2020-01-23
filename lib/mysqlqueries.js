var mysql = require('mysql')

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'toor'
})

var default_access_code = '0000'

con.connect(function(err) {
	if (err) throw err
	console.log('Connected!')
	con.query('CREATE DATABASE IF NOT EXISTS autoroom', function(err, result) {
		if (err) throw err
		console.log('Database created')
		con.query(
			'CREATE TABLE IF NOT EXISTS autoroom.accesses (id int NOT NULL AUTO_INCREMENT, access_code VARCHAR(100), primary key (id))',
			function(err, result) {
				if (err) throw err
				console.log('Accesses table created')
				con.query(
					'INSERT INTO autoroom.accesses (access_code) VALUES (?)',
					default_access_code,
					function(err, result) {
						if (err) throw err
						console.log('Personnal access key created')
						con.end()
					}
				)
			}
		)
	})
})
