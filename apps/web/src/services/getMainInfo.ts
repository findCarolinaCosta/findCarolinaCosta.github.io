import axios from 'axios';

import { axiosInstance } from './axios';

export interface IMainInfo {
  role: string;
  homeDescription: string;
  aboutDescription: string;
  projects: number;
  homeImg: string;
  resume: string;
}

export enum Language {
  'pt-br' = 'pt-br',
  'en-us' = 'en-us',
}

export async function getMainInfo(language: Language) {
  return (await axiosInstance.get(`/texts`, {
    params: { language },
  })) as unknown as Promise<{ data: { ok: boolean; payload: IMainInfo[] } }>;
}
