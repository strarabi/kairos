function makeApiCallTitle() {
    var openAI_request = new XMLHttpRequest()
	openAI_request.open("POST", "https://api.openai.com/v1/completions", true)
	openAI_request.setRequestHeader("Content-Type", "application/json");
	openAI_request.setRequestHeader("accept", "*/*");
	openAI_request.setRequestHeader("Authorization", "Bearer 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");

	openAI_request.onreadystatechange = function() {
		if (openAI_request.readyState === XMLHttpRequest.DONE) {
			let quoteText = (JSON.parse(openAI_request.response)).choices[0].text
			var quote = document.getElementById('quote')
			quote.innerHTML = quoteText
		}
	}

	openAI_request.send(JSON.stringify({
		"model": "text-davinci-003",
		"prompt": "generate a sentence that is encouraging, without quotes",
		"temperature": 1,
		"max_tokens": 999,
		"top_p": 1.0,
		"frequency_penalty": 0.0,
		"presence_penalty": 0.0
	}))
	
}

export default makeApiCallTitle;