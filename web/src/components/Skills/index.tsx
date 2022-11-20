import { useState } from "react";
import { Section, SkillsContainer, ISkillsListProps } from "./SkillsContainer";

interface skillsList extends ISkillsListProps {
  title: string;
  subtitle: string;
  unicons: string;
  section: Section;
}

const skillsList: skillsList[] = [
  {
    title: "Frontend developer",
    subtitle: "More than 10 months",
    unicons: "uil-brackets-curly",
    skillsList: [
      { name: "HTML", percentage: 98 },
      { name: "CSS", percentage: 80 },
      { name: "JavaScript", percentage: 89 },
      { name: "React", percentage: 87 },
    ],
    section: Section.FRONTEND,
  },
  {
    title: "Backend developer",
    subtitle: "More than 6 months",
    unicons: "uil-server-network",
    skillsList: [
      { name: "SQL", percentage: 60 },
      { name: "Node JS", percentage: 80 },
      { name: "TypeScript", percentage: 89 },
    ],
    section: Section.BACKEND,
  },
];

export function Skills() {
  const [sectionOpen, setSectionOpen] = useState<Section | null>(
    Section.FRONTEND
  );

  return (
    <section className="skills section" id="skills">
      <section className="skills section" id="skills">
        <h2 className="section__title">Skills</h2>
        <span className="section__subtitle">My technical level</span>
        <SkillsContainer.Root>
          {skillsList.map((item) => {
            return (
              <SkillsContainer.Content
                key={item.section}
                section={item.section}
                sectionOpen={sectionOpen}
              >
                <SkillsContainer.Header
                  title={item.title}
                  subtitle={item.subtitle}
                  unicons={item.unicons}
                  handleOpen={() =>
                    setSectionOpen(
                      item.section === sectionOpen ? null : item.section
                    )
                  }
                />
                <SkillsContainer.SkillsList skillsList={item.skillsList} />
              </SkillsContainer.Content>
            );
          })}
        </SkillsContainer.Root>
      </section>
    </section>
  );
}
