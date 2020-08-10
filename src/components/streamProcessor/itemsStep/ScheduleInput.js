import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import pluralize from "pluralize";

const ScheduleInput = ({ values, stepIndex, setFieldValue }) => {
  const [value, setValue] = useState(parseInt(values.schedule || 1));
  const [selectValue, setSelectValue] = useState(
    values.schedule_type || "every_x_second"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setFieldValue("schedule", value);
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
          <option value={"every_x_milliseconds"}>
            {pluralize("Milliseconds", value)}
          </option>
          <option value={"every_x_seconds"}>
            {pluralize("Seconds", value)}
          </option>
          <option value={"every_x_minutes"}>
            {pluralize("Minutes", value)}
          </option>
          <option value={"every_x_hours"}>{pluralize("Hours", value)}</option>
          <option value={"every_x_days"}>{pluralize("Days", value)}</option>
        </select>
      </div>
    </div>
  );
};

export default ScheduleInput;
