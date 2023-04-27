const express = require("express");

const router = express.Router();

const { redirectHome, redirectLogin } = require("../middleware/RedirectIfNotAdmin");

router.get("/admin", redirectLogin, (request, response, nextRoute) => {
	/*response.json({
		status: true,
		message: "This is a sample message"
	});*/
	// response.send("admin/dashboard");
	response.render("admins/dashboard");
});

module.exports = router;