import { combineReducers } from "redux";
import { auth } from "../actions/auth";
import { createReducer } from "./create";
import quizReducer from "./quiz";

export default combineReducers({
    quiz: quizReducer,
    create: createReducer,
    auth: auth
})