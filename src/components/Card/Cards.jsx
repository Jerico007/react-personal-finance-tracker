import { useEffect, useState } from "react";
import "./Cards.css";
// antd Framework
import { Flex, Card } from "antd";
// component
import Button from "../Button/Button";
// Modals
import IncomeModal from "../Modals/IncomeModal";
import ExpenseModal from "../Modals/ExpenseModal";
// Redux library
import { useSelector, useDispatch } from "react-redux";
import { fetchData, setLoading } from "../../Slice/userTransaction";
// firebase library
import { deleteDoc } from "firebase/firestore";
import { db, doc, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const Cards = () => {
  // show Income Modal
  const [showIncomeModal, setIncomeModal] = useState(false);

  // show Expense Modal
  const [showExpenseModal, setExpenseModal] = useState(false);

  // useAuth state
  const [user] = useAuthState(auth);

  // dispatcher
  const dispatch = useDispatch();

  // finance details state
  const [FinanceDetails, setFinanceDetails] = useState({
    myIncome: 0,
    myExpense: 0,
    myBalance: 0,
  });

  // transactions state
  const { transactions, loading } = useSelector(
    (state) => state.userTransaction
  );

  // useEffect to calculate balance
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  // function to reset balance
  async function resetBalance() {
    try {
      if (transactions.length > 0 && !loading) {
        dispatch(setLoading(true));
        for (const tk of transactions) {
          await deleteDoc(doc(db, `user/${user.uid}/transactions`, `${tk.id}`));
        }
        dispatch(fetchData());
      } else {
        toast.warn("No Balance to reset");
      }
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(error.message);
    }
  }

  // function to calculate balance
  function calculateBalance() {
    let income = 0;
    let expense = 0;

    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === "income") {
        income += Number(transactions[i].amount);
      } else {
        expense += Number(transactions[i].amount);
      }
    }
    // setting the amounts
    setFinanceDetails((prev) => {
      return {
        ...prev,
        myBalance: Math.abs(income - expense),
        myIncome: parseFloat(income),
        myExpense: parseFloat(expense),
      };
    });
  }
  return (
    <>
      <Flex
        gap={5}
        className="card-holder"
        justify={"space-evenly"}
        wrap={"wrap"}
      >
        <Card
          title={"Current Balance"}
          className="card"
          actions={[
            <Button
              text={"Reset Balance"}
              color={"var(--white)"}
              backgroundColor={"var(--theame)"}
              borderColor={"var(--theame)"}
              className={"card-button"}
              onClick={()=>{
                if(!loading) resetBalance();
              }}
            />,
          ]}
        >
          <p style={{ fontWeight: "600" }}>
            {loading
              ? "Loading..."
              : "₹ " + FinanceDetails.myBalance.toLocaleString("en-IN")}
          </p>
        </Card>
        <Card
          title={"Total Incomes"}
          className="card"
          actions={[
            <Button
              text={"Add Income"}
              color={"var(--white)"}
              backgroundColor={"var(--theame)"}
              borderColor={"var(--theame)"}
              className={"card-button"}
              onClick={() => {
                if(!loading)setIncomeModal(true);
              }}
            />,
          ]}
        >
          <p style={{ fontWeight: "600", fontSize: "1rem" }}>
            {loading
              ? "Loading..."
              : "₹ " + FinanceDetails.myIncome.toLocaleString("en-IN")}
          </p>
        </Card>
        <Card
          title={"Total Expenses"}
          className="card"
          actions={[
            <Button
              text={"Add Expense"}
              color={"var(--white)"}
              backgroundColor={"var(--theame)"}
              borderColor={"var(--theame)"}
              className={"card-button"}
              onClick={() => {
                if(!loading) setExpenseModal(true);
              }}
            />,
          ]}
        >
          <p style={{ fontWeight: "600" }}>
            {loading
              ? "Loading..."
              : "₹ " + FinanceDetails.myExpense.toLocaleString("en-IN")}
          </p>
        </Card>
      </Flex>
      <IncomeModal
        showIncomeModal={showIncomeModal}
        setIncomeModal={setIncomeModal}
      />
      <ExpenseModal
        showExpenseModal={showExpenseModal}
        setExpenseModal={setExpenseModal}
        currBalance={FinanceDetails.myBalance}
      />
    </>
  );
};

export default Cards;
