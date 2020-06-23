import React, { useState } from "react";
import "./blockStyles.scss";
import { connect } from "react-redux";

const InputTypeBlock = (props) => {
  const { elem, actualSchema, schemas } = props;
  const [value, SetValue] = useState("");
  const [value2, SetValue2] = useState("");
  if (schemas.length <= 0) {
    return false;
  }
  let schema = props.actualSchema[0];
  if (props.actualSchema.length <= 0) {
    schema = props.schemas[0];
  }

  const typeReturnEl = (e) => {
    props.setFieldValue(elem.name, e.target.value);
    props.onChange(e);
    if (e.target.name === [e]) {
      SetValue(e.target.value);
    } else {
      SetValue2(e.target.value);
    }
    // console.log('TARGET', e.target.value)
  };
  return (
    <>
      <div className="container_block">
        {elem.fields.map((blockElem, i) => {
          const zavisim = blockElem.related_to.field;
          let choices = blockElem.choices;
          if (blockElem.choices.length <= 0) {
            choices = schema.schemafield_set;
          }
          const typeItem = {
            "!=": "percent",
            "<": "dfdsfs",
          };
          const test = typeItem[value];
          return (
            <>
              {blockElem.input_type === "select" ? (
                <>
                  {!zavisim ? (
                    <div className="styled-select">
                      <select onChange={typeReturnEl} className="step">
                        {choices.map((el) => {
                          const val0 = el.name === undefined ? el[0] : el.name;
                          const val1 = !el.name ? el[1] : el.name;

                          return <option value={val0}>{val1}</option>;
                        })}
                      </select>
                    </div>
                  ) : (
                    <>{blockElem.name === test && <div>ZAVISIMOSTI</div>}</>
                  )}
                </>
              ) : (
                <>
                  {!zavisim ? (
                    <input
                      onChange={(e) => props.onChange(e)}
                      type="text"
                      name={blockElem.name}
                      placeholder="Stream Processor Name"
                      value={blockElem.name}
                    />
                  ) : (
                    <>{<div>ZAVISIMOSTI</div>}</>
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
