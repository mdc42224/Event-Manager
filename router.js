import * as V from "./signUp.js"


let currentUser;
const singUpForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

V.acitvateForms();


singUpForm.addEventListener("submit", (e) => {currentUser=V.validateSignUp(e)
    if (currentUser)console.log(currentUser);
    
});
loginForm.addEventListener("submit", (e) => {
    currentUser=V.validateLogin(e);
    if (currentUser)console.log(currentUser);
});


