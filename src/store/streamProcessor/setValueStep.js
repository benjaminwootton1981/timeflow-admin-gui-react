import { def } from "./defaultData";

export const setValueStep = (data) => {
  const { name, value } = data;
  const setValue = { ...def, [name]: value };
  return setValue;
};
