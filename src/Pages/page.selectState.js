import React from 'react';
import { Redirect } from 'react-router-dom'

class RadioContainer extends React.Component {
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
      //these variables tell me what is the state of each symptom
      GeneralFeeling: "3",
      Appetite: "3",
      Nausea: "3",
      BowelMovements: "3",
      Motivation: "3",
      Pain: "3",
      Dizziness: "3",
      Exhaustion: "3",
      //these variables are used in the creation of a new symptom tracking record
      FirstName: '',
      LastName: '',
      UserId: '',
      check: '',
      currentDate: '',
      currentTime: '',
      conditions: '', 
      treatments: '',
      //these variables are used in the redirection assosiated with the buttons at thye bottom of the page
      redirectBack: false,
      redirectNext: false,
      redirectLogin: false
    }
    this.renderRedirect = this.renderRedirect.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.BackHandler = this.BackHandler.bind(this);
    this.NextHandler = this.NextHandler.bind(this);
    this.setGeneralFeeling = this.setGeneralFeeling.bind(this);
    this.setAppetite = this.setAppetite.bind(this);
    this.setNausea = this.setNausea.bind(this);
    this.setBowelMovements = this.setBowelMovements.bind(this);
    this.setMotivation = this.setMotivation.bind(this);
    this.setPain = this.setPain.bind(this);
    this.setDizziness = this.setDizziness.bind(this);
    this.setExhaustion = this.setExhaustion.bind(this);
    this.getStoredUser = this.getStoredUser.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.getCurrentTime = this.getCurrentTime.bind(this);
  }

  getCurrentDate(separator = '-') {

    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;
  }

  getCurrentTime(separator = ':') {

    let newTime = new Date();
    let hours = newTime.getHours();
    let minutes = newTime.getMinutes();

    return `${hours}${separator}${minutes}`;
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
          FirstName: data.FirstName,
          LastName: data.LastName,
          check: '',
          conditions: data.conditions, 
          treatments: data.treatments,
          currentDate: this.getCurrentDate(),
          currentTime: this.getCurrentTime()
        });
        console.log("Getting user data: " + this.state.FirstName + " " + this.state.LastName + " " + this.state.currentDate + " " + this.state.currentTime);
      }
    }).catch(Error => {
      console.log("Error with _ID from session: " + Error)
    })
  }

  setGeneralFeeling(event) {
    //console.log("GeneralFeeling: " + event.target.value);
    this.setState({ GeneralFeeling: event.target.value })
  }

  setAppetite(event) {
    //console.log("Appetite: " + event.target.value);
    this.setState({ Appetite: event.target.value })
  }

  setNausea(event) {
    //console.log("Nausea: " + event.target.value);
    this.setState({ Nausea: event.target.value })
  }

  setBowelMovements(event) {
    //console.log("BowelMovements: " + event.target.value);
    this.setState({ BowelMovements: event.target.value })
  }

  setMotivation(event) {
    //console.log("Motivation: " + event.target.value);
    this.setState({ Motivation: event.target.value })
  }

  setPain(event) {
    //console.log("Pain: " + event.target.value);
    this.setState({ Pain: event.target.value })
  }

  setDizziness(event) {
    //console.log("Dizziness: " + event.target.value);
    this.setState({ Dizziness: event.target.value })
  }

  setExhaustion(event) {
    //console.log("Exhaustion: " + event.target.value);
    this.setState({ Exhaustion: event.target.value })
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
      this.setState({ redirectLogin: true });
      console.log("there is a NO user saved in this session");
    }
  }

  //this function is for setting the symptom tracking variables for the user in the DB
  //once we pressed 'Next'
  async WriteRecord(id) {
    console.log("Update Symptom State");
    await fetch('http://localhost:4000/set', {
    //await fetch('set', {  
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
        GeneralFeeling: this.state.GeneralFeeling,
        Appetite: this.state.Appetite,
        Nausea: this.state.Nausea,
        BowelMovements: this.state.BowelMovements,
        Motivation: this.state.Motivation,
        Pain: this.state.Pain,
        Dizziness: this.state.Dizziness,
        Exhaustion: this.state.Exhaustion,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        check: '',
        currentDate: this.state.currentDate,
        currentTime: this.state.currentTime,
        conditions: this.state.conditions, 
        treatments: this.state.treatments
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
      return <Redirect method="post" to={"/tracksymptoms"}></Redirect>
    }
    if (this.state.redirectNext) {
      console.log("renderRedirect Next");
      return <Redirect method="post" to={"/addText"}></Redirect>
    }
    if (this.state.redirectLogin) {
      console.log("renderRedirect Login");
      return <Redirect method="post" to={"/login"}></Redirect>
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
          <div onChange={event => this.setGeneralFeeling(event)} style={{ display: this.state.TrackGeneralFeeling ? 'block' : 'none' }}>
            <div className="pageTopText"> Track Your General Feeling </div><br />
            <label><input type='radio' value='1' name='GeneralFeeling' checked={this.state.GeneralFeeling === '1'} onChange={this.setGeneralFeeling}  style={{ display: 'none' }}/>
              <img src={(this.state.GeneralFeeling === '1') ? '../img/1s.png' : '../img/1w.png'} alt="Feeling level 1" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='2' name='GeneralFeeling' checked={this.state.GeneralFeeling === '2'} onChange={this.setGeneralFeeling} style={{ display: 'none' }}/>
              <img src={(this.state.GeneralFeeling === '2') ? '../img/2s.png' : '../img/2w.png'} alt="Feeling level 2" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='3' name='GeneralFeeling' checked={this.state.GeneralFeeling === '3'} onChange={this.setGeneralFeeling} style={{ display: 'none' }}/>
              <img src={(this.state.GeneralFeeling === '3') ? '../img/3s.png' : '../img/3w.png'} alt="Feeling level 3" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='4' name='GeneralFeeling' checked={this.state.GeneralFeeling === '4'} onChange={this.setGeneralFeeling} style={{ display: 'none' }}/>
              <img src={(this.state.GeneralFeeling === '4') ? '../img/4s.png' : '../img/4w.png'} alt="Feeling level 4" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='5' name='GeneralFeeling' checked={this.state.GeneralFeeling === '5'} onChange={this.setGeneralFeeling} style={{ display: 'none' }}/>
              <img src={(this.state.GeneralFeeling === '5') ? '../img/5s.png' : '../img/5w.png'} alt="Feeling level 5" style={{ marginRight: '10px' }}/></label>
          </div>
          <div onChange={event => this.setAppetite(event)} style={{ display: this.state.TrackAppetite ? 'block' : 'none' }}>
            <div className="pageTopText"> Track Your Appetite </div><br />
            <label><input type='radio' value='1' name='Appetite' checked={this.state.Appetite === '1'} onChange={this.setAppetite} style={{ display: 'none' }}/>
              <img src={(this.state.Appetite === '1') ? '../img/1s.png' : '../img/1w.png'} alt="Appetite level 1" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='2' name='Appetite' checked={this.state.Appetite === '2'} onChange={this.setAppetite} style={{ display: 'none' }}/>
              <img src={(this.state.Appetite === '2') ? '../img/2s.png' : '../img/2w.png'} alt="Appetite level 2" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='3' name='Appetite' checked={this.state.Appetite === '3'} onChange={this.setAppetite} style={{ display: 'none' }}/>
              <img src={(this.state.Appetite === '3') ? '../img/3s.png' : '../img/3w.png'} alt="Appetite level 3" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='4' name='Appetite' checked={this.state.Appetite === '4'} onChange={this.setAppetite} style={{ display: 'none' }}/>
              <img src={(this.state.Appetite === '4') ? '../img/4s.png' : '../img/4w.png'} alt="Appetite level 4" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='5' name='Appetite' checked={this.state.Appetite === '5'} onChange={this.setAppetite} style={{ display: 'none' }}/>
              <img src={(this.state.Appetite === '5') ? '../img/5s.png' : '../img/5w.png'} alt="Appetite level 5" style={{ marginRight: '10px' }}/></label>
          </div>
          <div onChange={event => this.setNausea(event)} style={{ display: this.state.TrackNausea ? 'block' : 'none' }}>
            <div className="pageTopText"> Track Your Nausea </div><br />
            <label><input type='radio' value='1' name='Nausea' checked={this.state.Nausea === '1'} onChange={this.setNausea} style={{ display: 'none' }}/>
              <img src={(this.state.Nausea === '1') ? '../img/1s.png' : '../img/1w.png'} alt="Nausea level 1" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='2' name='Nausea' checked={this.state.Nausea === '2'} onChange={this.setNausea} style={{ display: 'none' }}/>
              <img src={(this.state.Nausea === '2') ? '../img/2s.png' : '../img/2w.png'} alt="Nausea level 2" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='3' name='Nausea' checked={this.state.Nausea === '3'} onChange={this.setNausea} style={{ display: 'none' }}/>
              <img src={(this.state.Nausea === '3') ? '../img/3s.png' : '../img/3w.png'} alt="Nausea level 3" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='4' name='Nausea' checked={this.state.Nausea === '4'} onChange={this.setNausea} style={{ display: 'none' }}/>
              <img src={(this.state.Nausea === '4') ? '../img/4s.png' : '../img/4w.png'} alt="Nausea level 4" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='5' name='Nausea' checked={this.state.Nausea === '5'} onChange={this.setNausea} style={{ display: 'none' }}/>
              <img src={(this.state.Nausea === '5') ? '../img/5s.png' : '../img/5w.png'} alt="Nausea level 5" style={{ marginRight: '10px' }}/></label>
          </div>
          <div onChange={event => this.setBowelMovements(event)} style={{ display: this.state.TrackBowelMovements ? 'block' : 'none' }}>
            <div className="pageTopText"> Track Your Bowel Movements </div><br />
            <label><input type='radio' value='1' name='BowelMovements' checked={this.state.BowelMovements === '1'} onChange={this.setBowelMovements} style={{ display: 'none' }}/>
              <img src={(this.state.BowelMovements === '1') ? '../img/1s.png' : '../img/1w.png'} alt="Bowel Movements level 1" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='2' name='BowelMovements' checked={this.state.BowelMovements === '2'} onChange={this.setBowelMovements} style={{ display: 'none' }}/>
              <img src={(this.state.BowelMovements === '2') ? '../img/2s.png' : '../img/2w.png'} alt="Bowel Movements level 2" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='3' name='BowelMovements' checked={this.state.BowelMovements === '3'} onChange={this.setBowelMovements} style={{ display: 'none' }}/>
              <img src={(this.state.BowelMovements === '3') ? '../img/3s.png' : '../img/3w.png'} alt="Bowel Movements level 3" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='4' name='BowelMovements' checked={this.state.BowelMovements === '4'} onChange={this.setBowelMovements} style={{ display: 'none' }}/>
              <img src={(this.state.BowelMovements === '4') ? '../img/4s.png' : '../img/4w.png'} alt="Bowel Movements level 4" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='5' name='BowelMovements' checked={this.state.BowelMovements === '5'} onChange={this.setBowelMovements} style={{ display: 'none' }}/>
              <img src={(this.state.BowelMovements === '5') ? '../img/5s.png' : '../img/5w.png'} alt="Bowel Movements level 5" style={{ marginRight: '10px' }}/></label>
          </div>
          <div onChange={event => this.setMotivation(event)} style={{ display: this.state.TrackMotivation ? 'block' : 'none' }}>
            <div className="pageTopText"> Track Your Motivation </div><br />
            <label><input type='radio' value='1' name='Motivation' checked={this.state.Motivation === '1'} onChange={this.setMotivation} style={{ display: 'none' }}/>
              <img src={(this.state.Motivation === '1') ? '../img/1s.png' : '../img/1w.png'} alt="Motivation level 1" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='2' name='Motivation' checked={this.state.Motivation === '2'} onChange={this.setMotivation} style={{ display: 'none' }}/>
              <img src={(this.state.Motivation === '2') ? '../img/2s.png' : '../img/2w.png'} alt="Motivation level 2" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='3' name='Motivation' checked={this.state.Motivation === '3'} onChange={this.setMotivation} style={{ display: 'none' }}/>
              <img src={(this.state.Motivation === '3') ? '../img/3s.png' : '../img/3w.png'} alt="Motivation level 3" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='4' name='Motivation' checked={this.state.Motivation === '4'} onChange={this.setMotivation} style={{ display: 'none' }}/>
              <img src={(this.state.Motivation === '4') ? '../img/4s.png' : '../img/4w.png'} alt="Motivation level 4" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='5' name='Motivation' checked={this.state.Motivation === '5'} onChange={this.setMotivation} style={{ display: 'none' }}/>
              <img src={(this.state.Motivation === '5') ? '../img/5s.png' : '../img/5w.png'} alt="Motivation level 5" style={{ marginRight: '10px' }}/></label>
          </div>
          <div onChange={event => this.setPain(event)} style={{ display: this.state.TrackPain ? 'block' : 'none' }}>
            <div className="pageTopText"> Track Your Pain </div><br />
            <label><input type='radio' value='1' name='Pain' checked={this.state.Pain === '1'} onChange={this.setPain} style={{ display: 'none' }}/>
              <img src={(this.state.Pain === '1') ? '../img/1s.png' : '../img/1w.png'} alt="Pain level 1" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='2' name='Pain' checked={this.state.Pain === '2'} onChange={this.setPain} style={{ display: 'none' }}/>
              <img src={(this.state.Pain === '2') ? '../img/2s.png' : '../img/2w.png'} alt="Pain level 2" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='3' name='Pain' checked={this.state.Pain === '3'} onChange={this.setPain} style={{ display: 'none' }}/>
              <img src={(this.state.Pain === '3') ? '../img/3s.png' : '../img/3w.png'} alt="Pain level 3" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='4' name='Pain' checked={this.state.Pain === '4'} onChange={this.setPain} style={{ display: 'none' }}/>
              <img src={(this.state.Pain === '4') ? '../img/4s.png' : '../img/4w.png'} alt="Pain level 4" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='5' name='Pain' checked={this.state.Pain === '5'} onChange={this.setPain} style={{ display: 'none' }}/>
              <img src={(this.state.Pain === '5') ? '../img/5s.png' : '../img/5w.png'} alt="Pain level 5" style={{ marginRight: '10px' }}/></label>
          </div>
          <div onChange={event => this.setDizziness(event)} style={{ display: this.state.TrackDizziness ? 'block' : 'none' }}>
            <div className="pageTopText"> Track Your Dizziness </div><br />
            <label><input type='radio' value='1' name='Dizziness' checked={this.state.Dizziness === '1'} onChange={this.setDizziness} style={{ display: 'none' }}/>
              <img src={(this.state.Dizziness === '1') ? '../img/1s.png' : '../img/1w.png'} alt="Dizziness level 1" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='2' name='Dizziness' checked={this.state.Dizziness === '2'} onChange={this.setDizziness} style={{ display: 'none' }}/>
              <img src={(this.state.Dizziness === '2') ? '../img/2s.png' : '../img/2w.png'} alt="Dizziness level 2" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='3' name='Dizziness' checked={this.state.Dizziness === '3'} onChange={this.setDizziness} style={{ display: 'none' }}/>
              <img src={(this.state.Dizziness === '3') ? '../img/3s.png' : '../img/3w.png'} alt="Dizziness level 3" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='4' name='Dizziness' checked={this.state.Dizziness === '4'} onChange={this.setDizziness} style={{ display: 'none' }}/>
              <img src={(this.state.Dizziness === '4') ? '../img/4s.png' : '../img/4w.png'} alt="Dizziness level 4" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='5' name='Dizziness' checked={this.state.Dizziness === '5'} onChange={this.setDizziness}style={{ display: 'none' }} />
              <img src={(this.state.Dizziness === '5') ? '../img/5s.png' : '../img/5w.png'} alt="Dizziness level 5" style={{ marginRight: '10px' }}/></label>
          </div>
          <div onChange={event => this.setExhaustion(event)} style={{ display: this.state.TrackExhaustion ? 'block' : 'none' }}>
            <div className="pageTopText"> Track Your Exhaustion </div><br />
            <label><input type='radio' value='1' name='Exhaustion' checked={this.state.Exhaustion === '1'} onChange={this.setExhaustion} style={{ display: 'none' }}/>
              <img src={(this.state.Exhaustion === '1') ? '../img/1s.png' : '../img/1w.png'} alt="Exhaustion level 1" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='2' name='Exhaustion' checked={this.state.Exhaustion === '2'} onChange={this.setExhaustion} style={{ display: 'none' }}/>
              <img src={(this.state.Exhaustion === '2') ? '../img/2s.png' : '../img/2w.png'} alt="Exhaustion level 2" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='3' name='Exhaustion' checked={this.state.Exhaustion === '3'} onChange={this.setExhaustion} style={{ display: 'none' }}/>
              <img src={(this.state.Exhaustion === '3') ? '../img/3s.png' : '../img/3w.png'} alt="Exhaustion level 3" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='4' name='Exhaustion' checked={this.state.Exhaustion === '4'} onChange={this.setExhaustion} style={{ display: 'none' }}/>
              <img src={(this.state.Exhaustion === '4') ? '../img/4s.png' : '../img/4w.png'} alt="Exhaustion level 4" style={{ marginRight: '10px' }}/></label>
            <label><input type='radio' value='5' name='Exhaustion' checked={this.state.Exhaustion === '5'} onChange={this.setExhaustion} style={{ display: 'none' }}/>
              <img src={(this.state.Exhaustion === '5') ? '../img/5s.png' : '../img/5w.png'} alt="Exhaustion level 5" style={{ marginRight: '10px' }}/></label>
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

export default RadioContainer;