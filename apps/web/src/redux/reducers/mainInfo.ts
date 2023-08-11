import { createSlice } from '@reduxjs/toolkit';

import { IMainInfo } from '../../services/getMainInfo';

const initialState = {};

const mainInfo = createSlice({
  name: 'mainInfo',
  initialState,
  reducers: {
    setMainInfo(
      _state,
      action: {
        payload: {
          data: IMainInfo;
          type?: string;
        };
      },
    ) {
      switch (action.payload) {
        case action.payload:
          return action.payload.data;

        default:
          return initialState;
      }
    },
  },
});

export const { setMainInfo } = mainInfo.actions;
export default mainInfo.reducer;
