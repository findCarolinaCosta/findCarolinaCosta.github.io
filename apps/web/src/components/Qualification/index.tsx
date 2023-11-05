import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRequestState, setRequest } from '../../redux/reducers/request';
import { axiosInstance } from '../../services/axios';
import { Language } from '../../services/getMainInfo';
import { alreadyRequestsDone } from '../../utils/alreadyRequestsDone';
import {
  IQualificationContent,
  Qualifications,
} from './QualificationContainer';

export enum Tab {
  'EDUCATION' = 'Education',
  'WORK' = 'Work',
}

export enum TabPT {
  'Formação' = 'Formação',
  'Experiência' = 'Experiência',
}

export interface IQualifications {
  tab: Tab | TabPT;
  unicon: string;
  data: IQualificationContent[];
}

export function Qualification() {
  const [qualificationList, setQualificationList] = useState<IQualifications[]>(
    [],
  );
  const pathPt = usePathname()?.includes('pt-br');
  const [tabSelected, setTabSelected] = useState<Tab | TabPT>(
    pathPt ? TabPT.Experiência : Tab.WORK,
  );
  const tabs = qualificationList.map(({ tab, unicon }) => ({ tab, unicon }));
  const dispatch = useDispatch();
  const isAlreadyRequestsDone = useSelector(
    ({ request }: { request: IRequestState }) => alreadyRequestsDone(request),
  );

  const handleTabClick = (tab: Tab | TabPT) => setTabSelected(tab);

  useEffect(() => {
    if (qualificationList.length == 0) {
      (
        axiosInstance.get(`/qualifications`, {
          params: {
            language: pathPt ? Language['pt-br'] : Language['en-us'],
          },
        }) as unknown as Promise<{
          data: { ok: boolean; payload: IQualifications[] };
        }>
      ).then((response) => setQualificationList(response.data.payload));
    }
  }, [pathPt, qualificationList.length]);

  useEffect(() => {
    dispatch(
      setRequest({
        type: 'qualifications',
        data: qualificationList,
      }),
    );
  }),
    [qualificationList];

  return (
    <section
      className={`qualification section ${
        !isAlreadyRequestsDone && 'display__none'
      }`}
      id="qualification"
    >
      <h2 className="section__title">
        {pathPt ? 'Qualificações' : 'Qualification'}
      </h2>
      <span className="section__subtitle">
        {pathPt ? 'Minha jornada pessoal' : 'My personal journey'}
      </span>

      <Qualifications.Root>
        <Qualifications.Tabs<Tab | TabPT>
          tabs={tabs}
          tabSelected={tabSelected}
          handleClick={handleTabClick}
        />
        {qualificationList.map((qualification) => (
          <Qualifications.Content
            key={qualification.tab}
            data={qualification.data}
            tab={qualification.tab}
            tabSelected={tabSelected}
          />
        ))}
      </Qualifications.Root>
    </section>
  );
}
