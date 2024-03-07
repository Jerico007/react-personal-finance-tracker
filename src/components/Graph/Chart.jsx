import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts";

import "./Chart.css";

const Chart = ({ data }) => {
  const initialState = {
    income: 0,
    expense: 0,
  };

  const InitialIncome = {
    Other: 0,
    Salary: 0,
    Freelance: 0,
    Investment: 0,
  };

  const InitialExpense = {
    Miscellaneous: 0,
    Shopping: 0,
    Food: 0,
    Entertainment: 0,
  };
  // useState for income/expense calculation
  const [incExp, setIncExp] = useState(initialState);

  // useState for incomeSource
  const [incomeSource, setIncomeSource] = useState(InitialIncome);

  // useState for expenseSource
  const [expenseSource, setExpenseSource] = useState(InitialExpense);

  // Function to track Income/Expenses
  function trackIncomeExpense() {
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === "income") {
        setIncExp((prev) => ({
          ...prev,
          income: prev.income + Number(data[i].amount),
        }));
      } else {
        setIncExp((prev) => ({
          ...prev,
          expense: prev.expense + Number(data[i].amount),
        }));
      }
    }
  }
  // Function to track Income expenses Sources
  function trackSources() {
    for (let i = 0; i < data.length; i++) {
      if (InitialIncome.hasOwnProperty(data[i].tag)) {
        InitialIncome[data[i].tag] += Number(data[i].amount);
      }
      if (InitialExpense.hasOwnProperty(data[i].tag)) {
        InitialExpense[data[i].tag] += Number(data[i].amount);
      }
    }
    setIncomeSource({ ...InitialIncome });
    setExpenseSource({ ...InitialExpense });
  }

  // useEffect to recalculate data
  useEffect(() => {
    setIncExp(initialState);
    setExpenseSource(InitialExpense);
    setIncomeSource(InitialIncome);
    trackIncomeExpense();
    trackSources();
  }, [data]);

  return (
    <div className="Chart">
      <div style={{ borderRadius: "5px", boxShadow: "var(--shadowEffect)" }}>
        <p className="chart-label">Income/expense</p>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: incExp.expense, label: "Expense" },
                {
                  id: 1,
                  value: Math.abs(incExp.income - incExp.expense),
                  label: "Balance",
                },
              ],

              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          width={400}
          height={200}
        />
      </div>
      <div style={{ borderRadius: "5px", boxShadow: "var(--shadowEffect)" }}>
        <p className="chart-label">Income Sources</p>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: incomeSource.Other, label: "Other" },
                {
                  id: 1,
                  value: incomeSource.Salary,
                  label: "Salary",
                },
                {
                  id: 2,
                  value: incomeSource.Investment,
                  label: "Investment",
                },
                {
                  id: 3,
                  value: incomeSource.Freelance,
                  label: "FreeLance",
                },
              ],

              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              innerRadius: 38,
              outerRadius: 98,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 270,
            },
          ]}
          width={400}
          height={200}
        />
      </div>
      {incExp.expense > 0 ? (
        <div style={{ borderRadius: "5px", boxShadow: "var(--shadowEffect)" }}>
          <p className="chart-label">Expense Sources</p>
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: expenseSource.Miscellaneous,
                    label: "Miscellaneous",
                  },
                  {
                    id: 1,
                    value: expenseSource.Shopping,
                    label: "Shopping",
                  },
                  {
                    id: 2,
                    value: expenseSource.Food,
                    label: "Food",
                  },
                  {
                    id: 3,
                    value: expenseSource.Entertainment,
                    label: "Entertainment",
                  },
                ],

                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
                innerRadius: 38,
                outerRadius: 98,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 270,
                cx: 130,
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Chart;
