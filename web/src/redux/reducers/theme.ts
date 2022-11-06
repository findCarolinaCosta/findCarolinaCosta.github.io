import { createSlice } from "@reduxjs/toolkit";

export enum Theme {
  "dark" = "DARK",
  "default" = "DEFAULT",
}

const initialState = { theme: Theme.default, icon: "uil-moon" };

const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    handleTheme(
      state,
      action: {
        payload: Theme;
        type: string;
      }
    ) {
      localStorage.setItem("theme", action.payload);
      switch (action.payload) {
        case Theme.dark:
          localStorage.setItem("theme-icon", "uil-sun");
          return { theme: Theme.dark, icon: "uil-sun" };

        default:
          localStorage.setItem("theme-icon", "uil-moon");
          return initialState;
      }
    },
  },
});

export const { handleTheme } = theme.actions;
export default theme.reducer;
