import { Grid, InputLabel, TextField } from "@material-ui/core";
import Controls from "../controls/Controls";
import { Form } from "../useForm";

const VisaAndMasterCardConfirm = ({ PaymentInfo }) => {
  return (
    <Form
      action="https://testsecureacceptance.cybersource.com/pay"
      method="post"
    >
      <input
        type="hidden"
        variant="outlined"
        name="access_key"
        value={PaymentInfo.access_key}
      />

      <div className="flex items-center">
        <Grid item xs={6}>
          <InputLabel style={{ color: "black" }}>First Name :</InputLabel>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="bill_to_forename"
            value={PaymentInfo.bill_to_forename}
          />
        </Grid>
      </div>
      <div container className="flex items-center ">
        <Grid item xs={6}>
          <InputLabel style={{ color: "black" }}>Last Name :</InputLabel>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="bill_to_surname"
            value={PaymentInfo.bill_to_surname}
          />
        </Grid>
      </div>

      <div className="flex items-center">
        <Grid item xs={6}>
          <InputLabel style={{ color: "black" }}>Amount :</InputLabel>
        </Grid>
        <Grid item xs={6}>
          <TextField type="number" name="amount" value={PaymentInfo.amount} />
        </Grid>
      </div>
      <div className="flex items-center">
        <Grid item xs={6}>
          <InputLabel style={{ color: "black" }}>Currency :</InputLabel>
        </Grid>
        <Grid item xs={6}>
          <TextField name="currency" value={PaymentInfo.currency} />
        </Grid>
      </div>

      <input hidden name="payment_method" value={PaymentInfo.payment_method} />
      <input hidden name="locale" value={PaymentInfo.locale} />

      <input hidden name="profile_id" value={PaymentInfo.profile_id} />
      <input
        hidden
        name="transaction_uuid"
        value={PaymentInfo.transaction_uuid}
      />
      <input
        hidden
        name="signed_field_names"
        value={PaymentInfo.signed_field_names}
      />
      <input
        hidden
        name="unsigned_field_names"
        value={PaymentInfo.unsigned_field_names}
      />
      <input
        hidden
        name="signed_date_time"
        value={PaymentInfo.signed_date_time}
      />
      <input
        hidden
        name="transaction_type"
        value={PaymentInfo.transaction_type}
      />
      <input
        hidden
        name="reference_number"
        value={PaymentInfo.reference_number}
      />

      <input hidden name="bill_to_email" value={PaymentInfo.bill_to_email} />
      <input
        hidden
        name="bill_to_address_postal_code"
        value={PaymentInfo.bill_to_address_postal_code}
      />
      <input hidden name="bill_to_phone" value={PaymentInfo.bill_to_phone} />
      <input hidden name="card_type" value={PaymentInfo.card_type} />

      <input hidden name="signature" value={PaymentInfo.signature} />

      <Controls.Button type="submit" text="Confirm" />
    </Form>
  );
};

export default VisaAndMasterCardConfirm
