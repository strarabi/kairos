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
	chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
		let page_link = tabs[0].url;
		// use `url` here inside the callback because it's asynchronous!
		doOtherThings(page_link, page_text);
	});
}

function doOtherThings(page_link, page_text) {
	var openAI_request = new XMLHttpRequest();
	openAI_request.open("POST", "https://api.openai.com/v1/completions", true);
	openAI_request.setRequestHeader("Content-Type", "application/json");
	openAI_request.setRequestHeader("accept", "*/*");
	openAI_request.setRequestHeader("Authorization", "Bearer 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");

	openAI_request.onreadystatechange = function () {
		if (openAI_request.readyState === XMLHttpRequest.DONE) {
			let reqs = 0;
			let responseText = JSON.parse(openAI_request.response).choices[0].text;
			const convexClient = new convex.ConvexHttpClient("https://limitless-octopus-457.convex.cloud");
			const mutation = convexClient.mutation("addAssignment");
			console.log(responseText);
			alert(responseText);
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
					let date = 0;
					if (split_objs[2]) {
						var parts = split_objs[2].split("/");
						var dateObject = new Date(parts[2], parts[0] - 1, parts[1]);
						date = dateObject.getTime();
					}

					// MM/DD/YYYY if split_objs[2]

					mutation(split_objs[0], split_objs[1], date, page_link);
					reqs++;
				}
			}
			alert(`Successfully parsed data for ${reqs} assignments.`);
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
				"Return the table as a comma separated list with each entry on a new line, beginning with the headings Course Name,Assignment Name,Due Dates" +
				"Report the date in as a MM/DD/YYYY. The current year is always 2023.",
			temperature: 0,
			max_tokens: 999,
			top_p: 1.0,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
		})
	);
}

export { usePageText, useHighlightedText };
