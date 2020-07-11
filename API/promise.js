abc(data, callback)

function callback2promise(data) {
  return new Promise((resolve, reject) => {
    abc(data, (result) => {
      resolve()
    })
    reject()
  })
}
