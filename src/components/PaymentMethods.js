import { Card, CardMedia, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import amole from "../Logos/amole.jpg";
import masterCard from "../Logos/mastercard.jpg";
import awash_bank from "../Logos/awash_bank.png";
import cbe from "../Logos/cbe.png";
import telebirr from "../Logos/telebirr.png";
import visa from "../Logos/visa.png";
import { Alert } from "@material-ui/lab";
import { useForm } from "./useForm";
import Controls from "./controls/Controls";
import Popup from "./Popup";
import PayInCash from "./payment/PayInCash";
import PayWithVisaAndMastercard from "./payment/PayWithVisaAndMastercard";
import PayWithAwashBank from "./payment/PayWithAwashBank";
import PayWithTelebirr from "./payment/PayWithTelebirr";

const PaymentMethods = ({ record, bookUsingCash }) => {
  const [paymentMethod, setpaymentMethod] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.paymentMethod =
      paymentMethod != null ? "" : "Choose a payment method.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const { values, errors, setErrors } = useForm(
    { paymentMethod: null },
    true,
    validate
  );
  const choosePayment = (e) => {
    setErrors({ ...errors, paymentMethod: "" });
    setpaymentMethod(e.target.id);
  };

  const handleSubmit = () => {
    if (validate()) setOpenPopup(true);
  };
  const getContents = () => {
    switch (paymentMethod) {
      case "cash":
        return <PayInCash record={record} bookUsingCash={bookUsingCash} />;
      case "visa":
      case "master":
        return (
          <PayWithVisaAndMastercard
            record={record}
            paymentMethod={paymentMethod}
          />
        );
      case "awash_bank":
        return <PayWithAwashBank record={record} />;
      case "telebirr":
        return <PayWithTelebirr record={record} />;
      default:
        return "Incorrect payment method.";
    }
  };
  return (
    <div>
      <Grid container spacing={2} className="flex justify-center items-center">
        <Grid item xs className="cursor-pointer">
          <Card>
            <CardMedia
              className={paymentMethod == "master" ? "borderAc" : ""}
              id="master"
              component="img"
              name="master"
              image={masterCard}
              onClick={choosePayment}
            />
          </Card>
        </Grid>
        <Grid item xs className="cursor-pointer">
          <Card>
            <CardMedia
              className={paymentMethod == "visa" ? "borderAc" : ""}
              id="visa"
              component="img"
              image={visa}
              onClick={choosePayment}
            />
          </Card>
        </Grid>
        <Grid item xs className="cursor-pointer">
          <Card>
            <CardMedia
              className={paymentMethod == "cbe" ? "borderAc" : ""}
              id="cbe"
              component="img"
              image={cbe}
              onClick={choosePayment}
            />
          </Card>
        </Grid>
        <Grid item xs className="cursor-pointer">
          <Card>
            <CardMedia
              className={paymentMethod == "awash_bank" ? "borderAc" : ""}
              id="awash_bank"
              component="img"
              image={awash_bank}
              onClick={choosePayment}
            />
          </Card>
        </Grid>
        <Grid item xs className="cursor-pointer">
          <Card>
            <CardMedia
              className={paymentMethod == "amole" ? "borderAc" : ""}
              awash_bank
              id="amole"
              component="img"
              image={amole}
              onClick={choosePayment}
            />
          </Card>
        </Grid>

        <Grid item xs className="cursor-pointer">
          <Card>
            <CardMedia
              className={paymentMethod == "telebirr" ? "borderAc" : ""}
              alt="telebirr"
              component="img"
              image={telebirr}
              id="telebirr"
              onClick={choosePayment}
            />
          </Card>
        </Grid>
        <Grid item xs className="cursor-pointer">
          <Card
            className={`textColor flex justify-center text-center ${
              paymentMethod == "cash" ? "borderAc" : ""
            }`}
            onClick={choosePayment}
          >
            <Typography id="cash">Pay in cash</Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {errors.paymentMethod && errors.paymentMethod != "" && (
            <Alert severity="error">{errors.paymentMethod}</Alert>
          )}
        </Grid>
      </Grid>
      <Controls.Button text="Continue" onClick={handleSubmit} />

      <Popup
        title="Booking Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        {getContents()}
      </Popup>
    </div>
  );
};

export default PaymentMethods;
