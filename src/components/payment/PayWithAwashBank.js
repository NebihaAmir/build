import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Grid, withStyles } from "@material-ui/core";

import { TextField, Stepper, Step, StepLabel } from "@material-ui/core";
const DisabledTextField = withStyles({
  root: {
    marginRight: 8,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "black",
    },
  },
})(TextField);

import { Form, useForm } from "../useForm";
import Controls from "../controls/Controls";
import Notification from "../Notification";
import Notify from "../Notify";
import { getCookie } from "../../actions/auth";
import {
  PayUsingAwashBank,
  SellerPayWithAwashBank,
} from "../../graphql/reservationAndBooking";

const getSteps = () => {
  return ["Booking Information", "Account Infromation", "Payment"];
};

const PayWithAwashBank = ({ record }) => {
  const { NotifyMessage, notify, setNotify } = Notify();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("price" in fieldValues && activeStep == 1)
      temp.price =
        fieldValues.price.length != 0 ? "" : "This field is required.";
    if ("awash_bank_account_no" in fieldValues && activeStep == 1)
      temp.awash_bank_account_no =
        fieldValues.awash_bank_account_no.length != 0
          ? ""
          : "This field is required.";
    if ("otp" in fieldValues && activeStep == 2)
      temp.otp = fieldValues.otp.length != 0 ? "" : "This field is required.";
    if ("phone_no" in fieldValues && activeStep == 2)
      temp.phone_no =
        fieldValues.phone_no.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const [payWithAwashBank] = useLazyQuery(PayUsingAwashBank, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) => (
      NotifyMessage({
        message: data.payWithAwashBank.message,
        type: "success",
      }),
      !isLastStep() && setActiveStep((prevActiveStep) => prevActiveStep + 1)
    ),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [sellerPayWithAwashBank] = useLazyQuery(SellerPayWithAwashBank, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) => (
      NotifyMessage({
        message: data.sellerPayWithAwashBank.message,
        type: "success",
      }),
      !isLastStep() && setActiveStep((prevActiveStep) => prevActiveStep + 1)
    ),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      ...record,
      price: "",
      phone_no: "",
      otp: "",
      awash_bank_account_no: "",
    },
    true,
    validate
  );
  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    if (validate()) {
      
      if (location.pathname.includes("/admin")) {
        if (activeStep == 0)
          payWithAwashBank({ variables: { step: activeStep } });
        else if (activeStep == 1) {
          payWithAwashBank({
            variables: {
              AwashBankAccountNumber: values.awash_bank_account_no,
              Price: values.price,
              ReservationId: values.Id,
              step: activeStep,
            },
          });
        } else if (activeStep == 2) {
          payWithAwashBank({
            variables: {
              PhoneNo: values.phone_no,
              Otp: values.otp,
              step: activeStep,
            },
          });
        }
      } else {
        if (activeStep == 0)
          sellerPayWithAwashBank({ variables: { step: activeStep } });
        else if (activeStep == 1) {
          sellerPayWithAwashBank({
            variables: {
              AwashBankAccountNumber: values.awash_bank_account_no,
              Price: values.price,
              ReservationId: values.Id,
              step: activeStep,
            },
          });
        } else if (activeStep == 2) {
          sellerPayWithAwashBank({
            variables: {
              PhoneNo: values.phone_no,
              Otp: values.otp,
              step: activeStep,
            },
          });
        }
      }
    }
  };

  const handleBack = () => {
    setErrors({});
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};

          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {
        <>
          <form>
            {activeStep == 0 && (
              <Form>
                <Grid container>
                  <Grid item xs={6}>
                    <DisabledTextField
                      disabled
                      name="firstName"
                      label="First Name"
                      value={values.user.firstName}
                      variant="outlined"
                    />
                    <DisabledTextField
                      disabled
                      name="middleName"
                      label="Middle Name"
                      value={values.user.middleName}
                      variant="outlined"
                    />
                    <DisabledTextField
                      name="lastName"
                      label="Last Name"
                      value={values.user.lastName}
                      disabled
                      variant="outlined"
                    />
                    <DisabledTextField
                      name="phone_no"
                      label="Phone number"
                      value={values.user.phone_no}
                      disabled
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <DisabledTextField
                      name="checkin_time"
                      label="Checkin time"
                      value={new Date(values.checkin_time).toLocaleString()}
                      disabled
                      variant="outlined"
                    />
                    <DisabledTextField
                      name="checkout_time"
                      label="Checkout time"
                      value={new Date(values.checkout_time).toLocaleString()}
                      disabled
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
            {activeStep == 1 && (
              <Form>
                {" "}
                <Controls.Input
                  name="awash_bank_account_no"
                  label="Debit account"
                  value={values.awash_bank_account_no}
                  onChange={handleInputChange}
                  error={errors.awash_bank_account_no}
                />
                <Controls.Input
                  name="price"
                  label="Total price"
                  value={values.price}
                  onChange={handleInputChange}
                  error={errors.price}
                />
              </Form>
            )}
            {activeStep == 2 && (
              <Form>
                {" "}
                <Controls.Input
                  name="phone_no"
                  label="Phone number"
                  value={values.phone_no}
                  onChange={handleInputChange}
                  error={errors.phone_no}
                />
                <Controls.Input
                  name="otp"
                  label="One time password"
                  value={values.otp}
                  onChange={handleInputChange}
                  error={errors.otp}
                />
              </Form>
            )}
            <Controls.Button
              disabled={activeStep === 0}
              onClick={handleBack}
              text="back"
            />

            <Controls.Button
              text={activeStep === steps.length - 1 ? "Finish" : "Next"}
              onClick={handleNext}
            />
          </form>
        </>
      }
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default PayWithAwashBank;
