import React from "react";
// ant design Framework
import { Flex, Table } from "antd";
// Font Awesome library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// Button component
import Button from "../Button/Button";
// redux library
import { useSelector, useDispatch } from "react-redux";
import { fetchData, setLoading } from "../../Slice/userTransaction";

// papaparse library
import Papa from "papaparse";

// firbase hook
import { useAuthState } from "react-firebase-hooks/auth";

// firbase library
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

import "./TransactionTable.css";

import { useState } from "react";
import { toast } from "react-toastify";

const TransactionTable = () => {
  // transactions state
  const { transactions } = useSelector((state) => state.userTransaction);
  // searched transactions state
  const [searchedTransaction, setSearched] = useState([]);

  // auth state hook
  const [user] = useAuthState(auth);

  // dispatcher
  const dispatch = useDispatch();

  // function to handle search
  function search(value) {
    if (value === "") {
      setSearched([]);
    }
    const arr = transactions.filter(
      (val) =>
        val.name.substring(0, value.length).toLowerCase() ===
        value.toLowerCase()
    );

    setSearched(arr);
  }

  // function to Import File csv
  function ImportCsv() {
    const Input = document.createElement("input");

    Input.type = "file";
    Input.accept = ".csv";
    Input.onchange = function (e) {
      const fileReader = new FileReader(e.target.files[0]);
      fileReader.readAsText(e.target.files[0]);
      fileReader.onload = async function (event) {
        try {
          dispatch(setLoading(true));
          const parsedValue = Papa.parse(event.target.result);
          const { data } = parsedValue;
          data.shift();
          for (const transactions of data) {
            let newTransaction = {
              name: transactions[0],
              type: transactions[1],
              amount: transactions[2],
              date: transactions[3],
              tag: transactions[4],
            };

            await addDoc(
              collection(db, `user/${user.uid}/transactions`),
              newTransaction
            );
          }
          dispatch(fetchData());
        } catch (error) {
          dispatch(setLoading(false));
          toast.error(error.message);
        }
      };
    };
    Input.click();
  }

  // function to export csv
  function exportCsv() {
    if (transactions.length === 0) {
      toast.warn("No data to export");
      return;
    }

    const csv = Papa.unparse({
      fields: ["name", "type", "amount", "date", "tag"],
      data: transactions,
    });

    const blobObj = new Blob([csv], { type: "text/csv" });

    const blobURL = URL.createObjectURL(blobObj);

    const a = document.createElement("a");

    a.href = blobURL;

    a.download = "transactions.csv";

    a.click();
  }

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "1",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "2",
      filters: [
        { text: "income", value: "income" },
        { text: "expense", value: "expense" },
      ],
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "3",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "4",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "5",
      responsive: ["md"],
      filters: [
        { text: "Miscellaneous", value: "Miscellaneous" },
        { text: "Shopping", value: "Shopping" },
        { text: "Food", value: "Food" },
        { text: "Entertainment", value: "Entertainment" },
        { text: "Other", value: "Other" },
        { text: "Salary", value: "Salary" },
        { text: "Investment", value: "Investment" },
        { text: "Freelance", value: "Freelance" },
      ],
      onFilter: (value, record) => record.tag.includes(value),
    },
  ];

  return (
    <>
      <Flex vertical gap={20}>
        <div className="search-box">
          <Flex
            align={"center"}
            style={{ boxShadow: "var(--shadowEffect)", borderRadius: "5px" }}
          >
            <div className="search-icon">
              <FontAwesomeIcon icon={faMagnifyingGlass} color="grey" />
            </div>
            <div>
              <input
                className="table-search"
                placeholder="Search by Name"
                type="text"
                onInput={(e) => {
                  search(e.target.value);
                }}
              ></input>
            </div>
          </Flex>
        </div>
        <Flex className="table-container" vertical>
          <Flex
            justify={"space-between"}
            align={"center"}
            style={{ padding: "1rem" }}
          >
            <p className="table-heading">My Transactions</p>
            <Flex gap={10}>
              <Button
                className={"export-button"}
                backgroundColor={"var(--white)"}
                color={"var(--theame)"}
                borderColor={"var(--theame)"}
                text={"Export to CSV"}
                onClick={exportCsv}
              ></Button>
              <Button
                className={"import-button"}
                text={"Import from CSV"}
                backgroundColor={"var(--theame)"}
                color={"var(--white)"}
                borderColor={"var(--theame)"}
                onClick={ImportCsv}
              ></Button>
            </Flex>
          </Flex>
          <Table
            columns={columns}
            scroll={{ y: 450 }}
            dataSource={
              searchedTransaction.length > 0
                ? searchedTransaction
                : transactions
            }
          ></Table>
        </Flex>
      </Flex>
    </>
  );
};

export default TransactionTable;
