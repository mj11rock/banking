export const actions = {
  saveToken: (token) => ({
    type: "SAVE_TOKEN",
    payload: {token},
  }),
  dropToken: () => ({type: "DROP_TOKEN"}),
}
