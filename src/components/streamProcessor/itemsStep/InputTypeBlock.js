import React, { useEffect, useState } from "react";
import "./blockStyles.scss";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { deleteBlock } from "../../../store/streamProcessor/action";
import SelectFromBlock from "./SelectFormBlock";

const InputTypeBlock = (props) => {
  const { elem, indexBlock, schemas, setFieldValue, block } = props;
  const [valueSelect, SetValueSelect] = useState({
    value: !isEmpty(block) ? block["value"] : "=",
    key_type_from: !isEmpty(block) ? block["key_type_from"] : "from_event",
    key_type: !isEmpty(block) ? block["key_type"] : "static_value",
  });
  useEffect(() => {}, [props.actualSchema, props.values]);
  if (schemas.length <= 0) {
    return false;
  }
  let schema = [];
  if (props.actualSchema) {
    props.actualSchema.forEach((el) => {
      schema = el[props.indexInheritsSchema];
      if (schema) {
        schema = schema[0];
      } else {
        schema = props.schemas[0];
      }
    });
  }
  if (props.actualSchema.length <= 0) {
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
          let choices = blockElem.choices;
          if (blockElem.choices.length <= 0) {
            choices = schema.schemafield_set;
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
    actualSchema: state.StreamProcessorReducer.actualSchema,
    schemas: state.StreamProcessorReducer.schemas,
  };
}, {})(InputTypeBlock);
