// import { def } from "./defaultData";

import { def } from "./defaultData";

export const setValueStep = (data) => {
  const { name, value } = data;
  const container = Object.assign(def, {});
  container[name] = value;
  return container;
};
