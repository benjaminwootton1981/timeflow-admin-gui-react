import React, { useState } from "react";
import "./blockStyles.scss";
import { connect } from "react-redux";

const InputTypeBlock = (props) => {
  const { elem, actualSchema, schemas } = props;
  const [firstSelect, SetFirstSelect] = useState({
    value: "=",
    key_type_from: "from_event",
    key_type: "static_value",
  });
  const [secondSelect, SetSecondSelect] = useState("");
  if (schemas.length <= 0) {
    return false;
  }
  let schema = props.actualSchema[0];
  if (props.actualSchema.length <= 0) {
    schema = props.schemas[0];
  }

  const typeReturnEl = (e, blockElem) => {
    props.setFieldValue(elem.name, e.target.value);
    props.onChange(e);
    // console.log('E target', blockElem.name)
    SetFirstSelect({ ...firstSelect, [blockElem.name]: e.target.value });
  };
  return (
    <>
      <div className="container_block">
        {elem.fields.map((blockElem, i) => {
          const isRelated =
            Array.isArray(blockElem.related_to.value) &&
            blockElem.related_to.value;
          let choices = blockElem.choices;
          if (blockElem.choices.length <= 0) {
            choices = schema.schemafield_set;
          }
          const findeName =
            isRelated &&
            isRelated.find((item) => {
              return (
                item === firstSelect["value"] ||
                item === firstSelect["key_type"]
              );
            });
          return (
            <>
              {blockElem.input_type === "select" ? (
                <>
                  {!isRelated ? (
                    <div className="styled-select">
                      <select
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
                      {findeName && (
                        <div className="styled-select">
                          <select
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
                      onChange={(e) => props.onChange(e)}
                      type="text"
                      name={blockElem.name}
                      placeholder="some text"
                      value={""}
                    />
                  ) : (
                    <>
                      {findeName && (
                        <input
                          onChange={(e) => props.onChange(e)}
                          type="text"
                          name={blockElem.name}
                          placeholder="some text"
                          value={""}
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
            onClick={() => props.deleteStep(props.i)}
            className="card-btn card-btn--delete js-delete min_width"
          >
            Delete
          </button>
        </div>
      </div>
      {elem.input_type === "block" && (
        <div className="card-btn card-btn--add-filter new_field_block ">
          New Filter
        </div>
      )}
    </>
  );
};
export default connect((state) => {
  return {
    actualSchema: state.StreamProcessorReducer.actualSchema,
    schemas: state.StreamProcessorReducer.schemas,
  };
}, {})(InputTypeBlock);
