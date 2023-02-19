import {useHighlightedText, usePageText} from "./content-script.js"
import makeApiCallTitle from "./title-script.js"

makeApiCallTitle()

window.onload = function() {	
	let scrape_button = document.getElementById("scrape-button")
	scrape_button.addEventListener('click', function() {
		usePageText()
	})
	let use_selected_text_button = document.getElementById("use-selected-button")
	use_selected_text_button.addEventListener('click', function() {
		useHighlightedText()
	})
}