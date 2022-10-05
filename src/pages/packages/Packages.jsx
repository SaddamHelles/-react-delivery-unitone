import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { Box } from "@mui/material";
import React from "react";
import "./packageStyle.css";

const Packages = ({ appData, setAppData }) => {
  const fetchName = (customerid) => {
    // console.log(appData.customers);

    const custName = appData.customers.find((cus) => cus.id === customerid);
    console.log("custName: ", custName);
    return custName.name;
    // console.log(fname);
  };
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Price</TableCell>

              <TableCell>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appData.packages.map((row) => {
              return (
                <TableRow
                  key={row.name + row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{fetchName(row.customerid)}</TableCell>
                  <TableCell>{row.weight}</TableCell>

                  <TableCell>{row.price}</TableCell>

                  <TableCell>
                    <Button variant="contained">Delete</Button>
                    <i>Up down buttons should go here</i>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Packages;
