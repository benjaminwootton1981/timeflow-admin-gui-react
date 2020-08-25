import React, { useEffect, useState } from "react";
import "./blockStyles.scss";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import SelectFromBlock from "./SelectFormBlock";
import typeTopicHelper from "../../../helper/typeTopicHelper";
import isRenderHelper from "../../../helper/isRenderHelper";
import sliceVaueHelper from "../../../helper/sliceVaueHelper";

const InputTypeBlock = (props) => {
  const { elem, indexBlock, schemas, setFieldValue, block } = props;
  const [valueSelect, SetValueSelect] = useState({
    value: !isEmpty(block) && !!block["value"] ? block["value"] : "=",
    key_type_from:
      !isEmpty(block) && !!block["key_type_from"]
        ? block["key_type_from"]
        : "from_event",
    key_type:
      !isEmpty(block) && !!block["key_type"]
        ? block["key_type"]
        : "static_value",
    event_field_name: !isEmpty(block) ? block["event_field_name"] : "",
    field_name: !isEmpty(block) ? block["field_name"] : "",
    event_field_name_from: !isEmpty(block)
      ? block["event_field_name_from"]
      : "",
  });

  useEffect(() => {
    if (props.selectChanged) {
      schema = props.schemas.filter((el) => {
        if (el.name?.indexOf(" ") === -1) {
          return el.name === checkValue;
        } else {
          return (
            el.name?.split(" ").slice(0).join("_") ===
            checkValue?.split(" ").slice(0).join("_")
          );
        }
      });

      const name = props.elem.fields[0].name;
      const value = schema[0].schemafield_set[0].name;
      typeReturnEl({ target: { value: value } }, { name: name });
      console.log("Form values: ", props.values);
      console.log("Changed field ", name, " value to: ", value);
    } else {
      console.log("Form values: ", props.allValues);
    }
  }, [props.actualSchema, props.values, props.selectChanged]);

  if (props.schemas.length <= 0) {
    return false;
  }
  let schema = [];
  const stepType = props.allValues[props.indexInheritsSchema].steptype;
  const stepToInherits = props.allValues[props.indexInheritsSchema];
  const typeTopic = typeTopicHelper(stepType);
  let topicValue = props.allValues[props.indexInheritsSchema][typeTopic];
  let checkValue;

  if (props.values.steptype === "lookup") {
    if (stepToInherits["record_type"] === "") {
      return false;
    }
    topicValue = stepToInherits["record_type"];
    if (topicValue === "" || !topicValue) {
      return false;
    }
    checkValue = sliceVaueHelper(topicValue, 2, "_");
  } else if (stepType === "event") {
    topicValue = stepToInherits["event_type"];
    if (topicValue === "" || !topicValue) {
      return false;
    }
    checkValue = sliceVaueHelper(topicValue, 0, "_");
  } else if (stepType === "map_event") {
    topicValue = stepToInherits["event_type"];
    if (!topicValue) {
      return false;
    }
    checkValue = checkValue = sliceVaueHelper(topicValue, 0, "_");
  } else {
    if (!topicValue) {
      return false;
    }
    checkValue = sliceVaueHelper(topicValue, 2, "_");
  }
  if (schema) {
    schema = props.schemas.filter((el) => {
      if (el.name?.indexOf(" ") === -1) {
        return el.name === checkValue;
      } else {
        return el.name?.split(" ").slice(0).join("_") === checkValue;
      }
    });
    schema = schema[0];
  } else {
    schema = props.schemas[0];
  }
  const typeReturnEl = (e, blockElem) => {
    props.onChange({ name: blockElem.name, value: e.target.value });
    SetValueSelect({ ...valueSelect, [blockElem.name]: e.target.value });
  };
  return (
    <>
      <div className="container_block">
        {elem.fields.map((blockElem, i) => {
          if (stepType === "map_event" && blockElem.name === "field_name") {
            const prevStepType =
              props.allValues[props.indexInheritsSchema - 1].steptype;
            const prevStepToInherits =
              props.allValues[props.indexInheritsSchema - 1];
            const typeTopicSingle = typeTopicHelper(prevStepType);

            if (topicValue === "" || !topicValue) {
              return false;
            }
            topicValue = prevStepToInherits[typeTopicSingle];
            if (
              typeTopicSingle === "topic" ||
              typeTopicSingle === "record_type"
            ) {
              checkValue = sliceVaueHelper(topicValue, 2, "_");
            } else {
              checkValue = sliceVaueHelper(topicValue, 0, "_");
            }
          } else if (
            stepType === "map_event" &&
            blockElem.name === "target_field_name"
          ) {
            if (topicValue === "" || !topicValue) {
              return false;
            }
            topicValue = stepToInherits["event_type"];
            if (topicValue === "" || !topicValue) {
              topicValue = props.schemas[0].name;
            }
            checkValue =
              topicValue?.indexOf("_") === -1
                ? topicValue
                : topicValue?.split("_").slice(0).join("_");
          }

          schema = schemas.filter((el) => {
            if (el.name?.indexOf(" ") === -1) {
              return el.name === checkValue;
            } else {
              return (
                el.name?.split(" ").slice(0).join("_") ===
                checkValue?.split(" ").slice(0).join("_")
              );
            }
          });
          if (schema?.length === 0) {
            schema = schemas[0];
          }
          schema = schema[0];
          let choices = blockElem.choices;
          if (blockElem.choices.length === 0) {
            choices = !!schema ? schema.schemafield_set : [];
          }
          const isRelated = Array.isArray(blockElem.related_to.value);
          let isRender = isRenderHelper(blockElem, valueSelect);
          return (
            <>
              {blockElem.input_type === "select" ? (
                <>
                  {!isRelated ? (
                    <SelectFromBlock
                      blockElem={blockElem}
                      typeReturnEl={typeReturnEl}
                      choices={choices}
                      valueSelect={valueSelect}
                      setFieldValue={setFieldValue}
                      block={props.block}
                    />
                  ) : (
                    <>
                      {isRender && (
                        <SelectFromBlock
                          block={props.block}
                          blockElem={blockElem}
                          typeReturnEl={typeReturnEl}
                          choices={choices}
                          valueSelect={valueSelect}
                          setFieldValue={setFieldValue}
                        />
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {!isRelated ? (
                    <input
                      onChange={(e) =>
                        setFieldValue(blockElem.name, e.target.value)
                      }
                      type="text"
                      name={blockElem.name}
                      placeholder={blockElem.name}
                      value={block[blockElem.name]}
                    />
                  ) : (
                    <>
                      {isRender && (
                        <input
                          onChange={(e) =>
                            setFieldValue(blockElem.name, e.target.value)
                          }
                          type="text"
                          name={blockElem.name}
                          placeholder={blockElem.name}
                          value={block[blockElem.name]}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </>
          );
        })}
        <div className="block_delete">
          <button
            type={"button"}
            onClick={() => props.deleteBlock(indexBlock)}
            className="card-btn card-btn--delete js-delete min_width"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
export default connect((state) => {
  return {
    schemas: state.StreamProcessorReducer.schemas,
    stepsStreamProcessor: state.StreamProcessorReducer.stepsStreamProcessor,
  };
}, {})(InputTypeBlock);
