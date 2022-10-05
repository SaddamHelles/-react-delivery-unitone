import { ReviewsSharp } from "@mui/icons-material";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./customersStyle.css";

const Customers = ({ customersData, setAppData }) => {

  const [newCust, setNewCust] = useState(customersData);
  
  setNewCust(customersData);
  console.log(newCust);
  const handleDelete = (id) => {
    const dataList = customersData.filter((cust) => cust.id !== id);
    setAppData((prev) => [...prev, dataList]);
  };
  // useEffect(() => {
  //   fetch(`/data.json/id=${id}`, {method: 'DELETE'})
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAppData(data);
  //     });
  // }, []);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customersData?.map((row) => {
              return (
                <TableRow
                  key={row.id + row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Button variant="contained">Create Invoice</Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Customers;
