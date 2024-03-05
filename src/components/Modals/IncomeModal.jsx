import React from "react";

// css
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

const IncomeModal = ({ showIncomeModal, setIncomeModal }) => {
  // form reference
  const [form] = Form.useForm();

  // dispatcher
  const dispatch = useDispatch();

  //   useAuthState hook
  const [user] = useAuthState(auth);

  //   Function to handle Form submission
  async function handleFormSubmit(values) {
    const data = {
      type: "income",
      ...values,
    };
    try {
      await addDoc(collection(db, `user/${user.uid}/transactions`), data);
      form.resetFields();
      toast.success("Transaction added successfully");
      dispatch(fetchData());
    } catch (error) {
      toast.error(error.message);
    }
  }

  //   Function to close form
  function handleModalClose() {
    form.resetFields();
    setIncomeModal(false);
  }
  return (
    <>
      <Modal
        open={showIncomeModal}
        onCancel={handleModalClose}
        footer={[]}
        title={"Add Income"}
      >
        <Form form={form} layout={"vertical"} onFinish={handleFormSubmit}>
          <Form.Item
            label={"Name"}
            name={"name"}
            rules={[{ required: true, message: "Please enter this field" }]}
          >
            <input
              type="text"
              placeholder="Enter income name"
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
              <option value={"Other"}>Select</option>
              <option value={"Salary"}>Salary</option>
              <option value={"Freelance"}>Freelance</option>
              <option value={"Investment"}>Investment</option>
              <option value={"Other"}>Other</option>
            </select>
          </Form.Item>
          <Form.Item>
            <Flex justify={"flex-start"}>
              <Button type={"primary"} htmlType={"submit"} style={{backgroundColor:"var(--theame)"}}>
                Add Income
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default IncomeModal;
