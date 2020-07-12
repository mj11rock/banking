import token from "./token"
import userData from "./userData"
import {combineReducers} from "redux"

const allReducers = combineReducers({
  token,
  userData,
})

export default allReducers
