import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./Operations.css";

export default function Operations(props) {
  const [amount, setAmount] = useState(0);
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = React.useState(null);
  const [date, setDate] = useState();
  const navigate = useNavigate();

  const handleDeposit = async (e) => {
    e.preventDefault();
    if (!amount || !vendor || !category) {
      props.handleClick();
      props.setSnackbarMessage("empty field");
      return;
    }
    try {
      await axios.post("http://localhost:8181/transactions", {
        amount: amount * 1,
        vendor: vendor,
        category: category,
        date: date,
      });
      setAmount("");
      setVendor("");
      setCategory("");
      setDate("");
      navigate("/transactions");
      props.updateBalance(Number(amount * 1));
      props.handleClick();
      props.setSnackbarMessage("transctions add succsufflty");
    } catch (error) {
      console.error("Error depositing:", error);
    }
  };
  const styles = {
    datePickerContainer: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
  };
  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!amount || !vendor || !category) {
      props.handleClick();
      props.setSnackbarMessage("empty faild");
      return;
    }

    try {
      await axios.post("http://localhost:8181/transactions", {
        amount: amount * -1,
        vendor: vendor,
        category: category,
        date: date,
      });
      setAmount("");
      setVendor("");
      setCategory("");
      setDate("");

      navigate("/transactions");

      props.updateBalance(Number(amount * -1));
      props.handleClick();
      props.setSnackbarMessage("transctions add sucsess");
    } catch (error) {
      console.error("Error withdrawing:", error);
    }
  };

  return (
    <form>
      <div className="Operations">
        <h2>Insert Transaction</h2>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="vendor">Vendor:</label>
          <input
            type="text"
            id="vendor"
            placeholder="Enter vendor"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div style={styles.datePickerContainer}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={value}
                onChange={(newValue) => setDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="button-group">
          <button type="button" className="deposit-btn" onClick={handleDeposit}>
            Deposit
          </button>
          <button
            type="button"
            className="withdraw-btn"
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
        </div>
      </div>
    </form>
  );
}
