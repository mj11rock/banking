const url = new URL("http://localhost:6060")
export default {
  call: async (path, data) => {
    try {
      const result = await fetch(url + path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const response = await result.json()
      return response
    } catch (e) {
      console.log(e)
    }
  },
}
