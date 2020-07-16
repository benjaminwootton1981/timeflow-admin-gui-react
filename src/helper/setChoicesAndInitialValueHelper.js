export const setChoicesAndInitialValueHelper = (
  elem,
  choicesName,
  elName,
  props,
  errorData,
  setTypeChoice,
  setFieldValue,
  kpiKeyTypeLength,
  stepIndex
) => {
  if (elem.choices.length === 0) {
    if (elem.is_need_fetch === "schema_fields") {
      let schema = [];
      if (props.itemsStepTypes.actualSchema.length > 0) {
        props.itemsStepTypes.actualSchema.forEach((el) => {
          if (!elName) {
            return errorData;
          }
          schema = el[props.indexInheritsSchema];
          if (schema) {
            if (!schema[0]) {
              return errorData;
            }
            schema = schema[0].schemafield_set;
            const setValue = !!props.values[elName]
              ? props.values[elName]
              : schema[0]?.name;
            setFieldValue(elName, setValue);
            setTypeChoice(schema);
          } else {
            if (!props.itemsStepTypes[choicesName][0]) {
              return errorData;
            }
            schema = props.itemsStepTypes[choicesName][0].schemafield_set;
            const setValue = !!props.values[elName]
              ? props.values[elName]
              : schema[0]?.name;
            setFieldValue(elName, setValue);
            setTypeChoice(schema);
          }
        });
        if (
          elName === "field_to_process" &&
          props.values["steptype"] === "key"
        ) {
          if (!elem.choices || !props.itemsStepTypes[choicesName][0]) {
            return errorData;
          }
          if (!elName || elName === "") {
            return errorData;
          }
          schema = props.itemsStepTypes[choicesName][0].schemafield_set;
          if (schema[0]) {
            const setValue = !!props.values[elName]
              ? props.values[elName]
              : schema[0]?.name;
            setFieldValue(elName, setValue);
          }
        }
      } else if (props.itemsStepTypes.actualSchema.length === 0) {
        if (!elem.choices || !props.itemsStepTypes[choicesName][0]) {
          return errorData;
        }
        if (!elName || elName === "") {
          return errorData;
        }
        schema = props.itemsStepTypes[choicesName][0].schemafield_set;
        setTypeChoice(schema);
        if (schema[0]) {
          const setValue = !!props.values[elName]
            ? props.values[elName]
            : schema[0]?.name;
          setFieldValue(elName, setValue);
        }
      }
    } else if (elName === "topic") {
      setTypeChoice(props.itemsStepTypes[choicesName]);
      if (!elName) {
        return errorData;
      }
      const setValue = !!props.values.topic
        ? props.values.topic
        : props.itemsStepTypes[choicesName][0]?.name;
      setFieldValue(elName, setValue);
      props.setSchemasId({
        value: props.itemsStepTypes[choicesName][0]?.name,
        stepIndex: stepIndex,
      });
    } else if (elName === "event_type") {
      if (!elName) {
        return errorData;
      }
      const setValue = !!props.values.event_type
        ? props.values.event_type
        : props.itemsStepTypes[choicesName][0]?.name;
      setTypeChoice(props.itemsStepTypes[choicesName]);

      setFieldValue(elName, setValue);
    } else if (elName === "recipient") {
      setTypeChoice(props.itemsStepTypes["recipientList"]);
      if (!elName) {
        return errorData;
      }
      const setValue = !!props.values.recipient
        ? props.values.recipient
        : +props.itemsStepTypes["recipientList"][0]?.id;
      setFieldValue(elName, setValue);
    } else if (elName === "data_dictionary_name") {
      setTypeChoice(props.itemsStepTypes["data_dictionaries"]);
      if (!elName) {
        return errorData;
      }
      const setValue = !!props.values.data_dictionary_name
        ? props.values.data_dictionary_name
        : props.itemsStepTypes["data_dictionaries"].length > 0 &&
          props.itemsStepTypes["data_dictionaries"][0]?.name;
      setFieldValue(elName, setValue);
    } else if (elName === "search_name") {
      setTypeChoice(props.itemsStepTypes["searches"]);
      if (!elName) {
        return errorData;
      }
      if (props.itemsStepTypes["searches"].length > 0) {
        const setValue = !!props.values.search_name
          ? props.values.search_name
          : props.itemsStepTypes["searches"][0]?.name;
        props.setFieldValue(elName, setValue);
      }
    } else if (elName === "category_name") {
      setTypeChoice(props.itemsStepTypes["kpiData"]);
      if (!elName) {
        return errorData;
      }
      if (props.itemsStepTypes["kpiData"].length > 0) {
        if (!props.values) {
          return false;
        }
        const setValue = !!props.values.category_name
          ? props.values.category_name
          : props.itemsStepTypes["kpiData"][0]?.category;
        setFieldValue(elName, setValue);
      }
    } else if (elName === "metric") {
      if (!props.itemsStepTypes["kpiData"][0]) {
        return false;
      }
      const checkMetricName = !!props.values.category_name
        ? props.values.category_name
        : props.itemsStepTypes["kpiData"][0]?.category;
      const selectArray = props.itemsStepTypes["kpiData"]?.filter(
        (kpi) => kpi.category === checkMetricName
      );
      setTypeChoice(selectArray);
      if (!elName) {
        return errorData;
      }
      if (props.itemsStepTypes["kpiData"].length > 0) {
        const setValue = !!props.values.metric
          ? props.values.metric
          : props.itemsStepTypes["kpiData"][0].metric;
        setFieldValue(elName, setValue);
      }
    } else if (kpiKeyTypeLength === 0 && props.values["steptype"] === "key") {
      const checkMetricName = !!props.values.category_name
        ? props.values.category_name
        : props.itemsStepTypes["kpiData"][0]?.category;
      const selectArray = props.itemsStepTypes["kpiData"]?.filter(
        (kpi) => kpi.category === checkMetricName
      );
      const selectIndicatorType = selectArray[0]?.indicator_type;
      let metricKeyType = [];
      if (selectIndicatorType === "kpi_type_measurement") {
        setTypeChoice(props.itemsStepTypes["stepData"]?.update_key_types);
        metricKeyType = props.itemsStepTypes["stepData"]?.update_key_types;
      } else {
        setTypeChoice(props.itemsStepTypes["stepData"]?.increment_key_types);
        metricKeyType = props.itemsStepTypes["stepData"]?.increment_key_types;
      }
      const setValue = !!props.values.key_type
        ? props.values.key_type
        : metricKeyType[0].value;
      setFieldValue(elName, setValue);
      props.SetValueSelect({ ...props.valueSelect, [elName]: setValue });
    } else if (elName === "record_type") {
      if (!elName) {
        return errorData;
      }
      const setValue = !!props.values.record_type
        ? props.values.record_type
        : props.itemsStepTypes[choicesName][0]?.name;
      setTypeChoice(props.itemsStepTypes[choicesName]);
      setFieldValue(elName, setValue);
    }
  } else {
    if (!elem.choices) {
      return errorData;
    }
    setTypeChoice(elem.choices);
    const checkName =
      elem.choices[0].name === undefined
        ? elem.choices[0][0]
        : elem.choices[0].name;

    const setValue = !!props.values[elName] ? props.values[elName] : checkName;
    setFieldValue(elName, setValue);
  }
};
