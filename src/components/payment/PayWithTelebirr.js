import React from "react";
import { useLazyQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { Form, useForm } from "../useForm";
import fetch from "isomorphic-fetch";
import BookingForm from "../form/BookingForm";
import { AdminPayWithTelebirr } from "../../graphql/reservationAndBooking";
import { getCookie } from "../../actions/auth";
import Controls from "../controls/Controls";
import { useLocation } from "react-router-dom";
import Notify from "../Notify";
import Notification from "../Notification";
const PayWithTelebirr = ({ record }) => {
  const { NotifyMessage, notify, setNotify } = Notify();
  const location = useLocation();
  const [payWithTelebirr] = useLazyQuery(AdminPayWithTelebirr, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) =>
      NotifyMessage({ message: data.payWithTelebirr.message, type: "success" }),
    // Pay(data.payWithTelebirr.api, data.payWithTelebirr.requestMessage),
    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //   const [sellerHashVisaAndMastercardPaymentInfo] = useLazyQuery(
  //     SellerHashVisaAndMastercardPaymentInfo,
  //     {
  //       context: {
  //         headers: {
  //           Authorization: `Bearer ${getCookie("token")}`,
  //         },
  //       },
  //       fetchPolicy: "cache-and-network",
  //       nextFetchPolicy: "cache-and-network",
  //       onCompleted: (data) => (
  //         setPaymentInfo(data.sellerHashVisaAndMastercardPaymentInfo),
  //         setOpenPopup(true)
  //       ),
  //       onError: (error) =>
  //         NotifyMessage({ message: error.message, type: "error" }),
  //     }
  //   );
  const Pay = (api, requestMessage) => {
    const request = {
      appid: requestMessage.appid,
      sign: requestMessage.sign,
      ussd: requestMessage.ussd,
    };

    return fetch(api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => {
        console.log(res);
        if (res.status == 200 && res.data.code == 200) {
          return res.redirect(res.data.data.toPayUrl);
        } else {
          return res.status(400).json({ err: res.data.message });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
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
        ? await payWithTelebirr({
            variables: {
              price: values.price,
              reservationId: values.Id,
            },
          })
        : await sellerHashVisaAndMastercardPaymentInfo({
            variables: {
              price: values.price,
              reservationId: values.Id,
            },
          });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <BookingForm
        values={values}
        handleInputChange={handleInputChange}
        errors={errors}
      />
      <Grid item xs={12}>
        <Controls.Button type="submit" text="Book" />
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </Form>
  );
};

export default PayWithTelebirr;
