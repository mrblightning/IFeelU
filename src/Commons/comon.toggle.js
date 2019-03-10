import React from "react";
import Switch from 'react-ios-switch';

class Toggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: true,
        }; 
    }

    render() {
        const { checked } = this.state;
        //console.dir(this.props.toggleName + " " + this.props.initToggle + " " + this.state.checked);

        return (
            <div className="trackItem">
                <div className="trackName">{this.props.toggleName}</div>
                <Switch
                    checked={this.props.checked}
                    onColor="#22aee4"
                    className="switch"
                    onChange={() => this.props.toggleChecked()}
                />
            </div>
        );
    }
}

export default Toggle;