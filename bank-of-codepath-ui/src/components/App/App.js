import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "../Home/Home";
import "./App.css";
import TransactionDetail from "../TransactionDetail/TransactionDetail";

export default function App() {
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [FilterInputValue, setFilterInputValue] = useState();
  const [transactions, setTransactions] = useState([]);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    setFetching(true);
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:3001/bank/transactions");
        const transactions = res?.data?.transactions;
        setTransactions(transactions);
      } catch (err) {
        setError(err);
      }
    };

    const fetchTransfers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/bank/transfers");
        const transfers = res?.data?.transfers;
        setTransfers(transfers);
      } catch (err) {
        setError(err);
      }
      console.log(transactions);
    };

    fetchTransactions();
    fetchTransfers();
    setFetching(false);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home transactions={transactions} transfers={transfers} />} />
          <Route path="/:transactionId" element={<TransactionDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
