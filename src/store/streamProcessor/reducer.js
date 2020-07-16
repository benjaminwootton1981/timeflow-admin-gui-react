import { CONSTANTS } from "../constants";
import { setValueStep } from "./setValueStep";
import { defInboundStep, defOutboundStep } from "./defaultData";

const initialState = {
  stepData: [],
  stepsStreamProcessor: [],
  inboundChoice: [],
  streams: [],
  schemas: [],
  actualSchema: [],
  recipientList: [],
  data_dictionaries: [],
  functions: [],
  kpiData: [],
  function_endpoints: [],
  newStreamprocessors: [],
  searches: [],
};

export default function StreamProcessorReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.STREAMS.ADD_NEW_STEP:
      const steps = [...state.stepsStreamProcessor];
      const { step_types_data } = state.stepData;
      const fillWithData = step_types_data[action.data.value].fields;
      let newStep = setValueStep(action.data);
      let typeDataSet = [];
      if (action.data.value === "workflow") {
        fillWithData.forEach((field) => {
          Object.assign(newStep, {});
          const nameValue = {
            text: "name",
            select: "choices",
          };
          let workflow_task = {};
          Object.assign(workflow_task, {});

          if (field.input_type === "select") {
            const valueSelect =
              field[nameValue[field.input_type]].length > 0
                ? field[nameValue[field.input_type]][0][0]
                : field[nameValue[field.input_type]];
            workflow_task[field.name] = Array.isArray(valueSelect)
              ? ""
              : valueSelect;
          } else {
            workflow_task[field.name] = "";
          }
          newStep["workflow_task"] = [workflow_task];
        });

        steps.push(newStep);
        steps.forEach((el, i) => {
          if (el.steptype.includes("outbound")) {
            steps.push(...steps.splice(i, 1));
          }
        });
        typeDataSet = steps;
      } else {
        fillWithData.forEach((field) => {
          Object.assign(newStep, {});
          const nameValue = {
            text: "name",
            block: "fields",
            select: "choices",
          };
          if (field.input_type === "block") {
            let block = {};
            field.fields.forEach((elBlock) => {
              const nameValue = {
                text: "name",
                select: "choices",
              };

              //IN PROGRESS
              let setSchemaValue = "";
              // if (elBlock.changes_schema_block === 1) {
              // }

              Object.assign(block, {});
              if (elBlock.input_type === "select") {
                const valueSelect =
                  elBlock[nameValue[elBlock.input_type]].length > 0
                    ? elBlock[nameValue[elBlock.input_type]][0][0]
                    : elBlock[nameValue[elBlock.input_type]];
                block[elBlock.name] = Array.isArray(valueSelect)
                  ? ""
                  : valueSelect;
              } else {
                block[elBlock.name] = "";
              }
            });
            block["id"] = null;
            newStep["blocks"] = [block];
          } else if (field.input_type === "select") {
            const valueSelect =
              field[nameValue[field.input_type]].length > 0
                ? field[nameValue[field.input_type]][0][0]
                : field[nameValue[field.input_type]];
            newStep[field.name] = Array.isArray(valueSelect) ? "" : valueSelect;
          } else {
            newStep[field.name] = "";
          }
        });
        steps.push(newStep);
        steps.forEach((el, i) => {
          if (el.steptype.includes("outbound")) {
            steps.push(...steps.splice(i, 1));
          }
        });
        typeDataSet = steps;
      }

      return { ...state, stepsStreamProcessor: typeDataSet };

    case CONSTANTS.STREAMS.GET_STEP_TYPE:
      return { ...state, stepData: action.data };

    case CONSTANTS.STREAMS.FILTERED_SCHEMAS:
      const { value, typeSelect } = action.data;
      let checkValue;
      if (typeSelect === "event_type") {
        checkValue =
          value.indexOf("_") === -1
            ? value
            : value.split("_").slice(0).join("_");
      } else {
        checkValue =
          value.indexOf("_") === -1
            ? value
            : value.split("_").slice(2).join("_");
      }
      const filteredSchemas = [
        ...state.schemas.filter((el) => {
          if (el.name.indexOf(" ") === -1) {
            return el.name === checkValue;
          } else {
            return el.name.split(" ").slice(0).join("_") === checkValue;
          }
        }),
      ];
      let setActualSchema;
      if (state.actualSchema.length > 0) {
        setActualSchema = [
          ...state.actualSchema,
          { [action.data.stepIndex]: filteredSchemas },
        ];

        state.actualSchema.forEach((schema) => {});
      } else {
        setActualSchema = [
          ...state.actualSchema,
          { [action.data.stepIndex]: filteredSchemas },
        ];
      }
      return { ...state, actualSchema: setActualSchema };

    case CONSTANTS.STREAMS.GET_STREAMS:
      return { ...state, streams: action.data };
    case CONSTANTS.STREAMS.GET_SEARCHES:
      return { ...state, searches: action.data };

    case CONSTANTS.STREAMS.GET_SCHEMAS:
      return { ...state, schemas: action.data };

    case CONSTANTS.STREAMS.GET_STREAM_PROCESSOR:
      return { ...state, stepsStreamProcessor: action.data };

    case CONSTANTS.STREAMS.GET_RECIPIENT_LIST:
      return { ...state, recipientList: action.data };

    case CONSTANTS.STREAMS.GET_KPI:
      return { ...state, kpiData: action.data };

    case CONSTANTS.STREAMS.GET_DATA_DICTIONARY:
      return { ...state, data_dictionaries: action.data };

    case CONSTANTS.STREAMS.GET_FUNCTION:
      return { ...state, functions: action.data };

    case CONSTANTS.STREAMS.UPDATE_STREAM_PROCESSOR:
      return { ...state, stepsStreamProcessor: action.data };

    case CONSTANTS.STREAMS.GET_FUNCTION_ENDPOINT:
      return { ...state, function_endpoints: action.data };

    case CONSTANTS.STREAMS.CREATE_STREAM_PROCESSOR_INFO:
      return { ...state, newStreamprocessors: action.data };

    case CONSTANTS.STREAMS.ORDERING_STEP:
      let allSteps = [...state.stepsStreamProcessor];

      const { type, stepIndex } = action.data;
      const lastStep = state.stepsStreamProcessor.length - 1;
      const firstStep = 0;
      const typeOperator = type === "up" ? stepIndex - 1 : stepIndex + 1;

      const swap = (arr, a, b) => {
        arr[a] = arr.splice(b, 1, arr[a])[0];
        allSteps = arr;
      };

      if (typeOperator !== lastStep && typeOperator !== firstStep) {
        swap(allSteps, stepIndex, typeOperator);
      }

      return { ...state, stepsStreamProcessor: allSteps };

    case CONSTANTS.STREAMS.CREATE_NEW_STREAM:
      return {
        ...state,
        stepsStreamProcessor: [defInboundStep, defOutboundStep],
      };

    case CONSTANTS.STREAMS.DELL_NEW_STEP:
      let array = state.stepsStreamProcessor.filter(
        (n, i) => i !== action.data
      );
      return { ...state, stepsStreamProcessor: array };
    default:
      return state;
  }
}
