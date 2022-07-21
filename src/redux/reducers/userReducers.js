import * as actionTypes from "../constants/userConstants";

export const getUsersReducers = (state = { users: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_REQUEST:
      return {
        loading: true,
        users: [],
      };
    case actionTypes.GET_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
      };
    case actionTypes.GET_USERS_FAIL:
      return {
        loading: false,
        err: action.payload.error,
      };
    default:
        return state
  }
};
