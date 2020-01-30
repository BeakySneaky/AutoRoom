function postWOL() {
	event.preventDefault()

	fetch('/WOL', {
		method: 'POST'
	}).then(function() {
		sendSnackBar('WOL request sent !', false)
	})
}

function postAuth() {
	event.preventDefault()
	let access = document.getElementById('access-code').value

	fetch('/auth', {
		method: 'POST',
		redirect: 'follow',
		body: JSON.stringify({ password: access }),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(data) {
			if (data.message == 'success') {
				window.location.href = '/interface'
			} else {
				sendSnackBar('Please enter the correct credentials.', true)
			}
		})
}

function sendSnackBar(message, err) {
	// Get the snackbar DIV
	var x = document.getElementById('snackbar')
	x.innerHTML = message
	// Add the "show" class to DIV
	if (!x.className.includes('show')) {
		x.className = 'show '
		if (err) {
			x.className += 'snackError '
		} else {
			x.className += 'snackSuccess '
		}
	}

	// After 3 seconds, remove the show class from DIV
	setTimeout(function() {
		x.className = x.className.replace('show', '')
	}, 3000)
}
