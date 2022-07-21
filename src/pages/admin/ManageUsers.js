import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import { DeleteUser, ViewUsers } from "../../graphql/user";
import MeetingRoomOutlinedIcon from "@material-ui/icons/MeetingRoomOutlined";
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

import DeleteIcon from "@material-ui/icons/Delete";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

import { getCookie, userSessionExpired } from "../../actions/auth";
import Layout from "../../components/Layout";
import { useHistory } from "react-router-dom";
import { getUsers } from "../../redux/actions/UserActions";
import Admin from "../../components/auth/Admin";
import UserLog from "../../components/admin/UserLog";
import Popup from "../../components/Popup";
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
    id: "fullName",
    label: "Full name",
  },
  { id: "phone_no", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "nationality", label: "Nationality" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const ManageUsers = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const Users = useSelector((state) => state.users);
  const [userLog, setUserLog] = useState(null);
  const [openLogPopup, setLogPopup] = useState(false);
  let { users } = Users;
  const openLogInPopup = (item) => {
    setUserLog(item);
    setLogPopup(true);
  };

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { NotifyMessage, notify, setNotify } = Notify();

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const { refetch, loading } = useQuery(ViewUsers, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
    onCompleted: (data) => dispatch(getUsers(data)),
    onError: (error) => dispatch(getUsers(error)),
  });

  const [deleteUser] = useMutation(DeleteUser, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.deleteUser.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(
    users.sort((a, b) =>
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
        const columns = ["fullName", "nationality", "phone_no", "email"];

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

  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    await deleteUser({ variables: { deleteUserUserId: id } });
    refetch();
  };

  return (
    <Layout>
      <Admin>
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search Users"
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
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().length > 0 ? (
                    recordsAfterPagingAndSorting().map((item) => (
                      <TableRow key={item.Id}>
                        <TableCell>{item.fullName}</TableCell>
                        <TableCell>{item.phone_no}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.nationality}</TableCell>

                        <TableCell>
                          <Controls.ActionButton
                            color="secondary"
                            title="Delete"
                            onClick={() => {
                              setConfirmDialog({
                                isOpen: true,
                                title: "Are you sure to delete this user?",
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
                    <Norecords col={5} />
                  )}
                </TableBody>
              </TblContainer>
              <TblPagination />
            </>
          )}
        </Paper>
        <Popup
          title="User Log"
          openPopup={openLogPopup}
          setOpenPopup={setLogPopup}
        >
          <UserLog userLog={userLog} />
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

export default ManageUsers;
