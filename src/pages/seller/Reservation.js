import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { getReservations } from "../../redux/actions/ReservationActions";
import { getCookie, userSessionExpired } from "../../actions/auth";
import Layout from "../../components/Layout";
import { useHistory } from "react-router-dom";
import Seller from "../../components/auth/Seller";
import {
  BookUsingCash,
  BookUsingPaymentMethods,
  CancelReservation,
  HashVisaAndMastercardPaymentInfo,
  ViewReservations,
} from "../../graphql/reservationAndBooking";
import ReservationsComponent from "../../components/Reservations";
import SellerSignout from "../../actions/signout";
import Notify from "../../components/Notify";

const Reservation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const Reservations = useSelector((state) => state.reservations);
  const [setPopup, setOpenPopup] = useState(false);
  const { NotifyMessage, notify, setNotify } = Notify();
  const [setPopupPayment, setOpenPopupPayment] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const { refetch, loading } = useQuery(ViewReservations, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },

    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) => dispatch(getReservations(data.viewReservations)),
    onError: (error) => (
      dispatch(getReservations(error)),
      userSessionExpired(error, history, sellerLogout)
    ),
  });

  let { reservations } = Reservations;
  const [bookUsingCash] = useMutation(BookUsingCash, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) => (
      refetch(),
      NotifyMessage({
        message: data.bookUsingCash.message,
        type: "success",
      }),
      setOpenPopup(false)
    ),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [cancelReservation] = useMutation(CancelReservation, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.cancelReservation.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({
        message: error.message,
        type: "error",
      }),
  });
  const { sellerLogout } = SellerSignout();
  const [bookUsingPaymentMethods] = useMutation(BookUsingPaymentMethods, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.bookUsingPaymentMethods.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({
        message: error.message,
        type: "error",
      }),
  });
  const onBook = async (values) => {
    await bookUsingPaymentMethods({
      variables: { reservationId: values.Id, price: parseInt(values.price) },
    });
    setOpenPopup(false);
    refetch();
  };
  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    await cancelReservation({
      variables: { cancelReservationReservationId: id },
    });
    refetch();
  };
  return (
    <Layout>
      <Seller>
        <ReservationsComponent
          onDelete={onDelete}
          notify={notify}
          setNotify={setNotify}
          RoomReservations={reservations}
          cancelReservation={cancelReservation}
          refetch={refetch}
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
          setPopup={setPopup}
          setOpenPopup={setOpenPopup}
          setPopupPayment={setPopupPayment}
          setOpenPopupPayment={setOpenPopupPayment}
          onBook={onBook}
          loading={loading}
          NotifyMessage={NotifyMessage}
          bookUsingCash={bookUsingCash}
        />
      </Seller>
    </Layout>
  );
};

export default Reservation;
