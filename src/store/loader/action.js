import { CONSTANTS } from "../constants";

export const loadingOn = () => ({
  type: CONSTANTS.LOADER.LOAD_ON,
  data: true,
});
export const loadingOf = () => ({
  type: CONSTANTS.LOADER.LOAD_OF,
  data: false,
});
export const positiveResponse = () => ({
  type: CONSTANTS.LOADER.IS_REDIRECT,
  data: true,
});
export const negativeResponse = () => ({
  type: CONSTANTS.LOADER.IS_REDIRECT,
  data: false,
});
