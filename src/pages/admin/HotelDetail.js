import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import { ViewHotels, DeleteHotel } from "../../graphql/newSellerHotel";
import SellersDetial from "./SellersDetial";
import {
  AddSeller,
  DeleteSeller,
  updateNewSellerInfo,
  viewNewSellers,
} from "../../graphql/newSaller";
import { getSellers } from "../../redux/actions/SellerActions";

import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import useTable from "../../components/useTable";

import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MeetingRoomOutlinedIcon from "@material-ui/icons/MeetingRoomOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

import { getCookie, userSessionExpired } from "../../actions/auth";
import Layout from "../../components/Layout";
import { useHistory } from "react-router-dom";
import SellersForm from "../../components/admin/form/NewSallersForm";
import SellerLog from "../../components/admin/SellerLog";
import Admin from "../../components/auth/Admin";
import Norecords from "../../components/Norecords";
import Loading from "../../components/Loading";
import Notify from "../../components/Notify";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
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
  },
}));

const headCells = [
  {
    id: "name",
    label: "Name",
  },
  { id: "star", label: "star" },
  { id: "phone_no", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "wereda", label: "Wereda" },
  { id: "city", label: "City" },
  { id: "state", label: "State" },

];

const HotelDetail = ({hotel}) => {
  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(
      hotel.sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
      ),
      headCells,
      filterFn
    );
  return (
    <Paper className={classes.pageContent}>
      <>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow
                onClick={() => {
                  handleSellerDetail(item.Id, item);
                }}
                key={item.Id}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.star}</TableCell>
                <TableCell>{item.phone_no}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.location.wereda}</TableCell>
                <TableCell>{item.location.city}</TableCell>
                <TableCell>{item.location.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </>
    </Paper>
  );
};

export default HotelDetail;
