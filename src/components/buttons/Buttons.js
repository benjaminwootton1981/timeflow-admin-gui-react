import React from "react";

export const ButtonAdd = (props) => {
    return (
        <div className="bottom-left marginVertical">
            <button className="btn btn-outline marginLeft-20 marginTop-20"
                    id="add_new_step"
            >
                <span>{props.text}</span>
            </button>
        </div>
    )
};
