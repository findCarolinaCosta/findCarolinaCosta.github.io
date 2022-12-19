import { createSlice } from "@reduxjs/toolkit";
import { Language } from "../../services/getMainInfo";

export enum Theme {
    "dark" = "DARK",
    "default" = "DEFAULT",
}

const initialState = {
    language: Language["en-us"],
    theme: Theme.default,
    icon: "uil-moon",
};

const settings = createSlice({
    name: "settings",
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
                    return { ...state, theme: Theme.dark, icon: "uil-sun" };

                default:
                    localStorage.setItem("theme-icon", "uil-moon");
                    return initialState;
            }
        },
        handleLanguage(state, action: { payload: Language; type: string }) {
            switch (action.payload) {
                case Language["pt-br"]:
                    return { ...state, language: Language["pt-br"] };
                case Language["en-us"]:
                    return { ...state, language: Language["en-us"] };

                default:
                    localStorage.setItem("theme-icon", "uil-moon");
                    return initialState;
            }
        },
    },
});

export const { handleTheme, handleLanguage } = settings.actions;
export default settings.reducer;
