import * as actiontypes from "../constants/sellerConstants";

export const getSellers = (data, error) => (dispatch) => {
  try {
    dispatch({ type: actiontypes.GET_SELLERS_REQUEST });
    if (error) {
      dispatch({
        type: actiontypes.GET_SELLERS_FAIL,
        payload: { err: error },
      });
    }
    if (data) {
      dispatch({
        type: actiontypes.GET_SELLERS_SUCCESS,
        payload: { sellers: Array.from(data) },
      });
    }
  } catch (error) {
    dispatch({
      type: actiontypes.GET_SELLERS_FAIL,
      payload: error,
    });
  }
};
