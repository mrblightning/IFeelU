import React from 'react';
// import ReactDOM from 'react-dom';
import '../index.css';

/*Page is where I define the different pages */
import Page from '../Pages/page.Page';
/*login is where the user initially logs in */
import login from '../Pages/page.login';
/*Symptoms is where the user decides what symptoms to track*/
import Symptoms from '../Pages/page.symptoms';
/*Graph is where I define the graph class */
import Graph from '../Pages/page.graph';
/*BrowserRouter and so on are elements of react-router-dom to enable Routing  */
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


class Navbar extends React.Component {
    render() {
        let cName;
        if (this.props.isMenuOpen) { cName = "sidebarMenuShadow" }
        else { cName = "" }

        return (
            <Router>
                <div>
                    <div className="header">
                        <div className="headerText">IFEELU</div>
                        <div className="logo">
                            <a href="https://ifeelu-6133.nodechef.com/">
                                <img src="https://drive.google.com/uc?id=14MW9Z9pz9of-krcV5qLRLs_gvjmE1Sny" alt="IFeelU Logo" />
                            </a>
                        </div>
                    </div>
                    <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"
                        /*setState changes the state and re-renders the page on changes */
                        onClick={this.props.menuState} checked={this.props.isMenuOpen}
                        onChange={this.props.menuState}/>
                    <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
                        <div className="spinner diagonal part-1"></div>
                        <div className="spinner horizontal"></div>
                        <div className="spinner diagonal part-2"></div>
                    </label>
                    {/* {console.log(this.state.isToggleOn + " " + cName)} */}
                    <div id="sidebarMenu" className={cName}>
                        <ul className="sidebarMenuInner">
                            {/*<Link> changes the URL*/}
                            <li onClick={this.props.menuState}>
                                <Link to={`/`}>Barak Brudo <span>Web Developer</span></Link></li>
                            <li onClick={this.props.menuState}>
                                <Link to={`/graph`}>Graph</Link></li>
                            <li onClick={this.props.menuState}>
                               {/* <Route path='/login/:id' exact={true} component={login} /> */}
                                <Link to={`/login`}>Login</Link></li>
                            <li onClick={this.props.menuState}>
                                <Link to={`/tracksymptoms`}>Tracking Symptoms</Link></li>
                            <li onClick={this.props.menuState}>
                                <Link to={`/pages/YouTube`}>YouTube</Link></li>
                            <li onClick={this.props.menuState}>
                                <Link to={`/pages/Linkedin`}>Linkedin</Link></li>
                        </ul>
                    </div>
                    <div className='wrapper'>
                        {/*<Route> changes the content of this div (wrapper) based onb the URL*/}
                        <Route exact={true} path='/' component={login} />
                        <Route exact={true} path='/login' component={login} />
                        <Route exact={true} path='/tracksymptoms' component={Symptoms} />
                        <Route path='/pages/:id' component={Page} />
                        <Route exact={true} path='/graph' component={Graph} />  
                        <Route exact={true} path='/graph/:id' component={Graph} /> 
                    </div>
                </div>
            </Router>
        );
    }
}

export default Navbar;