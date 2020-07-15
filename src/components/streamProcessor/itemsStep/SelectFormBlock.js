import React, { useEffect } from "react";

const SelectFromBlock = (props) => {
  const { blockElem, typeReturnEl, choices, valueSelect, block } = props;

  let val = !!block[blockElem.name]
    ? block[blockElem.name]
    : choices[0].name === undefined
    ? choices[0][0]
    : choices[0].name;

  console.log("block[blockElem.name]", block[blockElem.name]);
  useEffect(() => {
    props.setFieldValue(blockElem.name, val);
  }, []);
  const options = (
    <>
      {choices.map((el) => {
        const isDisplayName =
          el.display_name === undefined ? el.name : el.display_name;
        const val0 = isDisplayName === undefined ? el[0] : el.name;
        const val1 = isDisplayName === undefined ? el[1] : isDisplayName;
        return <option value={val0}>{val1}</option>;
      })}
    </>
  );

  return (
    <div className="styled-select">
      <select
        name={blockElem.name}
        onChange={(e) => typeReturnEl(e, blockElem)}
        className="step"
        value={valueSelect[blockElem.name]}
      >
        {options}
      </select>
    </div>
  );
};

export default SelectFromBlock;
