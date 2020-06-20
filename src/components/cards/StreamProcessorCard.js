import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

function StreamProcessorCard(props) {
  const [polio, setPolio] = useState(false);
  useEffect(() => {});

  const togglePolio = () => {
    setPolio(!polio);
  };
  return (
    <div>
      <div className="schema-additional-info">
        <button className="schema-btn" onClick={togglePolio}>
          Please Select...
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
              </table>
            </div>
          </div>
        </div>
      </div>
      <table className="new-item__step" id="steps-table">
        <tbody>
          <tr>
            <th>Step Name</th>
            <th>Step Type</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td>
              <input
                name="name_new_1"
                value="Outbound Event"
                className="required"
              />
            </td>
            <td>
              <div className="styled-select">
                <select
                  name="steptype_new_1"
                  className="step"
                  data-step_id="new_1"
                  onchange="stepTypeChanged(this)"
                >
                  <option value="{{ step_type.0 }}">step_type.1</option>
                </select>
              </div>
              <div className="add-selects" data-step_id="new_1">
                <div className="styled-select">
                  <select
                    name="{{ item.name }}_new_1"
                    className="form-control step"
                    data-step_id="new_1"
                    data-popover-body="{{ item.popover.bottom_text }}"
                    data-popover-title="{{ item.popover.top_text }}"
                  >
                    <option value="0">Please Select...</option>
                    <option value="1">display_name</option>
                  </select>
                </div>
              </div>
            </td>
            <td>
              <input
                type="hidden"
                name="ordering_new_1"
                value="2"
                className="ordering_new"
              />
              <button className="card-btn card-btn--delete js-delete">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamProcessorCard);
