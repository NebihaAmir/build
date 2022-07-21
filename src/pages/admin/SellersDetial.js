import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/client";
import { ViewSellerHotels } from "../../graphql/hotel";
import Notify from "../../components/Notify";
import { getCookie} from "../../actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper, withStyles, List, ListItem } from "@material-ui/core";
import { isAuth } from "../../actions/auth";
import TextField from "@material-ui/core/TextField";
import { Form } from "../../components/useForm";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Popup from "../../components/Popup";
import HotelDetail from './HotelDetail'
import ButtonBase from "@material-ui/core/ButtonBase";
import ResevtionDetaile  from './ResevtionDetail'
import ManagerDetail from './ManagerDetail';
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import {
  ViewSellersForSeller,
  ViewResievtionForSeller,
} from "../../graphql/seller";
import { concatPagination } from '@apollo/client/utilities';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
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
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(1),
  },
  dialogTitle: {
    paddingRight: "0px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));
function SellersDetial({ID,user,setOpenPopup}) {
    const classes = useStyles();
const[data,setData]=useState();
  const { NotifyMessage, notify, setNotify } = Notify();
  const [state, setState] = React.useState([]);
  const [manager, setManager] = React.useState([]);
  console.log(manager)
  console.log(state)
  const [reservations, setReservation] = React.useState([]);
  const { refetch, loading } = useQuery(ViewSellerHotels, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    variables: { sellerId: ID },
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) => setState(data.viewSellerHotels),
    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const { fe, lo } = useQuery(ViewSellersForSeller, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    variables: { sellerId: ID },
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) => setManager(data.viewSellersForSeller),
    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
   const { f, l } = useQuery(ViewResievtionForSeller, {
     fetchPolicy: "cache-and-network",
     nextFetchPolicy: "cache-and-network",
     variables: { sellerId: ID },
     context: {
       headers: {
         Authorization: `Bearer ${getCookie("token")}`,
       },
     },
     onCompleted: (data) => setReservation(data.viewSellerResevition),
     onError: (error) =>
       NotifyMessage({ message: error.message, type: "error" }),
   });
  React.useEffect(() => {
  setData(user)
  }, []);
  const [open, setOpen] = React.useState(false);
  const hotelHandle=()=>{
    setOpen(true)
  }
  const[openRe,setRe]=React.useState(false)
    const reservationHand = () => {
      setRe(true)
    };
    const[mangerOpen,setManagerOpen]=React.useState(false)
      const managerHand = () => {
        setManagerOpen(true)
      };
  return (
    <div>
      <Paper className={classes.pageContent}>
        <Form>
          <Grid container className="border" spacing={1}>
            <Grid item xs={12} md={4}>
              <DisabledTextField
                label="First Name"
                value={user.firstName}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DisabledTextField
                label="Middle Name"
                value={user.middleName}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DisabledTextField
                label="Last Name"
                value={user.lastName}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DisabledTextField
                label="Phone Number"
                value={user.phone_no}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DisabledTextField
                label="Username"
                value={user.username}
                disabled
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Form>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card
              className={classes.root}
              style={{ backgroundColor: "#225f4f" }}
            >
              <ButtonBase onClick={managerHand}>
                <CardContent>
                  <Typography variant="h1">{manager.length}</Typography>
                  <Typography variant="h5">Hotel Managers</Typography>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.root} style={{ backgroundColor: "#39f" }}>
              <ButtonBase onClick={hotelHandle}>
                <CardContent>
                  <Typography variant="h1">{state.length}</Typography>
                  <Typography variant="h5">Hotels</Typography>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card
              className={classes.root}
              style={{ backgroundColor: "#f9b115" }}
            >
              <ButtonBase onClick={reservationHand}>
                <CardContent>
                  <Typography variant="h1">{reservations.length}</Typography>
                  <Typography variant="h5">Reception</Typography>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
        </Grid>
        <Popup title="Hotel Detail" openPopup={open} setOpenPopup={setOpen}>
          <HotelDetail hotel={state} setOpenPopup={setOpen} />
        </Popup>
        <Popup title="Resevtion Detail" openPopup={openRe} setOpenPopup={setRe}>
          <ResevtionDetaile reservations={reservations} setOpenPopup={setRe} />
        </Popup>
        <Popup
          title="Hotel Manager Detail"
          openPopup={mangerOpen}
          setOpenPopup={setManagerOpen}
        >
          <ManagerDetail manager={manager} setOpenPopup={setManagerOpen} />
        </Popup>
      </Paper>
    </div>
  );
}

export default SellersDetial