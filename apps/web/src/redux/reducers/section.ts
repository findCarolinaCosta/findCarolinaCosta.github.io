import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeSection: 'home',
  sections: [
    { pt: 'Início', en: 'Home', icon: 'uil-estate' },
    { pt: 'Sobre', en: 'About', icon: 'uil-user' },
    { pt: 'Habilidades', en: 'Skills', icon: 'uil-file-alt' },
    { pt: 'Qualificações', en: 'Qualification', icon: 'uil-graduation-cap' },
    { pt: 'Serviços', en: 'Services', icon: ' uil-briefcase-alt' },
    { pt: 'Portfólio', en: 'Portfolio', icon: 'uil-scenery' },
    { pt: 'Contato', en: 'Contact', icon: 'uil-message' },
  ],
};

const section = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    handleActiveSection(
      state,
      action: {
        payload: string;
        type: string;
      },
    ) {
      switch (action.payload) {
        case action.payload:
          return { ...state, activeSection: action.payload };

        default:
          return initialState;
      }
    },
  },
});

export const { handleActiveSection } = section.actions;
export default section.reducer;
