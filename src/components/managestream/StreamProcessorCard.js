import React, { Component } from "react";
import { connect } from "react-redux";

class StreamProcessorCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="new-item__body">
        <table class="new-item__step" id="steps-table">
          <tbody>
            <tr>
              <th>Step Name</th>
              <th>Step Type</th>
              <th>Actions</th>
            </tr>
            <tr>
              <td>
                <input
                  name="name_new_0"
                  value="Inbound Event"
                  class="required"
                />
              </td>
              <td>
                <div class="styled-select">
                  <select
                    name="steptype_new_0"
                    class="step"
                    data-step_id="new_0"
                    onchange="stepTypeChanged(this)"
                  >
                    <option value="{{ step_type }}">
                      Inbound Event - Stream
                    </option>
                  </select>
                </div>
                <div class="add-selects" data-step_id="new_0">
                  <div class="styled-select">
                    <select
                      name="{{ item.name }}_new_0"
                      class="form-control step"
                      data-step_id="new_0"
                      data-popover-body="{{ item.popover.bottom_text }}"
                      data-popover-title="{{ item.popover.top_text }}"
                    >
                      <option value="0">Please Select...</option>
                      <option value="{{ topic.name }}">
                        topic.display_name
                      </option>
                      {/* <option value="{{ option.0 }}">{{ option.1 }}</option> */}
                    </select>
                  </div>
                </div>
              </td>
              <td>
                <input
                  type="hidden"
                  name="ordering_new_0"
                  value="1"
                  class="ordering_new"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="schema-additional-info">
          <span class="schema-btn">Please Select...</span>
          <div class="schema-popup hide">
            <div class="schema-popup-wrapper">
              <div class="schema-popup-content">
                <table class="schema-table">
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
        <table class="new-item__step" id="steps-table">
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
                  class="required"
                />
              </td>
              <td>
                <div class="styled-select">
                  <select
                    name="steptype_new_1"
                    class="step"
                    data-step_id="new_1"
                    onchange="stepTypeChanged(this)"
                  >
                    <option value="{{ step_type.0 }}">step_type.1</option>
                  </select>
                </div>
                <div class="add-selects" data-step_id="new_1">
                  <div class="styled-select">
                    <select
                      name="{{ item.name }}_new_1"
                      class="form-control step"
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
                  class="ordering_new"
                />
                <button class="card-btn card-btn--delete js-delete">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamProcessorCard);
