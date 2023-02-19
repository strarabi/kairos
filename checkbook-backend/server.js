const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3333;

let checks = [];

app.use(bodyParser.json());
// cors
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var CheckbookAPI = require("checkbook-api");
var Checkbook = new CheckbookAPI({
	api_key: "4ba69bfcbfbe447fadb0bb879076c998",
	api_secret: "gchrnaY0IrQBkmd701Y1a2IWacw8yd",
	env: "sandbox",
});

app.get("/checks", (req, res) => {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "4ba69bfcbfbe447fadb0bb879076c998:gchrnaY0IrQBkmd701Y1a2IWacw8yd",
		},
	};

	fetch("https://sandbox.checkbook.io/v3/check", options)
		.then((response) => response.json())
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});

app.post("/checks", (req, res) => {
	// check fields of body
	const { recipient, name, amount, description } = req.body;

	const options = {
		method: "POST",
		headers: {
			accept: "application/json",
			"content-type": "application/json",
			Authorization: "4ba69bfcbfbe447fadb0bb879076c998:gchrnaY0IrQBkmd701Y1a2IWacw8yd",
		},
		body: JSON.stringify({
			recipient: recipient,
			name: name,
			amount: amount,
			description: description,
		}),
	};

	fetch("https://sandbox.checkbook.io/v3/check/digital", options)
		.then((response) => response.json())
		.then((response) => {
			console.log(response);
			res.send(response);
		})
		.catch((err) => {
			console.error(err);
			res.status(400).send(err);
		});
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
