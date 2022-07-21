import * as actiontypes from "../constants/catagoryServiceConstants";

export const getCatagoryService = (data, error) => (dispatch) => {
  try {
    dispatch({ type: actiontypes.GET_CATAGORY_SERVICE_REQUEST });
    if (error) {
      dispatch({
        type: actiontypes.GET_CATAGORY_SERVICE_FAIL,
        payload: { err: error },
      });
    }
    if (data) {
      dispatch({
        type: actiontypes.GET_CATAGORY_SERVICE_SUCCESS,
        payload: { services: Array.from(data.viewRoomServices) },
      });
    }
  } catch (error) {
    dispatch({
      type: actiontypes.GET_CATAGORY_SERVICE_FAIL,
      payload: error,
    });
  }
};
