import React, { useEffect } from "react";

const SelectFromBlock = (props) => {
  const { blockElem, typeReturnEl, choices, valueSelect } = props;
  useEffect(() => {
    const val = choices[0].name === undefined ? choices[0][0] : choices[0].name;
    props.setFieldValue(blockElem.name, val);
  }, []);
  return (
    <div className="styled-select">
      <select
        name={blockElem.name}
        onChange={(e) => typeReturnEl(e, blockElem)}
        className="step"
      >
        {choices.map((el) => {
          const val0 = el.name === undefined ? el[0] : el.name;
          const val1 = !el.name ? el[1] : el.name;
          return (
            <option
              value={val0}
              selected={el[0] === valueSelect[blockElem.name]}
            >
              {val1}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectFromBlock;
