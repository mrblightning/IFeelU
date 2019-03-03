import React from 'react';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
// import { isModuleDeclaration } from 'babel-types';
// import parentsData2 from './parentsData2'
import { Redirect } from 'react-router-dom'
// import Navbar from './navbar'


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { redirect: false, username: "Username", password: "" }
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
            return <Redirect method="post" to={"/pages/found" + this.state.username}></Redirect>
        } else {
            return (
               <a href="#"><div className="loginSubmit" onClick={this.loginHandler} >login</div></a>
            )
        }
    }

    setRedirect() {
        console.log("setRedirect");
        this.setState({
            redirect: true
        })
    }


    async loginHandler(){
        console.log("loginHandler");
        console.log(this.state.username)
        await fetch('http://localhost:4000/fetch', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(response => {
            console.log(response);
            return response.json();
            }).then((data) => {
                if (data != undefined) {
                    this.setRedirect();
                    console.log(data);
                }
                return data;
            }).catch(Error => {
            console.log("Error whis username or password: " + Error)
        })
    }

    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    handleClickUsername() {
        if (this.state.username == "Username") {
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
            {console.log("inside login")}
            <Login/>
        </div>
    )
}

export default login


