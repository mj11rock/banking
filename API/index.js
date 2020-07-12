const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")

const port = 6060

const UserServiceClient = require("./services-clients/user")
const AuthServiceClient = require("./services-clients/auth")
const {response} = require("express")

//! server's settings
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: false})) // for parsing application/x-www-form-urlencoded
app.use(
  cors({
    origin: "*",
  })
)

app.get("/", (req, res) => {
  res.status(200).send("server is working fine!")
})

/*
##############
? functions to implement
? "func name -- which service"
 * register -- auth
 * login -- auth
 * logout -- auth
 
 * add card -- user
 * delete card -- user
 * edit card -- user
 * set config -- user
 * get config -- user
 
 
##############
 */

// todo use app.post('requestedPath', (req, res) => {})
app.post("/login", (req, res) => {
  if (!req.body) res.send({okey: false})
  const {email, password} = req.body
  AuthServiceClient.login(req.body)
    .then((result) => {
      console.log("resolve: ", result)
      res.send({okey: true, result})
    })
    .catch((err) => {
      console.log(err)
      res.send({okey: false})
    })
})

app.post("/register", (req, res) => {
  console.log("Registration started...")

  const {name, password, email} = req.body
  AuthServiceClient.register({email, name, password})
    .then((result) => {
      console.log("resolve:", result)
      res.send(result)
    })
    .catch((err) => console.log("Error: ", err))
})

app.post("/checkToken", (req, res) => {
  console.log("Check Token Started...")

  const {jwtToken} = req.body
  AuthServiceClient.checkToken({jwtToken}).then((result) => {
    if (!result.okey) {
      res.send({okey: false})
    } else {
      console.log("Success!")
      res.send({okey: true})
    }
  })
})

app.post("/logout", (req, res) => {
  console.log("Logout Started")

  const {jwtToken} = req.body
  console.log(jwtToken)

  AuthServiceClient.logout({jwtToken})
    .then((result) => {
      if (!result.okey) {
        res.send({okey: false})
        return
      }
      res.send({okey: true})
    })
    .catch((err) => console.log("Error: ", err))
})
// server starts
app.listen(port, () =>
  console.log(`REST API is listening at http://localhost:${port}\n\n`)
)
