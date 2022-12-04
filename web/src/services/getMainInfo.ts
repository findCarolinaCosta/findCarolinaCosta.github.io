import axios from "axios";

export interface IMainInfo {
  role: string;
  homeDescription: string;
  aboutDescription: string;
  projects: number;
  homeImg: string;
}

export async function getMainInfo() {
  return (await axios.get(
    `${import.meta.env.VITE_SERVER_URL_API}/texts`
  )) as unknown as Promise<{ data: { ok: boolean; payload: IMainInfo[] } }>;
}
