import { ReactNode } from "react";

export interface IServiceContainerProps {
  children: ReactNode;
}

function ServiceContainer(props: IServiceContainerProps) {
  return (
    <div className="services__container container grid">{props.children}</div>
  );
}

export interface IServiceContentProps {
  children: ReactNode;
}

function ServiceContent(props: IServiceContentProps) {
  return <div className="services__content">{props.children}</div>;
}

export interface ICardServiceContent {
  title: string;
  handleClick: () => void;
}

function CardServiceContent(props: ICardServiceContent) {
  return (
    <>
      <div>
        <i className="uil uil-arrow services__icon"></i>
        <h3 className="services__title">{props.title}</h3>
      </div>
      <span
        className="button button--flex button--small button--link services__button"
        onClick={props.handleClick}
      >
        View more
        <i className="uil uil-arrow-right button__icon"></i>
      </span>
    </>
  );
}

export interface IModalServiceContent {
  title: string;
  serviceList: string[];
  cardClicked: string;
  handleClick: (title: string) => void;
}

function ModalServiceContent({
  title,
  serviceList,
  cardClicked,
  handleClick,
}: IModalServiceContent) {
  return (
    <div className={`services__modal ${cardClicked && "active-modal"}`}>
      <div className="services__modal-content">
        <h4 className="services__modal-title">{title}</h4>
        <i
          className="uil uil-times services__modal-close"
          onClick={() => handleClick("")}
        ></i>
        <ul className="services__modal-services grid">
          {serviceList.map((service) => (
            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p>{service}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export interface IServiceDefaultProps {
  services: {
    title: string;
    serviceList: string[];
  }[];
  handleClick: (title: string) => void;
  cardClicked: string;
}

function ServiceDefault(props: IServiceDefaultProps) {
  return (
    <>
      {props.services.map((service) => (
        <Service.Content>
          <Service.ServiceCard
            title={service.title}
            handleClick={() => props.handleClick(service.title)}
          />
          <Service.ServiceModal
            handleClick={(title) => props.handleClick(title)}
            title={service.title}
            serviceList={service.serviceList}
            cardClicked={props.cardClicked}
          />
        </Service.Content>
      ))}
    </>
  );
}

export const Service = {
  Root: ServiceContainer,
  Content: ServiceContent,
  ServiceCard: CardServiceContent,
  ServiceModal: ModalServiceContent,
  Default: ServiceDefault,
};
