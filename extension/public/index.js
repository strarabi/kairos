
window.onload = function() {	
	let scrape_button = document.getElementById("scrape-button")
	scrape_button.addEventListener('click', function() {
		makeApiCall()
	})
}