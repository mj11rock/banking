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
                else console.log("Error")
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
                else console.log("Err")
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
        <button className="btn">CheckToken</button>
      </div>
    </div>
  )
}

export default TestButtons
