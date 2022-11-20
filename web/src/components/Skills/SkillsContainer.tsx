import { ButtonHTMLAttributes, ReactNode } from "react";
import { Skill } from "./Skill";

export interface ISkillsContainerRootProps {
  children: ReactNode;
}

function SkillsContainerRoot(props: ISkillsContainerRootProps) {
  return (
    <div className="skills__container container grid">{props.children}</div>
  );
}

export enum Section {
  "FRONTEND" = "frontend",
  "BACKEND" = "backend",
}

enum isOpen {
  TRUE = "skills__open",
  FALSE = "skills__close",
}

export interface ISkillsContainerContentProps {
  children: ReactNode;
  section: Section;
  sectionOpen: Section | null;
}

function SkillsContainerContent(props: ISkillsContainerContentProps) {
  return (
    <div
      className={`skills__content ${
        props.section === props.sectionOpen ? isOpen.TRUE : isOpen.FALSE
      }`}
    >
      {props.children}
    </div>
  );
}

interface ISkillsContainerContentHeaderProps {
  unicons: string;
  title: string;
  subtitle: string;
  handleOpen: () => void;
}

function SkillsContainerContentHeader(
  props: ISkillsContainerContentHeaderProps
) {
  return (
    <div className="skills__header" onClick={props.handleOpen}>
      <i className={`uil ${props.unicons} skills__icon`}></i>
      <div>
        <h1 className="skills__titles">{props.title}</h1>
        <span className="skills__subtitle">{props.subtitle}</span>
      </div>
      <i className="uil uil-angle-down skills__arrow"></i>
    </div>
  );
}

interface ISkillData {
  name: string;
  percentage: number;
}

export interface ISkillsListProps {
  skillsList: ISkillData[];
}

function SkillsList({ skillsList }: ISkillsListProps) {
  return (
    <>
      {skillsList.map((skill) => {
        return (
          <Skill.Root key={skill.name}>
            <Skill.Content>
              <Skill.SkillTitle name={skill.name} number={skill.percentage} />
              <Skill.PercentageBar percentage={skill.percentage} />
            </Skill.Content>
          </Skill.Root>
        );
      })}
    </>
  );
}

export const SkillsContainer = {
  Root: SkillsContainerRoot,
  Content: SkillsContainerContent,
  Header: SkillsContainerContentHeader,
  SkillsList,
};
