import isEmpty from "../validation/is-empty";
import {
  GET_CLASSROOMS,
  LOADING,
  GET_CLASSROOM,
  REGISTER_FOR_CLASSROOM
} from "../actions/types";
const initialState = {
  classroom: null,
  classrooms: null,
  students: null,
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CLASSROOMS:
      return {
        ...state,
        classrooms: action.payload,
        loading: false
      };
    case GET_CLASSROOM:
      return {
        ...state,
        classroom: action.payload,
        loading: false
      };
    case REGISTER_FOR_CLASSROOM:
      return {
        ...state,
        classroom: action.payload,
        loading: false
      };
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
