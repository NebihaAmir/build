import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../controls/Controls";
import { Form, useForm } from "../../useForm";
const initialFValues = {
  name: "",
  description: "",
  editing: false,
  image: null,
};
const HotelServiceForm = (props) => {
  const { recordForEdit, addOrEditService } = props;
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("description" in fieldValues)
      temp.description =
        fieldValues.description.length != 0 ? "" : "This field is required.";
    if ("name" in fieldValues)
      temp.name = fieldValues.name.length != 0 ? "" : "This field is required.";
    if (values.editing == false) {
      if ("image" in fieldValues)
        temp.image = fieldValues.image != null ? "" : "This field is required.";
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
      addOrEditService(values, resetForm);
    }
  };
  return (
    <Form>
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
            label="Description"
            name="description"
            multiline
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
          />
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

        <Grid item xs>
          <div>
            <Controls.Button
              onClick={handleSubmit}
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
              
            />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default HotelServiceForm;
