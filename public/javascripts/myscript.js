var xhttp = new XMLHttpRequest()

function postWOL() {
	xhttp.open('POST', '/WOL', true)
	sendSnackBar('WOL request sent !', false)
	xhttp.send()
}

function postAuth() {
	xhttp.open('POST', '/auth', true)

	xhttp.timeout = 400

	xhttp.ontimeout = function() {
		sendSnackBar('Please enter the correct credentials.', true)
		xhttp.abort()
		window.stop()
	}

	xhttp.send()
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
