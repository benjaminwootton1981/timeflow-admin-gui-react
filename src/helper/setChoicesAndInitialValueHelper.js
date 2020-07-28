import _ from "lodash";

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
      let fieldToProcess;
      let timeStampField;
      if (
        elName === "timestamp_field_name" &&
        props.values["steptype"] === "reset"
      ) {
        timeStampField = _.cloneDeep(props.itemsStepTypes["schemas"]);
        timeStampField.forEach((element) => {
          element.schemafield_set.unshift({ name: "__time" });
        });
      }
      if (elName === "field_to_process" && props.values["steptype"] === "key") {
        let typeTopic = "topic";
        if (props.allValues[props.indexInheritsSchema].steptype === "lookup") {
          typeTopic = "record_type";
        }
        if (
          props.allValues[props.indexInheritsSchema].steptype === "map_event"
        ) {
          typeTopic = "event_type";
        }
        if (props.allValues[props.indexInheritsSchema].steptype === "event") {
          typeTopic = "event_type";
        }
        let topicValue = props.allValues[props.indexInheritsSchema][typeTopic];
        let checkValue;
        if (props.values.steptype === "lookup") {
          if (
            props.allValues[props.indexInheritsSchema]["record_type"] === ""
          ) {
            return false;
          }
          topicValue =
            props.allValues[props.indexInheritsSchema]["record_type"];
          if (topicValue === "" || !topicValue) {
            return false;
          }
          checkValue =
            topicValue.indexOf("_") === -1
              ? topicValue
              : topicValue?.split("_").slice(2).join("_");
        } else {
          if (topicValue === "" || !topicValue) {
            return false;
          }
          checkValue =
            topicValue?.indexOf("_") === -1
              ? topicValue
              : topicValue?.split("_").slice(2).join("_");
        }
        if (schema) {
          schema = props.itemsStepTypes.schemas.filter((el) => {
            if (el.name?.indexOf(" ") === -1) {
              return el.name === checkValue;
            } else {
              return (
                el.name?.split(" ").slice(0).join("_") ===
                checkValue.split(" ").slice(0).join("_")
              );
            }
          });
          if (!schema[0]) {
            return errorData;
          }
          const setValue = !!props.values[elName]
            ? props.values[elName]
            : schema[0]?.name;
          setFieldValue(elName, setValue);
        } else {
          if (!props.itemsStepTypes[choicesName][0]) {
            return errorData;
          }
          schema = props.itemsStepTypes[choicesName];
        }
        fieldToProcess = _.cloneDeep(schema);
        fieldToProcess.forEach((element) => {
          element.schemafield_set.unshift({ name: "null" });
        });
        schema = fieldToProcess[0].schemafield_set;
        setTypeChoice(schema);
      }
      if (elName === "add_field_name") {
        let typeTopic = "topic";
        if (props.allValues[props.indexInheritsSchema].steptype === "lookup") {
          typeTopic = "record_type";
        }
        if (
          props.allValues[props.indexInheritsSchema].steptype === "map_event"
        ) {
          typeTopic = "event_type";
        }
        if (props.allValues[props.indexInheritsSchema].steptype === "event") {
          typeTopic = "event_type";
        }
        let topicValue = props.allValues[props.indexInheritsSchema][typeTopic];
        let checkValue;
        if (props.values.steptype === "lookup") {
          if (
            props.allValues[props.indexInheritsSchema]["record_type"] === ""
          ) {
            return false;
          }
          topicValue =
            props.allValues[props.indexInheritsSchema]["record_type"];
          if (topicValue === "" || !topicValue) {
            return false;
          }
          checkValue =
            topicValue.indexOf("_") === -1
              ? topicValue
              : topicValue?.split("_").slice(2).join("_");
        } else {
          if (topicValue === "" || !topicValue) {
            return false;
          }
          checkValue =
            topicValue?.indexOf("_") === -1
              ? topicValue
              : topicValue?.split("_").slice(2).join("_");
        }
        if (schema) {
          schema = props.itemsStepTypes.schemas.filter((el) => {
            if (el.name?.indexOf(" ") === -1) {
              return el.name === checkValue;
            } else {
              return (
                el.name?.split(" ").slice(0).join("_") ===
                checkValue.split(" ").slice(0).join("_")
              );
            }
          });
          if (!schema[0]) {
            return false;
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
      }
      if (props.itemsStepTypes.schemas.length > 0) {
        let typeTopic = "topic";
        if (props.allValues[props.indexInheritsSchema].steptype === "lookup") {
          typeTopic = "record_type";
        }
        if (
          props.allValues[props.indexInheritsSchema].steptype === "map_event"
        ) {
          typeTopic = "event_type";
        }
        if (props.allValues[props.indexInheritsSchema].steptype === "event") {
          typeTopic = "event_type";
        }
        let topicValue = props.allValues[props.indexInheritsSchema][typeTopic];
        let checkValue;
        if (props.values.steptype === "lookup") {
          if (
            props.allValues[props.indexInheritsSchema]["record_type"] === ""
          ) {
            return false;
          }
          topicValue =
            props.allValues[props.indexInheritsSchema]["record_type"];
          if (topicValue === "" || !topicValue) {
            return false;
          }
          checkValue =
            topicValue.indexOf("_") === -1
              ? topicValue
              : topicValue?.split("_").slice(2).join("_");
        } else {
          if (topicValue === "" || !topicValue) {
            return false;
          }
          checkValue =
            topicValue?.indexOf("_") === -1
              ? topicValue
              : topicValue?.split("_").slice(2).join("_");
        }
        if (schema) {
          schema = props.itemsStepTypes.schemas.filter((el) => {
            if (el.name?.indexOf(" ") === -1) {
              return el.name === checkValue;
            } else {
              return (
                el.name?.split(" ").slice(0).join("_") ===
                checkValue.split(" ").slice(0).join("_")
              );
            }
          });
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
          if (schema[0]) {
            setTypeChoice(fieldToProcess[0].schemafield_set);
            const setValue = !!props.values[elName]
              ? props.values[elName]
              : fieldToProcess[0].schemafield_set[0].name;
            setFieldValue(elName, setValue);
          }
        }

        if (
          elName === "timestamp_field_name" &&
          props.values["steptype"] === "reset"
        ) {
          if (!elem.choices || !props.itemsStepTypes[choicesName][0]) {
            return errorData;
          }
          if (!elName || elName === "") {
            return errorData;
          }
          if (timeStampField[0]) {
            setTypeChoice(timeStampField[0].schemafield_set);
            const setValue = !!props.values[elName]
              ? props.values[elName]
              : timeStampField[0].schemafield_set[0].name;
            setFieldValue(elName, setValue);
          }
        }
      } else if (
        elName === "timestamp_field_name" &&
        props.values["steptype"] === "reset"
      ) {
        if (!elem.choices || !props.itemsStepTypes[choicesName][0]) {
          return errorData;
        }
        if (!elName || elName === "") {
          return errorData;
        }
        if (timeStampField[0]) {
          setTypeChoice(timeStampField[0].schemafield_set);
          const setValue = !!props.values[elName]
            ? props.values[elName]
            : timeStampField[0].schemafield_set[0].name;
          setFieldValue(elName, setValue);
        }
      } else if (
        elName === "field_to_process" &&
        props.values["steptype"] === "key"
      ) {
        if (!elem.choices || !props.itemsStepTypes[choicesName][0]) {
          return errorData;
        }
        if (!elName || elName === "") {
          return errorData;
        }
        if (fieldToProcess[0]) {
          setTypeChoice(fieldToProcess[0].schemafield_set);
          const setValue = !!props.values[elName]
            ? props.values[elName]
            : fieldToProcess[0].schemafield_set[0].name;
          setFieldValue(elName, setValue);
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
