function makeApiCall() {
	var page_text = document.body.innerText
	var page_link = window.location.href
	var openAI_request = new XMLHttpRequest()
	openAI_request.open("POST", "https://api.openai.com/v1/completions", true)
	openAI_request.setRequestHeader("Content-Type", "application/json");
	openAI_request.setRequestHeader("accept", "*/*");
	openAI_request.setRequestHeader("Authorization", "Bearer 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");

	openAI_request.onreadystatechange = function() {
		if (openAI_request.readyState === XMLHttpRequest.DONE) {
			// handle the response here
			let responseText = (JSON.parse(openAI_request.response)).choices[0].text
			console.log(responseText)
			var convex_request = new XMLHttpRequest()
			convex_request.open("POST", "https://tremendous-rail-263.convex.site/postResponse", true)
			convex_request.setRequestHeader("Content-Type", "application/json");
			convex_request.setRequestHeader("accept", "*/*");
			convex_request.send(JSON.stringify({
				url: page_link,
				table: responseText
			}))
		}
	}

	openAI_request.send(JSON.stringify({
		"model": "text-davinci-003",
		"prompt": "Generate a table by parsing the assignment names, due dates, and course names (if applicable) from the following text: "
		+ page_text + "\n\n\nIf you don't see an assignment, due date, or course name, leave the table entry blank" + 
		" - do not guess. Do not include any information from the text other than the course names, assignment names, and due dates." +
		"Return the table as a comma separated list, beginning with the headings Course Name,Assignment Name,Due Dates",
		"temperature": 0,
		"max_tokens": 999,
		"top_p": 1.0,
		"frequency_penalty": 0.0,
		"presence_penalty": 0.0
	}))
}