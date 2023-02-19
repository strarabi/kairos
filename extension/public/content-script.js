function useHighlightedText() {
	chrome.tabs.executeScript(
		{
			code: "window.getSelection().toString();",
		},
		function (selection) {
			processText(selection[0]);
		}
	);
}

function usePageText() {
	chrome.tabs.executeScript(
		{
			code: "document.all[0].innerText",
		},
		function (selection) {
			processText(selection[0]);
		}
	);
}

function processText(page_text) {
	var page_link = window.location.href;
	var openAI_request = new XMLHttpRequest();
	openAI_request.open("POST", "https://api.openai.com/v1/completions", true);
	openAI_request.setRequestHeader("Content-Type", "application/json");
	openAI_request.setRequestHeader("accept", "*/*");
	openAI_request.setRequestHeader("Authorization", "Bearer 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");

	openAI_request.onreadystatechange = function () {
		if (openAI_request.readyState === XMLHttpRequest.DONE) {
			let responseText = JSON.parse(openAI_request.response).choices[0].text;
			const convexClient = new convex.ConvexHttpClient("https://steady-tarsier-514.convex.cloud");
			const mutation = convexClient.mutation("addAssignment");
			console.log(responseText);
			var objs = responseText.split("\n");
			console.log(objs);
			var started_parsing = false;
			for (var i = 0; i < objs.length; i++) {
				if (objs[i].includes("Course")) {
					started_parsing = true;
					continue;
				}
				if (!started_parsing) {
					continue;
				}
				var split_objs = objs[i].split(",");
				if (split_objs) {
					mutation(split_objs[0], split_objs[1], split_objs[2], page_link)
					chrome.tabs.create({url: "http://localhost:3000"})
				}
			}
		}
	};

	openAI_request.send(
		JSON.stringify({
			model: "text-davinci-003",
			prompt:
				"Generate a table by parsing the assignment names, due dates, and course names (if applicable) from the following text: " +
				page_text +
				"\n\n\nIf you don't see an assignment, due date, or course name, leave the table entry blank" +
				" - do not guess. Do not include any information from the text other than the course names, assignment names, and due dates." +
				"Do not use quotes." +
				"Return the table as a comma separated list with each entry on a new line, beginning with the headings Course Name,Assignment Name,Due Dates",
			temperature: 0,
			max_tokens: 999,
			top_p: 1.0,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
		})
	);
}

export { usePageText, useHighlightedText };
