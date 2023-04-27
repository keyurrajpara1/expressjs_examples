const express = require("express");
const app = express();
const port = 5000;

const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "node_with_mysql"
});

connection.connect(function(error){
	if(error){
		throw error;
	}
	else{
		console.log("We are now successfully connected with mysql database");
	}
});

// nodemon index.js
// http://localhost:5000/users
app.get("/users", function(request, response){
	connection.query("select * from users", function(error, results, fields){
		if(error){
			throw error;
		}
		else{
			response.json(results);
		}
	});
});

// http://localhost:5000/user/2
app.get("/user/:id", function(request, response){
	var userId = request.params.id;
	connection.query("select * from users where id=?", [userId], function(error, results, fields){
		if(error){
			throw error;
		}
		else{
			response.json(results);
		}
	});
});

// http://localhost:5000/user
app.post("/user", function(request, response){
	// console.log(request.body);
	// return false;

	var name = request.body.name;
	var email = request.body.email;
	var phone = request.body.phone;
	connection.query("insert into users (name, email, phone) values (?, ?, ?)", [name, email, phone], function(error, results, fields){
		if(error){
			throw error;
		}
		else{
			response.json({
				status: true,
				message: "Data inserted successfully",
				data: results,
				insertId: results.insertId
			});
		}
	});

		// OR

	/*var params = request.body;
	connection.query("insert into users set ?", params, function(error, results, fields){
		if(error){
			throw error;
		}
		else{
			response.json({
				status: true,
				message: "Data inserted successfully",
				data: results,
				insertId: results.insertId
			});
		}
	});*/
});

// http://localhost:5000/user
app.delete("/user", function(request, response){
	var userId = request.body.user_id;
	connection.query("delete from users where id = ?", [userId], function(error, results, fields){
		if(error){
			throw error;
		}
		else{
			response.json({
				status: true,
				message: "Data deleted successfully",
				data: results
			});
		}
	});
});

// http://localhost:5000/user
app.put("/user", function(request, response){
	var params = request.body;
	var name = params.name;
	var email = params.email;
	var phone = params.phone;
	var userId = params.user_id;
	connection.query("update users set name = ?, email = ?, phone = ? where id = ?", [name, email, phone, userId], function(error, results, fields){
		if(error){
			throw error;
		}
		else{
			response.json({
				status: true,
				message: "Data updated successfully",
				data: results
			});
		}
	});
});

app.get("/", function(request, response){
	response.send("<h3>Welcome to initial stage of mysql</h3>");
});

app.listen(port, function(){
	console.log("Server is running at 5000 port");
});