import { useState } from "react";
import {
  IQualificationContent,
  Qualifications,
} from "./QualificationContainer";

export enum Tab {
  "EDUCATION" = "Education",
  "WORK" = "Work",
}

interface IQualifications {
  tab: Tab;
  unicon: string;
  data: IQualificationContent[];
}

const qualifications: IQualifications[] = [
  {
    tab: Tab.EDUCATION,
    unicon: "uil-graduation-cap",
    data: [
      {
        title: "Web developer",
        subtitle: "Trybe",
        startYear: "2021",
        finalYear: "2022",
      },
    ],
  },
  {
    tab: Tab.WORK,
    unicon: "uil-graduation-cap",
    data: [
      {
        title: "Product Development Engineer - Junior",
        subtitle: "Cashforce",
        startYear: "2022",
        finalYear: "current",
      },
    ],
  },
];

const tabs = qualifications.map(({ tab, unicon }) => ({ tab, unicon }));

export function Qualification() {
  const [qualificationList, setQualificationList] =
    useState<IQualifications[]>(qualifications);
  const [tabSelected, setTabSelected] = useState<Tab>(Tab.WORK);

  const handleTabClick = (tab: Tab) => setTabSelected(tab);

  return (
    <section className="qualification section" id="qualification">
      <h2 className="section__title">Qualification</h2>
      <span className="section__subtitle">My personal journey</span>

      <Qualifications.Root>
        <Qualifications.Tabs<Tab>
          tabs={tabs}
          tabSelected={tabSelected}
          handleClick={handleTabClick}
        />
        {qualificationList.map((qualification) => (
          <Qualifications.Content
            data={qualification.data}
            tab={qualification.tab}
            tabSelected={tabSelected}
          />
        ))}
      </Qualifications.Root>
    </section>
  );
}
