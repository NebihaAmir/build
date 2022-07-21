import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

export default function Select(props) {
  const {
    name,
    label,
    value,
    error = null,
    disabled,
    onChange,
    options,
  } = props;

  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        disabled={disabled ? true : false}
        value={value}
        onChange={onChange}
      >
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.Id} value={item.Id}>
            {item.name}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
