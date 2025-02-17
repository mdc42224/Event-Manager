import * as V from "./signUp.js"

const pages = document.querySelectorAll(".page")
let currentUser;
const singUpForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

V.acitvateForms();


singUpForm.addEventListener("submit", (e) => {
    currentUser=V.validateSignUp(e)
    if (currentUser){
        console.log(currentUser);
        switchPages(document.getElementById("appPage"));
        window.history.pushState({}, "", `?page=appPage`)

    }
});

loginForm.addEventListener("submit", (e) => {
    currentUser=V.validateLogin(e);
    if (currentUser){
        console.log(currentUser);
        switchPages(document.getElementById("appPage"));
        window.history.pushState({}, "", `?page=appPage`)
    }
});

addEventListener("popstate",()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = urlParams.get('page') || 'home';
    switchPages(document.getElementById(currentPage))
})

document.getElementById("createAccount").addEventListener("click", () => {
  switchPages(document.getElementById("signUpPage"));
  window.history.pushState({}, "", `?page=signUpPage`)
  
  
})

document.getElementById("logIn").addEventListener("click", () => {
  switchPages(document.getElementById("logInPage"));
  window.history.pushState({}, "", `?page=logInPage`)
})
function switchPages(section) {
    pages.forEach(cur => {
        cur.classList.remove("active"); 
    });
    section.classList.add("active");
    document.getElementById("entryButtonContainer").classList.
    toggle("inActive",section.id!=="logInPage"&&section.id!=="signUpPage");
}


