import { ReactNode } from 'react';

export interface QualifictionTabsPropos<T> {
  tabs: { tab: T; unicon: string }[];
  tabSelected: T;
  handleClick: (tab: T) => void;
}

function QualifictionTabs<T extends ReactNode>({
  tabs,
  tabSelected,
  handleClick,
}: QualifictionTabsPropos<T>) {
  return (
    <>
      <div className="qualification__tabs">
        {tabs.map(({ tab, unicon }) => (
          <div
            key={Math.random()}
            className={`qualification__button button--flex ${
              tabSelected === tab && 'qualification__button__selected'
            }`}
            onClick={() => handleClick(tab)}
          >
            <i className={`uil ${unicon} qualification__icon`}></i>
            {tab}
          </div>
        ))}
      </div>
    </>
  );
}

export interface IQualificationContent {
  title: string;
  subtitle: string;
  startYear: string;
  finalYear: string;
}

export interface QualificationContentProps<T> {
  tab: T;
  data: IQualificationContent[];
  tabSelected: T;
}

function QualificationContent<T>({
  tab,
  data,
  tabSelected,
}: QualificationContentProps<T>) {
  return (
    <>
      {data.map((qualification, index) => (
        <div
          key={Math.random()}
          className={`qualification__content ${
            tabSelected == tab && 'qualification__active'
          }`}
          data-content
        >
          <div className="qualification__data">
            {index % 2 !== 0 && (
              <>
                <div></div>
                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
              </>
            )}
            <div>
              <h3 className="qualification__title">{qualification.title}</h3>
              <span className="qualification__subtitle">
                {qualification.subtitle}
              </span>
              <div className="qualification__calendar">
                <i className="uil uil-calendar-alt"></i>{' '}
                {qualification.startYear} - {qualification.finalYear}
              </div>
            </div>
            <div>
              {index % 2 === 0 && (
                <>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </>
              )}
              {index === data.length - 1 && (
                <span className="qualification__dot-dot-dot">...</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export interface QualificationContainerProps {
  children: ReactNode;
}

function QualificationContainer(props: QualificationContainerProps) {
  return (
    <div className="qualification__container container">
      <div className="qualification__sections">{props.children}</div>
    </div>
  );
}

export const Qualifications = {
  Root: QualificationContainer,
  Content: QualificationContent,
  Tabs: QualifictionTabs,
};
