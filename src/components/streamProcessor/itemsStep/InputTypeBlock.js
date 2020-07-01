import React, { useState } from "react";
import "./blockStyles.scss";
import { connect } from "react-redux";

const InputTypeBlock = (props) => {
  const { elem, indexBlock, schemas, setFieldValue } = props;
  const [valueSelect, SetValueSelect] = useState({
    value: "=",
    key_type_from: "from_event",
    key_type: "static_value",
  });

  if (schemas.length <= 0) {
    return false;
  }
  let schema = props.actualSchema[0];
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
                    <div className="styled-select">
                      <select
                        name={blockElem.name}
                        onChange={(e) => typeReturnEl(e, blockElem)}
                        className="step"
                      >
                        {choices.map((el) => {
                          const val0 = el.name === undefined ? el[0] : el.name;
                          const val1 = !el.name ? el[1] : el.name;
                          return <option value={val0}>{val1}</option>;
                        })}
                      </select>
                    </div>
                  ) : (
                    <>
                      {isRender && (
                        <div className="styled-select">
                          <select
                            name={blockElem.name}
                            onChange={(e) => typeReturnEl(e, blockElem)}
                            className="step"
                          >
                            {choices.map((el) => {
                              const val0 =
                                el.name === undefined ? el[0] : el.name;
                              const val1 = !el.name ? el[1] : el.name;

                              return <option value={val0}>{val1}</option>;
                            })}
                          </select>
                        </div>
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
                      value={props.values.block}
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
                          value={props.values.block}
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
