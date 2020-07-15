export const typeValueChoiceHelper = (propsValue, choice) => {
  if (!choice || choice.length === 0) {
    return false;
  }
  return !!propsValue ? propsValue : choice[0].name;
};
