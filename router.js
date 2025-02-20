import * as V from "./signUp.js"
import * as API from './api.js';
import Store,{actions} from './store.js'
const state = {
    user: null,
    event: null
}
const store = new Store(state);
const appTitle = document.getElementById('appTitle');

const pages = document.querySelectorAll(".page");
const signUpForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const eventForm = document.getElementById("addEventForm");


V.activateForms();

signUpForm.addEventListener("submit", (e) => {
    const currentUser = V.validateSignUp(e);
    store.dispatch(actions.setUser(currentUser))
    
});

loginForm.addEventListener("submit", (e) => {
    const currentUser = V.validateLogin(e);
    console.log(currentUser);
    
    store.dispatch(actions.setUser(currentUser))
    console.log(store.getState.user);
    
});

function checkCurrentUser(currentUser) {
    if (currentUser) {
        console.log(currentUser);
        switchPages(document.getElementById("appPage"));
        window.history.pushState({}, "", `?page=appPage`);
        loadAppPage();
    }
}
document.querySelector("#addEventButton").addEventListener('click',activateEventForm)

store.subscribe((state => {

    if(store.getPreviewState().user?.userName !== state?.user?.userName) {
   
        appTitle.textContent = `Hello ${state.user.userName}`;
        checkCurrentUser(state.user);

    }

}))

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
            // const date = getHebrewDate(event.date);
            div.innerHTML = `
           <h3>${event.name}</h3>
           <p>${event.date}</p>
        `;
            button.appendChild(div);
            button.addEventListener('click', () => loadEventDetails(event));
            appPage.appendChild(button);
        })
    });
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
function activateEventForm(){
    const addButton = document.getElementById("addEventButton")
    const addGuestButton = document.getElementById("addGuestButton");
    

    eventForm.classList.toggle("active");
    let buttonText = addButton.textContent;
    addButton.textContent = eventForm.classList.contains("active")?"Minimize Form":"Add Event";

    addGuestButton.addEventListener('click',addGuest);
    eventForm.addEventListener('submit',(e)=>submitNewForm(e))

}
function addGuest(){
    let guest = document.createElement("div");
    guest.className = "guestContainer";
    guest.innerHTML= ` <h3 style="text-align: center;">New Guest</h3>
                <label for="guestName">Name</label>
                <input type="text" name="guestName" id="guestName" >
                <label for="guestEmail">E-mail</label>
                <input type="email" name="guestEmail" id="guestEmail" >
                <button class="removeGuest">remove</button>`;
    guest.querySelector('button').addEventListener('click',()=>guest.remove());
    document.getElementById('allGuests').appendChild(guest);            

}
function submitNewForm(e){
    e.preventDefault();
    let eventName= eventForm.querySelector('#eventName').value;
    let eventDate =eventForm.querySelector('#eventDate').value;
    let eventLocation =eventForm.querySelector('#eventLocation').value;
    let guestsGroups = eventForm.querySelectorAll('.guestContainer')
    let guests =[];
    guestsGroups.forEach((guestGroup)=>{
        let guestName = guestGroup.querySelector("guestName.").value;
        let guestEmail = guestGroup.querySelector('guestEmail').value;
        guests.push( {"guestName":guestName,email:guestEmail})
    })
    let formInfo = {name:eventName,location:eventLocation,date:eventDate,guestList:guests,userName:store.getState.user};
    API.submitEvent(formInfo).then(eventForm.reset()).then(loadAppPage);
}


 

/*API.getAllUsers().then(users => {
        users.find(user=> user.rank === 'manager' && user.name===currentUser.name)
    })
        */