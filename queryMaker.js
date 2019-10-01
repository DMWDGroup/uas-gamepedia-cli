module.exports = args => {
  return {
    action: "cargoquery",
    format: "json",
    ...args
  };
};
