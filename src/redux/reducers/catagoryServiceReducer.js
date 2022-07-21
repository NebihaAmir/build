import * as actionTypes from "../constants/catagoryServiceConstants";

export const getCatagoryServiceReducers = (state = {services: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_CATAGORY_SERVICE_REQUEST:
      return {
        loading: true,
        services: [],
      };
    case actionTypes.GET_CATAGORY_SERVICE_SUCCESS:
      return {
        loading: false,
        services: action.payload.services,
      };
    case actionTypes.GET_CATAGORY_SERVICE_FAIL:
      return {
        loading: false,
        err: action.payload.error,
      };
    default:
      return state;
  }
};
