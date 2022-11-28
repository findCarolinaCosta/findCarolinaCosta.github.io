import axios from "axios";
import { useEffect, useState } from "react";
import { IProject, Portfolio } from "./PortfolioContainer";

export function Portfolios() {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    if (projects.length == 0) {
      (
        axios.get(
          `${import.meta.env.VITE_SERVER_URL_API}/projects`
        ) as unknown as Promise<{ data: { ok: boolean; payload: IProject[] } }>
      ).then((response) => setProjects(response.data.payload));
    }
  }, []);

  return (
    <section className="portfolio section" id="portfolio">
      <h2 className="section__title">Portfolio</h2>
      <span className="section__subtitle">Most recent project</span>
      {projects.length > 0 && <Portfolio.Default projectList={projects} />}
    </section>
  );
}
