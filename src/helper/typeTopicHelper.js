export default (stepButtonType) => {
  let typeTopic = "topic";
  if (stepButtonType === "lookup") {
    typeTopic = "record_type";
  }
  if (stepButtonType === "event") {
    typeTopic = "event_type";
  }
  if (stepButtonType === "map_event") {
    typeTopic = "event_type";
  }
  return typeTopic;
};
