const PROTO_PATH = process.cwd() + "/protos/auth.proto"
const caller = require("grpc-caller")
const authService = caller("localhost:3030", PROTO_PATH, "AuthService")
module.exports = authService
