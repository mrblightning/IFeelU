import React from "react";
import Switch from 'react-ios-switch';

class Toggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: true,
        };
        if (this.props.initToggle === "true") {
            this.state = {
                checked: true,
            };
            // console.dir(this.props.toggleName + " " + this.props.initToggle + " " + setState);
          } else {
            this.state = {
                checked: false,
            };
            //console.dir(this.props.toggleName + " " + this.props.initToggle + " " + setState);
          } 
    }

    render() {
        const { checked } = this.state;
        //console.dir(this.props.toggleName + " " + this.props.initToggle + " " + this.state.checked);

        return (
            <div className="trackItem">
                <div className="trackName">{this.props.toggleName}</div>
                <Switch
                    checked={checked}
                    onColor="#22aee4"
                    className="switch"
                    onChange={checked => this.setState({ checked })}
                />
            </div>
        );
    }
}

export default Toggle;