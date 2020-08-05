import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ScheduleInput = ({ values, stepIndex, setFieldValue }) => {
  const [value, setValue] = useState(values.schedule_value || 1);
  const [selectValue, setSelectValue] = useState(
    values.schedule_type || "every_x_second"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setFieldValue("schedule_value", value);
    setFieldValue("schedule_type", selectValue);
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
          <option value={"every_x_millisecond"}>Milliseconds</option>
          <option value={"every_x_second"}>Seconds</option>
          <option value={"every_x_minute"}>Minutes</option>
          <option value={"every_x_hour"}>Hours</option>
          <option value={"every_x_day"}>Days</option>
        </select>
      </div>
    </div>
  );
};

export default ScheduleInput;
