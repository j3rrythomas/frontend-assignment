import { createSlice } from "@reduxjs/toolkit";

const initialDataState = {
  invoices: [],
  numInvoices: 0,
};

export const dataSlice = createSlice({
  name: "data",
  initialState: initialDataState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    appendInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    incrementNumInvoices: (state) => {
      state.numInvoices += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInvoices, appendInvoice,incrementNumInvoices } = dataSlice.actions;

export default dataSlice.reducer;
