import React from "react";

const InputTypeText = (props) => {
  const { isRelated, isRender, elem, setValueStep, stepDataValue } = props;
  return (
    <>
      {!isRelated ? (
        <input
          name={elem.name}
          onChange={(e) => props.setFieldValue(elem.name, e.target.value)}
          placeholder={elem.name}
          value={stepDataValue[elem.name]}
          className="required"
        />
      ) : (
        <>
          {isRender && (
            <input
              name={elem.name}
              onChange={(e) => props.setFieldValue(elem.name, e.target.value)}
              placeholder={elem.name}
              value={stepDataValue[elem.name]}
              className="required"
            />
          )}
        </>
      )}
    </>
  );
};
export default InputTypeText;
