import React, {useState} from "react"
import Signin from "./signin"
import Signup from "./signup"

const Login = (ptops) => {
  const [isRegistered, setRegistered] = useState(false)
  return (
    <div>
      {isRegistered ? (
        <Signup clickRegistration={() => setRegistered(false)} />
      ) : (
        <Signin clickRegistration={() => setRegistered(true)} />
      )}
    </div>
  )
}

export default Login
