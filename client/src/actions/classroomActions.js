import {
  GET_CLASSROOM,
  GET_CLASSROOMS,
  CLASSROOM_NOT_FOUND,
  GET_ERRORS
} from "./types";
import axios from "axios";

export const createClassroom = (classroomData, history) => dispatch => {
  axios
    .post("/api/classrooms/", classroomData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
