import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import { HotelManagerViewHotels, DeleteHotel } from "../../graphql/hotel";
import { getHotels } from "../../redux/actions/HotelActions";
import HotelForm from "../../components/admin/form/HotelForm";
import HotelUpdateForm from "../../components/admin/form/hotemManagerUpdateHotelForm";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import useTable from "../../components/useTable";

import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

import { getCookie } from "../../actions/auth";
import Layout from "../../components/Layout";
import { useHistory } from "react-router-dom";
import Seller from "../../components/auth/Seller";
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
  { id: "actions", label: "Actions", disableSorting: true },
];

const ManageHotel = () => {
const[hotle,setHotel]=useState([])
  const classes = useStyles();
  const dispatch = useDispatch();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [openUpdatePopup, setUpdateOpenPopup] = useState(false);
  const { NotifyMessage, notify, setNotify } = Notify();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const { refetch, loading } = useQuery(HotelManagerViewHotels, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) => setHotel(data.hotelManagerViewHotels),
    onError: (error) => dispatch(getHotels(error)),
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(
      hotle.sort((a, b) =>
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
          "name",
          "star",
          "phone_no",
          "state",
          "city",
          "wereda",
          "email",
        ];

        if (target.value == "") return items;
        else {
          return items.filter((x) => {
            return columns.some((column) => {
              if (column == "state" || column == "city" || column == "wereda") {
                return x.location[column]
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

  const openInPopup = (item) => {
    setRecordForEdit({ ...item, editing: true });
    setUpdateOpenPopup(true);
  };
 
  return (
    <Layout>
    
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search Hotel"
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
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.star}</TableCell>
                        <TableCell>{item.phone_no}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.location.wereda}</TableCell>
                        <TableCell>{item.location.city}</TableCell>
                        <TableCell>{item.location.state}</TableCell>
                        <TableCell>
                          <Controls.ActionButton
                            color="primary"
                            title="Update"
                            onClick={() => {
                              setRecordForEdit(item);
                              openInPopup(item);
                            }}
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </Controls.ActionButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Norecords col={8} />
                  )}
                </TableBody>
              </TblContainer>
              <TblPagination />
            </>
          )}
        </Paper>
        <Popup
          title="Add Hotel"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <HotelForm
            refetch={refetch}
            setOpenPopup={setOpenPopup}
            NotifyMessage={NotifyMessage}
          />
        </Popup>

        <Popup
          title="Update Hotel"
          openPopup={openUpdatePopup}
          setOpenPopup={setUpdateOpenPopup}
        >
          <HotelUpdateForm
            recordForEdit={recordForEdit}
            refetch={refetch}
            setOpenPopup={setUpdateOpenPopup}
            NotifyMessage={NotifyMessage}
          />
        </Popup>
        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      
    </Layout>
  );
};

export default ManageHotel;
