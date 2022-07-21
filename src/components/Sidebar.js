import React from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import SidebarRow from "./SidebarRow";
import { Link, withRouter } from "react-router-dom";
import FormatListBulletedRoundedIcon from "@material-ui/icons/FormatListBulletedRounded";
import FormatAlignLeft from "@material-ui/icons/FormatAlignLeft";
import logo from "../Logos/Alga-logo.png";
import { isAuth } from "../actions/auth";
const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  sidebarHeader: {
    height: "56px",
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.dark,
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 5px 10px rgba(0,0,0,0.3)",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  logo: {
    margin: "0px 10px",
    height: "45px",
  },
  borderR: {
    borderRight: "none",
  },
}));

const SideMenu = ({ open, location, history }) => {
  const classes = useStyles();
  const icons = [
    "Hotel",
    "Frontdesk",
    "RoomServiceOutlinedIcon",
    "PersonOutlineOutlinedIcon",
    "Reservation",
    "Booking",
  ];
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paperAnchorDockedLeft: classes.borderR,
        paper: classes.drawerPaper,
      }}
    >
      <div>
        <div className={`z-50 ${classes.sidebarHeader}`}>
          <Link
            onClick={() =>
              history.push(
                location.pathname.includes("/admin")
                  ? "/dashboard/admin"
                  : "/dashboard"
              )
            }
          >
            <img src={logo} className={classes.logo} alt={"logo"} />
          </Link>
          {location.pathname.includes("/newSellers") ? (
            <Link
              onClick={() => history.push("/dashboard/newSellers")}
              className="cursor-pointer"
            >
              Sales Dashboard
            </Link>
          ) : (
            <div>
              {location.pathname.includes("/admin") ? (
                <Link
                  onClick={() => history.push("/dashboard/admin")}
                  className="cursor-pointer"
                >
                  Admin dashboard
                </Link>
              ) : (
                <div>
                  {isAuth() && isAuth().role == 2 ? (
                    <Link
                      onClick={() => history.push("/dashboard")}
                      className="cursor-pointer"
                    >
                      Reception dashboard
                    </Link>
                  ) : (
                    <Link
                      onClick={() => history.push("/dashboard")}
                      className="cursor-pointer"
                    >
                      HotelMnager dashboard
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          {location.pathname.includes("/admin") ? (
            <>
              {" "}
              <SidebarRow
                icon={<FormatAlignLeft />}
                title="Home"
                path="/dashboard/admin"
              />
              <SidebarRow
                icon={<FormatAlignLeft />}
                title="Hotel Detail"
                collapse={true}
                childs={[
                  { name: "Manage Hotels", path: "/dashboard/admin/hotels" },
                  {
                    name: "Hotel Report",
                    path: "/dashboard/admin/hotels/report",
                  },
                ]}
              />
              <SidebarRow
                icon={<FormatAlignLeft />}
                title="Hotel Managers"
                path="/dashboard/admin/hotelmanagers"
              />
              <SidebarRow
                icon={<FormatAlignLeft />}
                title="Manage Reception"
                path="/dashboard/admin/resevtionst"
              />
              {isAuth() && isAuth().role == 1 && (
                <>
                  <SidebarRow
                    icon={<FormatAlignLeft />}
                    title="Mange Sales"
                    path="/dashboard/admin/sellers"
                  />
                  <SidebarRow
                    icon={<FormatAlignLeft />}
                    title="Room Services"
                    path="/dashboard/admin/services"
                  />
                  <SidebarRow
                    icon={<FormatAlignLeft />}
                    title="Staged Reservations"
                    path="/dashboard/admin/stagedreservations"
                  />
                  <SidebarRow
                    icon={<FormatAlignLeft />}
                    title="User Detail"
                    collapse={true}
                    childs={[
                      { name: "Manage User", path: "/dashboard/admin/users" },
                      {
                        name: "User Report",
                        path: "/dashboard/admin/users/report",
                      },
                    ]}
                  />
                  <SidebarRow
                    icon={<FormatAlignLeft />}
                    title="Reservations"
                    path="/dashboard/admin/reservations"
                  />
                  <SidebarRow
                    icon={<FormatAlignLeft />}
                    title="Bookings"
                    path="/dashboard/admin/bookings"
                  />
                  <SidebarRow
                    icon={<FormatAlignLeft />}
                    title="Rooms"
                    path="/dashboard/admin/rooms"
                  />
                </>
              )}
            </>
          ) : (
            <>
              {location.pathname.includes("/newSellers") ? (
                <div>
                  <SidebarRow
                    icon={<FormatListBulletedRoundedIcon />}
                    title="Home"
                    path="/dashboard/newSellers"
                  />
                  <SidebarRow
                    icon={<FormatAlignLeft />}
                    title="Manage Hotel"
                    path="/dashboard/newSellers/manageNewHotel"
                  />

                  <SidebarRow
                    icon={<FormatAlignLeft />}
                    title=" Hotel Manager"
                    path="/dashboard/newSellers/hotelmanager"
                  />
                  <SidebarRow
                    icon={<FormatAlignLeft />}
                    title="Manage Reception"
                    path="/dashboard/newSellers/Reservations"
                  />
                </div>
              ) : (
                <div>
                  <SidebarRow
                    icon={<FormatListBulletedRoundedIcon />}
                    title="Home"
                    path="/dashboard"
                  />
                  {isAuth() && isAuth().role == 4 && (
                    <div>
                      <SidebarRow
                        icon={<FormatListBulletedRoundedIcon />}
                        title="Manager Sellers"
                        path="/dashboard/managesellers"
                      />
                      <SidebarRow
                        icon={<FormatListBulletedRoundedIcon />}
                        title="Manage Hotel"
                        path="/dashboard/managehotel"
                      />
                    </div>
                  )}
                  <SidebarRow
                    icon={<FormatListBulletedRoundedIcon />}
                    title="Reservations"
                    path="/dashboard/reservations"
                  />
                  <SidebarRow
                    icon={<FormatListBulletedRoundedIcon />}
                    title="Staged Reservations"
                    path="/dashboard/stagedreservations"
                  />
                  <SidebarRow
                    icon={<FormatListBulletedRoundedIcon />}
                    title="Bookings"
                    path="/dashboard/bookings"
                  />
                  <SidebarRow
                    icon={<FormatListBulletedRoundedIcon />}
                    title="Rooms"
                    path="/dashboard/rooms"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default withRouter(SideMenu);
