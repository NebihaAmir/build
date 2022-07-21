import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import {

  DeleteCatagoryService,
  GetAllRoomService,

} from "../../graphql/hotel";
import { getCatagoryService } from "../../redux/actions/catagoryServiceActions";
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

import Admin from "../../components/auth/Admin";
import CatagoryServiceForm from "../../components/admin/form/CatagoryServiceForm";

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
  icon: {
    borderRadius: "50%",
    height: "40px",
    width: "40px",
  },
}));

const headCells = [
  {
    id: "name",
    label: "Name",
  },
  { id: "description", label: "Description" },
  { id: "price", label: "Price" },
  { id: "icon", label: "Icon" },
  { id: "createdAt", label: "Created At" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const ManageCatagroryService = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const RoomCatagoryServices = useSelector((state) => state.services);

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const { refetch, loading } = useQuery(GetAllRoomService, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) => dispatch(getCatagoryService(data)),
    onError: (error) => dispatch(getCatagoryService(error)),
  });
  const { NotifyMessage, notify, setNotify } = Notify();
 
  const [deleteCatagoryService] = useMutation(DeleteCatagoryService, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.deleteCatagoryService.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({
        message: error.message,
        type: "error",
      }),
  });

  let { services } = RoomCatagoryServices;
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(
      services.sort((a, b) =>
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
        const columns = ["name", "description", "price", "createdAt"];

        if (target.value == "") return items;
        else {
          return items.filter((x) => {
            return columns.some((column) => {
              return x[column]
                .toString()
                .toLowerCase()
                .includes(target.value.toLowerCase());
            });
          });
        }
      },
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit({ ...item, editing: true });
    setOpenPopup(true);
  };

  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    await deleteCatagoryService({
      variables: { deleteCatagoryServiceServiceId: id },
    });
    refetch();
  };

  return (
    <Layout>
      <Admin>
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search Room services"
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
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                          <img
                            className={classes.icon}
                            src={item.icon}
                            alt={item.icon}
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(item.createdAt).toLocaleString("en-US", {
                            hour12: true,
                          })}
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
                                title: "Are you sure to delete this record?",
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
                    <Norecords col={6} />
                  )}
                </TableBody>
              </TblContainer>
              <TblPagination />
            </>
          )}
        </Paper>
        <Popup
          title="Catagory Services Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <CatagoryServiceForm
            recordForEdit={recordForEdit}
            NotifyMessage={NotifyMessage}
            setOpenPopup={setOpenPopup}
            refetch={refetch}
          />
        </Popup>

        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Admin>
    </Layout>
  );
};

export default ManageCatagroryService;
