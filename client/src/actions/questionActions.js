import {
  GET_ERRORS,
  GET_QUESTIONS,
  LOADING,
  SET_CURRENT_QUESTION,
  GET_CURRENT_QUESTION,
  UNSET_CURRENT_QUESTION
} from "./types";
import axios from "axios";

export const addQuestion = (classroomid, newQuestion, history) => dispatch => {
  axios
    .post(`/api/classrooms/${classroomid}/newquestion`, newQuestion)
    .then(res => {
      alert("successfully created question");
      history.goBack();
    })
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
    .catch(err => dispatch({ type: GET_QUESTIONS, payload: null }));
};

//Set question
export const setQuestion = (classroomid, questionid) => dispatch => {
  axios
    .post(`/api/classrooms/${classroomid}/setcurrentquestion/${questionid}`)
    .then(res => dispatch({ type: SET_CURRENT_QUESTION, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Get question
export const getQuestion = classroomid => dispatch => {
  axios
    .get(`/api/classrooms/${classroomid}/getcurrentquestion`)
    .then(res => dispatch({ type: GET_CURRENT_QUESTION, payload: res.data }))
    .catch(err =>
      dispatch({ type: GET_CURRENT_QUESTION, payload: err.response.data })
    );
};

//Unset question
export const unsetQuestion = classroomid => dispatch => {
  axios
    .post(`/api/classrooms/${classroomid}/unsetcurrentquestion`)
    .then(res => dispatch({ type: UNSET_CURRENT_QUESTION, payload: res.data }));
};

//Answer question
export const answerQuestion = (questionid, responsedata) => dispatch => {
  axios
    .post(`/api/classrooms/${questionid}/answerquestion`, responsedata)
    .then(res => dispatch({ type: "ANSWER_QUESTION", payload: res.data }))
    .catch(err =>
      dispatch({ type: "ANSWER_QUESTION", payload: err.response.data })
    );
};

//Get response data
export const getResponseData = questionid => dispatch => {
  axios
    .get(`/api/classrooms/${questionid}/getresponses`)
    .then(res => dispatch({ type: "GET_RESPONSES", payload: res.data }))
    .catch({ type: "GET_RESPONSES", payload: null });
};
// Set loading state
export const setQuestionLoading = () => {
  return {
    type: LOADING
  };
};
