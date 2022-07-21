import { createStore ,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk"

import { composeWithDevTools } from "redux-devtools-extension";
import {getHotelsReducers}  from "./reducers/hotelReducers";
import { getSellersReducers } from "./reducers/sellerReducer";
import { getCatagoryServiceReducers } from "./reducers/catagoryServiceReducer";
import { getUsersReducers } from "./reducers/userReducers";
import { getReservationsReducers } from "./reducers/reservationReducers";
import { getBookingsReducers } from "./reducers/bookingReducers";
const reducers = combineReducers({
  hotels: getHotelsReducers,
  sellers: getSellersReducers,
  services: getCatagoryServiceReducers,
  users: getUsersReducers,
  reservations:getReservationsReducers,
  bookings:getBookingsReducers
});

const middleware=[thunk]

const store=createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;