import React, { useState, useRef } from "react";
import { Fab, FormLabel, Grid, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import HotelForm from "./HotelForm";
import ConfirmDialog from "../../ConfirmDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import HotelActivities from "../../../actions/hotel";
import RoomCatagory from "../RoomCatagory";
import HotelService from "../HotelService";
const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  gridGap: {
    margin: "10px 0px",
    padding: "15px",
  },
  relative: {
    position: "relative",
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

export default function HotelUpdateForm(props) {
  const classes = useStyles();
  let { recordForEdit, refetch, setOpenPopup, NotifyMessage } = props;
  const [values, setValues] = useState(recordForEdit);

  const refresh = async () => {
    const hotel = await refetch();
    const updatedHotel = hotel.data.viewHotels.find(
      (hotel) => values.Id == hotel.Id
    );
    setValues(updatedHotel);
  };
  const {
    deleteService,
    hotelImageUpload,
    deleteRoomType,
    deleteHotelImages,
    deleteRoom,
    deleteRoomTypeImage,
    deleteHotelServiceImages,
    state,
  } = HotelActivities();

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const filePicker = useRef(null);

  const onDelete = async (id, file) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    if (file == "image") {
      if (values.photos.length <= 1) {
        NotifyMessage({
          message: "Atleast one image is required.",
          type: "error",
        });
        return;
      }
      await deleteHotelImages({ variables: { deleteHotelImagesId: id } });
    } else if (file == "service") {
      await deleteService({ variables: { serviceId: id } });
    } else if (file == "roomType") {
      await deleteRoomType({ variables: { deleteRoomTypeRoomTypeId: id } });
    } else if (file == "room") {
      await deleteRoom({ variables: { deleteRoomRoomId: id } });
    }
    refresh();
  };
  const filePickerFunc = async (e) => {
    await hotelImageUpload({
      variables: {
        hotelImageUploadHotelId: recordForEdit.Id,
        hotelImageUploadFile: e.target.files[0],
      },
    });
    refresh();
  };
  const onDeleteHotelServiceAndRoomCatagory = async (id, parent, file) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    if (file == "hotelServiceImage") {
      if (parent.images.length <= 1) {
        NotifyMessage({
          message: "Atleast one image is required.",
          type: "error",
        });
        return;
      }
      await deleteHotelServiceImages({
        variables: { deleteHotelServiceimageId: id },
      });
    } else if (file == "roomTypeImage") {
      if (parent.images.length <= 1) {
        NotifyMessage({
          message: "Atleast one image is required.",
          type: "error",
        });
        return;
      }
      await deleteRoomTypeImage({ variables: { deleteRoomImagesId: id } });
    }
    refresh();
  };
  return (
    <div>
      <Grid container spacing={2}>
        <HotelService
          setConfirmDialog={setConfirmDialog}
          confirmDialog={confirmDialog}
          onDeleteHotelService={onDeleteHotelServiceAndRoomCatagory}
          onDelete={onDelete}
          refresh={refresh}
          values={values}
        />
        <RoomCatagory
          setConfirmDialog={setConfirmDialog}
          confirmDialog={confirmDialog}
          onDeleteRoomCatagory={onDeleteHotelServiceAndRoomCatagory}
          onDelete={onDelete}
          refresh={refresh}
          values={values}
          state={state}
        />
        <Grid
          container
          spacing={1}
          className={`${classes.gridGap}  rounded-md shadow-lg`}
        >
          <Grid item xs={12}>
            <FormLabel>Hotel Images</FormLabel>
          </Grid>
          <Grid item xs={12}>
            <label>
              <Button
                color="primary"
                onClick={() => {
                  filePicker.current.click();
                }}
                variant="outlined"
              >
                Upload image
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={filePicker}
                hidden
                onChange={filePickerFunc}
              />
            </label>
          </Grid>

          {values.photos?.map((photo) => {
            return (
              <Grid item xs={6} key={photo.Id} style={{ position: "relative" }}>
                <img
                  className="object-contain"
                  src={photo.imageURI}
                  alt={photo.imageURI}
                />
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
                          onDelete(photo.Id, "image");
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
        <Grid container>
          <Grid item xs={12}>
            <FormLabel>Hotel Information</FormLabel>
          </Grid>
          <HotelForm
            recordForEdit={values}
            setOpenPopup={setOpenPopup}
            NotifyMessage={NotifyMessage}
            refetch={refetch}
          />
        </Grid>
      </Grid>

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      {/* <Notification notify={notify} setNotify={setNotify} /> */}
    </div>
  );
}
