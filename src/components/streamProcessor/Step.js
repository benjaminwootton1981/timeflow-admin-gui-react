import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteStep } from "../../store/streamProcessor/action";

const Step = (props) => {
  const { item, stepTypesData } = props;
  const [fieldsKey, setFieldsKey] = useState(item.key);
  const { step_types, step_types_data } = stepTypesData;
  if (item) {
    step_types.forEach((el, i) => {
      if (el.name === item.name) {
        step_types.unshift(...step_types.splice(i, 1));
      }
    });
  }
  const onChangeFields = (event) => {
    setFieldsKey(event.target.value);
  };
  const checkFields = step_types_data[fieldsKey].fields
    ? step_types_data[fieldsKey].fields
    : [
        {
          name: "",
          value: "",
        },
      ];
  console.log("fieldsKey", fieldsKey);
  console.log("item", item);
  return (
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
              name="name_new_0"
              value="Inbound Event"
              className="required"
            />
          </td>
          <td>
            <div className="styled-select">
              <select
                name="steptype_new_0"
                className="step"
                data-step_id="new_0"
                onChange={(event) => onChangeFields(event)}
              >
                {item && (
                  <>
                    {step_types.map((step) => {
                      return <option value={step.value}>{step.name}</option>;
                    })}
                  </>
                )}
              </select>
            </div>
            <div className="add-selects" data-step_id="new_0">
              <div className="styled-select">
                <select
                  name="{{ item.name }}_new_0"
                  className="form-control step"
                  data-step_id="new_0"
                  data-popover-body="{{ item.popover.bottom_text }}"
                  data-popover-title="{{ item.popover.top_text }}"
                >
                  {item && (
                    <>
                      {checkFields.map((el) => {
                        return <option value={el.name}>{el.name}</option>;
                      })}
                    </>
                  )}
                </select>
              </div>
            </div>
          </td>
          <td>
            <input
              type="hidden"
              name="ordering_new_0"
              value="1"
              className="ordering_new"
            />
            {!props.isInbound && (
              <button
                onClick={() => props.deleteStep(item.name)}
                className="card-btn card-btn--delete js-delete"
              >
                Delete
              </button>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default connect(
  (state) => {
    return {
      stepTypesData: state.StreamProcessorReducer.stepTypes,
    };
  },
  { deleteStep }
)(Step);
