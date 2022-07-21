import { useMutation } from "@apollo/client";
import { Divider, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCookie } from "../actions/auth";
import Loading from "../components/Loading";
import { UserBookUsingPaymentMethods } from "../graphql/reservationAndBooking";
const useStyles = makeStyles((theme) => ({
  error: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  success: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    height: "100vh",
    width: "100%",
  },
}));
const PaymentResponse = () => {
  const history = useHistory();
  const classes = useStyles();
  const [values, setvalues] = useState({
    price: "",
    loading: false,
    message: "",
    status: "",
    flag: false,
  });
  useEffect(() => {
    if (history.location.search) {
      const response = history.location.search.split("&").map((data) => {
        if (data.split("=")) {
          return { name: data.split("=")[0], value: data.split("=")[1] };
        }
      });
     history.replace(history.location.pathname, null);
      checkResponse(
        response.find((x) => x.name === "decision"),
        response.find((x) => x.name === "req_amount"),
        response.find((x) => x.name === "req_transaction_uuid")
      );
    }
  }, [history]);
  const [userBookUsingPaymentMethods] = useMutation(
    UserBookUsingPaymentMethods,
    {
      onCompleted: (data) =>
        setvalues({
          ...values,
          loading: false,
          message: data.userBookUsingPaymentMethods.message,
          status: "success",
          flag: true,
        }),

      onError: (error) =>
        setvalues({
          ...values,
          loading: false,
          message: error.message,
          status: "error",
        }),
    }
  );
  const checkResponse = (decision, price, reservationId) => {
    if (decision.value == "ACCEPT") {
      setvalues({ ...values, loading: true, price: price.value });
      userBookUsingPaymentMethods({
        variables: {
          reservationId: reservationId.value,
          price: parseInt(price.value),
        },
      });
    } else if (decision.value == "CANCEL") {
      setvalues({
        ...values,
        loading: false,
        message: " The transaction process has been canceled.",
        status: "success",
      });
    } else {
      setvalues({
        ...values,
        loading: false,
        message: "Something's not right.",
        status: "error",
      });
    }
  };

  return values.loading ? (
    <div className={classes.loading}>
      <Loading />
      <Typography variant="h4" color="primary" className="text-center">
        {" "}
        Please wait
      </Typography>
    </div>
  ) : (
    <div
      className={`flex items-center justify-center h-screen mt-3 ${
        classes[values.status]
      }`}
      style={{ flexDirection: "column" }}
    >
      <Typography style={{ fontSize: "16px" }} className="text-center">
        {values.message}
      </Typography>
      <Divider />
      {values.flag && (
        <Typography style={{ fontSize: "16px" }} className="text-center">
          {`${values.price} USD has been withdrawed from your account.`}
        </Typography>
      )}
    </div>
  );
};

export default PaymentResponse;
