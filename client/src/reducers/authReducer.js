import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER } from "../actions/types";

// Set initial state
const initialState = {
  isAuthenticated: false,
  user: {}
};
