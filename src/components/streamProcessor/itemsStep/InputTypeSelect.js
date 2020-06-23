import React from "react";
import { connect } from "react-redux";
import { setSchemasId } from "../../../store/streamProcessor/action";

const InputTypeSelect = (props) => {
  const { elem, streams } = props;
  if (!streams) {
    return false;
  }
  let typeChoices = [];
  if (elem.choices.length === 0) {
    typeChoices = streams;
  } else {
    typeChoices = elem.choices;
  }
  const setSchema = (e) => {
    const element = {
      name: elem.name,
      value: e.target.value,
    };
    props.setFieldValue(elem.name, e.target.value);
    props.onChange(element);
    if (elem.name === "topic" || "record_type") {
      props.setSchemasId(e.target.value);
    }
  };
  return (
    <div className="styled-select">
      <select onChange={setSchema} className="step">
        {typeChoices.map((sel, i) => {
          const val0 = sel.name === undefined ? sel[0] : sel.display_name;
          const val1 = sel.name === undefined ? sel[1] : sel.display_name;

          return <option value={val0}>{val1}</option>;
        })}
      </select>
    </div>
  );
};
export default connect(
  (state) => {
    return {};
  },
  { setSchemasId }
)(InputTypeSelect);
