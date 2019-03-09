import React from 'react';
/*Toggle is the Toggle select element */
import Toggle from '../Commons/comon.toggle';
import { Redirect } from 'react-router-dom'

class Symptoms extends React.Component {
    constructor(props) {
        super(props);
        this.state = { GeneralFeeling: false,
                       Appetite: false,
                       Nausea: false,
                       BowelMovements: false,
                       Motivation: false,
                       Pain: false,
                       Dizziness: false,
                       Exhaustion: false,  
                       redirectBack: false,
                       redirectNext: false,
                       UserId: ""
            }
        this.renderRedirect = this.renderRedirect.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
        this.BackHandler = this.BackHandler.bind(this);
        this.NextHandler = this.NextHandler.bind(this);
        this.GeneralFeelingHandler = this.GeneralFeelingHandler.bind(this);
        this.UpdateTracking = this.UpdateTracking.bind(this);
    }

    renderRedirect() {
        if (this.state.redirectBack) {
            console.log("renderRedirect Back");
            return <Redirect method="post" to={"/pages/redirectBack"}></Redirect>
        } 
        if (this.state.redirectNext) {
            console.log("renderRedirect Next");
            return <Redirect method="post" to={"/pages/redirectNext"}></Redirect>
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
                        GeneralFeeling: data.TrackingGeneralFeeling,
                        Appetite: data.TrackingAppetite,
                        Nausea: data.TrackingNausea,
                        BowelMovements: data.TrackingBowelMovements,
                        Motivation: data.TrackingMotivation,
                        Pain: data.TrackingPain,
                        Dizziness: data.TrackingDizziness,
                        Exhaustion: data.TrackingExhaustion,  
                        UserId: data._id});
                    console.log("Symptoms - got data from session: " + data.TrackingGeneralFeeling);
                    //this.forceUpdate();
                    //console.log("forceUpdate");
                }
            }).catch(Error => {
            console.log("Error with _ID from session: " + Error)
        })
    }

    //this function is for setting the symptom tracking variables for the user in the DB
    //once we pressed 'Next'
    async UpdateTracking(id){
        console.log("UpdateTracking");
        await fetch('http://localhost:4000/get', {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserId: id,
                GeneralFeeling: this.GeneralFeeling,
                Appetite: this.Appetite,
                Nausea: this.Nausea,
                BowelMovements: this.BowelMovements,
                Motivation: this.Motivation,
                Pain: this.Pain,
                Dizziness: this.Dizziness,
                Exhaustion: this.Exhaustion  
            }),
			success: (res) => {
				console.log(res);
				console.log("this is an UpdateTracking success");
			}
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
            this.state._id = userFromSession;
            this.getStoredUser(userFromSession);
            //if(this.GeneralFeeling === undefined){this.setState({ GeneralFeeling: true })}
        } 
        //if I do not have sessionStorage then I redirect to the login page
        else {
            console.log("there is a NO user saved in this session");        }
    }

    // GeneralFeelingHandler(event) {
    //     this.setState({ GeneralFeeling: event.target.value });
    //     console.log(this.GeneralFeeling);
    // }

    GeneralFeelingHandler = () => {
        console.log(this.GeneralFeeling);
        this.setState({ GeneralFeeling: !this.GeneralFeeling });
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
            this.state._id = userFromSession;
            this.UpdateTracking(userFromSession);
        } 
        this.setState({ redirectNext: true });
    }

    render() {
        console.log("render " + this.GeneralFeeling);
        //if(this.GeneralFeeling !== undefined){
            return (
                <div className="pageContent" id="pageContent">
                    <div className="pageTopText">I would like to track:</div>
                    <div className="trackBox">
                        <Toggle toggleName={"General Feeling"} initToggle={this.GeneralFeeling} toggleChecked={this.GeneralFeelingHandler}/>
                        <Toggle toggleName={"Appetite"} initToggle={this.Appetite}/>
                        <Toggle toggleName={"Nausea"} initToggle={this.Nausea}/>
                        <Toggle toggleName={"Bowel Movements"} initToggle={this.BowelMovements}/>
                        <Toggle toggleName={"Motivation"} initToggle={this.Motivation}/>
                        <Toggle toggleName={"Pain"} initToggle={this.Pain} />
                        <Toggle toggleName={"Dizziness"} initToggle={this.Dizziness} />
                        <Toggle toggleName={"Exhaustion"} initToggle={this.Exhaustion} />
                    </div>
                    <div className="buttonArea">
                        <input id="button" className="button buttonBack" type="submit" name="button" value="Back" 
                        onClick={(e)=>this.BackHandler()} />
                        <input id="button" className="button buttonNext" type="submit" name="button" value="Next" 
                        onClick={(e)=>this.NextHandler()} />
                        {this.renderRedirect()}
                    </div>
                </div>
            )
        //} else {
        //    return null;
        //}   
    }
}

const symptoms = ({ match }) => {

    return (
        <div>
            <Symptoms />
        </div>
    )
}


export default Symptoms


