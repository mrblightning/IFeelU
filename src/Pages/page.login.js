import React from 'react';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
// import { isModuleDeclaration } from 'babel-types';
// import parentsData2 from './parentsData2'
// import { Redirect } from 'react-router-dom'
// import Navbar from './navbar'

import { MyProvider, MyContext } from '../functions/functions.MyContext'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { redirect: false, username: "Username", password: "" }
        //this.renderRedirect = this.renderRedirect.bind(this);
        //this.setRedirect = this.setRedirect.bind(this);
        //this.loginHandler = this.loginHandler.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleClickUsername = this.handleClickUsername.bind(this);
        //this.handleLoginClick = this.handleLoginClick.bind(this);

    }

    // renderRedirect() {
    //     console.log("renderRedirect");
    //     if (this.state.redirect) {
    //         return <Redirect method="post" to={"/pages/found_" + this.state.username}></Redirect>
    //     } else {
    //         return (
    //             <a href="#"><div className="loginSubmit" onClick={this.loginHandler} >login</div></a>
    //         )
    //     }
    // }

    // setRedirect() {
    //     console.log("setRedirect");
    //     this.setState({
    //         redirect: true
    //     })
    // }


    // async loginHandler() {
    //     console.log("loginHandler");
    //     console.log(this.state.username)
    //     await fetch('http://localhost:4000/fetch', {
    //         //await fetch('http://IITC-405:4000/fetch', {    
    //         method: "post",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             username: this.state.username,
    //             password: this.state.password
    //         })
    //     }).then(response => {
    //         console.log(response);
    //         return response.json();
    //     }).then((data) => {
    //         if (data !== undefined) {
    //             this.setRedirect();
    //             console.log(data);
    //         }
    //         return data;
    //     }).catch(Error => {
    //         console.log("Error whis username or password: " + Error)
    //     })
    // }

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

    // handleLoginClick(e) {
    //     e.preventDefault();
    //     console.log('The login button was clicked.');
    //     console.log(this.state.username, this.state.password);
    //     //call the context.loginHandler function to search for this user on the DB
    //     return (
    //         <MyProvider>
    //             <MyContext.Consumer>
    //                 {(context) => (
    //                     //context.loginHandler(this.state.username, this.state.password)
    //                     context.meep()
    //                 )}
    //             </MyContext.Consumer>
    //         </MyProvider>
    //     )
    // }

    render() {
        return (
            <MyProvider>
            <MyContext.Consumer>
            {(context) => (
            <div className="pageContent" id="pageContent">
                <div className="loginWrapper">
                    <div className="loginSecWrapper">
                        <div className="loginTitel">Welcome</div>
                        <div className="loginImg"></div>
                        <div className="inputsWrapper">
                            <div className="imputWrapper"><input type="text" className="loginInput" onChange={this.handleChangeUsername} value={this.state.username} onClick={this.handleClickUsername}></input></div>
                            <div className="imputWrapper"><input type="password" className="loginInput" onChange={this.handleChangePassword} ></input></div>
                        </div>
                        <input id="button" className="loginSubmit" type="submit" name="button"
                            value="login" onClick={(e)=>context.loginHandler(this.state.username, this.state.password, e)} />
                    </div >
                </div >
            </div>
            )}
            </MyContext.Consumer>
            </MyProvider>
        )
        // return (
        //     <div className="pageContent" id="pageContent">
        //         <div className="loginWrapper">
        //             <div className="loginSecWrapper">
        //                 <div className="loginTitel">Welcome</div>
        //                 <div className="loginImg"></div>
        //                 <div className="inputsWrapper">
        //                     <div className="imputWrapper"><input type="text" className="loginInput" onChange={this.handleChangeUsername} value={this.state.username} onClick={this.handleClickUsername}></input></div>
        //                     <div className="imputWrapper"><input type="password" className="loginInput" onChange={this.handleChangePassword} ></input></div>
        //                 </div>
        //                 {this.renderRedirect()}
        //             </div >
        //         </div >
        //     </div>
        // )
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


