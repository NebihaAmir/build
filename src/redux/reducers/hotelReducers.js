import * as actionTypes from "../constants/hotelConstants";

export const getHotelsReducers = (state = { hotels: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_HOTELS_REQUEST:
      return {
        loading: true,
        hotels: [],
      };
    case actionTypes.GET_HOTELS_SUCCESS:
      return {
        loading: false,
        hotels: action.payload.hotels,
      };
    case actionTypes.GET_HOTELS_FAIL:
      return {
        loading: false,
        err: action.payload.error,
      };
    default:
        return state
  }
};
