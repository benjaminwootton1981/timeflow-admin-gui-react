export const sliceValueHelper = (value, countSlice, SearchSymbol) => {
  const resultValue =
    value.indexOf(SearchSymbol) === -1
      ? value
      : value?.split("_").slice(countSlice).join("_");

  return resultValue;
};
