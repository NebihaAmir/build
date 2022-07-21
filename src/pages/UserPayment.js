import React from "react";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getCookie } from "../actions/auth";
import Notify from "../components/Notify";
import VisaAndMasterCardConfirm from "../components/payment/VisaAndMasterCardConfirm";
import { UserHashVisaAndMastercardPaymentInfo } from "../graphql/reservationAndBooking";
import Loading from "../components/Loading";
import { makeStyles, Typography } from "@material-ui/core";

import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";

import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  loading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    height: "100vh",
    width: "100%",
  },
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(1),
  },
  dialogTitle: {
    paddingRight: "0px",
  },
}));
const UserPayment = () => {
  const classes = useStyles();
  const history = useHistory();
  const link = history.location.search;
  const query = link.slice(1);
  const [PaymentInfo, setPaymentInfo] = useState({});
  let Redirect_url = "http://192.168.1.6:3000/response/mobileview";
  const { NotifyMessage } = Notify();
  const [openPopup, setOpenPopup] = useState(false);
  const [values, setvalues] = useState({
    price: query.split("|")[1],
    Id: query.split("|")[0],
    paymentMethod: query.split("|")[2],
    loading: false,
  });
  useEffect(() => {
    setvalues({ ...values, loading: true });
    userHashVisaAndMastercardPaymentInfo({
      variables: {
        price: values.price,
        reservationId: values.Id,
        paymentMethod: values.paymentMethod,
        Redirect_url,
      },
    });
  }, []);

  const [userHashVisaAndMastercardPaymentInfo] = useLazyQuery(
    UserHashVisaAndMastercardPaymentInfo,
    {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-and-network",
      onCompleted: (data) => (
        setPaymentInfo(data.userHashVisaAndMastercardPaymentInfo),
        setOpenPopup(true),
        setvalues({ ...values, loading: false })
      ),
      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    }
  );

  return values.loading ? (
    <div className={classes.loading}>
      <Loading />
      <Typography variant="h4" color="primary" className="text-center">
        {" "}
        Please wait
      </Typography>
    </div>
  ) : (
    <Dialog
      open={openPopup}
      TransitionComponent={Transition}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Confirm Form
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {" "}
        <VisaAndMasterCardConfirm PaymentInfo={PaymentInfo} />
      </DialogContent>
    </Dialog>
  );
};
export default UserPayment;
