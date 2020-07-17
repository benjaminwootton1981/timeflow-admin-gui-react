import React from "react";

const InputTypeText = (props) => {
  const { isRelated, isRender, elem } = props;
  const typedTextInput = elem.name === "offset_in_seconds" ? "number" : "text";
  return (
    <>
      {!isRelated ? (
        <input
          type={typedTextInput}
          name={elem.name}
          onChange={(e) => props.setFieldValue(elem.name, e.target.value)}
          placeholder={elem.name}
          value={!!props.values[elem.name] ? props.values[elem.name] : ""}
          className="required"
        />
      ) : (
        <>
          {isRender && (
            <input
              type={typedTextInput}
              name={elem.name}
              onChange={(e) => props.setFieldValue(elem.name, e.target.value)}
              placeholder={elem.name}
              value={!!props.values[elem.name] ? props.values[elem.name] : ""}
              className="required"
            />
          )}
        </>
      )}
    </>
  );
};
export default InputTypeText;
