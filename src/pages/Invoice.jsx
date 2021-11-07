import React from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Typography, Col, Button, message } from "antd";

import { InvoiceItem } from "../components";
import { StyledRow } from "../styles";

const { Title } = Typography;
const InvoiceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InvoiceTitle = styled(Title)`
  margin-top: 2%;
  font-size: 1.25rem;
`;
const InvoiceDetailsDiv = styled.div`
  width: 75%;
  .invoice-items-table {
    border: 1px solid #020202;
  }
`;
const InvoiceStatus = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  padding: 2%;
  span {
    padding: 2%;
    background-color: ${(props) =>
      props.status === "paid" ? "#27D563" : "#ff0000"};
    color: #ffffff;
  }
`;
const MailInvoiceButton = styled(Button)`
  margin: 2%;
`;
const InvoiceHeaderRow = styled(StyledRow)`
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
`;
const InvoiceDataRow = styled(InvoiceHeaderRow)`
  font-size: 1.375rem;
`;
const Invoice = () => {
  const history = useHistory();
  const { invoice_id } = useParams();
  const invoiceData = useSelector(
    (state) =>
      state.data.invoices.filter(
        (invoice) => invoice.id === Number(invoice_id)
      )[0]
  );
  return (
    <InvoiceContainer>
      {invoiceData === undefined ? (
        <InvoiceTitle>Invoice not Found</InvoiceTitle>
      ) : (
        <InvoiceDetailsDiv>
          <InvoiceTitle>Invoice No. {invoiceData.id + 1}</InvoiceTitle>

          <MailInvoiceButton
            size="large"
            type="primary"
            onClick={() => message.success("Email sent")}
          >
            Email Invoice
          </MailInvoiceButton>
          <Button size="large" onClick={() => history.push("/invoices")}>
            View All Invoices
          </Button>
          <InvoiceHeaderRow gutter={[8, 32]} className="invoice-items-table">
            <Col flex={2}>Item Name</Col>
            <Col flex={1}>Cost/Expense</Col>
            <Col flex={1}>Quantity</Col>
          </InvoiceHeaderRow>

          {invoiceData.items.map((item, index) => {
            const bgColor = index % 2 === 0 ? "#F7F7F7" : "#FFFFFF";
            return <InvoiceItem key={index} item={item} color={bgColor} />;
          })}
          <InvoiceDataRow gutter={[8, 32]}>
            <Col flex={3} style={{ textAlign: "end" }}>
              Total Amount:
            </Col>
            <Col flex={1} style={{ textAlign: "center" }}>
              ₹{invoiceData.totalAmt}
            </Col>
          </InvoiceDataRow>
          <InvoiceDataRow gutter={[8, 32]}>
            <Col flex={2}>Due Date: 30/11/2021</Col>
            <Col flex={2}>
              <InvoiceStatus status="paid">
                Status: <span>Paid</span>
              </InvoiceStatus>
            </Col>
          </InvoiceDataRow>
        </InvoiceDetailsDiv>
      )}
    </InvoiceContainer>
  );
};

export default Invoice;
