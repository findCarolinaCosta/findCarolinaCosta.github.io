import { ReactNode } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation, Mousewheel, Keyboard } from "swiper";

export interface IProject {
  projectImg: string;
  title: string;
  description: string;
  demo: string;
  code: string;
}

interface PortfolioContainerProps {
  children: ReactNode;
}

function PortfolioContainer({ children }: PortfolioContainerProps) {
  return (
    <Swiper
      cssMode={true}
      navigation={true}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="portfolio__container container swiper mySwiper"
    >
      {children}
    </Swiper>
  );
}

interface PortfolioContainerSwiperProps {
  children: ReactNode;
}

function PortfolioContainerSwiper({ children }: PortfolioContainerSwiperProps) {
  return <div className="swiper-wrapper">{children}</div>;
}

interface PortfolioContentProps extends IProject {}

function PortfolioContent(props: PortfolioContentProps) {
  const altProjectImg = props.projectImg.split("/projects/")[1].split(".")[0];
  return (
    <>
      {/* <!-- Just to have as a cover on linkedin --> */}
      <img
        src="https://github.com/findCarolinaCosta/findCarolinaCosta.github.io/blob/main/web/src/assets/images/projects/project-startwars.gif?raw=true"
        alt=""
        style={{ display: "none" }}
      />

      <img
        src={props.projectImg}
        alt={altProjectImg}
        className="portfolio__img"
      />
      <div className="portfolio__data">
        <h3 className="portfolio__title">{props.title}</h3>
        <p className="portfolio__description">{props.description}</p>

        <div className="portfolio__content-buttons">
          <a
            href={props.demo}
            className="button button--flex button--small portfolio__button"
            target="_blank"
          >
            Demo
            <i className="uil uil-arrow-right button__icon button__icon"></i>
          </a>
          <a
            href={props.code}
            className="button button--flex button--small portfolio__button"
            target="_blank"
          >
            Code
            <i className="uil uil-folder-check button__icon button__icon"></i>
          </a>
        </div>
      </div>
    </>
  );
}

function PortfolioContentArrows() {
  return (
    <>
      <div className="swiper-button-next">
        <i className="uil uil-angle-right-b swiper-portfolio-icon"></i>
      </div>
      <div className="swiper-button-prev">
        <i className="uil uil-angle-left-b swiper-portfolio-icon"></i>
      </div>
    </>
  );
}

function PortfolioContentPagination() {
  return <div className="swiper-pagination"></div>;
}

interface PortfolioDefaultProps {
  projectList: IProject[];
}

function PortfolioDefault({ projectList }: PortfolioDefaultProps) {
  //   return (
  //     <>
  //       <Portfolio.Root>
  //         {projectList.map((project) => (
  //           <Portfolio.Content
  //             key={project.title}
  //             projectImg={project.projectImg}
  //             description={project.description}
  //             title={project.title}
  //             demo={project.demo}
  //             code={project.code}
  //           />
  //         ))}
  //         {/* <Portfolio.Arrows />
  //         <Portfolio.Pagination /> */}
  //       </Portfolio.Root>
  //     </>
  //   );

  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      //   autoplay={{
      //     delay: 2500,
      //     disableOnInteraction: false,
      //   }}
      loop={true}
      keyboard={{
        enabled: true,
      }}
      pagination={{
        clickable: true,
        el: ".swiper-pagination",
      }}
      navigation={{
        nextEl: ".uil-angle-right-b",
        prevEl: ".uil-angle-left-b",
      }}
      modules={[Pagination, Navigation, Keyboard]}
      className="mySwiper portfolio__container container swiper"
    >
      {projectList.map((project) => (
        <SwiperSlide className="portfolio__content grid swiper-slide">
          <Portfolio.Content
            key={project.title}
            projectImg={project.projectImg}
            description={project.description}
            title={project.title}
            demo={project.demo}
            code={project.code}
          />
        </SwiperSlide>
      ))}
      <Portfolio.Arrows />
      <Portfolio.Pagination />
    </Swiper>
  );
}

export const Portfolio = {
  Root: PortfolioContainer,
  Swiper: PortfolioContainerSwiper,
  Content: PortfolioContent,
  Arrows: PortfolioContentArrows,
  Pagination: PortfolioContentPagination,
  Default: PortfolioDefault,
};
