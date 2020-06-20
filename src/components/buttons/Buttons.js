import React from "react";

export const Button = (props) => {
  const typeColor = props.color === "dark" ? "" : "btn-outline";

  return (
    <div className="bottom-left marginVertical">
      <button
        className={`btn ${typeColor} marginLeft-20 marginTop-20`}
        id="add_new_step"
      >
        <span>{props.text}</span>
      </button>
    </div>
  );
};
