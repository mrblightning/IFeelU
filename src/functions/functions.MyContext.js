import React from 'react';
import { Redirect } from 'react-router-dom'
/*Graph is where I define the graph class */
import Graph from '../Pages/page.graph';
/*BrowserRouter and so on are elements of react-router-dom to enable Routing  */
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

// first we will make a new context
export const MyContext = React.createContext();

// Then create a provider Component
export class MyProvider extends React.Component {
    constructor(props) {
        super(props);
        this.getStoredUser = this.getStoredUser.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.state = {
            _id: '', 
            FirstName: '', 
            LastName: '', 
            userName: '', 
            mail: '', 
            password: '', 
            conditions: '',
            treatments: '', 
            TrackingGeneralFeeling: true, 
            TrackingNausea: false, 
            TrackingMotivation: false,
            TrackingDizziness: false, 
            TrackingAppetite: false, 
            TrackingBowelMovements: false, 
            TrackingPain: false, 
            TrackingExhaustion: false,
            TrackingTime_1: '10:00', 
            TrackingTime_2: '19:00',
            getStoredUser: this.getStoredUser,
            loginHandler: this.loginHandler
        };
    }

    //this function is for getting user data from server for an existing user in sessionStorage
    async getStoredUser(id){
        console.log("getStoredUser");
        await fetch('http://localhost:4000/fetch', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserId: id
            })
        }).then(response => {
            return response.json();
            }).then((data) => {
                console.log(data.FirstName);
                if (data !== undefined) {
                    this.setState({ 
                        _id: data._id, 
                        FirstName: data.FirstName, 
                        LastName: data.LastName, 
                        userName: data.userName, 
                        mail: data.mail, 
                        password: data.password, 
                        conditions: data.conditions,
                        treatments: data.treatments, 
                        TrackingGeneralFeeling: data.TrackingGeneralFeeling, 
                        TrackingNausea: data.TrackingNausea, 
                        TrackingMotivation: data.TrackingMotivation,
                        TrackingDizziness: data.TrackingDizziness, 
                        TrackingAppetite: data.TrackingAppetite, 
                        TrackingBowelMovements: data.TrackingBowelMovements, 
                        TrackingPain: data.TrackingPain, 
                        TrackingExhaustion: data.TrackingExhaustion,
                        TrackingTime_1: data.TrackingTime_1, 
                        TrackingTime_2: data.TrackingTime_2});
                    console.log("got data from session: " + data._id);
                    //user found - go to path of existing user
                    console.log("redirect to : /pages/found_" + data.userName);
                    return (
                        <Router>
                            <Redirect method="post" to={"/graph"}></Redirect>
                            <Route exact={true} path='/graph' component={Graph} />
                        </Router>
                    )
                }
            }).catch(Error => {
            console.log("Error whith _ID from session: " + Error)
        })
    }

    //this function is for getting user data from server for an new login user in login.js
    //using the passed username and password the user entered in the login.js page
    async loginHandler(SentUserName, SentPassword, e){
        console.log("loginHandler");
        console.log(SentUserName);
        await fetch('http://localhost:4000/fetch', {
        //await fetch('http://IITC-405:4000/fetch', {    
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: SentUserName,
                password: SentPassword
            })
        }).then(response => {
            console.log(response);
            return response.json();
            }).then((data) => {
                if (data !== undefined) {
                    this.setState({ 
                        _id: data._id, 
                        FirstName: data.FirstName, 
                        LastName: data.LastName, 
                        userName: data.userName, 
                        mail: data.mail, 
                        password: data.password, 
                        conditions: data.conditions,
                        treatments: data.treatments, 
                        TrackingGeneralFeeling: data.TrackingGeneralFeeling, 
                        TrackingNausea: data.TrackingNausea, 
                        TrackingMotivation: data.TrackingMotivation,
                        TrackingDizziness: data.TrackingDizziness, 
                        TrackingAppetite: data.TrackingAppetite, 
                        TrackingBowelMovements: data.TrackingBowelMovements, 
                        TrackingPain: data.TrackingPain, 
                        TrackingExhaustion: data.TrackingExhaustion,
                        TrackingTime_1: data.TrackingTime_1, 
                        TrackingTime_2: data.TrackingTime_2});
                    console.log("got data from login: " + data._id);
                    //connected login user - write to sessionStorage
                    window.sessionStorage.setItem('id', JSON.stringify(data._id));
                    //user found - go to path of login user
                    return <Redirect method="post" to={"/pages/found_" + data.userName}></Redirect>
                    // return (
                    //     //console.log("this is from the context page")
                    //     <Redirect method="post" to={"/graph"}></Redirect>
                    //     // <Router>
                    //     //     <Redirect method="post" to={"/graph"}></Redirect>
                    //     //     <Route exact={true} path='/graph' component={Graph} />
                    //     // </Router>
                    // )
                }
            }).catch(Error => {
            console.log("Error whith user + pass from login: " + Error)
        })
    }

    //this is the initial check if we have a sessionStorage that holds a user
    componentDidMount() {
        //First we'll check if the sessionStorage has a user id saved
        let userFromSession = JSON.parse(window.sessionStorage.getItem('id'));
        console.dir(userFromSession);
        //If I have a valid sessionStorage then I retrive the user data using the getStoredUser function 
        if (userFromSession != null) {
            console.log("there is a user saved in this session");
            this.state._id = userFromSession;
            this.getStoredUser(userFromSession);
        } 
        //if I do not have sessionStorage then I redirect to the login page
        else {
            return (
                <Redirect method="post" to={"/login"}></Redirect>
            )
        }
    }

    render() {
        return (
            <MyContext.Provider value={this.state}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}



