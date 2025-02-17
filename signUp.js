


const validator = {
    userName: /^[a-zA-Z0-9]{3,15}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    email: /^.+@+.+\.+[a-zA-Z]{2,3}$/,


}
const singUpForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

export function validateInput(inp) {
    let userNameInp = singUpForm.querySelector("#createUser");

    userNameInp.parentElement.querySelector("#userFoundError").style.display = "none";
    let property = validator[inp.name];
    if (!property) {
        inp.className = "error-border";
        return false;
    }
    if (!property.test(inp.value)) {
        inp.parentElement.querySelector(".error").style.display = "block";
        inp.className = "error-border";
        return false;
    }
    inp.className = "success-border";
    return true;
}

export function validateSignUp(e) {
    e.preventDefault();
    let userNameInp = singUpForm.querySelector("#createUser");

    userNameInp.parentElement.querySelector("#userFoundError").style.display = "none";


    let users = (JSON.parse(localStorage.getItem("users"))) || [];

    if (users.some(user => user.userName === userNameInp.value)) {
        userNameInp.parentElement.querySelector("#userFoundError").style.display = "block";
        return false;
    }
    const inputs = singUpForm.querySelectorAll("input");


    let validated = true;
    for (let i = 0; i < inputs.length; i++) {
        if (!validateInput(inputs[i])) {
            validated = false;
        }
    }
    if (validated) {
        const newUser = {};
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            newUser[input.name] = input.value;
        }
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        
        return newUser;

    }
    return false;

}

export function validateLogin(e) {
    let currentUser;
    e.preventDefault();
    let validated = true;
    const userName = loginForm.querySelector("#userLogin").value;
    const password = loginForm.querySelector("#passwordLogin").value;
    const users = JSON.parse(localStorage.getItem("users"));
    if (!users) validated = false;
    else {
        currentUser = users.find(user => user.userName === userName && user.password === password);
    }
    if (!validated || !currentUser) {
        loginForm.querySelector("#passwordLoginError").style.display = "block";
        return false;

    }
    else {
       
        return currentUser;
    }
}
export function acitvateForms() {
    const signUpInputs = singUpForm.querySelectorAll("input");

for (let i = 0; i < signUpInputs.length; i++) {
            let inp = signUpInputs[i];
            inp.addEventListener("input", () => {
                inp.parentElement.querySelector(".error").style.display = "none";
                validateInput(inp);
            });
        }


}





