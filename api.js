
const eventsAPI = 'https://67ae0f7f9e85da2f020c452c.mockapi.io/events';

 export async function submitEvent(eventData) {
    await fetch(eventsAPI,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
    })
}

export async function getAllEvents() {
    const response = await fetch(eventsAPI);
    return await response.json();
}

const usersAPI = 'https://67ae0f7f9e85da2f020c452c.mockapi.io/users';

 export async function submitUser(userData) {
    await fetch(usersAPI,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
}

export async function getAllUsers() {
    const response = await fetch(usersAPI);
    return await response.json();
}
