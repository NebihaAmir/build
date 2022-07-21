import * as actiontypes from "../constants/reservationConstants";

export const getReservations = (data,error) => (dispatch) => {

  try {

    dispatch({ type: actiontypes.GET_RESERVATIONS_REQUEST });
    if (error) {
      dispatch({
        type: actiontypes.GET_RESERVATIONS_FAIL,
        payload: {err:error},
      });
    }
    if (data) {
      dispatch({
        type: actiontypes.GET_RESERVATIONS_SUCCESS,
        payload: {reservations:Array.from(data)},
      });
    }
  } catch (error) {

    dispatch({
      type: actiontypes.GET_RESERVATIONS_FAIL,
      payload: error,
    });
  }
};

