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

const Packages = ({ packages, setPackages, customers }) => {
  // Sorting packages array ascending by shippingOrder proparty
  packages.sort((a, b) =>
    a.shippingOrder > b.shippingOrder
      ? 1
      : b.shippingOrder > a.shippingOrder
      ? -1
      : 0
  );

  // Show the customer name by his id not from it object
  const nameById = (customerid) => {
    const custName = customers.find((cus) => cus.id === customerid);
    return custName?.name;
  };

  // heandler of deleting packages by its packageId
  const handleDelete = async (id) => {
    try {
      const packagesList = packages.filter((pack) => pack.id !== id);
      setPackages(packagesList);
    } catch (err) {
      console.log("Error: ", err.message);
    }
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
            {packages?.map((row) => {
              return (
                <TableRow
                  key={row.name + row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{nameById(row.customerid) ?? "No name"}</TableCell>
                  <TableCell>{row.weight}</TableCell>

                  <TableCell>{row.price}</TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </Button>
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
