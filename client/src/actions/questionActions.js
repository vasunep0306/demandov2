import { ADD_QUESTION, GET_ERRORS } from "./types";
import axios from "axios";

export const addQuestion = classroomid => dispatch => {
  axios
    .post(`/api/classrooms/${classroomid}/newquestion`)
    .then(res => alert("successfully created question"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
