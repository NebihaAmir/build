import { useMutation } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { AdminBookUsingCash } from "../../graphql/reservationAndBooking";
import Controls from "../controls/Controls";
import BookingForm from "../form/BookingForm";
import Notify from "../Notify";
import { Form, useForm } from "../useForm";

const PayInCash = ({record,bookUsingCash}) => {
const validate = (fieldValues = values) => {
  let temp = { ...errors };
  if ("price" in fieldValues)
    temp.price = fieldValues.price.length != 0 ? "" : "This field is required.";

  setErrors({
    ...temp,
  });

  if (fieldValues == values) return Object.values(temp).every((x) => x == "");
};
const { values, setValues, errors, setErrors, handleInputChange } = useForm(
  { ...record, price: "" },
  true,
  validate
);
const handleSubmit = async(e) => {
  e.preventDefault();

  if (validate()) {
     setValues({ ...values, submitting: true });
      await bookUsingCash({
       variables: { reservationId: values.Id, price: parseInt(values.price) },
      });
  }
};
    return (
      <Form onSubmit={handleSubmit}>
        <BookingForm values={record} handleInputChange={handleInputChange} errors={errors} />
        <Grid item xs={12}>
          <Controls.Button type="submit" text="Book" />
        </Grid>
      </Form>
    );
}

export default PayInCash
