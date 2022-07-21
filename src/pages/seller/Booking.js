import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import { getBookings } from "../../redux/actions/BookingActions";
import { getCookie, userSessionExpired } from "../../actions/auth";
import Layout from "../../components/Layout";
import { useHistory } from "react-router-dom";
import Seller from "../../components/auth/Seller";
import {
  Checkout,
  ExtendStay,
  ViewBookings,
} from "../../graphql/reservationAndBooking";
import BookingComponent from "../../components/Bookings";
import SellerSignout from "../../actions/signout";
import Notify from "../../components/Notify";

const Booking = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const Bookings = useSelector((state) => state.bookings);

  const { NotifyMessage, notify, setNotify } = Notify();
  const { sellerLogout } = SellerSignout();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const { refetch, loading } = useQuery(ViewBookings, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },

    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) => dispatch(getBookings(data.viewBookings)),
    onError: (error) => (
      dispatch(getBookings(error)),
      userSessionExpired(error, history, sellerLogout)
    ),
  });

  let { bookings } = Bookings;

  const [checkout] = useMutation(Checkout, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.checkOut.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({
        message: error.message,
        type: "error",
      }),
  });
  const [extendStay] = useMutation(ExtendStay, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.extendStay.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({
        message: error.message,
        type: "error",
      }),
  });

  const onCheckout = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    await checkout({ variables: { checkOutBookingId: id } });
    refetch();
  };
  const handleDateChange = (id) => async (e) => {
    const { value } = e.target;
    await extendStay({
      variables: { extendStayBookingId: id, extendStayCheckoutTime: value },
    });
    refetch();
  };
  return (
    <Layout>
      <Seller>
        <BookingComponent
          notify={notify}
          setNotify={setNotify}
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
          handleDateChange={handleDateChange}
          onCheckout={onCheckout}
          bookings={bookings}
          RoomBookings={bookings}
          loading={loading}
        />
      </Seller>
    </Layout>
  );
};

export default Booking;
