import { useEffect, useState } from "react";
// components
import Cards from "../components/Card/Cards";
import Navbar from "../components/Navbar/Navbar";

// redux library
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Slice/userTransaction";

// components
import NoTransaction from "../components/NoTransaction/NoTransaction";
import TransactionTable from "../components/TransactionsTable/TransactionTable";
import Chart from "../components/Graph/Chart";


function Dashboard() {
  // Dispatcher
  const dispatch = useDispatch();

  // Sorted transactions state for graph component
  const [sortedTransaction, setSortedTransaction] = useState([]);

  //  transaction state
  const { transactions } = useSelector((state) => state.userTransaction);

  // useEffect called to fetch transactions from db
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  // useEffect called to sort transactions
  useEffect(() => {
    if (transactions.length > 0) {
      const data = transactions.map((val) => ({
        id: val.id,
        type: val.type,
        date: val.date,
        tag:val.tag,
        amount: val.amount,
      }));
      // sorting data by date
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setSortedTransaction(data);
    }
  }, [transactions]);

  

  return (
    <div>
      <Navbar />
      <Cards />
      <div className="statistics">
        {transactions.length > 0 ? (
          <Chart data={sortedTransaction} />
        ) : (
          <NoTransaction />
        )}
     
      </div>

      <TransactionTable />
    </div>
  );
}

export default Dashboard;
