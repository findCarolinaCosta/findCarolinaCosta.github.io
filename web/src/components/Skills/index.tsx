import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRequestState, setRequest } from "../../redux/reducers/request";
import { alreadyRequestsDone } from "../../utils/alreadyRequestsDone";
import { Section, SkillsContainer, ISkillsListProps } from "./SkillsContainer";

export interface skillsList extends ISkillsListProps {
  title: string;
  subtitle: string;
  unicons: string;
  section: Section;
}

export function Skills() {
  const [sectionOpen, setSectionOpen] = useState<Section | null>(
    Section.FRONTEND
  );
  const [skillsList, setSkillsList] = useState<skillsList[]>([]);
  const dispatch = useDispatch();
  const isAlreadyRequestsDone = useSelector(
    ({ request }: { request: IRequestState }) => alreadyRequestsDone(request)
  );

  useEffect(() => {
    if (skillsList.length == 0) {
      (
        axios.get(
          `${import.meta.env.VITE_SERVER_URL_API}/skills`
        ) as unknown as Promise<{
          data: { ok: boolean; payload: skillsList[] };
        }>
      ).then((response) => setSkillsList(response.data.payload));
    }
  }, []);

  useEffect(() => {
    dispatch(
      setRequest({
        type: "skills",
        data: skillsList,
      })
    );
  }, [skillsList]);

  return (
    <section
      className={`skills section ${!isAlreadyRequestsDone && "display__none"}`}
      id="skills"
    >
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
