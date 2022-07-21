import React, { useRef, useState } from "react";
import { Fab, FormLabel, Grid, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Controls from "../controls/Controls";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Popup from "../Popup";
import DeleteIcon from "@material-ui/icons/Delete";
import HotelServiceForm from "./form/HotelServiceForm";
import ConfirmDialog from "../ConfirmDialog";
import Notification from "../Notification";
import HotelActivities from "../../actions/hotel";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  typeHeader: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    borderRadius: "5px 5px 0px 0px",
    outline: "none",
  },
  gridGap: {
    margin: "10px 0px",
    padding: "15px",
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const HotelService = (props) => {
  const classes = useStyles();
  const {
    onDelete,
    values,
    refresh,
    setConfirmDialog,
    confirmDialog,
    onDeleteHotelService,
  } = props;
  const [ServiceId, setServiceId] = useState(null);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const roomImagePicker = useRef(null);
  const [openPopup, setOpenPopup] = useState(false);
  const openInPopup = (item) => {
    setRecordForEdit({ ...item, editing: true });
    setOpenPopup(true);
  };
  const {
    hotelManagerAddService,
    hotelMangerUpdateHotelService,
    hotelManagerHotelImageUpload,

    notify,
    setNotify,
  } = HotelActivities();
  const addOrEditService = async (service, resetForm) => {
    if (service.editing == false) {
      await hotelManagerAddService({
        variables: {
          addServiceServiceInfo: {
            name: service.name,
            description: service.description,
            hotelId: values.Id,
            image: service.image,
          },
        },
      });
    } else {
      await hotelMangerUpdateHotelService({
        variables: {
          updateHotelServiceServiceId: recordForEdit.Id,
          updateHotelServiceName: service.name,
          updateHotelServiceDescription: service.description,
        },
      });
    }
    setOpenPopup(false);
    resetForm();
    refresh();
  };
  const roomImagePickerFunc = async (e) => {
    await hotelManagerHotelImageUpload({
      variables: {
        hotelServiceImageUploadFile: e.target.files[0],
        hotelServiceImageUploadServiceId: ServiceId,
      },
    });
    refresh();
  };
  console.log(ServiceId);
  return (
    <Grid container className={`${classes.gridGap}   rounded-md shadow-lg`}>
      <Grid item xs={12} className="flex justify-between items-center">
        <FormLabel>Services</FormLabel>
        <Controls.Button
          onClick={() => {
            setOpenPopup(true);
            setRecordForEdit(null);
          }}
          text="+ Add New"
        />
      </Grid>

      <Grid container spacing={2} className="pt-3">
        {values.services.map((service) => {
          return (
            <Grid item xs={12} key={service.Id}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  className={classes.typeHeader}
                  onClick={() => setServiceId(service.Id)}
                >
                  <Typography className={classes.heading}>
                    {service.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Grid
                      container
                      spacing={2}
                      className="flex justify-between items-start"
                    >
                      <Grid item xs={9}>
                        <Typography style={{ wordWrap: "break-word" }}>
                          {service.description}
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Controls.ActionButton
                          title="Update"
                          color="primary"
                          onClick={() => {
                            openInPopup(service);
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
                              title: "Are you sure to delete this service?",
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                onDelete(service.Id, "service");
                              },
                            });
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </Controls.ActionButton>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={1}
                      className={`${classes.gridGap}  rounded-md shadow-lg`}
                    >
                      <Grid item>
                        <FormLabel>Service Images</FormLabel>
                      </Grid>
                      <Grid item xs={12}>
                        <label>
                          <Controls.Button
                            color="primary"
                            onClick={() => {
                              roomImagePicker.current.click();
                            }}
                            variant="outlined"
                            text="Upload image"
                          />

                          <input
                            type="file"
                            accept="image/*"
                            ref={roomImagePicker}
                            hidden
                            onChange={roomImagePickerFunc}
                          />
                        </label>
                      </Grid>
                      {service.images.map((photo) => {
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
                                      onDeleteHotelService(
                                        photo.Id,
                                        service,
                                        "hotelServiceImage"
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
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          );
        })}
      </Grid>
      <Popup
        title="Hotel Service Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <HotelServiceForm
          recordForEdit={recordForEdit}
          addOrEditService={addOrEditService}
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

export default HotelService;
