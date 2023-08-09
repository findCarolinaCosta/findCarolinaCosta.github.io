import { useEffect } from "react";
import { StarBackgroundAnimation } from "../components/contents/StarBackgroundAnimation";


import "../styles/errorView.scss";

export function NotFound() {
  const className = "dark-theme" as any;

  const addBodyClass = (className: any) =>
    document.body.classList.add(className);

  const removeBodyClass = (className: any) =>
    document.body.classList.remove(className);

  useEffect(() => {
    addBodyClass(className)
  }, []);

  return (
    <div className="container-not-found h-screen w-screen">
      <a href="/">
        <header className="top-header"></header>

        <StarBackgroundAnimation />

        <div className="lamp__wrap">
          <div className="lamp">
            <div className="cable"></div>
            <div className="cover"></div>
            <div className="in-cover">
              <div className="bulb"></div>
            </div>
            <div className="light"></div>
          </div>
        </div>
        <section className="error">
          <div className="error__content">
            <div className="error__message message">
              <h1 className="message__title">Page Not Found</h1>
              <p className="message__text">
                We're sorry, the page you were looking for isn't found here. The
                link you followed may either be broken or no longer exists.
                Please try again, or take a look at our.
              </p>
            </div>
            <div className="error__nav e-nav">
              <a href="/" className="e-nav__link"></a>
            </div>
          </div>
        </section>
      </a>
    </div>
  );
}
