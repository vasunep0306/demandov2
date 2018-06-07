import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import classroomReducer from "./classroomReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  classrooms: classroomReducer
});
