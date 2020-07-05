export const NameHelper = (name, el) => {
  let val0 = "";
  let val1 = "";
  if (name.name === "topic" || "record_type") {
    val0 = el.display_name === undefined ? el[0] : el.display_name;
    val1 = el.display_name === undefined ? el[1] : el.display_name;
  } else {
    val0 = el.name === undefined ? el[0] : el.name;
    val1 = el.name === undefined ? el[1] : el.name;
  }
  return { val0: val0, val1: val1 };
};
