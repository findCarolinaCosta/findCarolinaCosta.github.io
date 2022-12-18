import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { IRequestState, setRequest } from "../../redux/reducers/request";
import { alreadyRequestsDone } from "../../utils/alreadyRequestsDone";
import { IProject, Portfolio } from "./PortfolioContainer";

export function Portfolios() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const dispatch = useDispatch();
  const isAlreadyRequestsDone = useSelector(
    ({ request }: { request: IRequestState }) => alreadyRequestsDone(request)
  );
  const pathPt = useLocation().pathname.includes("pt-br");

  useEffect(() => {
    if (projects.length == 0) {
      (
        axios.get(
          `${import.meta.env.VITE_SERVER_URL_API}/projects`
        ) as unknown as Promise<{ data: { ok: boolean; payload: IProject[] } }>
      ).then((response) => setProjects(response.data.payload));
    }
  }, []);

  useEffect(() => {
    dispatch(
      setRequest({
        type: "projects",
        data: projects,
      })
    );
  }),
    [projects];

  return (
    <section
      className={`portfolio section ${
        !isAlreadyRequestsDone && "display__none"
      }`}
      id="portfolio"
    >
      <h2 className="section__title">Portfolio</h2>
      <span className="section__subtitle">{pathPt ? `Projeto${projects.length > 1 ? 's' : ''} mais recente` : `Most recent project${projects.length > 1 ? 's' : ''}`}</span>
      {projects.length > 0 && <Portfolio.Default projectList={projects} />}
    </section>
  );
}
