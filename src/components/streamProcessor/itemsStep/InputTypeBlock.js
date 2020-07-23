import React, { useEffect, useState } from "react";
import "./blockStyles.scss";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import SelectFromBlock from "./SelectFormBlock";

const InputTypeBlock = (props) => {
  const { elem, indexBlock, schemas, setFieldValue, block } = props;
  const [valueSelect, SetValueSelect] = useState({
    value: !isEmpty(block) && !!block["value"] ? block["value"] : "=",
    key_type_from:
      !isEmpty(block) && !!block["key_type_from"]
        ? block["key_type_from"]
        : "from_event",
    key_type: !isEmpty(block) && !!block["key_type"] ? block["key_type"] : "",
    event_field_name: !isEmpty(block) ? block["event_field_name"] : "",
    field_name: !isEmpty(block) ? block["field_name"] : "",
    event_field_name_from: !isEmpty(block)
      ? block["event_field_name_from"]
      : "",
  });
  useEffect(() => {}, [props.actualSchema, props.values]);
  if (props.schemas.length <= 0) {
    return false;
  }
  let schema = [];

  let topicValue = props.allValues[props.indexInheritsSchema]["topic"];
  let checkValue;
  if (props.values.steptype === "lookup") {
    if (props.allValues[props.indexInheritsSchema]["record_type"] === "") {
      return false;
    }
    topicValue = props.allValues[props.indexInheritsSchema]["record_type"];
    if (topicValue === "" || !topicValue) {
      return false;
    }
    checkValue =
      topicValue.indexOf("_") === -1
        ? topicValue
        : topicValue?.split("_").slice(2).join("_");
  } else {
    if (topicValue === "" || !topicValue) {
      return false;
    }
    checkValue =
      topicValue?.indexOf("_") === -1
        ? topicValue
        : topicValue?.split("_").slice(2).join("_");
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
    setFieldValue(blockElem.name, e.target.value);
    props.onChange(e);
    SetValueSelect({ ...valueSelect, [blockElem.name]: e.target.value });
  };
  return (
    <>
      <div className="container_block">
        {elem.fields.map((blockElem, i) => {
          if (
            props.allValues[props.indexInheritsSchema].steptype ===
              "map_event" &&
            blockElem.name === "field_name"
          ) {
            if (topicValue === "" || !topicValue) {
              return false;
            }
            topicValue =
              props.allValues[props.indexInheritsSchema - 1]["topic"];
            checkValue =
              topicValue?.indexOf("_") === -1
                ? topicValue
                : topicValue?.split("_").slice(2).join("_");
          } else if (
            props.allValues[props.indexInheritsSchema].steptype ===
              "map_event" &&
            blockElem.name === "target_field_name"
          ) {
            if (topicValue === "" || !topicValue) {
              return false;
            }
            topicValue =
              props.allValues[props.indexInheritsSchema]["event_type"];
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
          schema = schema[0];

          let choices = blockElem.choices;
          if (blockElem.choices.length === 0) {
            choices = !!schema ? schema.schemafield_set : [];
          }
          let isRender = false;
          const isRelated = Array.isArray(blockElem.related_to.value);
          if (
            blockElem.related_to.value &&
            valueSelect[blockElem.related_to.field]
          ) {
            const foundElem = blockElem.related_to.value.filter((el, i) => {
              return (
                valueSelect[blockElem.related_to.field] ===
                blockElem.related_to.value[i]
              );
            });
            isRender = foundElem.length > 0;
          }
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
