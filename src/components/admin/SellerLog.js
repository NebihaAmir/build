import { useState } from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import useTable from "../useTable";
import Norecords from "../Norecords";
const headCells = [
  {
    id: "activity",
    label: "Activity",
  },
  { id: "createdAt", label: "Created At" },
  { id: "updatedAt", label: "Updated At" },
];
const SellerLog = ({ sellerLog }) => {
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(sellerLog, headCells, filterFn);

  return (
    <>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().length > 0 ? (
            recordsAfterPagingAndSorting().map((check) => {
              return (
                <TableRow key={check.Id}>
                  <TableCell>{check.activity}</TableCell>
                  <TableCell>
                    {new Date(check.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(check.updatedAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <Norecords col={3} />
          )}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </>
  );
};

export default SellerLog;
