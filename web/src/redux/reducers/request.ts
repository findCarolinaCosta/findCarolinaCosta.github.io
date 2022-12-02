import { createSlice } from "@reduxjs/toolkit";
import { IProject } from "../../components/Portfolio/PortfolioContainer";
import { IQualifications } from "../../components/Qualification";
import { IService } from "../../components/Services";
import { skillsList } from "../../components/Skills";

export interface IRequestState {
  qualificationList: IQualifications[];
  projects: IProject[];
  services: IService[];
  skillsList: skillsList[];
}

const initialState: IRequestState = {
  qualificationList: [],
  projects: [],
  services: [],
  skillsList: [],
};

const request = createSlice({
  name: "request",
  initialState,
  reducers: {
    setRequest(
      state,
      action: {
        payload: {
          data: IQualifications[] | IProject[] | IService[] | skillsList[];
          type: string;
        };
      }
    ) {
      switch (action.payload.type) {
        case "qualifications":
          return {
            ...state,
            qualificationList: action.payload.data as IQualifications[],
          };

        case "projects":
          return { ...state, projects: action.payload.data as IProject[] };

        case "services":
          return { ...state, services: action.payload.data as IService[] };

        case "skills":
          return { ...state, skillsList: action.payload.data as skillsList[] };

        default:
          return state;
      }
    },
  },
});

export const { setRequest } = request.actions;
export default request.reducer;
