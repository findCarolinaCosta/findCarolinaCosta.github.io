import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { IRequestState } from "../../redux/reducers/request";
import { IMainInfo } from "../../services/getMainInfo";
import { alreadyRequestsDone } from "../../utils/alreadyRequestsDone";
import { AboutSkeleton } from "./AboutSkeleton";

export function About() {
  const [isLoading, setIsLoading] = useState(true);
  const isAlreadyRequestsDone = useSelector(
    ({ request }: { request: IRequestState }) => alreadyRequestsDone(request)
  );
  const mainInfo = useSelector(
    ({ mainInfo }: { mainInfo: IMainInfo }) => mainInfo
  );
  const pathPt = useLocation().pathname.includes("pt-br");

  useEffect(() => {
    if (isAlreadyRequestsDone) {
      setIsLoading(!isAlreadyRequestsDone);
    }
  }, [isAlreadyRequestsDone]);

  if (isLoading) return <AboutSkeleton />;

  return (
    <section className="about section" id="about">
      <h2 className="section__title">{pathPt ? 'Sobre mim' : 'About Me'}</h2>
      <span className="section__subtitle">{pathPt ? 'Introdução' : 'My introduction'}</span>
      <div className="about__container container grid">
        {/* <!-- <img src="assets/images/secao-about-me.jpg" alt="" className="about__img"> --> */}
        <div className="about__data">
          <p className="about__description">{mainInfo.aboutDescription}</p>
          <div className="about__info">
            <div>
              <span className="about__info-title">{mainInfo.projects}+</span>
              <span className="about__info-name">
                Projeto{mainInfo.projects > 1 ? 's' : '' }  <br /> concluído{mainInfo.projects > 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <div className="about__buttons">
            <a
              download=""
              href={import.meta.env.VITE_RESUME_FULLSTACK}
              className="button button--flex"
            >
              {pathPt ? 'Baixar currículo': 'Download CV'}<i className="uil uil-download-alt button__icon"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
