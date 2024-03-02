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
import { useSelector } from "react-redux";
const Cards = () => {
  // show Income Modal
  const [showIncomeModal, setIncomeModal] = useState(false);

  // show Expense Modal
  const [showExpenseModal, setExpenseModal] = useState(false);

  // finance details state
  const [FinanceDetails, setFinanceDetails] = useState({
    myIncome: 0,
    myExpense: 0,
    myBalance: 0,
  });

  // transactions state
  const { transactions } = useSelector((state) => state.userTransaction);
  console.log(transactions);
  
  
  useEffect(()=>{
    calculateBalance();
  },[transactions]);


  // function to calculate balance
  function calculateBalance(){
    let income = 0;
    let expense = 0;

    for(let i= 0 ; i< transactions.length ; i++){
      if(transactions[i].type === "income")
      {
          income += Number(transactions[i].amount);
      }
      else{
        expense += Number(transactions[i].amount);
      }
    }
    // setting the amounts
    setFinanceDetails((prev)=>{
      return {...prev, myBalance:Math.abs(income-expense), myIncome:parseFloat(income), myExpense:parseFloat(expense)};
    })
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
            />,
          ]}
        >
          <p style={{ fontWeight: "600" }}>₹ {FinanceDetails.myBalance.toLocaleString("en-IN")}</p>
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
                setIncomeModal(true);
              }}
            />,
          ]}
        >
          <p style={{ fontWeight: "600", fontSize: "1rem" }}>₹ {FinanceDetails.myIncome.toLocaleString("en-IN")}</p>
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
                setExpenseModal(true);
              }}
            />,
          ]}
        >
          <p style={{ fontWeight: "600" }}>₹ {FinanceDetails.myExpense.toLocaleString("en-IN")}</p>
        </Card>
      </Flex>
      <IncomeModal
        showIncomeModal={showIncomeModal}
        setIncomeModal={setIncomeModal}
      />
      <ExpenseModal
        showExpenseModal={showExpenseModal}
        setExpenseModal={setExpenseModal}
      />
    </>
  );
};

export default Cards;
