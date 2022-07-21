import * as actiontypes from "../constants/userConstants";

export const getUsers = (data,error) => (dispatch) => {

  try {

    dispatch({ type: actiontypes.GET_USERS_REQUEST });
    if (error) {
      dispatch({
        type: actiontypes.GET_USERS_FAIL,
        payload: {err:error},
      });
    }
    if (data) {
      dispatch({
        type: actiontypes.GET_USERS_SUCCESS,
        payload: {users:Array.from(data.viewUsers)},
      });
    }
  } catch (error) {

    dispatch({
      type: actiontypes.GET_USERS_FAIL,
      payload: error,
    });
  }
};

