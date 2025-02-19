export default class Store {
    constructor(intialState = {}) {
        this.state = intialState; // אובייקט מצב  
        this.prevState = null
        this._subscribers = [];// מערך פונקציות מאזינים
    }

    getState() {//מחזיר העתק מצב על רפרנס אחר(שלא ישתנה המקורי!)
        return JSON.parse(JSON.stringify(this.state));
    }

    getPreviewState() {
        return JSON.parse(JSON.stringify(this.prevState));

    }

    subscribe(listener){//מכניס פונקצית מאזין למערך
        if(typeof listener != 'function'){
            throw new Error('has to be function!');
        }
        this._subscribers.push(listener);
        return ()=> this._subscribers=this._subscribers.filter(func =>func!== listener);
    }

    notify(){//עוברת על מערך המאזינים(הפונקציות שיש להם נ"מ בשינויים) ומפעילה אותם
        this._subscribers.forEach((func)=>{
            func(this.state);
        })
    }

    dispatch(action) {//מעדכן את המצב
        const tempState = this.getState();
        this.prevState = {...tempState};

        switch (action.type) {
            case actions.setUser().type:
                tempState.user = action.payload;
                this.state = tempState;
                break;
            case actions.setEvent().type:
                tempState.event = action.payload;
                this.state = tempState;
                break;
        }

        this.notify();//..אחרי עדכון צריך להודיע לכל המאזינים
    }
}

export const actions = {
    setUser: function (user) {
        return {
            type: "CHANGE_USER",
            payload: user
        }
    },
    setEvent: function (id) {
        return {
            type: "CHANGE_EVENT",
            payload: eventName
        }
    }
}