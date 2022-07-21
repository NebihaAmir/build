import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import { Booking } from "../../graphql/reservationAndBooking";
import { useQuery } from "@apollo/client";
import {
  AppBar,
  Box,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import Loading from "../../components/Loading";
import { getBookings } from "../../redux/actions/BookingActions";
import DailyReports from "../../components/admin/reports/DailyReports";
import WeeklyReports from "../../components/admin/reports/WeeklyReports";
import MonthlyReports from "../../components/admin/reports/MonthlyReports";
import YearlyReports from "../../components/admin/reports/YearlyReports";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(3),
    position: "relative",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "75%",
  },
  Select: {
    position: "absolute",
    right: "10px",
    width: "150px",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} paddingLeft={0} paddingRight={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const HotelReports = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const Bookings = useSelector((state) => state.bookings);
  let { bookings } = Bookings;
  const [RoomBookings, setBookings] = useState([]);
  const { loading } = useQuery(Booking, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) => dispatch(getBookings(data.bookings)),
    onError: (error) => dispatch(getBookings(error)),
  });

  let Hotels = [
    ...new Map(
      bookings
        .map((book) => {
          return { name: book.hotel.name, Id: book.hotel.Id };
        })
        .map((item) => [item.name, item])
    ).values(),
  ].sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const filter = (Id) => {
    if (Id == "all") {
      setBookings(bookings);
      return;
    }
    const filteredData = bookings.filter((item) => {
      return item.hotel.Id == Id;
    });
    setBookings(filteredData);
  };
  useEffect(() => {
    filter("all");
  }, [bookings]);
  const handleHotelChange = (e) => {
    filter(e.target.value);
  };
  return (
    // 
    <Layout>
      <Admin>
        <Paper className={classes.pageContent}>
          <div>
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="Daily" {...a11yProps(0)} />
                  <Tab label="Weekly" {...a11yProps(1)} />
                  <Tab label="Monthly" {...a11yProps(2)} />
                  <Tab label="Yearly" {...a11yProps(3)} />
                </Tabs>
                <Select
                  defaultValue="all"
                  className={classes.Select}
                  onChange={handleHotelChange}
                  name="hotelId"
                  variant="outlined"
                >
                
                  <MenuItem value="all">All Hotels</MenuItem>
                  {Hotels.map((item) => (
                    <MenuItem key={item.Id} value={item.Id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </AppBar>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <>
                <TabPanel value={value} index={0}>
                  <DailyReports report={RoomBookings} title="Bookings" />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <WeeklyReports report={RoomBookings} title="Bookings" />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <MonthlyReports report={RoomBookings} title="Bookings" />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <YearlyReports report={RoomBookings} title="Bookings" />
                </TabPanel>
              </>
            )}
          </div>
        </Paper>
      </Admin>
    </Layout>
  );
};

export default HotelReports;
