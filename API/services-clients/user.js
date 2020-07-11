//userServiceClient
// const grpc = require("grpc")
// const protoLoader = require("@grpc/proto-loader")

const PROTO_PATH = process.cwd() + "/protos/user.proto"
const caller = require("grpc-caller")

const userService = caller("localhost:4040", PROTO_PATH, "UserService")
module.exports = userService
