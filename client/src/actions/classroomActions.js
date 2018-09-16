import {
  GET_CLASSROOM,
  GET_CLASSROOMS,
  GET_STUDENTS,
  REGISTER_FOR_CLASSROOM,
  GET_ERRORS,
  LOADING
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

export const showClassrooms = id => dispatch => {
  dispatch(setClassLoading());
  axios
    .get(`/api/users/${id}/classrooms`)
    .then(res =>
      dispatch({
        type: GET_CLASSROOMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CLASSROOMS,
        payload: null
      })
    );
};

export const getClass = id => dispatch => {
  dispatch(setClassLoading());
  axios
    .get(`/api/classrooms/${id}/classroom`)
    .then(res =>
      dispatch({
        type: GET_CLASSROOM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CLASSROOM,
        payload: err.response.data
      })
    );
};

export const registerForClassroom = courseData => dispatch => {
  axios
    .post(`/api/classrooms/register`, courseData)
    .then(res => {
      dispatch({
        type: REGISTER_FOR_CLASSROOM,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FOR_CLASSROOM,
        payload: err.response.data
      });
    });
};

export const myClassrooms = id => dispatch => {
  dispatch(setClassLoading());
  axios
    .get(`/api/classrooms/${id}/myclasses`)
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_CLASSROOMS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_CLASSROOMS,
        payload: err.response.data
      });
    });
};

// get students in a given classroom
export const getStudents = id => dispatch => {
  dispatch(setClassLoading());
  axios
    .get(`/api/classrooms/${id}/getstudents`)
    .then(res => {
      dispatch({
        type: GET_STUDENTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_STUDENTS,
        payload: err.response.data
      });
    });
};
// Set loading state
export const setClassLoading = () => {
  return {
    type: LOADING
  };
};
