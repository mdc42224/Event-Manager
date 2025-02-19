import * as V from "./signUp.js"
import * as API from './api.js';


const pages = document.querySelectorAll(".page");
const signUpForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
let currentUser;

V.activateForms();

signUpForm.addEventListener("submit", (e) => {
    currentUser = V.validateSignUp(e);
    checkCurrentUser();
});

loginForm.addEventListener("submit", (e) => {
    currentUser = V.validateLogin(e);
    checkCurrentUser();
});

function checkCurrentUser() {
    if (currentUser) {
        console.log(currentUser);
        switchPages(document.getElementById("appPage"));
        window.history.pushState({}, "", `?page=appPage`);
        loadAppPage();
    }
}

addEventListener("popstate", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = urlParams.get('page') || 'home';
    switchPages(document.getElementById(currentPage));
});

document.getElementById("createAccount").addEventListener("click", () => {
    switchPages(document.getElementById("signUpPage"));
    window.history.pushState({}, "", `?page=signUpPage`)
});

document.getElementById("logIn").addEventListener("click", () => {
    switchPages(document.getElementById("logInPage"));
    window.history.pushState({}, "", `?page=logInPage`)
});

function switchPages(section) {
    pages.forEach(cur => {
        cur.classList.remove("active");
    });
    section.classList.add("active");
    document.getElementById("entryButtonContainer").classList.
        toggle("inActive", section.id !== "logInPage" && section.id !== "signUpPage");
}

function loadAppPage() {
    const appPage = document.getElementById('eventsContainer');
    appPage.innerHTML = "";
    API.getAllEvents().then(events => {
        events.map(event => {
            const button = document.createElement('button');
            const div = document.createElement("div");
            button.className = "grid-event";
            const date = getHebrewDate(event.date);
            div.innerHTML = `
           <h3>${event.name}</h3>
           <p>${date.fullDate}</p>
        `;
            button.appendChild(div);
            button.addEventListener('click', () => loadEventDetails(event));
            appPage.appendChild(button);
        })
    });
    const appTitle = document.getElementById('appTitle');
    appTitle.textContent = `Hello ${currentUser.userName}`;

}

function loadEventDetails(event){

}
function getHebrewDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const hebrewDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
    const hebrewMonths = [
        "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
        "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
    ];
    const day = date.getDate();
    const month = hebrewMonths[date.getMonth()];
    const year = date.getFullYear();
    const dayOfWeek = hebrewDays[date.getDay()];

    return {
        fullDate: `יום ${dayOfWeek} ${day} ב${month} ${year}`,
        dayName: dayOfWeek,
        dayInMonth: day,
        monthName: month,
        year: year
    };
}

