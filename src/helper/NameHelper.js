export const NameHelper = (name, el) => {
  let val0 =
    name.name === "topic"
      ? el.display_name === undefined
        ? el[0]
        : el.display_name
      : el.name === undefined
      ? el[0]
      : el.name;
  let val1 =
    name.name === "topic" || "record_type"
      ? el.display_name === undefined
        ? el[0]
        : el.display_name
      : el.name === undefined
      ? el[0]
      : el.name;
  return { val0: val0, val1: val1 };
};
