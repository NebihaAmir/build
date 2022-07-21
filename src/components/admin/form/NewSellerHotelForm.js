import React, { useRef, useEffect } from "react";
import { FormLabel, Grid } from "@material-ui/core";
import Controls from "../../controls/Controls";
import { useForm, Form } from "../../useForm";
import { useMutation } from "@apollo/client";
import { AddHotel, UpdateHotel } from "../../../graphql/newSellerHotel";
import { getCookie } from "../../../actions/auth";

const initialFValues = {
  name: "",
  email: "",
  phone_no: "",
  city: "",
  wereda: "",
  state: "",
  description: "",
  star: "",
  lat: "",
  long: "",
  image: null,
  editing: false,
};
export default function HotelForm(props) {
  const { recordForEdit, NotifyMessage, setOpenPopup, refetch } = props;
  const [updateHotelInformation] = useMutation(UpdateHotel, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) => (
      setOpenPopup(false),
      resetForm,
      refetch(),
      NotifyMessage({
        message: data.newSellerUpdateHotelInformation.message,
        type: "success",
      })
    ),
    onError: (error) => (
      NotifyMessage({ message: error.message, type: "error" }),
      setValues({ ...values, submitting: false })
    ),
  });
  const [addHotel] = useMutation(AddHotel, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },

    onCompleted: (data) => (
      setOpenPopup(false),
      resetForm(),
      refetch(),
      NotifyMessage({
        message: data.sellerAddHotel.message,
        type: "success",
      })
    ),
    onError: (error) => (
      NotifyMessage({ message: error.message, type: "error" }),
      setValues({ ...values, submitting: false })
    ),
  });
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if ("name" in fieldValues)
      temp.name = fieldValues.name.length != 0 ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email =
        regexEmail.test(fieldValues.email.toString().toLowerCase()) &&
        fieldValues.email.length != 0
          ? ""
          : "Email is not valid.";
    if ("phone_no" in fieldValues) {
      var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

      temp.phone_no = regex.test(fieldValues.phone_no)
        ? ""
        : "Enter a proper phone number.";
    }
    if ("state" in fieldValues)
      temp.state =
        fieldValues.state.length != 0 ? "" : "This field is required.";
    if ("wereda" in fieldValues)
      temp.wereda =
        fieldValues.wereda.length != 0 ? "" : "This field is required.";
    if ("city" in fieldValues)
      temp.city = fieldValues.city.length != 0 ? "" : "This field is required.";
    if ("description" in fieldValues)
      temp.description =
        fieldValues.description.length != 0 ? "" : "This field is required.";
    if ("star" in fieldValues)
      temp.star =
        fieldValues.star.toString().length != 0
          ? fieldValues.star > 5
            ? "Maximum hotel star is 5."
            : fieldValues.star < 1
            ? "Minimum hotel star is 1."
            : ""
          : "This field is required.";
    if ("lat" in fieldValues)
      temp.lat = fieldValues.lat.length != 0 ? "" : "This field is required.";
    if ("long" in fieldValues)
      temp.long = fieldValues.long.length != 0 ? "" : "This field is required.";
    if (values.editing == false) {
      if ("image" in fieldValues)
        temp.image = fieldValues.image != null ? "" : "This field is required.";
    }
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
        state: recordForEdit.location.state,
        wereda: recordForEdit.location.wereda,
        city: recordForEdit.location.city,
        lat: recordForEdit.address.lat,
        long: recordForEdit.address.long,
      });
  }, [recordForEdit]);
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setValues({ ...values, submitting: true });
      if (values.editing == false) {
        await addHotel({
          variables: {
            name: values.name,
            description: values.description,
            star: parseInt(values.star),
            phone_no: values.phone_no,
            address: {
              lat: parseFloat(values.lat),
              long: parseFloat(values.long),
            },
            location: {
              state: values.state,
              wereda: values.wereda,
              city: values.city,
            },
            image: values.image,
            email: values.email,
          },
        });
      } else {
        await updateHotelInformation({
          variables: {
            updateHotelInformationHotelId: recordForEdit.Id,
            updateHotelInformationHotelInfo: {
              name: values.name,
              description: values.description,
              star: parseInt(values.star),
              phone_no: values.phone_no,
              address: {
                lat: parseFloat(values.lat) || recordForEdit.address.lat,
                long: parseFloat(values.long) || recordForEdit.address.long,
              },
              location: {
                state: values.state,
                wereda: values.wereda,
                city: values.city,
              },
              email: values.email,
            },
          },
        });
      }
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="name"
            label="name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            label="Phone"
            name="phone_no"
            placeholder="+25191111111"
            value={values.phone_no}
            onChange={handleInputChange}
            error={errors.phone_no}
          />
          <Controls.Input
            label="description"
            name="description"
            multiline
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Star"
            name="star"
            type="number"
            value={values.star}
            onChange={handleInputChange}
            error={errors.star}
          />
          <Grid container>
            <Grid item xs={12}>
              <FormLabel className="pl-2">Location</FormLabel>
            </Grid>
            <Grid item xs={4}>
              <Controls.Input
                label="City"
                name="city"
                value={values.city}
                onChange={handleInputChange}
                error={errors.city}
              />
            </Grid>
            <Grid item xs={4}>
              {" "}
              <Controls.Input
                label="wereda"
                name="wereda"
                value={values.wereda}
                onChange={handleInputChange}
                error={errors.wereda}
              />
            </Grid>
            <Grid item xs={4}>
              <Controls.Input
                label="state"
                name="state"
                value={values.state}
                onChange={handleInputChange}
                error={errors.state}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <FormLabel className="pl-2">Coordinates</FormLabel>
            </Grid>
            <Grid item xs={6}>
              <Controls.Input
                label="Lat"
                name="lat"
                type="number"
                value={values.lat}
                onChange={handleInputChange}
                error={errors.lat}
              />
            </Grid>

            <Grid item xs={6}>
              <Controls.Input
                label="Long"
                name="long"
                type="number"
                value={values.long}
                onChange={handleInputChange}
                error={errors.long}
              />
            </Grid>
          </Grid>
          {values.editing == false && (
            <Grid item xs={12}>
              <Controls.Input
                name="image"
                type="file"
                onChange={handleInputChange}
                error={errors.image}
                autoFocus={true}
              />
            </Grid>
          )}
        </Grid>
        <Grid item xs={6}>
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
}
