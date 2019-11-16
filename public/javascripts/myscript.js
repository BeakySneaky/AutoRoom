var xhttp = new XMLHttpRequest();

function postWOL() {
	xhttp.open('POST', '/WOL', true)
	xhttp.send()
}
