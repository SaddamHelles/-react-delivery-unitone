import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import "./App.css";
import Customers from "./pages/customers";
import Packages from "./pages/packages";
import Invoices from "./pages/invoices/Invoices";
import Navbar from "./components/navbar/Navbar";
import CustomDrawer from "./components/drawer/CustomDrawer";
import Home from "./pages/home/Home";

function App() {
  const [customers, setCustomers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get("/data.json").then((res) => {
      setCustomers(res.data.customers);
      setPackages(res.data.packages);
    });

    // fetch("/data.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setAppData(data);
    //   });
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
            <Customers customers={customers} setCustomers={setCustomers} />
          </Route>
          <Route exact path="/packages">
            <Packages
              packages={packages}
              setPackages={setPackages}
              customers={customers}
            />
          </Route>
          <Route exact path="/invoices">
            <Invoices
              invoicesData={invoices}
              setInvoices={setInvoices}
              packages={packages}
              customers={customers}
            />
          </Route>
        </Switch>
        <CustomDrawer open={open} setOpen={setOpen} />
      </Router>
    </div>
  );
}

export default App;
