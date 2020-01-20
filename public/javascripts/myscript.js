

function postWOL() {
	var xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			snackBar("WOL request sent !")
		}
		else{
			snackBar("WOL request could not be sent.")
		}
	}
	xhttp.open('POST', '/WOL', true)
	xhttp.send()

}

function snackBar(message) {
	// Get the snackbar DIV
	var x = document.getElementById('snackbar')
	x.innerHTML = message
	// Add the "show" class to DIV
	x.className = 'show'
	// After 3 seconds, remove the show class from DIV
	setTimeout(function() {
		x.className = x.className.replace('show', '')
	}, 3000)
}
