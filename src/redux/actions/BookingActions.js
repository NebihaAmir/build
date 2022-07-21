import * as actiontypes from "../constants/bookingConstants";

export const getBookings = (data,error) => (dispatch) => {

  try {

    dispatch({ type: actiontypes.GET_BOOKINGS_REQUEST });
    if (error) {
      dispatch({
        type: actiontypes.GET_BOOKINGS_FAIL,
        payload: {err:error},
      });
    }
    if (data) {
      dispatch({
        type: actiontypes.GET_BOOKINGS_SUCCESS,
        payload: { bookings: Array.from(data) },
      });
    }
  } catch (error) {

    dispatch({
      type: actiontypes.GET_BOOKINGS_FAIL,
      payload: error,
    });
  }
};

