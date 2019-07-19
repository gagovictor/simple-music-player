export default (state, action) => {
  switch (action.type) {
    case "play":
      return {
        play: action.payload
      };
    case "index":
      return {
        index: state.index + action.payload
      };
    default:
      return state;
  }
};