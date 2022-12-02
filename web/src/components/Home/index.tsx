import { HomeImg } from "./HomeImg";
import { HomeSkeleton } from "./HomeSkeleton";
import { useSelector } from "react-redux";
import { IRequestState } from "../../redux/reducers/request";
import { useEffect, useState } from "react";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const request = useSelector(
    ({ request }: { request: IRequestState }) => request
  );

  useEffect(() => {
    if (request) {
      setIsLoading(
        !(
          request.projects.length > 0 &&
          request.qualificationList.length > 0 &&
          request.services.length > 0 &&
          request.skillsList.length > 0
        )
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
              href={import.meta.env.VITE_LINKEDIN}
              className="home__social-icon"
              target="_blank"
            >
              <i className="uil uil-linkedin-alt"></i>
            </a>
            <a
              href={import.meta.env.VITE_GITHUB}
              className="home__social-icon"
              target="_blank"
            >
              <i className="uil uil-github-alt"></i>
            </a>
          </section>
          <HomeImg />
          <section className="home__data">
            <h1 className="home__title">Hi, I'm Carolina</h1>
            <h3 className="home__subtitle">Frontend developer</h3>
            <p className="home__description">
              I'm currently studying web development at Trybe, with completion
              expected in July 2022.
            </p>
            <a href="#contact" className="button button--flex">
              Contact Me <i className="uil uil-message button__icon"></i>
            </a>
          </section>
        </div>
        <section className="home__scroll">
          <a href="#about" className="home__scroll-button button--flex">
            <i className="uil uil-mouse-alt home__scroll-mouse"></i>
            <span className="home__scroll-name">Scroll down</span>
            <i className="uil uil-arrow-down home__scroll-arrow"></i>
          </a>
        </section>
      </div>
    </section>
  );
}
