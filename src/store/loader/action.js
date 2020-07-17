import { CONSTANTS } from "../constants";

export const loadingOn = () => ({
  type: CONSTANTS.LOADER.LOAD_ON,
});
export const loadingOf = () => ({
  type: CONSTANTS.LOADER.LOAD_OF,
});
export const positiveResponse = () => ({
  type: CONSTANTS.LOADER.IS_REDIRECT,
  data: true,
});
export const negativeResponse = () => ({
  type: CONSTANTS.LOADER.IS_REDIRECT,
  data: false,
});
