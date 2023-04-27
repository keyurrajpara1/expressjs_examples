const express = require("express");

const router = express.Router();

const sequelize = require("sequelize");

var categoryModel = require("../models").Category;
var Op = sequelize.Op;

router.get("/admin/category/list", async (request, response, nextRoute) => {
	let allCategories = await categoryModel.findAll();
	let viewDataObject = {
		allCategories
	};
	response.render("admins/category/list", viewDataObject);
});

router.route("/admin/category/add").get((request, response, nextRoute) => {
	response.render("admins/category/add");
})
.post((request, response, nextRoute) => {
	// console.log(request.body);

	categoryModel.findOne({
		where:{
			name:{
				[Op.eq]: request.body.name
			}
		}
	}).then((data) => {
		if(data){
			request.flash("error", "Category already exists");
			response.redirect("/admin/category/add");
		}
		else{
			let name = request.body.name;
			let status = request.body.status;

			categoryModel.create({
				name, status
			})
			.then((data) => {
				if(data){
					request.flash("success", "Category created successfully");
					response.redirect("/admin/category/add");
				}
				else{
					request.flash("error", "Failed to add");
					response.redirect("/admin/category/add");
				}
			});
		}
	});
});

router.route("/admin/category/edit/:id").get((request, response, nextRoute) => {
	categoryModel.findOne({
		where:{
			id:{
				[Op.eq]: request.params.id
			}
		}
	}).then((data) => {
		console.log(data);
		if(data){
			let viewDataObject = {
				categoryData: data
			};
			response.render("admins/category/edit", viewDataObject);
		}
		else{
			//
		}
	});
})
.post((request, response, nextRoute) => {
	categoryModel.findOne({
		where:{
			[Op.and]:[
				{
					id:{
						[Op.ne]: request.params.id
					}
				},
				{
					name:{
						[Op.eq]: request.body.name
					}
				}
			]
		}
	}).then((data) => {
		if(data){
			request.flash("error", "Category already exists");
			response.redirect(`/admin/category/edit/${request.params.id}`);
		}
		else{
			categoryModel.update({
				name: request.body.name,
				status: request.body.status
			}, {
				where:{
					id: request.params.id
				}
			}).then((data) => {
				if(data){
					request.flash("success", "Category has been updated");
				}
				else{
					request.flash("error", "Failed to update");
				}
				response.redirect(`/admin/category/edit/${request.params.id}`);
			});
		}
	});
});

router.post("/admin/category/delete", (request, response, nextRoute) => {
	categoryModel.findOne({
		where:{
			id:{
				[Op.eq]: request.body.hdnCategoryId
			}
		}
	}).then((data) => {
		console.log(data);
		if(data){
			categoryModel.destroy({
				where:{
					id:{
						[Op.eq]: request.body.hdnCategoryId
					}
				}
			}).then((status) => {
				console.log(status);
				if(status){
					request.flash("success", "Category has been deleted");
				}
				else{
					request.flash("error", "Failed to delete");
				}
				response.redirect(`/admin/category/list`);
			});
		}
		else{
			//
		}
	});
});

module.exports = router;