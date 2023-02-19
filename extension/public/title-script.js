function getQuote() {
	var quotes = ["Keep striving and you will surely achieve your goals.", 
	"Focus on your goals and believe in yourself - you have the power to achieve amazing things!", 
	"You have the power to achieve anything you set your mind to!", 
	"Believe in yourself and keep pushing forward because you can achieve anything you set your mind to.", 
	"Do your best and don't give up--you have what it takes to succeed.", 
	"You can do this no matter how difficult it feels.", 
	"You can do this, just keep trying and stay positive!", 
	"You have the strength and courage to persevere through any challenge.", 
	"Keep pushing yourself, you can do it!", 
	"You can do it, keep going!", 
	"Believe in yourself and you can do anything.", 
	"You can do anything you set your mind to.", 
	"You can do it, stay positive and be persistent.", 
	"Never give up - perseverance is the key to success.", 
	"Be confident in yourself and know that you can achieve anything you put your mind to.", 
	"You are capable of achieving incredible success.", 
	"You have everything it takes to succeed.", 
	"You have the potential to be the best version of yourself, so never give up!", 
	"Keep going and you will get to your desired destination!"]

	var quote = document.getElementById("quote")
	quote.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];
}

export default getQuote;