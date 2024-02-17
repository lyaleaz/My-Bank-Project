import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Transactions from "./components/TransactionsComp";
import Operations from "./components/Operations";
import Breakdown from "./components/Breakdown";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Alert from "@mui/material/Alert";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

import {
  Card,
  CardContent,
  CardMedia,
  Switch,
  Typography,
} from "@mui/material";
import "./App.css";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(100);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [toggleDarkMode, setToggleDarkMode] = useState(true);

  const getBalance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8181/transactions/balance"
      );
      return response.data.balance;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateBalance = async (transactionAmount) => {
    try {
      await axios.post("http://localhost:8181/transactions/balance", {
        amount: transactionAmount,
      });
      setBalance((prevBalance) => prevBalance + transactionAmount);
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  useEffect(() => {
    const getData = async () => {
      const balanceData = await getBalance();
      setBalance(balanceData);
    };
    getData();
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleClick = () => {
    setSnackbarOpen(true);
  };
  const darkTheme = createTheme({
    palette: {
      mode: toggleDarkMode ? "dark" : "light",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#131052",
      },
      text: {
        primary: toggleDarkMode ? "gray" : "rgba(0, 0, 0, 0.87)", // Red text color for dark mode
      },
    },
  });

  return (
    <div id="root">
      <Router>
        <div>
          <NavBar
            balance={balance}
            darkMode={toggleDarkMode}
            toggleDarkTheme={toggleDarkTheme}
          />
          <Routes>
            <Route
              path="/transactions"
              element={
                <Transactions
                  transaction={transactions}
                  transactions={transactions}
                  onDelete={setTransactions}
                />
              }
            />
            <Route
              path="/operations"
              element={
                <Operations
                  updateBalance={updateBalance}
                  handleClick={handleClick}
                  setSnackbarMessage={setSnackbarMessage}
                />
              }
            />
            <Route path="/breakdown" element={<Breakdown />} />
          </Routes>
        </div>
      </Router>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <div>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "1000px",
              marginTop: "25px",
            }}
          ></div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default App;
