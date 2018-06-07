import isEmpty from "../validation/is-empty";
import { GET_CLASSROOMS, LOADING } from "../actions/types";
const initialState = {
  classroom: null,
  classrooms: null,
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
    default:
      return state;
  }
}
