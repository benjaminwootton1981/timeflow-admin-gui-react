import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  deleteStep,
  getStreams,
  orderingStep,
} from "../../store/streamProcessor/action";
import InputTypeBlock from "./itemsStep/InputTypeBlock";
import InputTypeSelect from "./itemsStep/InputTypeSelect";
import { useFormik } from "formik";
import InputTypeText from "./itemsStep/InputTypeText";

const Step = (props) => {
  const { stepData, streams } = props.itemsStepTypes;
  const { items } = props;
  const { stepEl, stepIndex, lastStep, isLastStep } = items;
  const { step_types, step_types_data } = stepData;
  const [valueSelect, SetValueSelect] = useState({
    value: "=",
    key_type_from: "from_event",
    key_type: "static_value",
    destinations: "event",
    result_placement: "aggregate",
    last_event_type: "time_window",
  });
  const [fieldsKey, setFieldsKey] = useState(stepEl.steptype);
  const [typeChoicesEndpoint, setTypeChoiceEndpoint] = useState([]);

  const [stepDataValue, setStepDataValue] = useState(stepEl);

  let { values, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: {
      blocks: props.values.blocks.map((el, i) => {
        return { ...el };
      }),
    },
  });

  const addNewBlock = () => {
    setFieldValue(`blocks.${values.blocks.length}.'id`, "null");
  };
  const deleteBlock = (index) => {
    let array = values.blocks.filter((n, i) => i !== index);
    setFieldValue(`blocks`, array);
  };

  useEffect(() => {
    console.log("props.itemsStepTypes", props.itemsStepTypes);
    if (props.itemsStepTypes["functions"].length > 0) {
      const filtered = props.itemsStepTypes["function_endpoints"].filter(
        (func) => +func.Function === +props.itemsStepTypes["functions"][0].id
      );
      const isFirstRenderEndpoint =
        typeChoicesEndpoint.length <= 0 ? filtered : typeChoicesEndpoint;
      setTypeChoiceEndpoint(isFirstRenderEndpoint);
    }

    setFieldsKey(stepEl.steptype);
  }, [stepEl]);

  useEffect(() => {}, [stepDataValue]);

  useEffect(() => {
    if (JSON.stringify(props.values) !== JSON.stringify(values.items)) {
      props.setFieldValue("blocks", values.blocks);
    }
  }, [values]);
  if (!step_types) {
    return false;
  }
  const onChangeFields = (e) => {
    setFieldsKey(e.target.value);
    props.setFieldValue(`blocks`, [{}]);
  };
  const setValueStep = (e) => {
    // SetValueSelect({...valueSelect, [e.name]: e.value});

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
  const changeFunctionEndpoints = (e, elem) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const id = optionElement.getAttribute("id");
    if (elem.is_need_fetch === "functions") {
      const test_typeChoices = props.itemsStepTypes[
        "function_endpoints"
      ].filter((func) => +func.Function === +id);
      setTypeChoiceEndpoint(test_typeChoices);
    }
  };
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
                    let block = values.blocks;
                    if (elem.input_type === "block") {
                      // block = values.blocks.length <= 0 ? [{}] : values.blocks;
                    }
                    const isRelated = Array.isArray(elem.related_to.value);
                    let isRender = false;
                    if (
                      elem.related_to.value &&
                      valueSelect[elem.related_to.field]
                    ) {
                      const foundElem = elem.related_to.value.filter(
                        (el, i) => {
                          return (
                            valueSelect[elem.related_to.field] ===
                            elem.related_to.value[i]
                          );
                        }
                      );
                      isRender = foundElem.length > 0;
                    }
                    const typeElement = {
                      select: (
                        <InputTypeSelect
                          isRelated={isRelated}
                          isRender={isRender}
                          onChange={setValueStep}
                          streams={streams}
                          elem={elem}
                          changeFunctionEndpoints={changeFunctionEndpoints}
                          typeChoicesEndpoint={typeChoicesEndpoint}
                          setFieldValue={props.setFieldValue}
                        />
                      ),
                      block: (
                        <>
                          {block.map((block, i) => {
                            return (
                              <>
                                <InputTypeBlock
                                  deleteBlock={deleteBlock}
                                  addNewBlock={addNewBlock}
                                  values={props.values}
                                  onChange={setValueStep}
                                  elem={elem}
                                  indexBlock={i}
                                  setFieldValue={(name, e) =>
                                    setFieldValue(`blocks.${i}.${name}`, e)
                                  }
                                />
                              </>
                            );
                          })}
                          {elem.input_type === "block" && (
                            <div
                              onClick={() => {
                                addNewBlock();
                              }}
                              className="card-btn card-btn--add-filter new_field_block "
                            >
                              New Filter
                            </div>
                          )}
                        </>
                      ),
                      text: (
                        <InputTypeText
                          isRelated={isRelated}
                          isRender={isRender}
                          // onChange={setValueStep}
                          streams={streams}
                          elem={elem}
                          setFieldValue={props.setFieldValue}
                          stepDataValue={stepDataValue}
                        />
                      ),
                    };
                    const renderElem = typeElement[elem.input_type];
                    return <>{renderElem}</>;
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
                  onClick={() => props.deleteStep(stepIndex, props.values.id)}
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
