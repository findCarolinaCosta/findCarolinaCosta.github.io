import { useSelector } from "react-redux";
import { IRequestState } from "../../redux/reducers/request";
import { alreadyRequestsDone } from "../../utils/alreadyRequestsDone";
import { Form } from "./Form";

export function ContactMe() {
  const isAlreadyRequestsDone = useSelector(
    ({ request }: { request: IRequestState }) => alreadyRequestsDone(request)
  );

  return (
    <section
      className={`contact section ${!isAlreadyRequestsDone && "display__none"}`}
      id="contact"
    >
      <h2 className="section__title">Contact Me</h2>
      <span className="section__subtitle">Get in touch</span>
      <div className="contact__container container grid">
        <div>
          <div className="contact__information">
            <i className="uil uil-envelope contact__icon"></i>
            <div>
              <h3 className="contact__title">Email</h3>
              <span className="contact__subtitle">
                carolinadacosta1997@gmail.com
              </span>
            </div>
          </div>

          <div className="contact__information">
            <i className="uil uil-map-marker contact__icon"></i>
            <div>
              <h3 className="contact__title">Location</h3>
              <span className="contact__subtitle">
                Taboão da Serra, SP - Brazil
              </span>
            </div>
          </div>
        </div>
        <Form />
      </div>
    </section>
  );
}
