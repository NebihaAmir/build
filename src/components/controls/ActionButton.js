import React from "react";
import { Button, makeStyles } from "@material-ui/core";

import Tooltip from "@material-ui/core/Tooltip";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
  },
  secondary: {
    backgroundColor: theme.palette.secondary.light,
    "& .MuiButton-label": {
      color: theme.palette.secondary.main,
    },
  },
  primary: {
    backgroundColor: theme.palette.primary.light,
    "& .MuiButton-label": {
      color: theme.palette.primary.main,
    },
  },
}));

export default function ActionButton(props) {
  const { color, children, onClick, disabled, title = "add" } = props;

  const classes = useStyles();

  return (
    <Tooltip title={title} aria-label="add">
      <Button
        className={`${classes.root} ${classes[color]}`}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
    </Tooltip>
  );
}
