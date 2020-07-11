const path = require("path")
const Mali = require("mali")

const PORT = 4040
const PROTO_PATH = path.resolve("./protos/user.proto")

const mongoClient = require("mongodb").MongoClient
const dbURL = "mongodb://localhost:27020/"
// const dbURL = "mongodb://database:27020/"

async function checkLogin(ctx) {
  console.log("Check Login procedure...")

  const {email, password} = ctx.request.req

  /*
   * do stuff with db
   */
  //   console.log(ctx.request)
  let dbo = db.db("UserService")
  dbo.collection("User").findOne({email, password}, (err, data) => {
    if (err || data === null) {
      console.log(err !== null ? err : "No record in DB")
      ctx.res = {okey: false}
      return
    } else {
      console.log(`record of ${email} found`)
      ctx.res = {okey: true}
    }
  })
  ctx.res = {okey: true}
}
function checkToken(token) {}

async function createUser(ctx) {
  console.log("Creating user...")

  const {email, password, name, cardNumber, configs} = ctx.request.req
  //   ctx.res = {okey: true}
  let dbo = db.db("UserService")
  dbo
    .collection("User")
    .insertOne({email, password, name, cardNumber, configs}, (err, result) => {
      if (err) {
        console.log("Error while inserting user data", err)
        ctx.res = {okey: false}
        return
      } else {
        console.log("User data inserted")
        ctx.res = {okey: true}
      }
    })
  ctx.res = {okey: true}
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
