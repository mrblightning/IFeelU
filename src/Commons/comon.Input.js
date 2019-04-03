import React from "react";

const Input = props => {
  //console.log(props.value);
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label pageTopText">
        {props.title}
      </label>
      <input
        className="form-control input-control"
        id={props.name}
        name={props.name}
        type={props.typeinput}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
