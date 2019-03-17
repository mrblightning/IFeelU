import React from 'react';
import { Redirect } from 'react-router-dom'

class TextContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //these variables tell me what symptoms I'm tracking
      TrackGeneralFeeling: false,
      TrackAppetite: false,
      TrackNausea: false,
      TrackBowelMovements: false,
      TrackMotivation: false,
      TrackPain: false,
      TrackDizziness: false,
      TrackExhaustion: false,
      //these variables are for the added text of each tracking record 
      GeneralFeelingText: '',
      AppetiteText: '',
      NauseaText: '',
      BowelMovementsText: '',
      MotivationText: '',
      PainText: '',
      DizzinessText: '',
      ExhaustionText: '',      
      //these variables are used in the redirection assosiated with the buttons at thye bottom of the page
      UserId:'',
      redirectBack: false,
      redirectNext: false
    }
    this.renderRedirect = this.renderRedirect.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.BackHandler = this.BackHandler.bind(this);
    this.NextHandler = this.NextHandler.bind(this);
    this.setGeneralFeelingText = this.setGeneralFeelingText.bind(this);
    this.setAppetiteText = this.setAppetiteText.bind(this);
    this.setNauseaText = this.setNauseaText.bind(this);
    this.setBowelMovementsText = this.setBowelMovementsText.bind(this);
    this.setMotivationText = this.setMotivationText.bind(this);
    this.setPainText = this.setPainText.bind(this);
    this.setDizzinessText = this.setDizzinessText.bind(this);
    this.setExhaustionText = this.setExhaustionText.bind(this);
    this.getStoredUser = this.getStoredUser.bind(this);
  }

  //this function is for getting user data from server for an existing user in sessionStorage
  async getStoredUser(id) {
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
      console.log("Setting State");
      if (data !== undefined) {
        this.setState({
          TrackGeneralFeeling: data.TrackingGeneralFeeling,
          TrackAppetite: data.TrackingAppetite,
          TrackNausea: data.TrackingNausea,
          TrackBowelMovements: data.TrackingBowelMovements,
          TrackMotivation: data.TrackingMotivation,
          TrackPain: data.TrackingPain,
          TrackDizziness: data.TrackingDizziness,
          TrackExhaustion: data.TrackingExhaustion,
          UserId: data._id,
        });
      }
    }).catch(Error => {
      console.log("Error with _ID from session: " + Error)
    })
  }

  setGeneralFeelingText(event) {
    this.setState({ GeneralFeelingText: event.target.value })
  }

  setAppetiteText(event) {
    this.setState({ AppetiteText: event.target.value })
  }

  setNauseaText(event) {
    this.setState({ NauseaText: event.target.value })
  }

  setBowelMovementsText(event) {
    this.setState({ BowelMovementsText: event.target.value })
  }

  setMotivationText(event) {
    this.setState({ MotivationText: event.target.value })
  }

  setPainText(event) {
    this.setState({ PainText: event.target.value })
  }

  setDizzinessText(event) {
    this.setState({ DizzinessText: event.target.value })
  }

  setExhaustionText(event) {
    this.setState({ ExhaustionText: event.target.value })
  }

  //this is the initial check if we have a sessionStorage that holds a user
  async componentWillMount() {
    //First we'll check if the sessionStorage has a user id saved
    let userFromSession = JSON.parse(window.sessionStorage.getItem('id'));
    console.dir(userFromSession);
    //If I have a valid sessionStorage then I retrive the user data using the getStoredUser function 
    if (userFromSession != null) {
      console.log("there is a user saved in this session");
      this.state.UserId = userFromSession;
      await this.getStoredUser(userFromSession);
    }
    //if I do not have sessionStorage then I redirect to the login page
    else {
      console.log("there is a NO user saved in this session");
    }
  }

  //this function is for adding the text to the last appropriate record in user records
  //once we pressed 'Next'
  async WriteRecord(id) {
    console.log("Update Symptom State");
    await fetch('http://localhost:4000/addText', {
    //await fetch('addText', {  
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        UserId: id,
        TrackGeneralFeeling: this.state.TrackGeneralFeeling,
        TrackAppetite: this.state.TrackAppetite,
        TrackNausea: this.state.TrackNausea,
        TrackBowelMovements: this.state.TrackBowelMovements,
        TrackMotivation: this.state.TrackMotivation,
        TrackPain: this.state.TrackPain,
        TrackDizziness: this.state.TrackDizziness,
        TrackExhaustion: this.state.TrackExhaustion,
        GeneralFeelingText: this.state.GeneralFeelingText,
        AppetiteText: this.state.AppetiteText,
        NauseaText: this.state.NauseaText,
        BowelMovementsText: this.state.BowelMovementsText,
        MotivationText: this.state.MotivationText,
        PainText: this.state.PainText,
        DizzinessText: this.state.DizzinessText,
        ExhaustionText: this.state.ExhaustionText,
      }),
      success: (res) => {
        console.log(res);
        console.log("this is a WriteRecord success");
      }
    })
  }


  BackHandler() {
    this.setState({ redirectBack: true });
  }

  NextHandler() {
    console.log(this.GeneralFeeling + " " + this.Appetite);
    let userFromSession = JSON.parse(window.sessionStorage.getItem('id'));
    console.dir(userFromSession);
    //If I have a valid sessionStorage then I retrive the user data using the getStoredUser function 
    if (userFromSession != null) {
      this.setState({ UserId: userFromSession });
      this.WriteRecord(userFromSession);
    }
    this.setState({ redirectNext: true });
  }

  renderRedirect() {
    if (this.state.redirectBack) {
      console.log("renderRedirect Back");
      return <Redirect method="post" to={"/selectState"}></Redirect>
    }
    if (this.state.redirectNext) {
      console.log("renderRedirect Next");
      return <Redirect method="post" to={"/graph"}></Redirect>
    }
  }

  setRedirect() {
    console.log("setRedirect");
    this.setState({
      redirect: true
    })
  }

  render() {
    return (
      <div className="pageContent" id="pageContent">
        <React.Fragment>
          <div onChange={event => this.setGeneralFeelingText(event)} style={{ display: this.state.TrackGeneralFeeling ? 'block' : 'none' }}>
            <div className="pageTopText"> Add text to your General Feeling record</div><br />
            <textarea rows="4" cols="30" name='GeneralFeelingText' onChange={this.setGeneralFeelingText}/>
          </div>
          <div onChange={event => this.setAppetiteText(event)} style={{ display: this.state.TrackAppetite ? 'block' : 'none' }}>
            <div className="pageTopText"> Add text to your Appetite record</div><br />
            <textarea rows="4" cols="30" name='AppetiteText' onChange={this.setAppetiteText}/>
          </div>
          <div onChange={event => this.setNauseaText(event)} style={{ display: this.state.TrackNausea ? 'block' : 'none' }}>
            <div className="pageTopText"> Add text to your Nausea record</div><br />
            <textarea rows="4" cols="30" name='NauseaText' onChange={this.setNauseaText}/>
          </div>
          <div onChange={event => this.setBowelMovementsText(event)} style={{ display: this.state.TrackBowelMovements ? 'block' : 'none' }}>
            <div className="pageTopText"> Add text to your Bowel Movements record</div><br />
            <textarea rows="4" cols="30" name='BowelMovementsText' onChange={this.setBowelMovementsText}/>
          </div>          
          <div onChange={event => this.setMotivationText(event)} style={{ display: this.state.TrackMotivation ? 'block' : 'none' }}>
            <div className="pageTopText"> Add text to your Motivation record</div><br />
            <textarea rows="4" cols="30" name='MotivationText' onChange={this.setMotivationText}/>
          </div>  
          <div onChange={event => this.setPainText(event)} style={{ display: this.state.TrackPain ? 'block' : 'none' }}>
            <div className="pageTopText"> Add text to your Pain record</div><br />
            <textarea rows="4" cols="30" name='PainText' onChange={this.setPainText}/>
          </div> 
          <div onChange={event => this.setDizzinessText(event)} style={{ display: this.state.TrackDizziness ? 'block' : 'none' }}>
            <div className="pageTopText"> Add text to your Dizziness record</div><br />
            <textarea rows="4" cols="30" name='DizzinessText' onChange={this.setDizzinessText}/>
          </div> 
          <div onChange={event => this.setExhaustionText(event)} style={{ display: this.state.TrackExhaustion ? 'block' : 'none' }}>
            <div className="pageTopText"> Add text to your Exhaustion record</div><br />
            <textarea rows="4" cols="30" name='ExhaustionText' onChange={this.setExhaustionText}/>
          </div> 
          <div className="buttonArea">
            <input id="button" className="button buttonBack" type="submit" name="button" value="Back"
              onClick={(e) => this.BackHandler()} />
            <input id="button" className="button buttonNext" type="submit" name="button" value="Next"
              onClick={(e) => this.NextHandler()} />
            {this.renderRedirect()}
          </div>
        </React.Fragment>
      </div>
    )
  }
}

export default TextContainer;