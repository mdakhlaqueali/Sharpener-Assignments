import { createSlice } from "@reduxjs/toolkit";

const initialState = { isDarkTheme: false };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;