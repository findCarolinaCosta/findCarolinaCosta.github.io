import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRequestState, setRequest } from '../../redux/reducers/request';
import { axiosInstance } from '../../services/axios';
import { Language } from '../../services/getMainInfo';
import { alreadyRequestsDone } from '../../utils/alreadyRequestsDone';
import { Service } from './ServiceContainer';

export interface IService {
  title: string;
  serviceList: string[];
}

export function Services() {
  const [cardClicked, setCardClicked] = useState('');
  const [services, setServices] = useState<IService[]>([]);
  const dispatch = useDispatch();
  const isAlreadyRequestsDone = useSelector(
    ({ request }: { request: IRequestState }) => alreadyRequestsDone(request),
  );
  const pathPt = usePathname().includes('pt-br');

  useEffect(() => {
    if (services.length == 0) {
      (
        axiosInstance.get(`/services`, {
          params: {
            language: pathPt ? Language['pt-br'] : Language['en-us'],
          },
        }) as unknown as Promise<{
          data: { ok: boolean; payload: IService[] };
        }>
      ).then((response) => setServices(response.data.payload));
    }
  }, [pathPt, services.length]);

  useEffect(() => {
    dispatch(
      setRequest({
        type: 'services',
        data: services,
      }),
    );
  }),
    [services];

  return (
    <section
      className={`services section ${
        !isAlreadyRequestsDone && 'display__none'
      }`}
      id="services"
    >
      <h2 className="section__title">{pathPt ? 'Serviços' : 'Services'}</h2>
      <span className="section__subtitle">
        {pathPt ? 'O que posso fazer' : 'What i offer'}
      </span>
      <Service.Root>
        <Service.Default
          handleClick={(title) => setCardClicked(title)}
          cardClicked={cardClicked}
          services={services}
        />
      </Service.Root>
    </section>
  );
}
