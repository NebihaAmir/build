import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Header from "./Header";
import Sidebar from "./Sidebar";
import clsx from "clsx";

import { withRouter } from "react-router-dom";

const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
  Content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  PageContent: {
    padding: theme.spacing(4, 4, 17, 4),
  },
}));
const Layout = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar open={open} />
      <div
        className={clsx(classes.Content, {
          [classes.contentShift]: open,
        })}
      >
        <Header handleDrawerToggle={handleDrawerToggle} toggled={open} />
        <div
          className={`${classes.PageContent} z-50  h-screen overflow-y-auto bg-gray-100`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Layout);
