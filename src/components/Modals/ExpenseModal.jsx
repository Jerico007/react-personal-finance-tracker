import React from "react";

import "./modal.css";

// firbase hook
import { useAuthState } from "react-firebase-hooks/auth";

// firbase library
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

// antd framework
import { Modal, Form, Flex, Button } from "antd";
// react toastify library
import { toast } from "react-toastify";

// redux library
import { useDispatch } from "react-redux";
import { fetchData } from "../../Slice/userTransaction";

const ExpenseModal = ({ showExpenseModal, setExpenseModal }) => {
  // Form reference
  const [form] = Form.useForm();

  //   useAuthState hook
  const [user] = useAuthState(auth);

    // dispatcher
    const dispatch = useDispatch();

  //   Function to handle Form submission
  async function handleFormSubmit(values) {
    const data = {
      type: "expense",
      ...values,
    };

    try {
      await addDoc(collection(db, `user/${user.uid}/transactions`), data);
      toast.success("Transaction added successfully");
      form.resetFields();
      dispatch(fetchData());
    } catch (error) {
      toast.error(error.message);
    }
  }

  //   Function to close form
  function handleModalClose() {
    form.resetFields();
    setExpenseModal(false);
  }
  return (
    <>
      <Modal
        open={showExpenseModal}
        onCancel={handleModalClose}
        footer={[]}
        title={"Add Expense"}
      >
        <Form form={form} layout={"vertical"} onFinish={handleFormSubmit}>
          <Form.Item
            label={"Name"}
            name={"name"}
            rules={[{ required: true, message: "Please enter this field" }]}
          >
            <input
              type="text"
              placeholder="Enter expense name"
              className="form-input"
            />
          </Form.Item>
          <Form.Item
            label={"Amount"}
            name={"amount"}
            rules={[{ required: true, message: "Please enter amount" }]}
          >
            <input
              type="number"
              min={1}
              placeholder={"Enter amount"}
              className="form-input"
            />
          </Form.Item>
          <Form.Item
            label={"Date"}
            name={"date"}
            rules={[{ required: true, message: "Please enter date" }]}
          >
            <input
              type="date"
              className="form-input"
              style={{ color: "#7a7979" }}
            />
          </Form.Item>
          <Form.Item
            label={"Tag"}
            name={"tag"}
            hasFeedback
            rules={[{ required: true, message: "Please Select one" }]}
          >
            <select className="form-input" style={{ color: "#7a7979" }}>
              <option value={"none"}>Select</option>
              <option value={"Shopping"}>Shopping</option>
              <option value={"Food"}>Food</option>
              <option value={"Entertainment"}>Entertainment</option>
              <option value={"Miscellaneous"}>Miscellaneous</option>
            </select>
          </Form.Item>
          <Form.Item>
            <Flex justify={"flex-start"}>
              <Button type={"primary"} htmlType={"submit"}>
                Add Expense
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ExpenseModal;
