var home = document.getElementById("home"),
    login = document.getElementById("login"),
    register = document.getElementById("register"),
    logout = document.getElementById("logout");
    
//Direct user to home page
home.addEventListener("click", function(){
    window.location.pathname = "/";
});
  
//Direct user to login page  
login.addEventListener("click", function(){
	window.location.pathname = "/login";
});

//Direct user to register page
register.addEventListener("click", function(){
	window.location.pathname = "/register";
});

//Logout
logout.addEventListener("click", function(){
    alert("Logout successful");
});