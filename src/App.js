import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageHotels from "./pages/admin/ManageHotels";
import ManageSellers from "./pages/admin/ManageSellers";
import HotelManagerManageSellers from "./pages/seller/ManageSellers";
import ManageCatagoryService from "./pages/admin/ManageCatagoryService";
import ManageUsers from "./pages/admin/ManageUsers";
import AdminSignin from "./pages/admin/Signin";
import Signin from "./pages/seller/Signi";
import NewSaller from "./pages/NewSaller/Signin"
import SellerDashboard from "./pages/seller/SellerDashboard";
import Reservation from "./pages/seller/Reservation";
import Booking from "./pages/seller/Booking";
import ViewReservation from "./pages/admin/ViewReservation";
import ViewBooking from "./pages/admin/ViewBooking";
import ManageRoom from "./pages/admin/ManageRoom";
import Room from "./pages/seller/Rooms";
import HotelReports from "./pages/admin/HotelReport";
import UserReports from "./pages/admin/UserReports";
import ManageHotelManager from "./pages/admin/ManageHotelManager";
import { isAuth } from "./actions/auth";
import ViewStagedReservatio from "./pages/admin/ViewStagedReservatio";
import SellerViewStagedReservation from "./pages/seller/ViewStagedReservations";
import UserPayment from "./pages/UserPayment";
import PaymentResponse from "./pages/PaymentResponse";
import Sales from './pages/admin/Sellers'
import NeweSellerDashboard from './pages/NewSaller/NewSellerDashbord'
import NewSellerHotel from './pages/NewSaller/ManageHotels'
import NewSellerHotelManager from './pages/NewSaller/ManageHotelManagers'
import NeweSellerReservation from './pages/NewSaller/ManageResevations'
import ManageHotel from "./pages/seller/ManageHotel";
const theme = createTheme({
  palette: {
    primary: {
      main: "#318972",
      light: "#3c44b126",
      dark: "#225f4f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        shadow: "0",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/dashboard/managehotel" 
          exact
          render={(props)=><ManageHotel {...props}/>}
          />
          <Route
            path="/dashboard/newSellers/Reservations"
            exact
            render={(props) => <NeweSellerReservation {...props} />}
          />
          <Route
            path="/dashboard/admin/signin"
            exact
            render={(props) => <AdminSignin {...props} />}
          />
          <Route
            path="/dashboard/newSellers/hotelmanager"
            exact
            render={(props) => <NewSellerHotelManager {...props} />}
          />
          <Route
            path="/dashboard/signin"
            exact
            render={(props) => <Signin {...props} />}
          />
          <Route
            path="/dashboard/newSellers/signin"
            exact
            render={(props) => <Signin {...props} />}
          />
          <Route
            path={["/dashboard/admin", "/admin"]}
            exact
            render={(props) => {
              return isAuth() ? (
                <AdminDashboard {...props} />
              ) : (
                <AdminSignin {...props} />
              );
            }}
          />

          <Route
            path="/dashboard/admin/hotels"
            exact
            render={(props) => <ManageHotels {...props} />}
          />
          <Route
            path="/dashboard/newSellers/manageNewHotel"
            exact
            render={(props) => <NewSellerHotel {...props} />}
          />
          <Route
            path="/dashboard/admin/hotelmanagers"
            exact
            render={(props) => <ManageHotelManager {...props} />}
          />
          <Route
            path="/dashboard/admin/sellers"
            exact
            render={(props) => <Sales {...props} />}
          />
          <Route
            path="/dashboard/admin/hotels/report"
            exact
            render={(props) => <HotelReports {...props} />}
          />
          <Route
            path="/dashboard/admin/users/report"
            exact
            render={(props) => <UserReports {...props} />}
          />
          <Route
            path="/dashboard/admin/resevtionst"
            exact
            render={(props) => <ManageSellers {...props} />}
          />
          <Route
            path="/dashboard/admin/reservations"
            exact
            render={(props) => <ViewReservation {...props} />}
          />
          <Route
            path="/dashboard/admin/stagedreservations"
            exact
            render={(props) => <ViewStagedReservatio {...props} />}
          />
          <Route
            path="/dashboard/stagedreservations"
            exact
            render={(props) => <SellerViewStagedReservation {...props} />}
          />
          <Route
            path="/dashboard/admin/bookings"
            exact
            render={(props) => <ViewBooking {...props} />}
          />
          <Route
            path="/dashboard/admin/rooms"
            exact
            render={(props) => <ManageRoom {...props} />}
          />
          <Route
            path="/dashboard/admin/services"
            exact
            render={(props) => <ManageCatagoryService {...props} />}
          />
          <Route
            path="/dashboard/admin/users"
            exact
            render={(props) => <ManageUsers {...props} />}
          />
          <Route
            path={["/dashboard", "/"]}
            exact
            render={(props) => {
              return isAuth() ? (
                <SellerDashboard {...props} />
              ) : (
                <Signin {...props} />
              );
            }}
          />
          <Route
            path={["/dashboard/newSellers", "/newSellers"]}
            exact
            render={(props) => {
              return isAuth() ? (
                <NeweSellerDashboard {...props} />
              ) : (
                <NewSaller {...props} />
              );
            }}
          />
          <Route
            path="/dashboard/reservations"
            exact
            render={(props) => <Reservation {...props} />}
          />
          <Route
            path="/dashboard/managesellers"
            exact
            render={(props) => <HotelManagerManageSellers {...props} />}
          />
          <Route
            path="/dashboard/bookings"
            exact
            render={(props) => <Booking {...props} />}
          />
          <Route
            path="/dashboard/rooms"
            exact
            render={(props) => <Room {...props} />}
          />
          <Route
            path="/userpayment"
            exact
            render={(props) => <UserPayment {...props} />}
          />
          <Route
            path="/response/mobileview"
            exact
            render={(props) => <PaymentResponse {...props} />}
          />
        </Switch>

        <CssBaseline />
      </ThemeProvider>
    </Router>
  );
}

export default App;
