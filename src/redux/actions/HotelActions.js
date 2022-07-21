import * as actiontypes from "../constants/hotelConstants";

export const getHotels = (data,error) => (dispatch) => {
  try {

    dispatch({ type: actiontypes.GET_HOTELS_REQUEST });
    if (error) {
      dispatch({
        type: actiontypes.GET_HOTELS_FAIL,
        payload: {err:error},
      });
    }
    if (data) {
      dispatch({
        type: actiontypes.GET_HOTELS_SUCCESS,
        payload: { hotels: Array.from(data.viewHotels) },
      });
    }
  } catch (error) {

    dispatch({
      type: actiontypes.GET_HOTELS_FAIL,
      payload: error,
    });
  }
};//getHotelsDetail
export const getHotelsDetail = (data, error) => (dispatch) => {
  try {
    dispatch({ type: actiontypes.GET_HOTELS_REQUEST });
    if (error) {
      dispatch({
        type: actiontypes.GET_HOTELS_FAIL,
        payload: { err: error },
      });
    }
    if (data) {
      dispatch({
        type: actiontypes.GET_HOTELS_SUCCESS,
        payload: { hotels: Array.from(data.neSellerViewHotels) },
      });
    }
  } catch (error) {
    dispatch({
      type: actiontypes.GET_HOTELS_FAIL,
      payload: error,
    });
  }
};
export const getSellerHotels = (data, error) => (dispatch) => {
  try {
    dispatch({ type: actiontypes.GET_HOTELS_REQUEST });
    if (error) {
      dispatch({
        type: actiontypes.GET_HOTELS_FAIL,
        payload: { err: error },
      });
    }
    if (data) {
      dispatch({
        type: actiontypes.GET_HOTELS_SUCCESS,
        payload: { hotels: Array.from(data.neSellerViewHotels) },
      });
    }
  } catch (error) {
    dispatch({
      type: actiontypes.GET_HOTELS_FAIL,
      payload: error,
    });
  }
};
