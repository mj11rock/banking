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
  const token = {
    jwtToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9pZCI6Ijg3YTQ1NjM5LTg1NTYtNDZjMC1hY2Y4LWQyN2JiODJiZmE3NSIsImVtYWlsIjoibWoxMXJvY2tAZ21haWwuY29tIiwiaWF0IjoxNTk0NTQ2NzQ3MjY2LCJlYXQiOjE1OTQ1NDY3NDc4NjYsImV4cCI6MTU5NDU0Njc0Nzg2Nn0.HJKoDaV1FKtG7xIho2kcHlpudGmVIOEo3b4pZ860iQY",
  }
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
        <button
          className="btn"
          onClick={() => {
            const result = Endpoint.call("logout", token)
            result
              .then((res) => {
                if (res.okey) console.log("logged out")
                else console.log("error while loggin out")
              })
              .catch((err) => {
                console.log("Error: ", err)
              })
          }}
        >
          Logout
        </button>
      </div>
      <div className="btn-wrapper">
        <button
          onClick={() => {
            const result = Endpoint.call("checkToken", token)

            result
              .then((res) => {
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
