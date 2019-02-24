//This is the main page f the app
//Start this app by typing: 'npm start' in a terminal 
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

/*Navbar is the navbar for all pages */
import Navbar from './navbar';

/*PageWrap is the class encomassing all the pages wrapped in <Router>. 
The Nav bar is always ther and under it are the various pages represented by
<Route.. */
class PageWrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: false };
    }

    toggleState = () => {
        this.setState({ isToggleOn: !this.state.isToggleOn });
    }

    render() {
        // let cName;
        // if (this.state.isToggleOn) { cName = "sidebarMenuShadow" }
        // else { cName = "" }

        return (
            <div>
                <Navbar toggleState={this.toggleState} isToggleOn={this.state.isToggleOn}/>
            </div>
        );
    }
}


function main() {
    return (
        <div id="App">
            <PageWrap pageWrapId={"pageContent"} outerContainerId={"App"} />
        </div>
    );
}

ReactDOM.render(main(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();