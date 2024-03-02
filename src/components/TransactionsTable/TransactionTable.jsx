import React from "react";
// ant design Framework
import { Flex, Table } from "antd";
// Font Awesome library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// Button component
import Button from "../Button/Button";
// redux library
import { useSelector } from "react-redux";

import "./TransactionTable.css";
import { useState } from "react";

const TransactionTable = () => {
  // transactions state
  const { transactions } = useSelector((state) => state.userTransaction);
// searched transactions state  
 const [searchedTransaction,setSearched] = useState([]);



 function search(value)
 {
    if(value === "")
    {
        setSearched([]);
    }
    const arr = transactions.filter((val)=>(val.name.substring(0,value.length).toLowerCase() === value.toLowerCase()));
    
    setSearched(arr);
 }

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",

    },
    {
      title: "Type",
      dataIndex: "type",
      key: "id",
      filters: [
        { text: "income", value: "income" },
        { text: "expense", value: "expense" },
      ],
      onFilter: (value: string, record) => record.type.indexOf(value) === 0,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "id",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "id",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "id",
      responsive:['md']
    },
  ];

  return (
    <>
      <Flex vertical  gap={20}>
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
                onInput={(e)=>{
                    search(e.target.value);
                }}  
              ></input>
            </div>
          </Flex>
        </div>
        <Flex className="table-container" vertical >
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
              ></Button>
              <Button
                className={"import-button"}
                text={"Import from CSV"}
                backgroundColor={"var(--theame)"}
                color={"var(--white)"}
                borderColor={"var(--theame)"}
              ></Button>
            </Flex>
          </Flex>
          <Table
            columns={columns}
            scroll={{ y: 450 }}
            pagination={{ position: ["none"] }}
            dataSource={searchedTransaction.length > 0 ? searchedTransaction : transactions}
          ></Table>
        </Flex>
      </Flex>
    </>
  );
};

export default TransactionTable;
