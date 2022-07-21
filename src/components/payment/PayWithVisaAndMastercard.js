import { useLazyQuery } from "@apollo/client";
import { Grid} from "@material-ui/core";
import { useState } from "react";
import {
  HashVisaAndMastercardPaymentInfo,
  SellerHashVisaAndMastercardPaymentInfo,
} from "../../graphql/reservationAndBooking";
import Controls from "../controls/Controls";
import BookingForm from "../form/BookingForm";
import { Form, useForm } from "../useForm";
import { getCookie } from "../../actions/auth";
import Notify from "../Notify";
import Popup from "../Popup";
import { useLocation } from "react-router-dom";
import VisaAndMasterCardConfirm from "./VisaAndMasterCardConfirm";

const PayWithVisaAndMastercard = ({ record, paymentMethod }) => {
  const location = useLocation();
  let Redirect_url = location.pathname.includes("/admin")
    ? "http://localhost:3000/dashboard/admin/reservations"
    : "http://localhost:3000/dashboard/reservations";
  const [PaymentInfo, setPaymentInfo] = useState({});
  const { NotifyMessage, notify, setNotify } = Notify();
  const [setPopup, setOpenPopup] = useState(false);

  const [hashVisaAndMastercardPaymentInfo] = useLazyQuery(
    HashVisaAndMastercardPaymentInfo,
    {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-and-network",
      onCompleted: (data) => (
        setPaymentInfo(data.hashVisaAndMastercardPaymentInfo),
        setOpenPopup(true)
      ),
      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    }
  );
  const [sellerHashVisaAndMastercardPaymentInfo] = useLazyQuery(
    SellerHashVisaAndMastercardPaymentInfo,
    {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-and-network",
      onCompleted: (data) => (
        setPaymentInfo(data.sellerHashVisaAndMastercardPaymentInfo),
        setOpenPopup(true)
      ),
      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    }
  );

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("price" in fieldValues)
      temp.price =
        fieldValues.price.length != 0 ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const { values, errors, setErrors, handleInputChange } = useForm(
    { ...record, price: "" },
    true,
    validate
  );
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      location.pathname.includes("/admin")
        ? await hashVisaAndMastercardPaymentInfo({
            variables: {
              price: values.price,
              reservationId: values.Id,
              paymentMethod: paymentMethod,
              Redirect_url,
            },
          })
        : await sellerHashVisaAndMastercardPaymentInfo({
            variables: {
              price: values.price,
              reservationId: values.Id,
              paymentMethod: paymentMethod,
              Redirect_url,
            },
          });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <BookingForm
          values={values}
          handleInputChange={handleInputChange}
          errors={errors}
        />
        <Grid item xs={12}>
          <Controls.Button type="submit" text="Book" />
        </Grid>
      </Form>
      <Popup
        title="Payment Form"
        openPopup={setPopup}
        setOpenPopup={setOpenPopup}
      >
        <VisaAndMasterCardConfirm PaymentInfo={PaymentInfo} />
      </Popup>
    </>
  );
};

export default PayWithVisaAndMastercard;
