import { GET_ERRORS, GET_QUESTIONS, LOADING } from "./types";
import axios from "axios";

export const addQuestion = (classroomid, newQuestion) => dispatch => {
  axios
    .post(`/api/classrooms/${classroomid}/newquestion`, newQuestion)
    .then(res => alert("successfully created question"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getQuestions = classroomid => dispatch => {
  dispatch(setQuestionLoading());
  axios
    .get(`/api/classrooms/${classroomid}/questions`)
    .then(res => dispatch({ type: GET_QUESTIONS, payload: res.data }))
    .catch(res => dispatch({ type: GET_QUESTIONS, payload: null }));
};

// Set loading state
export const setQuestionLoading = () => {
  return {
    type: LOADING
  };
};
