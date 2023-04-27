/* If session then redirect to admin dashboard */
const redirectHome = function(request, response, nextRoute) {
	// check session variables
	if(request.session.userId){
		response.redirect("/admin");
	}
	else{
		nextRoute();
	}
};
/* If no session then redirect to admin login */
const redirectLogin = function(request, response, nextRoute) {
	// check session variables
	if(!request.session.userId){
		response.redirect("/admin/login");
	}
	else{
		nextRoute();
	}
};
module.exports = {
	redirectHome,
	redirectLogin
};