import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*Toggle is the Toggle select element */
import Toggle from './toggle';
/*Page is where I define the different pages */
import Page from './Page';
/*Graph is where I define the graph class */
import Graph from './graph';
/*BrowserRouter and so on are elements of react-router-dom to enable Routing  */
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cName;
        if (this.props.isToggleOn) { cName = "sidebarMenuShadow" }
        else { cName = "" }

        return (
            <Router>
                <div>
                    <div className="header">
                        <div className="headerText">IFEELU</div>
                        <div className="logo">
                            <a href="https://www.youtube.com/">
                                <img src="https://drive.google.com/uc?id=14MW9Z9pz9of-krcV5qLRLs_gvjmE1Sny" alt="IFeelU Logo" />
                            </a>
                        </div>
                    </div>
                    <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"
                        /*setState changes the state and re-renders the page on changes */
                        onClick={this.props.toggleState} checked={this.props.isToggleOn}
                        onChange={this.props.toggleState}/>
                    <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
                        <div className="spinner diagonal part-1"></div>
                        <div className="spinner horizontal"></div>
                        <div className="spinner diagonal part-2"></div>
                    </label>
                    {/* {console.log(this.state.isToggleOn + " " + cName)} */}
                    <div id="sidebarMenu" className={cName}>
                        <ul className="sidebarMenuInner">
                            {/*<Link> changes the URL*/}
                            <li onClick={this.props.toggleState}>
                                <Link to={`/`}>Barak Brudo <span>Web Developer</span></Link></li>
                            <li onClick={this.props.toggleState}>
                                <Link to={`/graph`}>Graph</Link></li>
                            <li onClick={this.props.toggleState}>
                                <Link to={`/pages/Instagram`}>Instagram</Link></li>
                            <li onClick={this.props.toggleState}>
                                <Link to={`/pages/Twitter`}>Twitter</Link></li>
                            <li onClick={this.props.toggleState}>
                                <Link to={`/pages/YouTube`}>YouTube</Link></li>
                            <li onClick={this.props.toggleState}>
                                <Link to={`/pages/Linkedin`}>Linkedin</Link></li>
                        </ul>
                    </div>
                    <div className='wrapper'>
                        {/*<Route> changes the content of this div (wrapper) based onb the URL*/}
                        <Route exact={true} path='/' component={Home} />
                        <Route path='/pages/:id' component={Page} />
                        <Route exact={true} path='/:id' component={Graph} />
                    </div>
                </div>
            </Router>
        );
    }
}

const Home = ({ match }) => {
    return (
        <div className="pageContent" id="pageContent">
            <div className="pageTopText">I would like to track:</div>
            <div className="trackBox">
                <Toggle toggleName={"General Feeling"} initToggle={"true"} />
                <Toggle toggleName={"Appetite"} initToggle={"false"} />
                <Toggle toggleName={"Nausea"} initToggle={"false"} />
                <Toggle toggleName={"Bowel Movements"} initToggle={"false"} />
                <Toggle toggleName={"Motivation"} initToggle={"false"} />
                <Toggle toggleName={"Pain"} initToggle={"true"} />
                <Toggle toggleName={"Dizziness"} initToggle={"false"} />
                <Toggle toggleName={"Exhaustion"} initToggle={"false"} />
            </div>
            <div className="buttonArea">
                <button className="button buttonBack">Back</button>
                <button className="button buttonNext">Next</button>
            </div>
        </div>
    );
}

export default Navbar;