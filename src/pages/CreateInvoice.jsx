import React from "react";
import styled from "styled-components";

import { CreateInvoiceForm } from "../components";

const CreateInvoiceDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
`;
const CreateInvoice = () => {
  return (
    <CreateInvoiceDiv>
      <CreateInvoiceForm />
    </CreateInvoiceDiv>
  );
};

export default CreateInvoice;
