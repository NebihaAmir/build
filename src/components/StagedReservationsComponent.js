import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useState } from "react";
import Admin from "./auth/Admin";
import Controls from "./controls/Controls";
import Layout from "./Layout";
import Loading from "./Loading";
import Norecords from "./Norecords";
import useTable from "./useTable";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  status: {
    color: "white",
    borderRadius: "8px",
    padding: "3px 10px",
    display: "inline-block",
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    whiteSpace: "nowrap",
  },
}));

const headCells = [
  {
    id: "fullName",
    label: "Full name",
    disableSorting: true,
  },
  { id: "hotel", label: "Hotel", disableSorting: true },
  { id: "checkin_time", label: "Checkin Time", disableSorting: true },
  { id: "checkout_time", label: "Checkout Time", disableSorting: true },
  { id: "paymentMethod", label: "Payment Method", disableSorting: true },
  { id: "decision", label: "Status", disableSorting: true },
  { id: "room_no", label: "Room No", disableSorting: true },
  { id: "floor_no", label: "Floor No", disableSorting: true },
  { id: "createdAt", label: "Created At", disableSorting: true },
];

const StagedReservationsComponent = ({ StagedReservations, loading }) => {
  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(
      Array.from(StagedReservations).sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
      ),
      headCells,
      filterFn
    );
  const handleSearch = (e) => {
    e.target.value = e.target.value.trimLeft();

    let target = e.target;
    setFilterFn({
      fn: (items) => {
        const columns = [
          "fullName",
          "name",
          "decision",
          "paymentMethod",
          "checkin_time",
          "checkout_time",
          "room_no",
          "floor_no",
        ];

        if (target.value == "") return items;
        else {
          return items.filter((x) => {
            return columns.some((column) => {
              if (column == "name") {
                return x.hotel[column]
                  .toLowerCase()
                  .includes(target.value.toLowerCase());
              } else if (column == "fullName") {
                return x.user[column]
                  .toLowerCase()
                  .includes(target.value.toLowerCase());
              } else if (column == "room_no" || column == "floor_no") {
                return x.room[column]
                  .toString()
                  .toLowerCase()
                  .includes(target.value.toLowerCase());
              } else {
                return x[column]
                  .toString()
                  .toLowerCase()
                  .includes(target.value.toLowerCase());
              }
            });
          });
        }
      },
    });
  };
  return (
   
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search Reservations"
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
          </Toolbar>
          {loading ? (
            <Loading />
          ) : (
            <>
              {" "}
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().length > 0 ? (
                    recordsAfterPagingAndSorting().map((item) => (
                      <TableRow key={item.Id}>
                        <TableCell>{item.user.fullName}</TableCell>
                        <TableCell>{item.hotel.name}</TableCell>
                        <TableCell>
                          {new Date(item.checkin_time).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {new Date(item.checkout_time).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {
                            <Typography
                              variant="subtitle2"
                              className={`${classes.status} ${classes.primary}`}
                            >
                              {item.paymentMethod}
                            </Typography>
                          }
                        </TableCell>
                        <TableCell>
                          {item.decision == "Pending" ? (
                            <Typography variant="subtitle2">
                              {item.decision}
                            </Typography>
                          ) : item.decision == "Accepted" ? (
                            <Typography
                              variant="subtitle2"
                              className={`${classes.status} ${classes.primary}`}
                            >
                              {item.decision}
                            </Typography>
                          ) : (
                            <Typography
                              variant="subtitle2"
                              className={`${classes.status} ${classes.secondary}`}
                            >
                              {item.decision}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>{item.room.room_no}</TableCell>
                        <TableCell>{item.room.floor_no}</TableCell>

                        <TableCell>
                          {new Date(item.createdAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Norecords col={9} />
                  )}
                </TableBody>
              </TblContainer>
              <TblPagination />
            </>
          )}
        </Paper>
     
  );
};

export default StagedReservationsComponent;
