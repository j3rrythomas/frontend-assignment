import React from "react";
import styled from "styled-components";
import {
  Form,
  Space,
  Input,
  Button,
  InputNumber,
  Typography,
  DatePicker,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { appendInvoice, incrementNumInvoices } from "../reducers/dataSlice";

const { Title } = Typography;

const InvoiceForm = styled(Form)`
  margin: 2%;
  @media (min-width: 1400px) {
    width: 30%;
  }
`;
const FormTitle = styled(Title)`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;
const FormButtonItems = styled(Form.Item)`
  button {
    width: 50%;
  }
  .ant-form-item-control-input-content {
    display: flex;
    justify-content: center;
  }
`;
const StyledSpace = styled(Space)`
  display: flex;
  margin-bottom: 8;
`;
const StyledInputNumber=styled(InputNumber)`
  width: 100%;
`;

const CreateInvoiceForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const numInvoices = useSelector((state) => state.data.numInvoices);
  const createInvoice = (invoiceData) => {
    invoiceData.due_date = invoiceData.due_date.format();
    invoiceData = { id: numInvoices, ...invoiceData };
    let totalAmt = 0;
    invoiceData.items.forEach((item) => {
      totalAmt += item.expense * item.quantity;
    });
    dispatch(incrementNumInvoices());
    dispatch(appendInvoice({ totalAmt, ...invoiceData }));
    history.push(`/invoice/${numInvoices}`);
  };
  return (
    <InvoiceForm
      name="create-invoice-form"
      onFinish={createInvoice}
      layout="vertical"
    >
      <Form.Item>
        <FormTitle>Create Invoice</FormTitle>
      </Form.Item>

      <Form.List
        name="items"
        rules={[
          {
            validator: async (_, items) => {
              if (!items || items.length < 1) {
                return Promise.reject(new Error("No items in invoice"));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            <Form.ErrorList errors={errors} />
            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
              <StyledSpace key={key} align={index !== 0 ? "baseline" : "center"}>
                <Form.Item
                  {...restField}
                  name={[name, "name"]}
                  label={index === 0 ? "Item" : ""}
                  fieldKey={[fieldKey, "name"]}
                  rules={[{ required: true, message: "Enter line item" }]}
                >
                  <Input placeholder="Line Item" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "expense"]}
                  label={index === 0 ? "Expense(In Rupees)" : ""}
                  fieldKey={[fieldKey, "expense"]}
                  rules={[{ required: true, message: "Enter item expense" }]}
                >
                  <StyledInputNumber
                    placeholder="Item Expense"
                    controls={false}
                    min={1}
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={index === 0 ? "Quantity" : ""}
                  name={[name, "quantity"]}
                  fieldKey={[fieldKey, "quantity"]}
                  initialValue={1}
                >
                  <InputNumber placeholder="Qty." min={1} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </StyledSpace>
            ))}
            <FormButtonItems>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Item
              </Button>
            </FormButtonItems>
          </>
        )}
      </Form.List>
      <Form.Item
        label="Due Date"
        wrapperCol={24}
        name="due_date"
        rules={[{ required: true, message: "Enter due date" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item label="Notes" wrapperCol={24} name="notes">
        <Input.TextArea rows={4} />
      </Form.Item>
      <FormButtonItems>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormButtonItems>
    </InvoiceForm>
  );
};

export default CreateInvoiceForm;
