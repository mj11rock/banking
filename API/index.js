const express = require("express")
const app = express()
const cors = require("cors")
const port = 6060

const UserServiceClient = require("./services-clients/userServiceClient")
const AuthServiceClient = require("./services-clients/authServiceClient")

//! server's settings
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
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

// server starts
app.listen(port, () =>
  console.log(`REST API is listening at http://localhost:${port}`)
)
