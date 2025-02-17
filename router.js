import * as V from "./signUp.js"


let currentUser;
const singUpForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

const signUpInputs = singUpForm.querySelectorAll("input");



document.getElementById("createAccount").addEventListener("click", () => {
    loginForm.style.display = "none";
    singUpForm.style.display = "block";
    for (let i = 0; i < signUpInputs.length; i++) {
        let inp = signUpInputs[i];
        inp.addEventListener("input", () => {
            inp.parentElement.querySelector(".error").style.display = "none";
            V.validateInput(inp);
        });
    }
})

document.getElementById("logIn").addEventListener("click", () => {
    singUpForm.style.display = "none";
    loginForm.style.display = "block";
})


singUpForm.addEventListener("submit", (e) => {currentUser=V.validateSignUp(e)
    if (currentUser)console.log(currentUser);
    
});
loginForm.addEventListener("submit", (e) => {
    currentUser=V.validateLogin(e);
    if (currentUser)console.log(currentUser);
});


