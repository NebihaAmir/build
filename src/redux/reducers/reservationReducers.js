import * as actionTypes from "../constants/reservationConstants";

export const getReservationsReducers = (state = { reservations: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_RESERVATIONS_REQUEST:
      return {
        loading: true,
        reservations: [],
      };
    case actionTypes.GET_RESERVATIONS_SUCCESS:
      return {
        loading: false,
        reservations: action.payload.reservations,
      };
    case actionTypes.GET_RESERVATIONS_FAIL:
      return {
        loading: false,
        err: action.payload.error,
      };
    default:
        return state
  }
};
