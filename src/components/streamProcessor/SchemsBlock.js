import React, { useState } from "react";
import { connect } from "react-redux";

const SchemaBlock = (props) => {
  const [polio, setPolio] = useState(false);
  const togglePolio = () => {
    setPolio(!polio);
  };
  if (props.schemas.length <= 0) {
    return false;
  }
  let schema = props.actualSchema[0];
  if (props.actualSchema.length <= 0) {
    schema = props.schemas[0];
  }

  return (
    <div className="schema-additional-info">
      <button
        type={"button"}
        className="schema-btn"
        onClick={() => togglePolio()}
      >
        {schema.name}
      </button>

      <div
        className="schema-popup"
        style={{ display: polio ? "block" : "none" }}
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
              <tbody>
                {schema.schemafield_set.map((el) => {
                  return (
                    <tr style={{ width: 400 }}>
                      <td> {el.name} </td>
                      <td> value</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => {
  return {
    actualSchema: state.StreamProcessorReducer.actualSchema,
    schemas: state.StreamProcessorReducer.schemas,
  };
}, {})(SchemaBlock);
