import * as actionTypes from "../constants/sellerConstants";

export const getSellersReducers = (state = { sellers: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_SELLERS_REQUEST:
      return {
        loading: true,
        sellers: [],
      };
    case actionTypes.GET_SELLERS_SUCCESS:
      return {
        loading: false,
        sellers: action.payload.sellers,
      };
    case actionTypes.GET_SELLERS_FAIL:
      return {
        loading: false,
        err: action.payload.error,
      };
    default:
      return state;
  }
};
