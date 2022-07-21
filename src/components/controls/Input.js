import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const { name, label, value, error = null, onChange, type, ...other } = props;

  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      type={type || "text"}
      onChange={onChange}
      autoFocus
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
