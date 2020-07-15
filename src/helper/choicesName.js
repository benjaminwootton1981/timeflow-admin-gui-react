export const choiceNameHelper = (elem) => {
  let choicesName = "";

  if (elem.is_need_fetch === "function_endpoints") {
    choicesName = "function_endpoints";
  } else if (elem.is_need_fetch === "schema_fields") {
    choicesName = "schemas";
  } else if (
    elem.is_need_fetch === "kpi_category" ||
    elem.is_need_fetch === "kpi_metric"
  ) {
    choicesName = "kpiData";
  } else if (elem.is_need_fetch === "users") {
    choicesName = "recipientList";
  } else {
    choicesName = elem.is_need_fetch;
  }
  return choicesName;
};
