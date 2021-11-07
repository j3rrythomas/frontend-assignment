import React from "react";
import styled from "styled-components";
import { Col } from "antd";

import { StyledRow } from "../styles";

const FlexCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 400;
`;
const ItemName = styled(FlexCol)``;
const ItemCost = styled(FlexCol)``;
const ItemQty = styled(FlexCol)``;

const InvoiceItem = ({ item, color, style }) => {
  return (
    <StyledRow
      gutter={[8, 32]}
      style={{ backgroundColor: color }}
      className="invoice-items-table"
    >
      <ItemName flex={2}>
        <>{item.name}</>
      </ItemName>
      <ItemCost flex={1}>
        <>₹{item.expense}</>
      </ItemCost>
      <ItemQty flex={1}>
        <>{item.quantity}</>
      </ItemQty>
    </StyledRow>
  );
};

export default InvoiceItem;
