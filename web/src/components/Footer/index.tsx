import { useSelector } from "react-redux";
import { IRequestState } from "../../redux/reducers/request";
import { alreadyRequestsDone } from "../../utils/alreadyRequestsDone";

export function Footer() {
  const isAlreadyRequestsDone = useSelector(
    ({ request }: { request: IRequestState }) => alreadyRequestsDone(request)
  );

  return (
    <footer className={`footer ${!isAlreadyRequestsDone && "display__none"}`}>
      <div className="footer__bg">
        <div className="footer__container container grid">
          <div>
            <h1 className="footer__title">Carolina</h1>
            <span className="footer__subtitle">Full-Stack developer</span>
          </div>
          <ul className="footer__links">
            <li>
              <a href="#services" className="footer__link">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" className="footer__link">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" className="footer__link">
                Contactme
              </a>
            </li>
          </ul>
        </div>
        <p className="footer__copy">&#169; Carolina. All right reserved</p>
      </div>
    </footer>
  );
}
