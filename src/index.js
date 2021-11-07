import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./reducers";
import { CreateInvoice, Invoice, Invoices } from "./pages";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <React.StrictMode>
        <BrowserRouter>
          <Switch>
            <Route exact path="/create-invoice" component={CreateInvoice} />
            <Route exact path="/invoice/:invoice_id" component={Invoice} />
            <Route exact path="/invoices" component={Invoices} />
            <Route exact path="/" component={App} />
          </Switch>
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
