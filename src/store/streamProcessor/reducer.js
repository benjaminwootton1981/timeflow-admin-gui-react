import { CONSTANTS } from "../constants";
import { setValueStep } from "./setValueStep";

const initialState = {
  // addedSteps: [],
  stepData: [],
  stepsStreamProcessor: [],
  inboundChoice: [],
  streams: [],
  schemas: [],
  actualSchema: [],
  setStepsStreamProcessor: [],
};

export default function StreamProcessorReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.STREAMS.ADD_NEW_STEP:
      const steps = [...state.stepsStreamProcessor];
      const newStep = setValueStep(action.data);
      steps.push(newStep);
      steps.forEach((el, i) => {
        // const a = el.name('+')[0];
        if (el.steptype.includes("outbound")) {
          steps.push(...steps.splice(i, 1));
        }
      });
      return { ...state, stepsStreamProcessor: steps };

    case CONSTANTS.STREAMS.GET_STEP_TYPE:
      return { ...state, stepData: action.data };

    case CONSTANTS.STREAMS.FILTERED_SCHEMAS:
      const filteredSchemas = [
        ...state.schemas.filter((el) => el.name === action.data),
      ];
      return { ...state, actualSchema: filteredSchemas };

    case CONSTANTS.STREAMS.GET_STREAMS:
      return { ...state, streams: action.data };

    case CONSTANTS.STREAMS.GET_SCHEMAS:
      return { ...state, schemas: action.data };

    case CONSTANTS.STREAMS.GET_STREAM_PROCESSOR:
      return { ...state, stepsStreamProcessor: action.data };

    case CONSTANTS.STREAMS.UPDATE_STREAM_PROCESSOR:
      return { ...state, stepsStreamProcessor: action.data };

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
        stepsStreamProcessor: [
          {
            id: null,
            blocks: [],
            name: "Inbound Event",
            description: "",
            variable_name: "",
            variable_name_to: "",
            variable_name_from: "",
            event_field_name_from: "",
            static_value_from: "",
            destinations: "",
            event_type: "",
            add_field_name: "",
            field_value: "",
            remove_field_name: "",
            copy_field_name: "",
            destination_field_name: "",
            rename_field_name: "",
            new_field_name: "",
            target_field_name: "",
            select_field_name: "",
            sum_fields: "",
            steptype: "inbound",
            ordering: 1,
            topic: "",
            field: null,
            value: null,
            event_field_name: null,
            percent: null,
            filter_value: null,
            expression: null,
            record_type: null,
            lookup_field: null,
            lookup_value: null,
            search_name: null,
            search_result_placement: null,
            record: null,
            category_name: null,
            metric: null,
            source: null,
            destination: null,
            template: null,
            field_to_process: null,
            file_path: null,
            key_type: null,
            key_type_from: null,
            field_name: null,
            offset_in_seconds: 0,
            offset: "latest",
            static_value: null,
            last_event_type: null,
            time_window: null,
            last_events: null,
            result_placement: null,
            operator: null,
            lookup_stream: null,
            column_name: null,
            url: null,
            url_template: null,
            field_list: null,
            schedule: null,
            poll_interval: null,
            duration: null,
            code: null,
            timestamp_field_name: null,
            dictionary_field_name: null,
            data_dictionary_name: null,
            adjust_field_name: null,
            field_operation: null,
            result_placement_numeric: null,
            set_field_name: null,
            keys_or_values: null,
            path_to_events: null,
            search_field_name: null,
            formula: null,
            function_name: null,
            endpoint_name: null,
            schedule_type: null,
            lft: 1,
            rght: 2,
            tree_id: 1,
            mptt_level: 0,
            streamprocessor: 1,
            parent: null,
          },
          {
            id: null,
            blocks: [],
            name: "Outbound Event",
            description: "",
            variable_name: "",
            variable_name_to: "",
            variable_name_from: "",
            event_field_name_from: "",
            static_value_from: "",
            destinations: "",
            event_type: "",
            add_field_name: "",
            field_value: "",
            remove_field_name: "",
            copy_field_name: "",
            destination_field_name: "",
            rename_field_name: "",
            new_field_name: "",
            target_field_name: "",
            select_field_name: "",
            sum_fields: "",
            steptype: "outbound",
            ordering: 5,
            topic: "",
            field: null,
            value: null,
            event_field_name: null,
            percent: null,
            filter_value: null,
            expression: null,
            record_type: null,
            lookup_field: null,
            lookup_value: null,
            search_name: null,
            search_result_placement: null,
            record: null,
            category_name: null,
            metric: null,
            source: null,
            destination: null,
            template: null,
            field_to_process: null,
            file_path: null,
            key_type: null,
            key_type_from: null,
            field_name: null,
            offset_in_seconds: 0,
            offset: "latest",
            static_value: null,
            last_event_type: null,
            time_window: null,
            last_events: null,
            result_placement: null,
            operator: null,
            lookup_stream: null,
            column_name: null,
            url: null,
            url_template: null,
            field_list: null,
            schedule: null,
            poll_interval: null,
            duration: null,
            code: null,
            timestamp_field_name: null,
            dictionary_field_name: null,
            data_dictionary_name: null,
            adjust_field_name: null,
            field_operation: null,
            result_placement_numeric: null,
            set_field_name: null,
            keys_or_values: null,
            path_to_events: null,
            search_field_name: null,
            formula: null,
            function_name: null,
            endpoint_name: null,
            schedule_type: null,
            lft: 1,
            rght: 2,
            tree_id: 5,
            mptt_level: 0,
            streamprocessor: null,
            parent: null,
          },
        ],
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
