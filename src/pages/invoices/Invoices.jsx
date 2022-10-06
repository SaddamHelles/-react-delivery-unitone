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
import React, { Fragment } from "react";
import "./invoicesStyle.css";
const Invoices = ({ invoicesData, setInvoices, customers, packages }) => {
  // totalValue function to  gathering values numerically for each customer
  const totalValue = (packages, targetField, customerid) => {
    // parseInt function was used to extract the number from weight value and gathering values numerically
    const totalValue = packages.reduce(
      (acc, current) =>
        current.customerid === customerid
          ? parseInt(acc[targetField]) + parseInt(current[targetField])
          : acc[targetField],
      0
    );
    return totalValue;
  };
  const invoicesList = packages?.map((pack) => {
    return {
      customerName: customers.find((cus) => cus.id === pack.customerid).name,
      totalWeight:
        totalValue(packages, packages.weight, pack.customerid) + "kg",
      totalPrice: totalValue(packages, packages.price, pack.customerid),
    };
  });
  console.log("invoicesList: ", invoicesList);
  // console.log("packages: ", packages);
  // setInvoices(invoicesList);
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Weight</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoicesData?.map((row) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.customerName}
                  </TableCell>
                  <TableCell>{row.totalWeight}</TableCell>
                  <TableCell>{row.totalPrice}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default Invoices;
