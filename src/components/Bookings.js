import React, { useState } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import useTable from "./useTable";
import Controls from "./controls/Controls";
import { Search } from "@material-ui/icons";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";
import Notification from "./Notification";
import ConfirmCheckOutDialog from "./ConfirmCheckOutDialog";
import Norecords from "./Norecords";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  Select: {
    position: "absolute",
    right: "10px",
    width: "150px",
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
    id: "name",
    label: "Name",
    disableSorting: true,
  },
  { id: "checkin_time", label: "Checkin Time", disableSorting: true },
  { id: "checkout_time", label: "Checkout Time", disableSorting: true },
  { id: "hotel", label: "Hotel", disableSorting: true },
  { id: "checkout", label: "Checkout", disableSorting: true },
  { id: "room_no", label: "Room No", disableSorting: true },
  { id: "floor_no", label: "Floor No", disableSorting: true },
  { id: "roomType.name", label: "Room Type", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

const BookingComponent = ({
  notify,
  setNotify,
  confirmDialog,
  setConfirmDialog,
  handleDateChange,
  location,
  onCheckout,
  Hotels,
  RoomBookings,
  handleChange,
  loading,
}) => {
  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(
    RoomBookings.sort((a, b) =>
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
        const columns = ["fullName", "checkin_time", "checkout_time", "name"];

        if (target.value == "") return items;
        else {
          return items.filter((x) => {
            return columns.some((column) => {
              if (column == "fullName") {
                return x.user[column]
                  .toLowerCase()
                  .includes(target.value.toLowerCase());
              } else if (column == "name") {
                return x.hotel[column]
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
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Bookings"
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
          {location == "admin" && (
            <Select
              defaultValue="all"
              className={classes.Select}
              onChange={handleChange}
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
          )}
        </Toolbar>
        {loading ? (
          <Loading />
        ) : (
          <>
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().length > 0 ? (
                  recordsAfterPagingAndSorting().map((item) => (
                    <TableRow key={item.Id}>
                      <TableCell>{item.user.fullName}</TableCell>
                      <TableCell>
                        {new Date(item.checkin_time).toLocaleString("en-US", {
                          hour12: true,
                        })}
                      </TableCell>
                      <TableCell>
                        <Controls.DatePicker
                          name="checkout_time"
                          label="Checkout"
                          value={new Date(
                            item.checkout_time
                          ).toLocaleString("en-US", { hour12: true })}
                          onChange={handleDateChange(item.Id)}
                          disablePast={new Date().toLocaleString("en-US", {
                            hour12: true,
                          })}
                          disabled={item.checkout == true ? true : false}
                        />
                      </TableCell>
                      <TableCell>{item.hotel.name}</TableCell>
                      <TableCell>
                        {item.checkout == true ? (
                          <Typography
                            variant="subtitle2"
                            className={`${classes.status} ${classes.secondary}`}
                          >
                            Checked out
                          </Typography>
                        ) : (
                          <Typography
                            variant="subtitle2"
                            className={`${classes.status} ${classes.primary}`}
                          >
                            Booked
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{item.room.room_no}</TableCell>
                      <TableCell>{item.room.floor_no}</TableCell>
                      <TableCell>{item.room.roomType.name}</TableCell>

                      <TableCell>
                        <Controls.ActionButton
                          color="primary"
                          title="Checkout"
                          disabled={item.checkout == true ? true : false}
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "Checkout",
                              subTitle: "Thank you for your stay.",
                              onConfirm: () => {
                                onCheckout(item.Id);
                              },
                            });
                          }}
                        >
                          {item.checkout == true ? (
                            <DoneAllOutlinedIcon fontSize="small" />
                          ) : (
                            <CheckOutlinedIcon fontSize="small" />
                          )}
                        </Controls.ActionButton>
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

      <Notification notify={notify} hide setNotify={setNotify} />
      <ConfirmCheckOutDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default BookingComponent;
