const express = require("express");
const bodyParser = require("body-parser");
const expressApp = express();
expressApp.use(bodyParser.urlencoded({extended:true}));
let portNumber = 3000;
expressApp.get("/", function(request, response){
	// response.send("Hello World");
	response.sendFile(__dirname+"/index.html");
});
expressApp.get("/about-old", function(request, response){
	response.send("About Us Page");
});
expressApp.get("/contact-old", function(request, response){
	response.send("<h1>Contact Us Page</h1>");
});
expressApp.get("/calculator", function(request, response){
	// response.send("Contact Us Page");
	response.sendFile(__dirname+"/calculator.html");
});
expressApp.post("/calculator", function(request, response){
	// console.log(request.body);
	let firstNumber = Number(request.body.firstNumber);
	let secondNumber = Number(request.body.secondNumber);
	let sum = firstNumber + secondNumber;
	response.send("Sum: " + sum);
})
expressApp.listen(portNumber, function(request, response){
	console.log("Server is running at port number "+portNumber);
});
