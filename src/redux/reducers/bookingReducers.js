import * as actionTypes from "../constants/bookingConstants";

export const getBookingsReducers = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_BOOKINGS_REQUEST:
      return {
        loading: true,
        bookings: [],
      };
    case actionTypes.GET_BOOKINGS_SUCCESS:
      return {
        loading: false,
        bookings: action.payload.bookings,
      };
    case actionTypes.GET_BOOKINGS_FAIL:
      return {
        loading: false,
        err: action.payload.error,
      };
    default:
        return state
  }
};
