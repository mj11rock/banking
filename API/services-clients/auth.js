const caller = require("grpc-caller")
const PROTO_PATH = process.cwd() + "/protos/auth.proto"
const authService = caller("localhost:3030", PROTO_PATH, "AuthService")
module.exports = authService
