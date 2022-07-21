import React, { useEffect, useRef, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Controls from "../../controls/Controls";
import { useForm, Form } from "../../useForm";
import {
  AddCatagoryService,
  UpdateCatagoryService,
} from "../../../graphql/hotel";
import { useMutation } from "@apollo/client";
import { getCookie } from "../../../actions/auth";

const initialFValues = {
  name: "",
  description: "",
  price: "",
  icon: null,
  editing: false,
};
const useStyles = makeStyles((theme) => ({
  icon: {
    borderRadius: "50%",
    height: "40px",
    width: "40px",
  },
}));
const CatagoryServiceForm = ({
  recordForEdit,
  refetch,
  NotifyMessage,
  setOpenPopup,
}) => {
  const classes = useStyles();
  const [file, setfile] = useState(null);
  useEffect(() => {
    if (recordForEdit != null) {
      setValues({
        ...recordForEdit,
      });
      setfile(recordForEdit.icon);
    }
  }, [recordForEdit]);
  const roomImagePicker = useRef(null);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name.length != 0 ? "" : "This field is required.";
    if ("description" in fieldValues)
      temp.description =
        fieldValues.description.length != 0 ? "" : "This field is required.";
    if (values.editing == false) {
      if ("icon" in fieldValues)
        temp.icon = fieldValues.icon != null ? "" : "This field is required.";
    }
    if ("price" in fieldValues)
      temp.price =
        fieldValues.price.toString().length != 0
          ? ""
          : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);
  const [addCatagoryService] = useMutation(AddCatagoryService, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) => (
      NotifyMessage({
        message: data.addRoomService.message,
        type: "success",
      }),
      setOpenPopup(false),
      refetch(),
      resetForm()
    ),
    onError: (error) => (
      NotifyMessage({
        message: error.message,
        type: "error",
      }),
      setValues({ ...values, submitting: false })
    ),
  });
  const [updateCatagoryService] = useMutation(UpdateCatagoryService, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) => (
      NotifyMessage({
        message: data.updateCatagoryService.message,
        type: "success",
      }),
      setOpenPopup(false),
      refetch(),
      resetForm()
    ),
    onError: (error) => (
      NotifyMessage({
        message: error.message,
        type: "error",
      }),
      setValues({ ...values, submitting: false })
    ),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setValues({ ...values, submitting: true });
      // addOrEdit(values, resetForm);
      if (values.editing == false) {
        await addCatagoryService({
          variables: {
            addRoomServiceRoomServiceInfo: {
              name: values.name,
              description: values.description,
              price: parseFloat(values.price),
              icon: values.icon,
            },
          },
        });
      } else {
        await updateCatagoryService({
          variables: {
            updateCatagoryServiceRoomServiceInfo: {
              name: values.name,
              description: values.description,
              price: parseFloat(values.price),
              icon: typeof values.icon == "string" ? undefined : values.icon,
            },
            updateCatagoryServiceServiceId: recordForEdit.Id,
          },
        });
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={8}>
          <Controls.Input
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Controls.Input
            name="description"
            label="description"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
          />
          <Controls.Input
            label="Price"
            name="price"
            type="number"
            value={`${values.price}`}
            onChange={handleInputChange}
            error={errors.price}
          />
          {values.editing == true ? (
            <div className="flex space-x-3 items-center">
              {" "}
              <img className={classes.icon} src={file} alt={file} />
              <Controls.Button
                color="primary"
                onClick={() => {
                  roomImagePicker.current.click();
                }}
                variant="outlined"
                text="Change icon"
              />
              <input
                label="Icon"
                name="icon"
                type="file"
                hidden
                accept="image/*"
                ref={roomImagePicker}
                onChange={handleInputChange}
                autoFocus={true}
              />
            </div>
          ) : (
            <Controls.Input
              name="icon"
              type="file"
              onChange={handleInputChange}
              error={errors.icon}
              autoFocus={true}
            />
          )}
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

export default CatagoryServiceForm;
