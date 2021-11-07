import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Table, Typography } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const { Title } = Typography;

const InvoicesDiv = styled.div`
  margin: 2%;
`;
const InvoicesTable = styled(Table)`
  margin: 2% 0;
  thead {
    .ant-table-cell {
      font-size: 1.125rem;
      font-weight: 400;
    }
  }
  tbody {
    .ant-table-row {
      cursor: pointer;
    }
  }
`;

const Invoices = () => {
  const columns = [
    {
      title: "Invoice Number",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "No. of items",
      dataIndex: "items",
      key: "items",
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  const history = useHistory();
  const invoices = useSelector((state) => state.data.invoices);
  const [modifiedInvoices, setModifiedInvoices] = useState([]);
  useEffect(() => {
    setModifiedInvoices(
      invoices.map((invoice) => {
        return {
          key: invoice.id + 1,
          amount: invoice.totalAmt,
          items: invoice.items.length,
          status: "Paid",
        };
      })
    );
  }, [invoices]);
  const handleTableClick = (invoiceId) => {
    history.push(`/invoice/${invoiceId}`);
  };
  return (
    <InvoicesDiv>
      <Title>Invoices</Title>
      <Button type="primary" size="large" onClick={()=>history.push('/create-invoice')}>Create New Invoice</Button>
      <InvoicesTable
        columns={columns}
        dataSource={modifiedInvoices}
        pagination={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              handleTableClick(rowIndex);
            },
          };
        }}
      />
    </InvoicesDiv>
  );
};

export default Invoices;
