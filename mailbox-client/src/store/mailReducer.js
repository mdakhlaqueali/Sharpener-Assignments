import { createSlice } from "@reduxjs/toolkit";

const initialMailState = { mails: [] };

const mailSlice = createSlice({
  name: "mails",
  initialState: initialMailState,
  reducers: {
    addMail(state, action) {
      // // Check if the payload is an array or a single object
      // const newMails = Array.isArray(action.payload) ? action.payload : [action.payload];

      // // Add the new mails to the existing array
      // state.mails = [...state.mails, ...newMails];
      state.mails = action.payload;
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;