import React from 'react';
/*Toggle is the Toggle select element */
import Toggle from '../Commons/comon.toggle';
import { Redirect } from 'react-router-dom'

class Symptoms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            GeneralFeeling: false,
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
        this.switchGeneralFeelingHandler = this.switchGeneralFeelingHandler.bind(this);
        this.switchAppetiteHandler = this.switchAppetiteHandler.bind(this);
        this.switchNauseaHandler = this.switchNauseaHandler.bind(this);
        this.switchBowelMovementsHandler = this.switchBowelMovementsHandler.bind(this);
        this.switchMotivationHandler = this.switchMotivationHandler.bind(this);
        this.switchPainHandler = this.switchPainHandler.bind(this);
        this.switchDizzinessHandler = this.switchDizzinessHandler.bind(this);
        this.switchExhaustionHandler = this.switchExhaustionHandler.bind(this);
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
    async getStoredUser(id) {
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
                    UserId: data._id
                });
                console.log("Symptoms - got data from session: " + data.TrackingGeneralFeeling);
            }
        }).catch(Error => {
            console.log("Error with _ID from session: " + Error)
        })
    }

    //this function is for setting the symptom tracking variables for the user in the DB
    //once we pressed 'Next'
    async UpdateTracking(id) {
        console.log("UpdateTracking");
        await fetch('http://localhost:4000/get', {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserId: id,
                GeneralFeeling: this.state.GeneralFeeling,
                Appetite: this.state.Appetite,
                Nausea: this.state.Nausea,
                BowelMovements: this.state.BowelMovements,
                Motivation: this.state.Motivation,
                Pain: this.state.Pain,
                Dizziness: this.state.Dizziness,
                Exhaustion: this.state.Exhaustion
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
            this.state.UserId = userFromSession;
            this.getStoredUser(userFromSession);
        }
        //if I do not have sessionStorage then I redirect to the login page
        else {
            console.log("there is a NO user saved in this session");
        }
    }


    switchGeneralFeelingHandler() {
        this.setState({ GeneralFeeling: !this.state.GeneralFeeling });
        console.log("GeneralFeeling: " + this.state.GeneralFeeling);
    }

    switchAppetiteHandler() {
        this.setState({ Appetite: !this.state.Appetite });
        console.log("Appetite: " + this.state.Appetite);
    }

    switchNauseaHandler() {
        this.setState({ Nausea: !this.state.Nausea });
        console.log("Nausea: " + this.state.Nausea);
    }

    switchBowelMovementsHandler() {
        this.setState({ BowelMovements: !this.state.BowelMovements });
        console.log("BowelMovements: " + this.state.BowelMovements);
    }

    switchMotivationHandler() {
        this.setState({ Motivation: !this.state.Motivation });
        console.log("Motivation: " + this.state.Motivation);
    }

    switchPainHandler() {
        this.setState({ Pain: !this.state.Pain });
        console.log("Pain: " + this.state.Pain);
    }

    switchDizzinessHandler() {
        this.setState({ Dizziness: !this.state.Dizziness });
        console.log("Dizziness: " + this.state.Dizziness);
    }

    switchExhaustionHandler() {
        this.setState({ Exhaustion: !this.state.Exhaustion });
        console.log("Exhaustion: " + this.state.Exhaustion);
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
            this.state.UserId = userFromSession;
            this.UpdateTracking(userFromSession);
        }
        this.setState({ redirectNext: true });
    }

    render() {
        //console.log("render");
        return (
            <div className="pageContent" id="pageContent">
                <div className="pageTopText">I would like to track:</div>
                <div className="trackBox">
                    <Toggle toggleName={"General Feeling"} checked={this.state.GeneralFeeling} toggleChecked={this.switchGeneralFeelingHandler} />
                    <Toggle toggleName={"Appetite"} checked={this.state.Appetite} toggleChecked={this.switchAppetiteHandler} />
                    <Toggle toggleName={"Nausea"} checked={this.state.Nausea} toggleChecked={this.switchNauseaHandler} />
                    <Toggle toggleName={"Bowel Movements"} checked={this.state.BowelMovements} toggleChecked={this.switchBowelMovementsHandler} />
                    <Toggle toggleName={"Motivation"} checked={this.state.Motivation} toggleChecked={this.switchMotivationHandler} />
                    <Toggle toggleName={"Pain"} checked={this.state.Pain} toggleChecked={this.switchPainHandler} />
                    <Toggle toggleName={"Dizziness"} checked={this.state.Dizziness} toggleChecked={this.switchDizzinessHandler} />
                    <Toggle toggleName={"Exhaustion"} checked={this.state.Exhaustion} toggleChecked={this.switchExhaustionHandler} />
                </div>
                <div className="buttonArea">
                    <input id="button" className="button buttonBack" type="submit" name="button" value="Back"
                        onClick={(e) => this.BackHandler()} />
                    <input id="button" className="button buttonNext" type="submit" name="button" value="Next"
                        onClick={(e) => this.NextHandler()} />
                    {this.renderRedirect()}
                </div>
            </div>
        )  
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


