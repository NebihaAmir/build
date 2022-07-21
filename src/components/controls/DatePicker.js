import React from "react";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {
  const { name, value, label, onChange, disablePast, disabled } = props;

  const startDate = new Date();
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        value={value}
        color="primary"
        label={label}
        format="dd-MM-yyyy hh:mm a"
        disablePast={disabled ? undefined : disablePast}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        disabled={disabled ? true : false}
      />
    </MuiPickersUtilsProvider>
  );
}
