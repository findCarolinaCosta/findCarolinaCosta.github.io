import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRequestState } from "../../redux/reducers/request";
import { alreadyRequestsDone } from "../../utils/alreadyRequestsDone";
import { AboutSkeleton } from "./AboutSkeleton";

export function About() {
  const [isLoading, setIsLoading] = useState(true);
  const isAlreadyRequestsDone = useSelector(
    ({ request }: { request: IRequestState }) => alreadyRequestsDone(request)
  );

  useEffect(() => {
    if (isAlreadyRequestsDone) {
      setIsLoading(!isAlreadyRequestsDone);
    }
  }, [isAlreadyRequestsDone]);

  if (isLoading) return <AboutSkeleton />;

  return (
    <section className="about section" id="about">
      <h2 className="section__title">About Me</h2>
      <span className="section__subtitle">My introduction</span>
      <div className="about__container container grid">
        {/* <!-- <img src="assets/images/secao-about-me.jpg" alt="" className="about__img"> --> */}
        <div className="about__data">
          <p className="about__description">
            Web development student and that's where I found myself, I gained
            experience working in a team, thus strengthening and adapting my
            ability to proactively organize. I learned and improved many problem
            solving techniques.
          </p>
          <div className="about__info">
            <div>
              <span className="about__info-title">19+</span>
              <span className="about__info-name">
                Completed <br /> project
              </span>
            </div>
          </div>
          {/* <!-- <div className="about__buttons">
              <a download="" href="" className="button button--flex"> 
                  Download CV<i className="uil uil-download-alt button__icon"></i> 
              </a>
          </div> --> */}
        </div>
      </div>
    </section>
  );
}
