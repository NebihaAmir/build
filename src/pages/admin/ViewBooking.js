import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import { getBookings } from "../../redux/actions/BookingActions";
import { getCookie, userSessionExpired } from "../../actions/auth";
import Layout from "../../components/Layout";
import { useHistory } from "react-router-dom";
import Admin from "../../components/auth/Admin";
import BookingComponent from "../../components/Bookings";
import {
  AdminCheckout,
  AdminExtendStay,
  Booking,
} from "../../graphql/reservationAndBooking";
import Notify from "../../components/Notify";

const ViewBooking = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const Bookings = useSelector((state) => state.bookings);
  let { bookings } = Bookings;

  const { NotifyMessage, notify, setNotify } = Notify();

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const { refetch, loading } = useQuery(Booking, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) => dispatch(getBookings(data.bookings)),
    onError: (error) => dispatch(getBookings(error)),
  });

  const [RoomBookings, setBookings] = useState([]);
  let Hotels = [
    ...new Map(
      bookings
        .map((book) => {
          return { name: book.hotel.name, Id: book.hotel.Id };
        })
        .map((item) => [item.name, item])
    ).values(),
  ].sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  const filter = (Id) => {
    if (Id == "all") {
      setBookings(bookings);
      return;
    }
    const filteredData = bookings.filter((item) => {
      return item.hotel.Id == Id;
    });
    setBookings(filteredData);
  };
  useEffect(() => {
    filter("all");
  }, [bookings]);

  const [checkout] = useMutation(AdminCheckout, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.adminCheckout.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [extendStay] = useMutation(AdminExtendStay, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.adminExtendStay.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
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
  const handleChange = (e) => {
    filter(e.target.value);
  };

  return (
    <Layout>
      <Admin>
        <BookingComponent
          notify={notify}
          setNotify={setNotify}
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
          handleDateChange={handleDateChange}
          onCheckout={onCheckout}
          handleChange={handleChange}
          bookings={bookings}
          Hotels={Hotels}
          RoomBookings={RoomBookings}
          location="admin"
          loading={loading}
        />
      </Admin>
    </Layout>
  );
};

export default ViewBooking;
