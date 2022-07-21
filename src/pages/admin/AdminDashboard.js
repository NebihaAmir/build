import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import { Grid } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { TotalHotels } from "../../graphql/hotel";
import { TotalUsers } from "../../graphql/user";
import {
  ActiveBooking,
  TotalReservations,
} from "../../graphql/reservationAndBooking";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    color: "white",
    flexDirection: "column",
    textAlign: "center",
    maxHeight: "150px",
  },
});

const AdminDashboard = () => {
  const classes = useStyles();
  return (
    // layout wrapper
    <Layout>
      {/* wrapper to check if the admin logged in or not  */}
      <Admin>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Link to="/dashboard/admin/users">
              <Card
                className={classes.root}
                style={{ backgroundColor: "#225f4f" }}
              >
                <CardContent>
                  <Typography variant="h1">
                    {useQuery(TotalUsers).data?.totalUsers.total}
                  </Typography>
                  <Typography variant="h5">Users</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link to="/dashboard/admin/hotels">
              <Card
                className={classes.root}
                style={{ backgroundColor: "#39f" }}
              >
                <CardContent>
                  <Typography variant="h1">
                    {useQuery(TotalHotels).data?.totalHotels.total}
                  </Typography>
                  <Typography variant="h5">Hotels</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link to="/dashboard/admin/reservations">
              <Card
                className={classes.root}
                style={{ backgroundColor: "#f9b115" }}
              >
                <CardContent>
                  <Typography variant="h1">
                    {useQuery(TotalReservations).data?.totalReservations.total}
                  </Typography>
                  <Typography variant="h5">Reservations</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link to="/dashboard/admin/bookings">
              <Card
                className={classes.root}
                style={{ backgroundColor: "#f83245" }}
              >
                <CardContent>
                  <Typography variant="h1">
                    {useQuery(ActiveBooking).data?.activeBookings.total}
                  </Typography>
                  <Typography variant="h5">Bookings</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </Admin>
    </Layout>
  );
};

export default AdminDashboard;
