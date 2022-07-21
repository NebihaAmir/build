import React from "react";
import {
  Breadcrumbs,
  Typography,
  Grid,
  IconButton,
  makeStyles,
  Link,
  Popover,
  Divider,
} from "@material-ui/core";
import Controls from "./controls/Controls";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { signout } from "../actions/auth";
import { withRouter } from "react-router-dom";
import SellerSignout from "../actions/signout";
import NewSellerSignout from "../actions/newSellerSignout"
const useStyles = makeStyles((theme) => ({
  header: {
    position: "sticky",
    backgroundColor: "transparent",
  },
  subHeader: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "56px",
    padding: "0px 30px 0px 16px",
  },
  headerBreadcrumb: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: theme.spacing(1.4),
    width: "fit-content",
    margin: theme.spacing(1, 1, 1, 4),
  },
}));

const Header = (props) => {
  const {
    handleDrawerToggle,
    toggled,
    history,
    location,
    location: { pathname },
  } = props;
  const { sellerLogout } = SellerSignout();
   const { newSellerLogout } = NewSellerSignout();
  const signOut = () => {
    signout(() => {
      if (location.pathname.includes("/admin")) {
        history.push("/dashboard/admin/signin");
      }
      else if (location.pathname.includes("/newSellers")) {
        newSellerLogout();
      } else {
        sellerLogout();
      }
    });
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  let pathnames = pathname.split("/").filter((x) => x);

  pathnames = pathnames
    .map((path, index) => {
      return {
        name: path,
        routeTo: pathnames.slice(0, index + 1).join("/"),
      };
    })
    .slice(location.pathname.includes("/admin") ? 2 : 1);
  return (
    <div className={classes.header}>
      <Grid container className={`${classes.subHeader}`}>
        <Grid item className="flex items-center justify-center ">
          <IconButton
            color="primary"
            size="medium"
            onClick={handleDrawerToggle}
            className=" focus:outline-none bg-white "
          >
            {toggled ? <ChevronLeftIcon /> : <MenuIcon fontSize="small" />}
          </IconButton>
          {!toggled ? (
            location.pathname.includes("/admin") ? (
              <Link
                onClick={() => history.push("/dashboard/admin")}
                className="cursor-pointer"
              >
                Admin dashboard
              </Link>
            ) : (
              <Link
                onClick={() => history.push("/dashboard")}
                className="cursor-pointer"
              >
                Seller dashboard
              </Link>
            )
          ) : (
            ""
          )}
        </Grid>

        <Grid item>
          <AccountCircleOutlinedIcon
            fontSize="large"
            className="cursor-pointer"
            onClick={handleClick}
          />
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Controls.Button
              variant="outlined"
              text="Logout"
              size="large"
              onClick={signOut}
              color="secondary"
            />
          </Popover>
        </Grid>
      </Grid>
      <div
        className={`${classes.headerBreadcrumb} shadow-lg px-8 py-3 font-light`}
      >
        <Breadcrumbs aria-label="breadcrumb">
          {pathnames.length > 0 ? (
            <Link
              onClick={() =>
                history.push(
                  location.pathname.includes("/admin")
                    ? "/dashboard/admin"
                    : "/dashboard"
                )
              }
            >
              <Typography className="cursor-pointer">Home</Typography>
            </Link>
          ) : (
            <Typography> Home </Typography>
          )}
          {pathnames.map((path, index) => {
            const routeTo = `/${path.routeTo}`;
            path.name = path.name.charAt(0).toUpperCase() + path.name.slice(1);
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Typography key={path.name}>{path.name}</Typography>
            ) : (
              <Link key={path.name} onClick={() => history.push(routeTo)}>
                <Typography className="cursor-pointer" key={path.name}>
                  {path.name}
                </Typography>
              </Link>
            );
          })}
        </Breadcrumbs>
      </div>
    </div>
  );
};
export default withRouter(Header);
