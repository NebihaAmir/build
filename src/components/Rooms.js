import { useEffect, useRef, useState } from "react";
import useTable from "./useTable";
import Switch from "@material-ui/core/Switch";
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  makeStyles,
  Typography,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";

import Notification from "./Notification";
import { Search } from "@material-ui/icons";
import Controls from "./controls/Controls";
import Norecords from "./Norecords";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
  Select: {
    margin: theme.spacing(0, 2),
    width: "150px",
  },
  pageContent: {
    padding: theme.spacing(3),
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
  searchInput: {
    width: "75%",
  },
}));
const headCells = [
  {
    id: "room_no",
    label: "Room No",
  },
  { id: "floor_no", label: "Floor No" },
  { id: "roomType", label: "Room Type" },
  { id: "available", label: "Availablity" },
  { id: "hotel", label: "Hotel" },
  { id: "createdAt", label: "Created At" },
  { id: "actions", label: "Actions", disableSorting: true },
];
const RoomsComponent = ({
  notify,
  setNotify,
  Hotels,
  location,
  Types,
  changeRoomAvailablity,
  refetch,
  RoomId,
  HotelId,
  RoomTypes,
  setRoomTypes,
  filter,
  loading,
}) => {
  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const Catagories = useRef([]);

  useEffect(() => {
    Catagories.current = [
      ...new Map(
        Types.map((type) => {
          return { name: type.roomType.name, Id: type.roomType.Id };
        }).map((item) => [item.name, item])
      ).values(),
    ].sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    filter();
  }, [Types]);

  const handleChange = async (Id) => {
    await changeRoomAvailablity({ variables: { roomId: Id } });
    refetch();
  };
  const handleSelectChange = (e) => {
    RoomId.current = e.target.value;
    filter();
  };
  const handleHotelSelectChange = (e) => {
    HotelId.current = e.target.value;
    RoomId.current = "all";
    if (e.target.value == "all") {
      Catagories.current = [
        ...new Map(
          Types.map((type) => {
            return { name: type.roomType.name, Id: type.roomType.Id };
          }).map((item) => [item.name, item])
        ).values(),
      ].sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

      setRoomTypes(Types);
      return;
    } else {
      Catagories.current = [
        ...new Map(
          Types.filter((type) => {
            return type.hotel.Id == HotelId.current;
          })
            .map((type) => {
              return { name: type.roomType.name, Id: type.roomType.Id };
            })
            .map((item) => [item.name, item])
        ).values(),
      ].sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

      const filteredData = Types.filter((item) => {
        return item.hotel.Id == HotelId;
      });
      setRoomTypes(filteredData);
    }
    filter();
  };
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(RoomTypes, headCells, filterFn);

  const handleSearch = (e) => {
    e.target.value = e.target.value.trimLeft();
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        const columns = [
          "room_no",
          "floor_no",
          "hotel",
          "roomType",
          "available",
        ];

        if (target.value == "") return items;
        else {
          return items.filter((x) => {
            return columns.some((column) => {
              if (column == "roomType" || column == "hotel") {
                return x[column].name
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
            label="Search Hotels"
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
          {location && (
            <Select
              defaultValue="all"
              className={classes.Select}
              onChange={handleHotelSelectChange}
              name="hotel"
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
          <Select
            defaultValue="all"
            className={classes.Select}
            onChange={handleSelectChange}
            name="roomTypeId"
            variant="outlined"
          >
            <MenuItem value="all">All Catagories</MenuItem>
            {Catagories.current.map((item) => (
              <MenuItem key={item.Id} value={item.Id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>{" "}
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
                  recordsAfterPagingAndSorting().map((type) => (
                    <TableRow key={type.Id}>
                      <TableCell>{type.room_no}</TableCell>
                      <TableCell>{type.floor_no}</TableCell>
                      <TableCell>{type.roomType.name}</TableCell>
                      <TableCell>
                        {type.available ? (
                          <Typography
                            variant="subtitle2"
                            className={`${classes.status} ${classes.primary}`}
                          >
                            Available
                          </Typography>
                        ) : (
                          <Typography
                            variant="subtitle2"
                            className={`${classes.status} ${classes.secondary}`}
                          >
                            Not available
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{type.hotel.name}</TableCell>
                      <TableCell>
                        {new Date(type.createdAt).toLocaleString("en-US", {
                          hour12: true,
                        })}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={type.available}
                          onChange={() => {
                            handleChange(type.Id);
                          }}
                          color="primary"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <Norecords col={7} />
                )}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </>
        )}
        <Notification notify={notify} setNotify={setNotify} />
      </Paper>
    </>
  );
};

export default RoomsComponent;
