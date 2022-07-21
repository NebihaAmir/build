import React, { useState, useEffect, useRef } from "react";
import {
  Checkbox,
  Divider,
  Fab,
  FormLabel,
  Grid,
  TableHead,
  Tooltip,
} from "@material-ui/core";
import Notification from "../Notification";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import DeleteIcon from "@material-ui/icons/Delete";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Controls from "../controls/Controls";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Popup from "../Popup";
import useTable from "../useTable";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import HotelActivities from "../../actions/hotel";
import ConfirmDialog from "../ConfirmDialog";
import CatagoryForm from "./form/CatagoryForm";
import { GetAllRoomService } from "../../graphql/hotel";
import { useQuery } from "@apollo/client";
import Norecords from "../Norecords";
import Notify from "../Notify";
const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  details: {
    flexDirection: "column",
  },
  gridGap: {
    margin: "10px 0px",
    padding: "15px",
  },
  accordionGap: {
    margin: "10px 0px",
  },
  typeHeader: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "5px 5px 0px 0px",
    outline: "none",
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  icon: {
    borderRadius: "50%",
    height: "40px",
    width: "40px",
  },
}));
const headCells = [
  {
    id: "floor_no",
    label: "Floor number",
    disableSorting: true,
  },
  { id: "room_no", label: "Room Number", disableSorting: true },
  { id: "available", label: "Status", disableSorting: true },

  { id: "actions", label: "Actions", disableSorting: true },
];
const columns = [
  { id: "id", label: "Check" },
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "price", label: "Price" },
  { id: "icon", label: "Icon" },
];

