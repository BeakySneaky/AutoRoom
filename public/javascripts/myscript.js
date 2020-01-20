
var xhttp = new XMLHttpRequest()

function postWOL() {
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			snackBar("WOL request sent !", false)
		}
		else{
			snackBar("WOL request could not be sent.", true)
		}
	}
	xhttp.open('POST', '/WOL', true)
	xhttp.send()

}

function snackBar(message, err) {
	// Get the snackbar DIV
	var x = document.getElementById('snackbar')
	x.innerHTML = message
	// Add the "show" class to DIV
	x.className = 'show '
	if(err){
		x.className += 'snackError '
	}
	else{
		x.className += 'snackSuccess '
	}
	
	// After 3 seconds, remove the show class from DIV
	setTimeout(function() {
		x.className = x.className.replace('show', '')
	}, 3000)
}
