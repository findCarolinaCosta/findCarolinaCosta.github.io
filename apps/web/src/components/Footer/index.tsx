import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

import { IRequestState } from '../../redux/reducers/request';
import { IMainInfo } from '../../services/getMainInfo';
import { alreadyRequestsDone } from '../../utils/alreadyRequestsDone';

export function Footer() {
  const isAlreadyRequestsDone = useSelector(
    ({ request }: { request: IRequestState }) => alreadyRequestsDone(request),
  );
  const pathPt = usePathname().includes('pt-br');
  const mainInfo = useSelector(
    ({ mainInfo }: { mainInfo: IMainInfo }) => mainInfo,
  );

  return (
    <footer className={`footer ${!isAlreadyRequestsDone && 'display__none'}`}>
      <div className="footer__bg">
        <div className="footer__container container grid">
          <div>
            <h1 className="footer__title">Carolina</h1>
            <span className="footer__subtitle">{mainInfo.role}</span>
          </div>
          <ul className="footer__links">
            <li>
              <a href="#services" className="footer__link">
                {pathPt ? 'Serviços' : 'Services'}
              </a>
            </li>
            <li>
              <a href="#portfolio" className="footer__link">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" className="footer__link">
                {pathPt ? 'Contato' : 'Contact'}
              </a>
            </li>
          </ul>
        </div>
        <p className="footer__copy">
          &#169; Carolina.{' '}
          {pathPt ? 'Todos os direitos reservados' : 'All Rights Reserved'}
        </p>
      </div>
    </footer>
  );
}
