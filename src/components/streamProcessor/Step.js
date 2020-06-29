import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  deleteStep,
  getStreams,
  orderingStep,
} from "../../store/streamProcessor/action";
import InputTypeBlock from "./itemsStep/InputTypeBlock";
import InputTypeSelect from "./itemsStep/InputTypeSelect";

const Step = (props) => {
  const { stepData, streams } = props.itemsStepTypes;
  const { items } = props;
  const { stepEl, stepIndex, lastStep, isLastStep } = items;
  const { step_types, step_types_data } = stepData;

  const [fieldsKey, setFieldsKey] = useState(stepEl.steptype);

  const [stepDataValue, setStepDataValue] = useState(stepEl);

  useEffect(() => {
    setFieldsKey(stepEl.steptype);
  }, [stepEl]);

  useEffect(() => {}, [stepDataValue]);
  if (!step_types) {
    return false;
  }
  const onChangeFields = (e) => {
    setFieldsKey(e.target.value);
  };
  const setValueStep = (e) => {
    // props.setSteps(stepDataValue, stepIndex);

    let setValue;
    if (!e.target) {
      setValue = { ...stepDataValue, [e.name]: e.value };
    } else {
      setValue = { ...stepDataValue, [e.target.name]: e.target.value };
    }
    setStepDataValue(setValue);
  };

  let choicesFirstSelect = [];
  const isFirst = stepIndex === 0;
  if (stepIndex === 0) {
    choicesFirstSelect = step_types.filter((el) =>
      el.value.includes("inbound")
    );
  } else if (stepIndex === lastStep) {
    choicesFirstSelect = step_types.filter((el) =>
      el.value.includes("outbound")
    );
  } else {
    choicesFirstSelect = step_types.filter(
      (el) => !el.value.includes("inbound") && !el.value.includes("outbound")
    );
  }
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
              name="name"
              onChange={(e) => props.setFieldValue("name", e.target.value)}
              value={props.values?.name || ""}
              className="required"
            />
          </td>

          <td>
            <div className="styled-select">
              <select
                name="steptype"
                className="step"
                data-step_id="new"
                onChange={(event) => {
                  onChangeFields(event);
                  props.setFieldValue("steptype", event.target.value);
                }}
              >
                {stepData.length !== 0 && (
                  <>
                    {choicesFirstSelect.map((step, i) => {
                      let initialName = 0;
                      if (stepEl.steptype === step.value) {
                        initialName = i;
                      }
                      return (
                        <option selected={initialName} value={step.value}>
                          {step.name}
                        </option>
                      );
                    })}
                  </>
                )}
              </select>
            </div>
            <div className="add-selects" data-step_id={`new_${stepIndex}`}>
              <div>
                {step_types_data &&
                  step_types_data[fieldsKey].fields.map((elem) => {
                    const typeElement = {
                      select: (
                        <InputTypeSelect
                          onChange={setValueStep}
                          streams={streams}
                          elem={elem}
                          setFieldValue={props.setFieldValue}
                        />
                      ),
                      block: (
                        <InputTypeBlock
                          onChange={setValueStep}
                          elem={elem}
                          setFieldValue={props.setFieldValue}
                        />
                      ),
                      text: (
                        <input
                          name={elem.name}
                          onChange={(e) => {
                            setValueStep(e);
                            props.setFieldValue(elem.name, e.target.value);
                          }}
                          value={stepDataValue[elem.name]}
                          className="required"
                        />
                      ),
                    };
                    const renderElem = typeElement[elem.input_type];
                    return <div>{renderElem}</div>;
                  })}
              </div>
            </div>
          </td>
          <td style={{ maxWidth: 250 }} className="new-item__actions">
            <input
              type="hidden"
              name="ordering_new_0"
              value="1"
              className="ordering_new"
            />
            {!isFirst && (
              <>
                {!isLastStep && (
                  <>
                    <button
                      type={"button"}
                      onClick={() => props.orderingStep("down", stepIndex)}
                      className="card-action arrow-bot js-down"
                    >
                      {""}
                    </button>
                    <button
                      type={"button"}
                      onClick={() => props.orderingStep("up", stepIndex)}
                      className="card-action arrow-top js-up"
                    >
                      {""}
                    </button>
                  </>
                )}
                <button
                  type={"button"}
                  onClick={() => props.deleteStep(stepIndex)}
                  className="card-btn card-btn--delete js-delete"
                >
                  Delete
                </button>
              </>
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
      itemsStepTypes: state.StreamProcessorReducer,
    };
  },
  { deleteStep, getStreams, orderingStep }
)(Step);
