import axios from "axios";

export const createClassroom = (classroomData, history) => dispatch => {
  axios
    .post("/api/classrooms/", classroomData)
    .then(res => history.push("/displayClasses"))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};
export const showAllClassrooms = () => dispatch => {
  dispatch(setClassLoading());
  axios
    .get(`api/classrooms/`)
    .then(res =>
      dispatch({
        type: "GET_CLASSROOMS",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_CLASSROOMS",
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
        type: "GET_CLASSROOMS",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_CLASSROOMS",
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
        type: "GET_CLASSROOM",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_CLASSROOM",
        payload: err.response.data
      })
    );
};

export const registerForClassroom = (
  classid,
  passcode,
  history
) => dispatch => {
  axios
    .post(`/api/classrooms/register/${classid}`, passcode)
    .then(res => {
      dispatch({
        type: "REGISTER_FOR_CLASSROOM",
        payload: res.data
      });
      history.push("/myClasses");
    })
    .catch(err => {
      dispatch({
        type: "REGISTER_FOR_CLASSROOM",
        payload: err.response.data
      });
    });
};

export const myClassrooms = id => dispatch => {
  dispatch(setClassLoading());
  axios
    .get(`/api/classrooms/${id}/myclasses`)
    .then(res => {
      dispatch({
        type: "GET_CLASSROOMS",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_CLASSROOMS",
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
        type: "GET_STUDENTS",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_STUDENTS",
        payload: err.response.data
      });
    });
};

// get students in a given classroom
export const removeStudent = (classid, studid) => dispatch => {
  dispatch(setClassLoading());
  axios.post(`/api/classrooms/${classid}/${studid}/removestudent`).then(res => {
    dispatch({
      type: "REMOVE_STUDENT",
      payload: res.data
    });
  });
};

// change the pin of the classroom
export const changeClasspin = (newpin, classid) => dispatch => {
  axios.post(`/api/classrooms/${classid}/changepin`, newpin).then(res => {
    dispatch({
      type: "CHANGED_PIN",
      payload: res.data
    });
  });
};

// discussion action
export const getAuthor = user_id => dispatch => {};

// delete classroom
export const deleteClassroom = classid => dispatch => {
  axios
    .delete(`/api/classrooms/${classid}/deleteClassroom`)
    .then(res =>
      dispatch({
        type: "DELETE_CLASSROOM",
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: "DELETE_CLASSROOM",
        payload: err.response.data
      });
    });
};
// Set loading state
export const setClassLoading = () => {
  return {
    type: "LOADING"
  };
};
