import styled from "styled-components";
import { Button, Typography } from "antd";
import { useHistory } from "react-router";

import "./App.css";

const { Title } = Typography;
const AppDiv = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const OptionButtons = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 1200px) {
    width: 50%;
  } ;
`;
const App = () => {
  const history = useHistory();
  return (
    <AppDiv>
      <Title style={{ fontSize: "3rem", fontWeight: 600 }}>Invoicing App</Title>
      <OptionButtons>
        <Button
          size="large"
          type="primary"
          onClick={() => history.push("/create-invoice")}
        >
          Create Invoice
        </Button>
        <Button size="large" onClick={() => history.push("/invoices")}>
          View Invoices
        </Button>
      </OptionButtons>
    </AppDiv>
  );
};

export default App;
