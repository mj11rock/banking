import React from "react"
import Endpoint from "../service"

const TestButtons = (props) => {
  const RegisterData = {
    name: "Islom",
    email: "mj11rock@gmail.com",
    password: "123",
  }
  const LoginData = {
    email: "mj11rock@gmail.com",
    password: "123",
  }
  const Token = "test token"
  return (
    <div className="buttons-wrapper">
      <div className="btn-wrapper">
        <button
          className="btn"
          onClick={() => {
            const result = Endpoint.call("login", LoginData)
            result
              .then((res) => {
                if (res.okey) console.log("Logged in")
                else console.log("Error with logging in")
              })
              .catch((err) => {
                console.log("error: ", err)
              })
          }}
        >
          Login
        </button>
      </div>
      <div className="btn-wrapper">
        <button
          className="btn"
          onClick={() => {
            const result = Endpoint.call("register", RegisterData)
            result
              .then((res) => {
                if (res.okey) console.log("Registered")
                else console.log("Err with registraion")
              })
              .catch((err) => console.log(err))
          }}
        >
          Register
        </button>
      </div>
      <div className="btn-wrapper">
        <button className="btn">Logout</button>
      </div>
      <div className="btn-wrapper">
        <button
          onClick={() => {
            const token = {
              jwtToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9pZCI6IjU4YTUwNDgwLTgxMmUtNGJhYi05Y2QwLTRkMzkwZDVkZWRhOSIsImVtYWlsIjoibWoxMXJvY2tAZ21haWwuY29tIiwiaWF0IjoxNTk0NTAyMTM1ODg3LCJlYXQiOjE1OTQ1MDIxMzY0ODcsImV4cCI6MTU5NDUwMjEzNjQ4N30.Gvn58kCFs0J3sos7UNNzQ4L24PM_kNnMmPajAT4HIL4",
            }

            const result = Endpoint.call("checkToken", token)

            result
              .then((res) => {
                console.log(res)

                if (res.okey) console.log("Token is ok")
                else console.log("Err with token")
              })
              .catch((err) => console.log("Caught an error: ", err))
          }}
          className="btn"
        >
          CheckToken
        </button>
      </div>
    </div>
  )
}

export default TestButtons
