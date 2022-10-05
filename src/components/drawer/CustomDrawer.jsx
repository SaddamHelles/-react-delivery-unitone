import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CustomDrawer = ({ open, setOpen, ...rest }) => {
  return (
    <Drawer
      anchor={"left"}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <List style={{ width: "300px" }}>
        <ListItem button>
          <Link
            to="/packages"
            onClick={() => {
              setOpen(false);
            }}
          >
            <ListItemText primary={"Packages"} />
          </Link>
        </ListItem>
        <ListItem button>
          <Link
            to="/customers"
            onClick={() => {
              setOpen(false);
            }}
          >
            <ListItemText primary={"Customers"} />
          </Link>
        </ListItem>
        <ListItem button>
          <Link
            to="/invoices"
            onClick={() => {
              setOpen(false);
            }}
          >
            <ListItemText primary={"Invoices"} />
          </Link>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
