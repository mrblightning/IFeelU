import React from 'react';
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { redirect: false, 
                       username: "Username", 
                       password: "",
                       UserId: ""
            }
        this.renderRedirect = this.renderRedirect.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleClickUsername = this.handleClickUsername.bind(this);

    }

    renderRedirect() {
        console.log("renderRedirect");
        if (this.state.redirect) {
            return <Redirect method="post" to={"/tracksymptoms"}></Redirect>
        } 
    }

    setRedirect() {
        console.log("setRedirect");
        this.setState({
            redirect: true
        })
    }

    //this function is for getting user data from server for an existing user in sessionStorage
    async getStoredUser(id){
        console.log("getStoredUser");
        await fetch('http://localhost:4000/fetch', {
        //await fetch('fetch', {    
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
                        username: data.userName, 
                        password: data.password,
                        UserId: data._id});
                    console.log("got data from session: " + data._id);
                    //user found - go to path of existing user
                    this.setState({
                        redirect: true
                    })
                }
            }).catch(Error => {
            console.log("Error whith _ID from session: " + Error)
        })
    }

    //this function is for getting user data from server for an new login user in login.js
    //using the passed username and password the user entered in the login.js page
    async loginHandler(SentUserName, SentPassword){
        console.log("loginHandler");
        console.log(SentUserName);
        await fetch('http://localhost:4000/fetch', {
        //await fetch('fetch', {       
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
                        username: data.userName, 
                        password: data.password,
                        UserId: data._id});
                    console.log("got data from login: " + data._id);
                    //connected login user - write to sessionStorage
                    window.sessionStorage.setItem('id', JSON.stringify(data._id));
                    //user found - go to path of login user
                    this.setState({
                        redirect: true
                    })
                }
            }).catch(Error => {
            console.log("Error with user + pass from login: " + Error)
        })
    }

    //this is the initial check if we have a sessionStorage that holds a user
    componentWillMount() {
        //First we'll check if the sessionStorage has a user id saved
        let userFromSession = JSON.parse(window.sessionStorage.getItem('id'));
        console.dir(userFromSession);
        //If I have a valid sessionStorage then I retrive the user data using the getStoredUser function 
        if (userFromSession != null) {
            console.log("there is a user saved in this session");
            this.setState({ UserId: userFromSession });
            this.getStoredUser(userFromSession);
        } 
        //if I do not have sessionStorage then I redirect to the login page
        else {
            console.log("there is NO user saved in this session");
        }
    }

    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleClickUsername() {
        if (this.state.username === "Username") {
            this.setState({ username: "" })
        }
    }

    render() {
        return (
            <div className="pageContent" id="pageContent">
                <div className="loginWrapper">
                    <div className="loginSecWrapper">
                        <div className="loginTitel">Welcome</div>
                        <div className="loginImg"></div>
                        <div className="inputsWrapper">
                            <div className="imputWrapper"><input type="text" className="loginInput" onChange={this.handleChangeUsername} value={this.state.username} onClick={this.handleClickUsername}></input></div>
                            <div className="imputWrapper"><input type="password" className="loginInput" onChange={this.handleChangePassword} ></input></div>
                        </div>
                        <input id="button" className="button loginSubmit" type="submit" name="button"
                            value="login" onClick={(e)=>this.loginHandler(this.state.username, this.state.password)} />
                        {this.renderRedirect()}    
                    </div >
                </div >
            </div>
            )
    }
}


const login = ({ match }) => {

    return (
        <div>
            <Login />
        </div>
    )
}

export default login


