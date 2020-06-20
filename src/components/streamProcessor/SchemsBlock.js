import React from "react";

const SchemaBlock = (props) => {
  return (
    <div className="schema-additional-info">
      <button className="schema-btn" onClick={props.togglePolio}>
        Please Select...
      </button>

      <div
        className="schema-popup"
        style={{ display: props.polio ? "block" : "none" }}
      >
        <div className="schema-popup-wrapper">
          <div className="schema-popup-content">
            <table className="schema-table">
              <thead>
                <tr>
                  <th>Field Name</th>
                  <th>Type</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaBlock;
