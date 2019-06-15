const initialState = {
  questions: null,
  question: null,
  responsedata: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true
      };
    case "GET_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
        loading: false
      };
    case "GET_CURRENT_QUESTION":
      return {
        ...state,
        question: action.payload,
        loading: false
      };
    case "GET_QUESTION":
      return {
        ...state,
        question: action.payload,
        loading: false
      };
    case "SET_CURRENT_QUESTION":
      return {
        ...state,
        question: action.payload,
        loading: false
      };
    case "GET_RESPONSES":
      return {
        ...state,
        responsedata: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