const RoomCatagory = (props) => {
  const {
    onDelete,
    values,
    refresh,
    setConfirmDialog,
    confirmDialog,
    onDeleteRoomCatagory,
  } = props;
  const classes = useStyles();
  const [TypeId, roomTypeId] = useState(null);
  const roomImagePicker = useRef(null);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openRoomPopup, setRoomOpenPopup] = useState(false);
  const [setPopup, setOpenPopup] = useState(false);
  const [Checked, setChecked] = useState([]);
  const { NotifyMessage } = Notify();
  const RoomService = useRef(null);

  useQuery(GetAllRoomService, {
    onCompleted: (data) => setState(data.viewRoomServices),
    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [state, setState] = useState([]);
  const {
    hotelManagerRoomTypeImageUpload,
    hotelManagerAddRoomServiceToRoom,
    hotelMangerAddRoom,
    hotelManagerUpdateRoom,
    hotelManagerUpdateRoomCatagory,
    hotelManagerAddRoomCatagory,

    notify,
    setNotify,
  } = HotelActivities();
  useEffect(() => {
    RoomService.current = values.roomTypes.map((r) =>
      r.roomService.map((s) => s.Id)
    );
    setChecked(RoomService.current);
  }, []);
  const [editRoom, setRoomForEdit] = useState({
    room_no: "",
    floor_no: "",
    roomTypeId: "",
    roomId: "",
    editing: false,
    errors: {
      room_no: "",
      floor_no: "",
    },
  });

  const submitServices = async (type, index) => {
    await hotelManagerAddRoomServiceToRoom({
      variables: {
        addRoomServiceToRoomRoomServiceId: JSON.stringify(Checked[index]),
        addRoomServiceToRoomRoomTypeId: type.Id,
      },
    });
    refresh();
  };
  const addOrEditCatagory = async (catagory, resetForm) => {
    if (catagory.editing == false) {
      await hotelManagerAddRoomCatagory({
        variables: {
          addRoomTypeRoomTypeInfo: {
            name: catagory.name,
            description: catagory.description,
            hotelId: values.Id,
            capacity: parseInt(catagory.capacity),
            price: parseFloat(catagory.price),
            image: catagory.image,
          },
        },
      });
      RoomService.current.push([]);
      setChecked([...RoomService.current]);
    } else {
      await hotelManagerUpdateRoomCatagory({
        variables: {
          updateRoomCatagoryCatagoryId: recordForEdit.Id,
          updateRoomCatagoryName: catagory.name,
          updateRoomCatagoryDescription: catagory.description,
          updateRoomCatagoryCapacity: parseInt(catagory.capacity),
          updateRoomCatagoryPrice: parseFloat(catagory.price),
        },
      });
    }
    setOpenPopup(false);
    resetForm();
    refresh();
  };

  const handleRoomInputs = (e) => {
    const { name, value } = e.target;
    setRoomForEdit({
      ...editRoom,
      [name]: value,
      errors: { ...editRoom.errors, [name]: "" },
    });
  };

  const AddOrUpdateRoom = async () => {
    let temp = { ...editRoom.errors };

    temp.floor_no =
      editRoom.floor_no.length != 0 ? "" : "This field is required.";
    temp.room_no =
      editRoom.room_no.length != 0 ? "" : "This field is required.";

    let validate = Object.values(temp).every((x) => x == "");
    setRoomForEdit({
      ...editRoom,
      errors: { ...temp },
    });
    if (validate) {
      setRoomForEdit({ ...editRoom, submitting: true });
      if (editRoom.editing == false) {
        await hotelMangerAddRoom({
          variables: {
            addRoomRoomInfo: {
              floor_no: parseInt(editRoom.floor_no),
              room_no: editRoom.room_no,
              roomTypeId: editRoom.roomTypeId,
              hotelId: values.Id,
            },
          },
        });
        setRoomForEdit({ ...editRoom, editing: true });
      } else {
        await hotelManagerUpdateRoom({
          variables: {
            updateRoomFloorNo: parseInt(editRoom.floor_no),
            updateRoomRoomNo: editRoom.room_no,
            updateRoomRoomId: editRoom.roomId,
            updateRoomHotelId: values.Id,
          },
        });
      }
      setRoomForEdit({
        ...editRoom,
        floor_no: "",
        room_no: "",
        roomTypeId: "",
        roomId: "",
      });
      setRoomOpenPopup(false);
      refresh();
    }
  };
  const roomImagePickerFunc = async (e) => {
    await hotelManagerRoomTypeImageUpload({
      variables: {
        roomTypeImageUploadFile: e.target.files[0],
        roomTypeImageUploadRoomTypeId: TypeId,
      },
    });
    refresh();
  };

  const { TblContainer, TblHead } = useTable("", headCells, "");
  const openRoomInPopup = (item) => {
    setRoomForEdit({
      ...editRoom,
      floor_no: item.floor_no,
      room_no: item.room_no,
      roomTypeId: "",
      roomId: item.Id,
      editing: true,
    });
    setRoomOpenPopup(true);
  };
  const openCatagoryInPopup = (item) => {
    setRecordForEdit({ ...item, editing: true });
    setOpenPopup(true);
  };

  const handleChecked = (c, index) => () => {
    const checkedService = RoomService.current[index].indexOf(c);
    const all = [...new Set(RoomService.current[index])];
    if (checkedService === -1) {
      all.push(c);
    } else {
      all.splice(checkedService, 1);
    }
    RoomService.current[index] = [...all];
    setChecked([...RoomService.current]);
  };
  const checkType = (id, index) => {
    return Checked[index].indexOf(id) == -1 ? false : true;
  };

  return (
    <Grid container className={`${classes.gridGap}  rounded-md shadow-lg`}>
      <Grid item xs={12} className="flex justify-between items-center">
        <FormLabel>Room Catagories</FormLabel>
        <Controls.Button
          onClick={() => {
            setOpenPopup(true);
            setRecordForEdit(null);
          }}
          text="+ Add New"
        />
      </Grid>
      {values.roomTypes.map((type, index) => {
        return (
          <Grid className={classes.accordionGap} item xs={12} key={type.Id}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                className={classes.typeHeader}
                onClick={() => roomTypeId(type.Id)}
              >
                <Typography className={classes.heading}>{type.name}</Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails className={classes.details}>
                <Grid container className="flex justify-between items-start">
                  <Typography>{type.description}</Typography>
                  <Typography>{type.price}</Typography>
                  <Typography>{type.capacity}</Typography>
                  <div>
                    <Controls.ActionButton
                      title="Update"
                      color="primary"
                      onClick={() => {
                        openCatagoryInPopup(type);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      title="Delete"
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this catagory?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            onDelete(type.Id, "roomType");
                          },
                        });
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </Controls.ActionButton>
                  </div>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  className={`${classes.gridGap}  rounded-md shadow-lg`}
                >
                  <Grid item>
                    <FormLabel>Catagory Images</FormLabel>
                  </Grid>
                  <Grid item xs={12}>
                    <label>
                      <Button
                        color="primary"
                        onClick={() => {
                          roomImagePicker.current.click();
                        }}
                        variant="outlined"
                      >
                        Upload image
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={roomImagePicker}
                        name={type.Id}
                        hidden
                        onChange={roomImagePickerFunc}
                      />
                    </label>
                  </Grid>
                  {type.images.map((photo) => {
                    return (
                      <Grid
                        item
                        xs={6}
                        key={photo.Id}
                        style={{ position: "relative" }}
                      >
                        <img src={photo.imageURI} alt={photo.imageURI} />
                        <Tooltip title="Delete image">
                          <Fab
                            color="secondary"
                            className={classes.absolute}
                            onClick={() => {
                              setConfirmDialog({
                                isOpen: true,
                                title: "Are you sure to delete this image?",
                                subTitle: "You can't undo this operation",
                                onConfirm: () => {
                                  onDeleteRoomCatagory(
                                    photo.Id,
                                    type,
                                    "roomTypeImage"
                                  );
                                },
                              });
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </Fab>
                        </Tooltip>
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid
                  container
                  xs={12}
                  className={`${classes.gridGap}  rounded-md shadow-lg`}
                >
                  <Grid item>
                    <FormLabel>Catagory services</FormLabel>
                  </Grid>
                  <TblContainer>
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => {
                          return (
                            <TableCell key={column.label}>
                              {column.label}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.length > 0 ? (
                        state.map((check) => {
                          return (
                            <TableRow key={check.Id}>
                              <TableCell>
                                {" "}
                                <Checkbox
                                  checked={checkType(check.Id, index)}
                                  onChange={handleChecked(check.Id, index)}
                                />
                              </TableCell>
                              <TableCell>{check.name}</TableCell>
                              <TableCell>{check.description}</TableCell>
                              <TableCell>{check.price}</TableCell>
                              <TableCell>
                                <img
                                  className={classes.icon}
                                  src={check.icon}
                                  alt={check.icon}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <Norecords col={5} />
                      )}
                    </TableBody>
                  </TblContainer>
                  <Controls.Button
                    onClick={() => submitServices(type, index)}
                    text="Set room service"
                  />
                </Grid>
                <Grid
                  container
                  xs={12}
                  className={`${classes.gridGap}  rounded-md shadow-lg`}
                >
                  <Grid item xs={12}>
                    <Grid
                      item
                      xs={12}
                      className="flex justify-between items-center"
                    >
                      <FormLabel>Catagory rooms</FormLabel>
                      <Controls.Button
                        onClick={() => {
                          setRoomOpenPopup(true);
                          setRoomForEdit({
                            ...editRoom,
                            floor_no: "",
                            room_no: "",
                            roomTypeId: type.Id,
                            roomId: "",
                            editing: false,
                          });
                        }}
                        text="+ Add New"
                      />
                    </Grid>
                    <TblContainer>
                      <TblHead />
                      <TableBody>
                        {type.rooms.length > 0 ? (
                          type.rooms.map((item) => (
                            <TableRow key={item.Id}>
                              <TableCell>{item.floor_no}</TableCell>
                              <TableCell>{item.room_no}</TableCell>
                              <TableCell>
                                {item.available ? "Available" : "Not available"}
                              </TableCell>
                              <TableCell>
                                <Controls.ActionButton
                                  title="Update"
                                  color="primary"
                                  onClick={() => {
                                    openRoomInPopup(item);
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
                                      title:
                                        "Are you sure to delete this room?",
                                      subTitle: "You can't undo this operation",
                                      onConfirm: () => {
                                        onDelete(item.Id, "room");
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
                          <Norecords col={4} />
                        )}
                      </TableBody>
                    </TblContainer>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        );
      })}{" "}
      <Popup
        title="Room Form"
        openPopup={openRoomPopup}
        setOpenPopup={setRoomOpenPopup}
      >
        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              name="room_no"
              label="Room number"
              value={editRoom.room_no}
              onChange={handleRoomInputs}
              error={editRoom.errors.room_no}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              label="Floor number"
              name="floor_no"
              type="number"
              value={editRoom.floor_no}
              onChange={handleRoomInputs}
              error={editRoom.errors.floor_no}
            />
          </Grid>

          <Grid item xs={4}>
            <div>
              <Controls.Button
                onClick={AddOrUpdateRoom}
                text={
                  editRoom.editing == true
                    ? editRoom.submitting
                      ? "Editing..."
                      : "Edit"
                    : editRoom.submitting
                    ? "Adding..."
                    : "Add"
                }
              />
            </div>
          </Grid>
        </Grid>
      </Popup>
      <Popup
        title="Hotel Room Catagory Form"
        openPopup={setPopup}
        setOpenPopup={setOpenPopup}
      >
        <CatagoryForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEditCatagory}
        />
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </Grid>
  );
};

export default RoomCatagory;
