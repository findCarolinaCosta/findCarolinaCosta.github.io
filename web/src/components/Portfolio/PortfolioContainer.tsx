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
  ID: string;
  Title: string;
  Description: string;
  Image: string;
  Demo: string;
  Code: string;
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
  const altProjectImg = props.Image.split("/projects/")[1].split(".")[0];
  return (
    <>
      {/* <!-- Just to have as a cover on linkedin --> */}
      <img
        src={import.meta.env.VITE_PORTFOLIO_COVER}
        alt=""
        style={{ display: "none" }}
      />

      <img src={props.Image} alt={altProjectImg} className="portfolio__img" />
      <div className="portfolio__data">
        <h3 className="portfolio__title">{props.Title}</h3>
        <p className="portfolio__description">{props.Description}</p>

        <div className="portfolio__content-buttons">
          <a
            href={props.Demo}
            className="button button--flex button--small portfolio__button"
            target="_blank"
          >
            Demo
            <i className="uil uil-arrow-right button__icon button__icon"></i>
          </a>
          <a
            href={props.Code}
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
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={projectList.length > 1}
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
      modules={
        projectList.length > 1
          ? [Pagination, Navigation, Keyboard, Autoplay]
          : []
      }
      className="mySwiper portfolio__container container swiper"
    >
      {projectList.map((project) => (
        <SwiperSlide
          key={project.ID}
          className="portfolio__content grid swiper-slide"
        >
          <Portfolio.Content
            ID={project.ID}
            key={project.ID}
            Image={project.Image}
            Description={project.Description}
            Title={project.Title}
            Demo={project.Demo}
            Code={project.Code}
          />
        </SwiperSlide>
      ))}
      {projectList.length > 1 && (
        <>
          <Portfolio.Arrows />
          <Portfolio.Pagination />
        </>
      )}
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
