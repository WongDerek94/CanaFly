var home = document.getElementById("home"),
	register = document.getElementById("register");

//Direct user to home page
home.addEventListener("click", function(){
    window.location.pathname = "/";
});

//Direct user to register page
register.addEventListener("click", function(){
	window.location.pathname = "/register";
});