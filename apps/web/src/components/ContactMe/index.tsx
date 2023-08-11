import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

import { IRequestState } from '../../redux/reducers/request';
import { alreadyRequestsDone } from '../../utils/alreadyRequestsDone';
import { Form } from './Form';

export function ContactMe() {
  const isAlreadyRequestsDone = useSelector(
    ({ request }: { request: IRequestState }) => alreadyRequestsDone(request),
  );
  const pathPt = usePathname().includes('pt-br');

  return (
    <section
      className={`contact section ${!isAlreadyRequestsDone && 'display__none'}`}
      id="contact"
    >
      <h2 className="section__title">{pathPt ? 'Contato' : 'Contact Me'}</h2>
      <span className="section__subtitle">
        {pathPt ? 'Entre em contato' : 'Get in touch'}
      </span>
      <div className="contact__container container grid">
        <div>
          <div className="contact__information">
            <i className="uil uil-envelope contact__icon"></i>
            <div>
              <h3 className="contact__title">Email</h3>
              <span className="contact__subtitle">
                {process.env.NEXT_PUBLIC_EMAIL}
              </span>
            </div>
          </div>

          <div className="contact__information">
            <i className="uil uil-map-marker contact__icon"></i>
            <div>
              <h3 className="contact__title">
                {pathPt ? 'Localização' : 'Location'}
              </h3>
              <span className="contact__subtitle">
                {`Taboão da Serra, SP - Bra${pathPt ? 's' : 'z'}il`}
              </span>
            </div>
          </div>
        </div>
        <Form />
      </div>
    </section>
  );
}
