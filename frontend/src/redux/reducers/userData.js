const initalState = {
  cards: [],
  configs: {},
}

const userData = (state = initalState, action) => {
  switch (action.type) {
    case "ADD_CARD":
      return state.cards.push(action.payload)
    // case "EDIT_CARD":
    //   return
    // case "DELETE_CARD":
    //   return
    // case "SET_CONFIG":
    //   return
    default:
      return initalState
  }
}
export default userData
