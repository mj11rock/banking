// authServiceClient
const PROTO_PATH = __dirname + "/auth.proto"
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
const client = new routeguide.AuthService(
  //   "http://auth-service:3030", // for docker
  "localhost:3030", // for localhost
  grpc.credentials.createInsecure()
)
module.exports = client
