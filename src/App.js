import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Box from "@mui/material/Box";

import "./App.css";
import Customers from "./pages/customers";
import Packages from "./pages/packages";
import Invoices from "./pages/invoices/Invoices";
import Navbar from "./components/navbar/Navbar";
import CustomDrawer from "./components/drawer/CustomDrawer";
import Home from "./pages/home/Home";

function App() {
  const [appData, setAppData] = useState({ customers: [], packages: [] });
  const [invoices, setInvoices] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppData(data);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <Navbar setOpen={setOpen} />
        </Box>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/customers">
            <Customers
              customersData={appData.customers}
              setAppData={setAppData}
            />
          </Route>
          <Route exact path="/packages">
            <Packages appData={appData} setAppData={setAppData} />
          </Route>
          <Route exact path="/invoices">
            <Invoices invoicesData={invoices} />
          </Route>
        </Switch>
        <CustomDrawer open={open} setOpen={setOpen} />
      </Router>
    </div>
  );
}

export default App;
