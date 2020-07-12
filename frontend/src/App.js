import React from "react"
import "./App.css"
import TestButtons from "./components/TestButtons"
import {useSelector} from "react-redux"
import Login from "./components/login"

function App() {
  const token = useSelector((state) => state.token)

  return <div className="App">{token === "" ? <Login /> : ""}</div>
}

export default App
