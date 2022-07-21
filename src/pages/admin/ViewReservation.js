import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { getReservations } from "../../redux/actions/ReservationActions";
import { getCookie } from "../../actions/auth";
import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import {
  AdminBookUsingCash,
  AdminBookUsingPaymentMethods,
  AdminCancelReservation,
  Reservation,
} from "../../graphql/reservationAndBooking";
import ReservationsComponent from "../../components/Reservations";
import Notify from "../../components/Notify";

const ViewReservation = () => {
  const dispatch = useDispatch();
  const Reservations = useSelector((state) => state.reservations);
  const [setPopup, setOpenPopup] = useState(false);
  const [setPopupPayment, setOpenPopupPayment] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const { NotifyMessage, notify, setNotify } = Notify();

  const { refetch, loading } = useQuery(Reservation, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) => dispatch(getReservations(data.reservations)),
    onError: (error) => dispatch(getReservations(error)),
  });

  let { reservations } = Reservations;

  let Hotels = [
    ...new Map(
      reservations
        .map((reserve) => {
          return { name: reserve.hotel.name, Id: reserve.hotel.Id };
        })
        .map((item) => [item.name, item])
    ).values(),
  ].sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  const [RoomReservations, setReservations] = useState([]);

  const filter = (Id) => {
    if (Id == "all") {
      setReservations(reservations);
      return;
    }
    const filteredData = reservations.filter((item) => {
      return item.hotel.Id == Id;
    });
    setReservations(filteredData);
  };

  useEffect(() => {
    filter("all");
  }, [reservations]);

  const [cancelReservation] = useMutation(AdminCancelReservation, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.adminCancelReservation.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [adminBookUsingPaymentMethods] = useMutation(
    AdminBookUsingPaymentMethods,
    {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      onCompleted: (data) =>
        NotifyMessage({
          message: data.adminBookUsingPaymentMethods.message,
          type: "success",
        }),

      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    }
  );
  const [bookUsingCash] = useMutation(AdminBookUsingCash, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) => (
      refetch(),
      NotifyMessage({
        message: data.adminBookUsingCash.message,
        type: "success",
      }),
      setOpenPopup(false)
    ),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });

  const handleChange = (e) => {
    filter(e.target.value);
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

  const onBook = async (values) => {
    await adminBookUsingPaymentMethods({
      variables: { reservationId: values.Id, price: parseInt(values.price) },
    });

    setOpenPopup(false);
    refetch();
  };

  return (
    <Layout>
      <Admin>
        <ReservationsComponent
          location="admin"
          onDelete={onDelete}
          onBook={onBook}
          notify={notify}
          setNotify={setNotify}
          RoomReservations={RoomReservations}
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
          setPopup={setPopup}
          setOpenPopup={setOpenPopup}
          setPopupPayment={setPopupPayment}
          setOpenPopupPayment={setOpenPopupPayment}
          Hotels={Hotels}
          handleChange={handleChange}
          loading={loading}
          NotifyMessage={NotifyMessage}
          bookUsingCash={bookUsingCash}
        />
      </Admin>
    </Layout>
  );
};

export default ViewReservation;
