export const NameHelper = (
  props,
  elName,
  sel,
  isDisplayName,
  kpiKeyTypeLength
) => {
  let value = "";
  let name = "";
  if (elName === "category_name") {
    value = sel.category === undefined ? sel[0] : sel.category;
    name = sel.category === undefined ? sel[1] : sel.category;
  } else if (elName === "metric") {
    value = sel.metric === undefined ? sel[0] : sel.metric;
    name = sel.metric === undefined ? sel[1] : sel.metric;
  } else if (elName === "recipient") {
    value = sel.metric === undefined ? sel[0] : sel.id;
    name = sel.metric === undefined ? sel[1] : sel.name;
  } else if (
    kpiKeyTypeLength === 0 &&
    elName === "key_type" &&
    props.values["steptype"] === "key"
  ) {
    value = sel.value === undefined ? sel[0] : sel.value;
    name = sel.name === undefined ? sel[1] : isDisplayName;
  } else {
    value = isDisplayName === undefined ? sel[0] : sel.name;
    name = isDisplayName === undefined ? sel[1] : isDisplayName;
  }
  return { value: value, name: name };
};
