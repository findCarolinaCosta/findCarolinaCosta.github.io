import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IRequestState } from '../../redux/reducers/request';
import { IMainInfo } from '../../services/getMainInfo';
import { HomeImg } from './HomeImg';
import { HomeSkeleton } from './HomeSkeleton';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const request = useSelector(
    ({ request }: { request: IRequestState }) => request,
  );
  const mainInfo = useSelector(
    ({ mainInfo }: { mainInfo: IMainInfo }) => mainInfo,
  );
  const pathPt = usePathname()?.includes('pt-br');

  useEffect(() => {
    if (request) {
      setIsLoading(
        !(
          request.projects.length > 0 &&
          request.qualificationList.length > 0 &&
          request.services.length > 0 &&
          request.skillsList.length > 0
        ),
      );
    }
  }, [request]);

  if (isLoading) return <HomeSkeleton />;

  return (
    <section className="home section" id="home">
      <div className="home__conteiner container grid">
        <div className="home__content grid">
          <section className="home__social">
            <a
              href={process.env.NEXT_PUBLIC_LINKEDIN}
              className="home__social-icon"
              target="_blank"
            >
              <i className="uil uil-linkedin-alt"></i>
            </a>
            <a
              href={process.env.NEXT_PUBLIC_GITHUB}
              className="home__social-icon"
              target="_blank"
            >
              <i className="uil uil-github-alt"></i>
            </a>
          </section>
          <HomeImg />
          <section className="home__data">
            <h1 className="home__title">
              {pathPt ? 'Olá, sou Carolina' : "Hi, I'm Carolina"}
            </h1>
            <h3 className="home__subtitle">{mainInfo.role}</h3>
            <p className="home__description">{mainInfo.homeDescription}</p>
            <a href="#contact" className="button button--flex">
              {pathPt ? 'Contate-me' : 'Contact Me'}{' '}
              <i className="uil uil-message button__icon"></i>
            </a>
          </section>
        </div>
        <section className="home__scroll">
          <a href="#about" className="home__scroll-button button--flex">
            <i className="uil uil-mouse-alt home__scroll-mouse"></i>
            <span className="home__scroll-name">
              {pathPt ? 'Rolar para baixo' : 'Scroll down'}
            </span>
            <i className="uil uil-arrow-down home__scroll-arrow"></i>
          </a>
        </section>
      </div>
    </section>
  );
}
