import { TableCell, TableRow, Typography } from "@material-ui/core";
import { HourglassEmptyOutlined } from "@material-ui/icons";

const Norecords = ({ col }) => {
  return (
    <TableRow>
      <TableCell colSpan={col} className="padding" align="center">
        <Typography variant="h3">
          No records.
          <HourglassEmptyOutlined color="primary" fontSize="inherit" />
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default Norecords;
