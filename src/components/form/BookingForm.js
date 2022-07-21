import React from "react";
import {
  Grid,
  withStyles,

} from "@material-ui/core";
import Controls from "../controls/Controls";

import TextField from "@material-ui/core/TextField";

const DisabledTextField = withStyles({
  root: {
    marginRight: 8,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "black",
    },
  },
})(TextField);

const BookingForm = ({ values, handleInputChange, errors }) => {
  return (
    <>
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

          <Controls.Input
            name="price"
            label="Total price"
            value={values.price}
            onChange={handleInputChange}
            error={errors.price}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BookingForm;
