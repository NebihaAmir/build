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
  name: {
    "&:hover": {
      color: "#318972",
      fontSize:15
    },
  },
}));

const headCells = [
  {
    id: "fullName",
    label: "Full Name",
  },
  { id: "username", label: "Username" },
  { id: "phone_no", label: "Phone" },
  { id: "status", label: "Status", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];
const ManageSellers = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const Sellers = useSelector((state) => state.sellers);

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [sellerLog, setSellerLog] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);

  const [openLogPopup, setLogPopup] = useState(false);
  const { NotifyMessage, notify, setNotify } = Notify();

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  console.log(viewNewSellers)
  const[sellerss,setSeller]=useState([])
  const { refetch, loading } = useQuery(viewNewSellers, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) => setSeller(data.viewNewSellers),
    onError: (error) => dispatch(getSellers(error)),
  });

  const [addSeller] = useMutation(AddSeller, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) => {
      NotifyMessage({
        message: data.addNewSeller.message,
        type: "success",
        hide: false,
      });
      refetch();
      // resetForm();
   //   setOpenPopup(false);
    },

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [deleteSeller] = useMutation(DeleteSeller, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.deleteNewSeller.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });

  const [updateSellerInfo] = useMutation(updateNewSellerInfo, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) => {
      NotifyMessage({
        message: data.updateNewSellerInfo.message,
        type: "success",
      });
      refetch();
      setOpenPopup(false);
    },
    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  let { sellers } = Sellers;
  console.log(sellerss)
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(
     [... sellerss].sort((a, b) =>
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
        const columns = ["fullName","username","phone_no"];

        if (target.value == "") return items;
        else {
          return items.filter((x) => {
            return columns.some((column) => {
              if (column == "username") {
                return x[column].username
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

  const addOrEdit = async (seller) => {
      console.log("xjbchjb")
    if (seller.editing == false) {
      await addSeller({
        variables: {
          sellerNewInfo: {
            firstName: seller.firstName,
            middleName: seller.middleName,
            lastName: seller.lastName,
            phone_no: seller.phone_no,
          },
          addSellerHotelId: seller.hotelId,
        },
      });
    } else {
      await updateSellerInfo({
        variables: {
          updateSellerInfoSellerId: recordForEdit.Id,
          updateSellerInfoHotelId: seller.hotelId,
          updateSellerInfoSellerInfo: {
            firstName: seller.firstName,
            middleName: seller.middleName,
            lastName: seller.lastName,
            phone_no: seller.phone_no,
          },
          updateSellerInfoPassword:
            seller.password == "" ? undefined : seller.password,
          updateSellerInfoUsername:
            recordForEdit.username == seller.username
              ? undefined
              : seller.username,
        },
      });
    }
    refetch();

    setOpenPopup(false);
  };

  const openInPopup = (item) => {
    setRecordForEdit({ ...item, editing: true });
    setOpenPopup(true);
  };
  const openLogInPopup = (item) => {
    setSellerLog(item);
    setLogPopup(true);
  };

  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    await deleteSeller({ variables: { deleteSellerSellerId: id } });
    refetch();
  };
      const Hotels = useSelector((state) => state.hotels);
      console.log(Hotels)
       const [openSeller, setOpenSeller] = useState(false);
       const[sellerId,setSellerId]=useState()
   const[user,setUser]=useState()
const handleSellerDetail=(id,item)=>{
  console.log(id)
  setSellerId(id)
  setOpenSeller(true)
  setUser(item)
}
  return (
    <Layout>
      <Admin>
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search Sellers"
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
            <Controls.Button
              text="Add New"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.newButton}
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
            />
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
                        <TableCell
                          onClick={() => {
                            handleSellerDetail(item.Id, item);
                          }}
                          className={classes.name}
                        >
                          {item.fullName}
                        </TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.phone_no}</TableCell>

                        <TableCell>
                          {item.status ? (
                            <Typography
                              variant="subtitle2"
                              className={`${classes.status} ${classes.primary}`}
                            >
                              online
                            </Typography>
                          ) : (
                            <Typography
                              variant="subtitle2"
                              className={`${classes.status} ${classes.secondary}`}
                            >
                              offline
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Controls.ActionButton
                            color="primary"
                            title="Update"
                            onClick={() => {
                              openInPopup(item);
                            }}
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </Controls.ActionButton>
                          <Controls.ActionButton
                            color="secondary"
                            title="Delete"
                            onClick={() => {
                              setConfirmDialog({
                                isOpen: true,
                                title: "Are you sure to delete this seller?",
                                subTitle: "You can't undo this operation",
                                onConfirm: () => {
                                  onDelete(item.Id);
                                },
                              });
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </Controls.ActionButton>
                          <Controls.ActionButton
                            color="primary"
                            title="Logs"
                            onClick={() => {
                              openLogInPopup(item.logs);
                            }}
                          >
                            <MeetingRoomOutlinedIcon />
                          </Controls.ActionButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Norecords col={6} />
                  )}
                </TableBody>
              </TblContainer>
              <TblPagination />
            </>
          )}
        </Paper>
        <Popup
          title="Sellers Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <SellersForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
        </Popup>
        <Popup
          title="Seller Log"
          openPopup={openLogPopup}
          setOpenPopup={setLogPopup}
        >
          <SellerLog sellerLog={sellerLog} />
        </Popup>
        <Popup
          title="Seller Detail"
          openPopup={openSeller}
          setOpenPopup={setOpenSeller}
        >
          <SellersDetial
            ID={sellerId}
            user={user}
            setOpenPopup={setOpenSeller}
          />
        </Popup>
        <Notification notify={notify} hide setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Admin>
    </Layout>
  );
};

export default ManageSellers;
