import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import classroomReducer from "./classroomReducer";
import questionReducer from "./questionReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  classrooms: classroomReducer,
  questions: questionReducer
});
