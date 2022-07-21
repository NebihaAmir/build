import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";

import { useQuery } from "@apollo/client";
import {
  AppBar,
  Box,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import Loading from "../../components/Loading";

import DailyReports from "../../components/admin/reports/DailyReports";
import WeeklyReports from "../../components/admin/reports/WeeklyReports";
import MonthlyReports from "../../components/admin/reports/MonthlyReports";
import YearlyReports from "../../components/admin/reports/YearlyReports";
import { ViewUsers } from "../../graphql/user";
import { getUsers } from "../../redux/actions/UserActions";

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

const UserReports = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const Users = useSelector((state) => state.users);
  let { users } = Users;
  const { loading } = useQuery(ViewUsers, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) => dispatch(getUsers(data)),
    onError: (error) => dispatch(getUsers(error)),
  });
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
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
              </AppBar>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <>
                {" "}
                <TabPanel value={value} index={0}>
                  <DailyReports report={users} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <WeeklyReports report={users} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <MonthlyReports report={users} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <YearlyReports report={users} />
                </TabPanel>
              </>
            )}
          </div>
        </Paper>
      </Admin>
    </Layout>
  );
};
function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{`${label}:00 - ${label}:59`}</h4>
        <p>{payload && payload[0].value} Bookings</p>
      </div>
    );
  }
  return null;
}
export default UserReports;
