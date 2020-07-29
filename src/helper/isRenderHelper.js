export default (blockElem, valueSelect) => {
  let isRender = false;
  if (blockElem.related_to.value && valueSelect[blockElem.related_to.field]) {
    const foundElem = blockElem.related_to.value.filter((el, i) => {
      return (
        valueSelect[blockElem.related_to.field] ===
        blockElem.related_to.value[i]
      );
    });
    isRender = foundElem.length > 0;
  }
  return isRender;
};
