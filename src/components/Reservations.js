import React, { useEffect, useRef, useState } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  MenuItem,
  Select,
} from "@material-ui/core";

import TurnedInNotOutlinedIcon from "@material-ui/icons/TurnedInNotOutlined";
import useTable from "./useTable";
import Controls from "./controls/Controls";
import { Search } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import Notification from "./Notification";
import ConfirmDialog from "./ConfirmDialog";
import Popup from "./Popup";
import Norecords from "./Norecords";
import Loading from "./Loading";
import { useHistory } from "react-router-dom";
import PaymentMethods from "./PaymentMethods";
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
}));
const headCells = [
  {
    id: "name",
    label: "Name",
  },
  { id: "checkin_time", label: "Checkin Time" },
  { id: "checkout_time", label: "Checkout Time" },
  { id: "createdAt", label: "Created At" },
  { id: "hotel", label: "Hotel", disableSorting: true },
  { id: "room_no", label: "Room No", disableSorting: true },
  { id: "floor_no", label: "Floor No", disableSorting: true },

  { id: "actions", label: "Actions", disableSorting: true },
];
const ReservationsComponent = ({
  RoomReservations,
  notify,
  setNotify,
  confirmDialog,
  setConfirmDialog,
  onDelete,
  handleChange,
  Hotels,
  location,
  onBook,
  setPopup,
  setOpenPopup,
  loading,
  NotifyMessage,
  bookUsingCash,
}) => {
  const history = useHistory();
  let decision = useRef(null);
  let price = useRef(null);
  let reservationId = useRef(null);

  useEffect(() => {
    if (history.location.search) {
      const response = history.location.search.split("&").map((data) => {
        if (data.split("=")) {
          return { name: data.split("=")[0], value: data.split("=")[1] };
        }
      });

      decision.current = response.find((x) => x.name === "decision");
      price.current = response.find((x) => x.name === "req_amount");
      reservationId.current = response.find(
        (x) => x.name === "req_transaction_uuid"
      );

      history.replace(history.location.pathname, null);
      checkResponse(decision.current, price.current, reservationId.current);
    }
  }, []);
  const checkResponse = (decision, price, reservationId) => {
    if (decision.value == "ACCEPT") {
      onBook({ Id: reservationId.value, price: price.value });
    } else if (decision.value == "CANCEL") {
      NotifyMessage({
        message: "The transaction process has been canceled.",
        type: "success",
      });
    } else {
      NotifyMessage({ message: "Something went wrong.", type: "error" });
    }
  };
  const classes = useStyles();

  const [record, setRecord] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(
      RoomReservations.sort((a, b) =>
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
          "checkin_time",
          "checkout_time",
          "name",
          "room_no",
          "floor_no",
        ];

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
    <>
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
                        {new Date(item.checkin_time).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(item.checkout_time).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(item.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>{item.hotel.name}</TableCell>
                      <TableCell>{item.room.room_no}</TableCell>
                      <TableCell>{item.room.floor_no}</TableCell>

                      <TableCell>
                        <Controls.ActionButton
                          title="Book"
                          color="primary"
                          onClick={() => {
                            setOpenPopup(true);
                            setRecord(item);
                          }}
                        >
                          <TurnedInNotOutlinedIcon fontSize="small" />
                        </Controls.ActionButton>
                        <Controls.ActionButton
                          color="secondary"
                          title="Delete"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "Are you sure to delete this reservation?",
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                onDelete(item.Id);
                              },
                            });
                          }}
                        >
                          <DeleteIcon fontSize="small" />
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
        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <Popup
          title="Payment Methods"
          openPopup={setPopup}
          setOpenPopup={setOpenPopup}
        >
          <PaymentMethods
            record={record}
            setOpenPopup={setOpenPopup}
            bookUsingCash={bookUsingCash}
          />
        </Popup>
      </Paper>
    </>
  );
};

export default ReservationsComponent;
