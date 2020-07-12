const initialState = ""

const token = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_TOKEN":
      return (state = action.payload.token)
    case "DROP_TOKEN":
      return (state = initialState)
    default:
      return (state = initialState)
  }
}

export default token
