//userServiceClient
// const grpc = require("grpc")
// const protoLoader = require("@grpc/proto-loader")
const PROTO_PATH = process.cwd() + "/protos/user.proto"
const caller = require("grpc-caller")

const userService = caller("localhost:4040", PROTO_PATH, "UserService")
module.exports = userService

// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// })

// const routeguide = grpc.loadPackageDefinition(packageDefinition)
// const userService = new routeguide.UserService(
//   //  "http://user-service:4040", // for docker
//   "http://localhost:4040", // for localhost
//   grpc.credentials.createInsecure()
// )
