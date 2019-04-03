import React from 'react';
import { Redirect } from 'react-router-dom';
import Input from "../Commons/comon.Input";
import TextArea from "../Commons/comon.TextArea";
import Button from "../Commons/comon.Button";

//Form example taken from https://codesandbox.io/embed/x8omy0p9z

class UserUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        FirstName: "",
        LastName: '', 
        userName: '', 
        mail: '', 
        password: '',
        conditions: '',
        treatments: '',
        TrackingTime_1: '', 
        TrackingTime_2: '',
        UserId:''
      },
      redirectLogin: false,
      redirectNext: false
    }
    this.renderRedirect = this.renderRedirect.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.getStoredUser = this.getStoredUser.bind(this);
  }

  handleInput(e) {
    //console.log("Inside handleInput");
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          [name]: value
        }
      })//,
      //() => console.log(this.state.newUser)
    );
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
                  newUser: {
                    FirstName: data.FirstName,
                    LastName: data.LastName, 
                    userName: data.userName, 
                    mail: data.mail, 
                    password: data.password,
                    conditions: data.conditions,
                    treatments: data.treatments,
                    TrackingTime_1: data.TrackingTime_1, 
                    TrackingTime_2: data.TrackingTime_2,
                    UserId:data._id
                  }
                });
                console.log("got data from session: " + data._id);
                //user found - go to path of existing user
                // this.setState({
                //   redirectNext: true
                // })
            }
        }).catch(Error => {
        console.log("Error with _ID from session: " + Error)
    })
  }
  
  //this is the initial check if we have a sessionStorage that holds a user
  componentWillMount() {
        //First we'll check if the sessionStorage has a user id saved
        let userFromSession = JSON.parse(window.sessionStorage.getItem('id'));
        console.dir(userFromSession);
        //If I have a valid sessionStorage then I retrive the user data using the getStoredUser function 
        if (userFromSession != null) {
            console.log("there is a user saved in this session: " + userFromSession);
            this.setState({ UserId: userFromSession });
            this.getStoredUser(userFromSession);
        }
        //if I do not have sessionStorage then I redirect to the login page
        else {
            this.setState({ redirectLogin: true });
            console.log("there is a NO user saved in this session");
        }
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;

    console.log("Update User");
    await fetch('http://localhost:4000/UpdateUser', {
    //await fetch('UpdateUser', {  
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(response => {
        console.log("Update User: " + response.statusText);
        this.setState({ redirectNext: true });
    }).catch(Error => {
        console.log("Error with _ID from session: " + Error)
    })
  }

  renderRedirect() {
    if (this.state.redirectNext) {
      console.log("renderRedirect Next");
      //return <Redirect method="post" to={"/graph"}></Redirect>
      return <Redirect method="post" to={"/pages/Your Information Has Been Updated"}></Redirect>
    }
    if (this.state.redirectLogin) {
      console.log("renderRedirect Login");
      return <Redirect method="post" to={"/login"}></Redirect>
    }
  }

  render() {
    return (
      <div className="pageContent" id="pageContent">
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
          {/* First Name */}
          <Input typeinput={"text"} title={"First Name:"} name={"FirstName"}
                 value={this.state.newUser.FirstName} placeholder={this.state.newUser.FirstName}
                 onChange={this.handleInput} required/>{" "}
          {/* Last Name */}
          <Input typeinput={"text"} title={"Last Name:"} name={"LastName"}
                 value={this.state.newUser.LastName} placeholder={this.state.newUser.LastName}
                 onChange={this.handleInput} required/>{" "} 
          {/* User Name */}
          <Input typeinput={"text"} title={"User Name:"} name={"userName"}
                 value={this.state.newUser.userName} placeholder={this.state.newUser.userName}
                 onChange={this.handleInput} disabled/>{" "}                 
          {/* Email */}
          <Input typeinput={"text"} title={"Email:"} name={"mail"}
                 value={this.state.newUser.mail} placeholder={this.state.newUser.mail}
                 onChange={this.handleInput} required/>{" "}
          {/* Password */}
          <Input typeinput={"text"} title={"Password:"} name={"password"}
                 value={this.state.newUser.password} placeholder={this.state.newUser.password}
                 onChange={this.handleInput} required/>{" "}
          {/* conditions */}                 
          <TextArea title={"Conditions:"} rows={4} value={this.state.newUser.conditions}
                    name={"conditions"} onChange={this.handleInput}
                    placeholder={this.state.newUser.conditions}
               />
          {/* treatments */}                 
          <TextArea title={"Treatments:"} rows={4} value={this.state.newUser.treatments}
                    name={"treatments"} onChange={this.handleInput}
                    placeholder={this.state.newUser.treatments}
               />
          {/*Update*/}      
          <Button className="button" action={this.handleFormSubmit} type={"primary"} title={"Update"} />{" "}
        </form>
        {this.renderRedirect()}
      </div>
    )
  }
}

export default UserUpdateForm;