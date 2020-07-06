//userServiceClient
const PROTO_PATH = __dirname + "/user.proto"

const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const routeguide = grpc.loadPackageDefinition(packageDefinition)
const userService = new routeguide.UserService(
  //  "http://user-service:4040", // for docker
  "http://localhost:4040", // for localhost
  grpc.credentials.createInsecure()
)
module.exports = userService
