import { createSlice } from "@reduxjs/toolkit";

const initialState = { activeSection: "home", sections: ["home"] };

const section = createSlice({
  name: "theme",
  initialState,
  reducers: {
    handleActiveSection(
      state,
      action: {
        payload: string;
        type: string;
      }
    ) {
      switch (action.payload) {
        case action.payload:
          return { sections: state.sections, activeSection: action.payload };

        default:
          return initialState;
      }
    },

    setSections(
      state,
      action: {
        payload: string[];
        type: string;
      }
    ) {
      switch (action.payload) {
        case action.payload:
          return {
            activeSection: state.activeSection,
            sections: action.payload,
          };

        default:
          return initialState;
      }
    },
  },
});

export const { handleActiveSection, setSections } = section.actions;
export default section.reducer;
