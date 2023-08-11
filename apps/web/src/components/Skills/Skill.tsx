import { ReactNode } from 'react';

export interface ISkillRootProps {
  children: ReactNode;
}

function SkillRoot(props: ISkillRootProps) {
  return <div className="skills__list grid">{props.children}</div>;
}
SkillRoot.displayName = 'Skill.Root';

export interface ISkillContentProps {
  children: ReactNode;
}

function SkillContent(props: ISkillContentProps) {
  return <div className="skills__data">{props.children}</div>;
}

SkillRoot.displayName = 'Skill.Content';

export interface ISkillTitleProps {
  name: string;
  number: number;
}

function SkillTitle(props: ISkillTitleProps) {
  return (
    <div className="skills__titles">
      <h3 className="skills__name">{props.name}</h3>
      <span className="skills__number">{props.number}%</span>
    </div>
  );
}

export interface ISkillPercentageProps {
  percentage: number;
}

function SkillPercentage(props: ISkillPercentageProps) {
  return (
    <div className="skills__bar">
      <span
        className="skills__percentage"
        style={{ width: `${props.percentage}%` }}
      ></span>
    </div>
  );
}

export const Skill = {
  Root: SkillRoot,
  Content: SkillContent,
  SkillTitle: SkillTitle,
  PercentageBar: SkillPercentage,
};
