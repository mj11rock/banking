const path = require("path")
const Mali = require("mali")
const {ftruncate} = require("fs")
const {resolve} = require("path")
const {rejects} = require("assert")
const {DH_CHECK_P_NOT_PRIME} = require("constants")
const {verify} = require("crypto")

const PORT = 4040
const PROTO_PATH = path.resolve("./protos/user.proto")

const mongoClient = require("mongodb").MongoClient
const dbURL = "mongodb://localhost:27020/"
// const dbURL = "mongodb://database:27020/"

async function verifyUser(userData) {
  return new Promise((resolve, reject) => {
    let dbo = db.db("UserService")
    dbo.collection("User").findOne(userData, (err, data) => {
      if (err) reject("Not found")
      else resolve("Found")
    })
  })
}

async function checkLogin(ctx) {
  console.log("Check Login procedure...")

  try {
    const result = await verifyUser(ctx.request.req)
    ctx.res = {okey: true}
  } catch (error) {
    console.log(error)
    ctx.res = {okey: false}
  }
}
function checkToken(token) {}

async function isMailTaken(email) {
  console.log("Checking %s in db: ", email)

  return new Promise((resolve, reject) => {
    let dbo = db.db("UserService")
    dbo.collection("User").findOne({email}, (err, data) => {
      if (data) {
        reject("Mail aready taken")
      } else {
        resolve("Mail ain't taken")
      }
    })
  })
}

async function insertNewUser(userData) {
  console.log("in insert new unser: ", userData)

  return new Promise((resolve, reject) => {
    isMailTaken(userData.email)
      .then((res) => {
        console.log(res)
        let dbo = db.db("UserService")
        dbo.collection("User").insertOne(userData, (err, data) => {
          if (err) reject(err)
          else if (data === null || data === undefined)
            reject("Empty or undefined resolve")
          else resolve(res)
        })
      })
      .catch((err) => reject(err))
  })
}
async function createUser(ctx) {
  console.log("Creating user...")

  const {name} = ctx.request.req
  try {
    console.log("try")
    const result = await insertNewUser(ctx.request.req)
    console.log(`User ${name} added to db`)
    ctx.res = {okey: true}
  } catch (error) {
    console.log("Caught and Error: ", error)
    ctx.res = {okey: false}
  }
}
async function getUser(ctx) {}

async function setConfig(ctx) {}
async function getConfig(ctx) {}

async function addCard(ctx) {}
async function editCard(ctx) {}
async function deleteCard(ctx) {}
async function getCards(ctx) {}

const app = new Mali(PROTO_PATH, "UserService")

app.use("createUser", createUser)
app.use("getUser", getUser)
app.use("checkLogin", checkLogin)
app.use("setConfig", getConfig)
app.use("getConfig", setConfig)
app.use("addCard", addCard)
app.use("editCard", editCard)
app.use("deleteCard", deleteCard)
app.use("getCards", getCards)

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
