import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRequestState, setRequest } from '../../redux/reducers/request';
import { axiosInstance } from '../../services/axios';
import { Language } from '../../services/getMainInfo';
import { alreadyRequestsDone } from '../../utils/alreadyRequestsDone';
import { IProject, Portfolio } from './PortfolioContainer';

export function Portfolios() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const dispatch = useDispatch();
  const isAlreadyRequestsDone = useSelector(
    ({ request }: { request: IRequestState }) => alreadyRequestsDone(request),
  );
  const pathPt = usePathname().includes('pt-br');

  useEffect(() => {
    if (projects.length == 0) {
      (
        axiosInstance.get(`/projects`, {
          params: {
            language: pathPt ? Language['pt-br'] : Language['en-us'],
          },
        }) as unknown as Promise<{ data: { ok: boolean; payload: IProject[] } }>
      ).then((response) => setProjects(response.data.payload));
    }
  }, [pathPt, projects.length]);

  useEffect(() => {
    dispatch(
      setRequest({
        type: 'projects',
        data: projects,
      }),
    );
  }),
    [projects];

  return (
    <section
      className={`portfolio section ${
        !isAlreadyRequestsDone && 'display__none'
      }`}
      id="portfolio"
    >
      <h2 className="section__title">Portfolio</h2>
      <span className="section__subtitle">
        {pathPt
          ? `Projeto${projects.length > 1 ? 's' : ''} mais recente`
          : `Most recent project${projects.length > 1 ? 's' : ''}`}
      </span>
      {projects.length > 0 && <Portfolio.Default projectList={projects} />}
    </section>
  );
}
