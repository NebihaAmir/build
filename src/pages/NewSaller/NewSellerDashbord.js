import Layout from "../../components/Layout";
import NewSeller from "../../components/auth/NewSeller";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper, withStyles,List,ListItem } from "@material-ui/core";
import { isAuth } from "../../actions/auth";
import TextField from "@material-ui/core/TextField";
import { Form } from "../../components/useForm";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { ViewHotels} from "../../graphql/newSellerHotel";
import {
  ActiveBooking,
  TotalReservations,
} from "../../graphql/reservationAndBooking";
import { useQuery } from "@apollo/client";
import { getCookie, userSessionExpired } from "../../actions/auth";
import { TotalHotels } from "../../graphql/hotel";
import { TotalUsers } from "../../graphql/user";
import { useSelector, useDispatch } from "react-redux";
import {
  ViewHotelManagers,
} from "../../graphql/newSellerHotelManager";
import { ViewSellers } from "../../graphql/newSellermanageSeller";

import { useState } from "react";
const DisabledTextField = withStyles({
  root: {
    marginRight: 8,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "black",
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(3),
    overflow: "hidden",
  },
}));
const SellerDashboard = () => {
  const classes = useStyles();
  const Hotels = useSelector((state) => state.hotels);
  const Seller = useSelector((state) => state.sellers);
  const [state, setState] = useState([]);
  const [seller, setSeller] = useState([]);
  const [hotelManager, setHotelManger] = useState([]);
  console.log(Seller.sellers.length);
  useQuery(ViewHotels, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) => setState(data.neSellerViewHotels),
    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  useQuery(ViewHotelManagers, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) => setHotelManger(data.newSellerViewHotelManagers),
    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //ViewHotels
    useQuery(ViewSellers, {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      onCompleted: (data) =>setSeller (data.newSellerViewSellers),
      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    });
  console.log(hotelManager.length);
  return (
    <Layout>
      <NewSeller>
        <Paper className={classes.pageContent}>
          <Typography variant="h2">Welcome, {isAuth().firstName}.</Typography>
          <Form style={{ marginTop: "10px" }}>
            <Grid container className="border" spacing={1}>
              <Grid item xs={12} md={4}>
                <DisabledTextField
                  label="First Name"
                  value={isAuth().firstName}
                  disabled
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <DisabledTextField
                  label="Middle Name"
                  value={isAuth().middleName}
                  disabled
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DisabledTextField
                  label="Last Name"
                  value={isAuth().lastName}
                  disabled
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DisabledTextField
                  label="Phone Number"
                  value={isAuth().phone_no}
                  disabled
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DisabledTextField
                  label="Username"
                  value={isAuth().username}
                  disabled
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Form>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Link to="/dashboard/newSellers/hotelmanager">
                <Card
                  className={classes.root}
                  style={{ backgroundColor: "#225f4f" }}
                >
                  <CardContent>
                    <Typography variant="h1">{hotelManager.length}</Typography>
                    <Typography variant="h5">Hotel Managers</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link to="/dashboard/newSellers/manageNewHotel">
                <Card
                  className={classes.root}
                  style={{ backgroundColor: "#39f" }}
                >
                  <CardContent>
                    <Typography variant="h1">{state.length}</Typography>
                    <Typography variant="h5">Hotels</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link to="/dashboard/newSellers/Reservations">
                <Card
                  className={classes.root}
                  style={{ backgroundColor: "#f9b115" }}
                >
                  <CardContent>
                    <Typography variant="h1">{seller.length}</Typography>
                    <Typography variant="h5">Reception</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </NewSeller>
    </Layout>
  );
};

export default SellerDashboard;
