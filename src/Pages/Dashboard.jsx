import { useEffect } from "react";
// components
import Cards from "../components/Card/Cards";
import Navbar from "../components/Navbar/Navbar";

// redux library
import { useDispatch } from "react-redux";
import { fetchData } from "../Slice/userTransaction";
import TransactionTable from "../components/TransactionsTable/TransactionTable";

function Dashboard() {
  // Dispatcher
  const dispatch = useDispatch();

  // useEffect called to fetch transactions from db
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div>
      <Navbar />
      <Cards />
      <TransactionTable/>
    </div>
  );
}

export default Dashboard;
