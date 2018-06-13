import isEmpty from "../validation/is-empty";
import { GET_CLASSROOMS, LOADING, GET_CLASSROOM } from "../actions/types";
const initialState = {
  classroom: {},
  classrooms: [],
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
    default:
      return state;
  }
}
