import React from "react";

export const Button = (props) => {
  const typeColor = props.color === "dark" ? "" : "btn-outline";
  const isDisabled = props.disabled && "disabled";
  return (
    <div className="bottom-left  marginVertical">
      <button
        disabled={props.disabled}
        type={props.type}
        className={`btn ${typeColor} ${isDisabled} marginLeft-20 marginTop-20`}
        id="add_new_step"
      >
        <span>{props.text}</span>
      </button>
    </div>
  );
};
