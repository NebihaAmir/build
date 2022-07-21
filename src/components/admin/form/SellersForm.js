import React, { useState, useEffect, useRef } from "react";
import { FormLabel, Grid } from "@material-ui/core";
import Controls from "../../controls/Controls";
import { useForm, Form } from "../../useForm";
import { ViewHotels } from "../../../graphql/seller";
import { useQuery } from "@apollo/client";
import Notify from "../../Notify";
import { withRouter } from "react-router-dom";

const initialFValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  phone_no: "",
  hotelId: "",
  password: "",
  editing: false,
};
const SellersForm = (props) => {
  const { addOrEdit, recordForEdit, location } = props;
  const [state, setState] = useState([]);
  const { NotifyMessage, notify, setNotify } = Notify();
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
        password: "",
      });
  }, [recordForEdit]);
  useQuery(ViewHotels, {
    onCompleted: (data) => setState(data.viewHotels),
    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName =
        fieldValues.firstName.length != 0 ? "" : "This field is required.";
    if ("middleName" in fieldValues)
      temp.middleName =
        fieldValues.middleName.length != 0 ? "" : "This field is required.";
    if ("lastName" in fieldValues)
      temp.lastName =
        fieldValues.lastName.length != 0 ? "" : "This field is required.";
    if (location.pathname.includes("/admin")) {
      if ("hotelId" in fieldValues)
        temp.hotelId =
          fieldValues.hotelId.length != 0 ? "" : "This field is required.";
    }
    if (values.editing == true) {
      if ("password" in fieldValues)
        temp.password =
          fieldValues.password.length == 0 || fieldValues.password.length > 7
            ? ""
            : "Password must be atleast 8 characters.";
      if ("username" in fieldValues)
        temp.username =
          fieldValues.username.length != 0 ? "" : "This field is required.";
    }
    if ("phone_no" in fieldValues) {
      var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

      temp.phone_no = regex.test(fieldValues.phone_no)
        ? ""
        : "Enter a proper phone number.";
    }
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
       setValues({ ...values, submitting: true });
      addOrEdit(values);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={8}>
          <Controls.Input
            name="firstName"
            label="First Name"
            value={values.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
          />
          <Controls.Input
            name="middleName"
            label="Middle Name"
            value={values.middleName}
            onChange={handleInputChange}
            error={errors.middleName}
          />
          <Controls.Input
            name="lastName"
            label="last Name"
            value={values.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
          />

          <Controls.Input
            label="Phone"
            name="phone_no"
            placeholder="+25191111111"
            value={values.phone_no}
            onChange={handleInputChange}
            error={errors.phone_no}
          />
          {location.pathname.includes("/admin") && (
            <Controls.Select
              name="hotelId"
              label="Hotels"
              value={values.hotelId}
              onChange={handleInputChange}
              options={state}
              error={errors.hotelId}
            />
          )}
          <Controls.Input
            name="password"
            label="Password"
            disabled={values.editing == false ? true : false}
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
          />
          <Controls.Input
            name="username"
            label="Username"
            disabled={values.editing == false ? true : false}
            value={values.username}
            onChange={handleInputChange}
            error={errors.username}
          />
        </Grid>

        <Grid item xs>
          <div>
            <Controls.Button
              text={
                values.editing == true
                  ? values.submitting
                    ? "Editing..."
                    : "Edit"
                  : values.submitting
                  ? "Adding..."
                  : "Add"
              }
              variant="contained"
              className="Button"
              type="submit"
            />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};
export default withRouter(SellersForm);
