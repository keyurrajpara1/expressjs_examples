const express = require("express");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");

var adminModel = require("../models").Admin;

const { redirectHome, redirectLogin } = require("../middleware/RedirectIfNotAdmin");

var Op = sequelize.Op;

const router = express.Router();

/*router.get("/admin/login", function(request, response, nextRoute){
	response.render("admins/auth/login");
});*/

router.route("/admin/login")
.get(redirectHome, function(request, response, nextRoute){
	response.render("admins/auth/login");
})
.post(function(request, response, nextRoute){
	adminModel.findOne({
		where:{
			email:{
				[Op.eq]: request.body.email
			}
		}
	})
	.then((user) => {
		if(user){
			bcrypt.compare(request.body.password, user.password, function(error, result){
				if(result){
					request.session.isAdminLoggedIn = true;
					request.session.userId = user.id;
					console.log(request.session);
					response.redirect("/admin");
				}
				else{
					request.flash("error", "Invalid login details");
					response.redirect("/admin/login");
				}
			});
		}
		else{
			request.flash("error", "User not found");
			response.redirect("/admin/login");
		}
	});
});

router.get("/admin/signup", function(request, response, nextRoute){
	adminModel.create({
		name: "Keyur Rajpara",
		email: "admin@admin.com",
		password: bcrypt.hashSync("123456789", 10)
	}).then((data) => {
		if(data){
			response.json({
				status: true,
				message: "Admin created successfully"
			});
		}
		else{
			response.json({
				status: false,
				message: "Failed to create admin"
			});
		}
	});
});

router.get("/admin/logout", redirectLogin, function(request, response, nextRoute){
	request.session.destroy((error) => {
		if(error){
			response.redirect("/admin");
		}
		console.log(request.session);
		response.redirect("/admin/login");
	});
});

module.exports = router;