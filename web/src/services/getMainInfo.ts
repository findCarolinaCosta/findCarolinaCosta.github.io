import axios from "axios";

export interface IMainInfo {
  role: string;
  homeDescription: string;
  aboutDescription: string;
  projects: number;
  homeImg: string;
}

export enum Language {
  "pt-br" = "pt-br",
  "en-us" = "en-us",
}

export async function getMainInfo(language: Language) {
  return (await axios.get(`${import.meta.env.VITE_SERVER_URL_API}/texts`, {
    params: { language },
  })) as unknown as Promise<{ data: { ok: boolean; payload: IMainInfo[] } }>;
}
