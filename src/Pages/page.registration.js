import React from 'react';
import { Redirect } from 'react-router-dom';
import Input from "../Commons/comon.Input";
import TextArea from "../Commons/comon.TextArea";
import Button from "../Commons/comon.Button";

//Form example taken from https://codesandbox.io/embed/x8omy0p9z

class RegistrationForm extends React.Component {
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
      redirectBack: false,
      redirectNext: false
    }
    this.renderRedirect = this.renderRedirect.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
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
                      UserId: data._id});
                  console.log("got data from registration: " + data._id);
                  //found registration user - write to sessionStorage
                  window.sessionStorage.setItem('id', JSON.stringify(data._id));
                  //user found and saved in session - go to tracksymptoms page next
                  this.setState({ redirectNext: true });
              }
          }).catch(Error => {
          console.log("Error with user + pass from registration: " + Error)
      })
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;

    console.log("Create New User");
    await fetch('http://localhost:4000/newUser', {
    //await fetch('newUser', {  
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
      // success: (res) => {
      //   console.log(res);
      //   console.log("this is a new user registration success");
      //   this.loginHandler(this.state.newUser.userName, this.state.newUser.password);
      // }
    }).then(response => {
      console.log(response);
      return response.json();
      }).then((data) => {
          if (data !== undefined) {
            this.setState({
              newUser: {
                userName: data.value.userName, 
                password: data.value.password,
                UserId: data.value._id
              }
            });
            console.log("this is a new user registration success with UserId: " + this.state.newUser.userName + " " + this.state.newUser.password);
            this.loginHandler(this.state.newUser.userName, this.state.newUser.password);
          }
      }).catch(Error => {
      console.log("Error with user + pass from registration: " + Error)
    })
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
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
      }
    });
  }

  renderRedirect() {
    if (this.state.redirectNext) {
      console.log("renderRedirect Next");
      return <Redirect method="post" to={"/tracksymptoms"}></Redirect>
    }
  }

  render() {
    return (
      <div className="pageContent" id="pageContent">
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
          {/* First Name */}
          <Input typeinput={"text"} title={"First Name:"} name={"FirstName"}
                 value={this.state.newUser.FirstName} placeholder={"Enter your first name"}
                 onChange={this.handleInput} required/>{" "}
          {/* Last Name */}
          <Input typeinput={"text"} title={"Last Name:"} name={"LastName"}
                 value={this.state.newUser.LastName} placeholder={"Enter your last name"}
                 onChange={this.handleInput} required/>{" "} 
          {/* User Name */}
          <Input typeinput={"text"} title={"User Name:"} name={"userName"}
                 value={this.state.newUser.userName} placeholder={"Enter your user name"}
                 onChange={this.handleInput} required/>{" "}                 
          {/* Email */}
          <Input typeinput={"text"} title={"Email:"} name={"mail"}
                 value={this.state.newUser.mail} placeholder={"Enter your email"}
                 onChange={this.handleInput} required/>{" "}
          {/* Password */}
          <Input typeinput={"text"} title={"Password:"} name={"password"}
                 value={this.state.newUser.password} placeholder={"Enter your password"}
                 onChange={this.handleInput} required/>{" "}
          {/* conditions */}                 
          <TextArea title={"Conditions:"} rows={4} value={this.state.newUser.conditions}
                    name={"conditions"} onChange={this.handleInput}
                    placeholder={"Please enter all your current conditions seperated by a comma"}
               />
          {/* treatments */}                 
          <TextArea title={"Treatments:"} rows={4} value={this.state.newUser.treatments}
                    name={"treatments"} onChange={this.handleInput}
                    placeholder={"Please enter all your current treatments seperated by a comma"}
               />
          {/* Clear the form */}
          <Button className="button" action={this.handleClearForm} type={"secondary"} title={"  Clear  "} />{" "}
          {/*Submit */}      
          <Button className="button" action={this.handleFormSubmit} type={"primary"} title={"Submit"} />{" "}
        </form>
        {this.renderRedirect()}
      </div>
    )
  }
}

export default RegistrationForm;