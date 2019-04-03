import React from "react";

const TextArea = props => (
  <div className="form-area">
    <label className="form-label pageTopText">{props.title}</label>
    <textarea
      className="form-control"
      name={props.name}
      rows={props.rows}
      cols={props.cols}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  </div>
);

export default TextArea;
