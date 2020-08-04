import React, { useEffect, useState } from "react";

const ScheduleInput = () => {
  const [value, setValue] = useState(1);
  const [selectValue, setSelectValue] = useState("second");

  useEffect(() => {
    console.log(`Every ${value} ${selectValue}(s)`);
  }, [value, selectValue]);
  return (
    <div>
      <input
        type="number"
        placeholder={"Every"}
        value={value}
        onChange={(event) => setValue(parseInt(event.target.value))}
      />

      <div className="styled-select">
        <select
          value={selectValue}
          className="step"
          onChange={(event) => setSelectValue(event.target.value)}
        >
          <option value={"millisecond"}>Milliseconds</option>
          <option value={"second"}>Seconds</option>
          <option value={"minute"}>Minutes</option>
          <option value={"hour"}>Hours</option>
          <option value={"day"}>Days</option>
        </select>
      </div>
    </div>
  );
};

export default ScheduleInput;
