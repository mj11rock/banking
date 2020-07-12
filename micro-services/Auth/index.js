const path = require("path")
const Mali = require("mali")
const {v4: uuidv4} = require("uuid")
const jwt = require("jsonwebtoken")

const PORT = 3030
const PROTO_PATH = path.resolve("./protos/auth.proto")

const mongoClient = require("mongodb").MongoClient
const dbURL = "mongodb://localhost:27020/"
// const dbURL = "mongodb://database:27020/"

const isEmailValid = require("./helpers/validation")
const isPassValid = require("./helpers/validation")
const userServiceCLient = require("./services-clients/user")
const {resolve} = require("path")
const {rejects} = require("assert")

async function login(ctx) {
  console.log("Login procedure")

  /*
   * Validate email and pass
   * find from db record with given user
   * generate token
   * pass token to user as ctx.res
   */

  // if (!isEmailValid(email) || !isPassValid(password))
  //   throw new Error("Invalid mail or password")
  const {email, password} = ctx.request.req
  const SECRET_KEY = "secret"
  let token
  const result = await userServiceCLient.checkLogin({email, password})
  try {
    if (!result.okey) ctx.res = {jwtToken: null}

    const iat = +new Date()
    const unique = uuidv4() //generate uuid;
    token = jwt.sign(
      {
        token_id: unique,
        email,
        iat,
        eat: iat + 600,
      },
      SECRET_KEY,
      {expiresIn: "10m"}
    )

    let dbo = db.db("AuthService")
    dbo
      .collection("Token")
      .insertOne(
        {_id: unique, token: token, iat, eat: iat + 30},
        (insertErr, res) => {
          if (insertErr) console.log("Error while inserting token")
          console.log("Token inserted")
        }
      )
    ctx.res = {jwtToken: token}
  } catch (err) {
    console.log(err)
    ctx.res = {jwtToken: null}
  }
}

async function deleteToken(token) {
  let dbo = db.db("AuthService")
  return new Promise((resolve, reject) => {
    dbo.collection("Token").findOneAndDelete({token}, (err, res) => {
      console.log("deleting token from db")
      if (err) reject(err)
      else resolve(res)
    })
  })
}

async function logout(ctx) {
  console.log("Loggout procedure")

  const {jwtToken} = ctx.request.req

  const result = await deleteToken(jwtToken)
  try {
    console.log("deleted: ", result.token)
    ctx.res = {okey: true}
  } catch (err) {
    console.log("Caught an Error: ", err)
    ctx.res = {okey: false}
  }
}

async function register(ctx) {
  console.log("Registration Procedure")
  const {email, password, name} = ctx.request.req
  let cards = new Array()
  const defaultData = {
    email,
    password,
    name,
    cardNumber: cards,
    configs: {},
  }

  if (isEmailValid(email) && isPassValid(password)) {
    //todo change to the default validation after tests
    // passing to the userServiceCLient

    try {
      const result = await userServiceCLient.createUser(defaultData)
      console.log(result)
      if (result.okey) ctx.res = {okey: true}
      else ctx.res = {okey: false}
    } catch (err) {
      console.log("error: ", err)
      ctx.res = {okey: false}
    }
  }
}

async function findTokenInDb(token) {
  return new Promise((resolve, reject) => {
    let dbo = db.db("AuthService")
    dbo.collection("Token").findOne({token}, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

async function checkToken(ctx) {
  console.log("Check Token procedure")

  const {jwtToken} = ctx.request.req
  try {
    const result = await findTokenInDb(jwtToken)
    if (result === null) {
      console.log("Token not found")
      ctx.res = {okey: false}
    } else {
      console.log("Token found")
      ctx.res = {okey: true}
    }
  } catch (err) {
    console.log(err)
    ctx.res = {okey: false}
  }
}

async function getEmail(ctx) {}

const app = new Mali(PROTO_PATH, "AuthService")

app.use("Login", login)
app.use("Register", register)
app.use("Logout", logout)
app.use("CheckToken", checkToken)
app.use("getEmail", getEmail)

let db
mongoClient.connect(dbURL, (connectionErr, dbInstance) => {
  if (connectionErr) {
    console.log("Error while connection...", connectionErr)
    process.exit()
  } else {
    console.log("MongoDB connected")
    db = dbInstance
    app.start(`localhost:${PORT}`)
    console.log(`Server started on port ${PORT}\n\n`)
  }
})
