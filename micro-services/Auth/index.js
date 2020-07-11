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
  // userServiceCLient
  //   .checkLogin({email, password})
  //   .then((result) => {
  //     // console.log(result)
  //     if (!result.okey) ctx.res = {okey: false}

  //     const iat = +new Date()
  //     const unique = uuidv4() //generate uuid;
  //     token = jwt.sign(
  //       {
  //         token_id: unique,
  //         email,
  //         iat,
  //         eat: iat + 600,
  //       },
  //       SECRET_KEY,
  //       {expiresIn: "10m"}
  //     )

  //     let dbo = db.db("AuthService")
  //     dbo
  //       .collection("Token")
  //       .insertOne(
  //         {_id: unique, token: token, iat, eat: iat + 30},
  //         (insertErr, res) => {
  //           return new Promise((resolve, reject) => {
  //             if (insertErr) {
  //               console.log("Error while inserting token")
  //               reject({jwtToken: null})
  //             }
  //             resolve({jwtToken: token})
  //           })
  //         }
  //       )
  //   })
  //   .catch((err) => {
  //     console.log("Error: ", err)
  //     ctx.res = {jwtToken: token}
  //   })
}

async function logout(ctx) {}

async function register(ctx) {
  console.log("Registration Procedure")
  const {email, password, name} = ctx.request.req
  let {cards} = ctx.request.req
  // cards = new Array()
  cards = [1, 2]
  const defaultData = {
    email,
    password,
    name,
    cardNumber: cards,
    configs: {},
  }

  // if (isEmailValid(email) && isPassValid(password)) { }
  // passing to the userServiceCLient

  userServiceCLient
    .createUser(defaultData)
    .then((res) => {
      console.log("result:", res)
      ctx.res = {okey: true}
    })
    .catch((err) => {
      console.log(err)
      ctx.res = {okey: false}
      return
    })
  ctx.res = {okey: true}
}

async function checkToken(ctx) {}

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
