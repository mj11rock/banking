const isEmailValid = function (email) {
  const emailRegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

  return email.match(emailRegExp)
}
const isPassValid = function (email) {
  const passRegExp = /[\d\w]{1,}/

  return email.match(passRegExp)
}

module.exports = isEmailValid
module.exports = isPassValid
