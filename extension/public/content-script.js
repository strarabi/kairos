function makeApiCall() {
	var page_text = document.body.innerText
	var xhr = new XMLHttpRequest()
	xhr.open("POST", "https://api.openai.com/v1/completions", true)
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("accept", "*/*");
	xhr.setRequestHeader("Authorization", "Bearer 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");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			// handle the xhr response here
			console.log(xhr.response)
		}
	}

	xhr.send(JSON.stringify({
		"model": "text-davinci-003",
		"prompt": "Generate a table displaying all of the commitments and their due dates in the following text:" + page_text + "\n\n\nIf no commitments and dates appear, generate an empty table.",
		"temperature": 0,
		"max_tokens": 999,
		"top_p": 1.0,
		"frequency_penalty": 0.0,
		"presence_penalty": 0.0
	}))
}