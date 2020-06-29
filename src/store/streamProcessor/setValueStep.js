import { def } from "./defaultData";

export const setValueStep = (data) => {
  const { name, value } = data;
  const defObj = { ...def };
  const container = Object.assign(defObj, {});
  container[name] = value;
  return container;
};
