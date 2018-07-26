import {
  GET_CLASSROOM,
  GET_CLASSROOMS,
  CLASSROOM_NOT_FOUND,
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
    .get(`/api/classrooms/${id}`)
    .then(res =>
      dispatch({
        type: GET_CLASSROOM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CLASSROOM,
        payload: null
      })
    );
};

export const registerForClassroom = () => dispatch => {
  axios
    .get(`/api/classrooms/register`)
    .then(res =>
      dispatch({
        type: REGISTER_FOR_CLASSROOM,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: REGISTER_FOR_CLASSROOM,
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
