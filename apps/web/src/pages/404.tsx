import Link from 'next/link';
import { useEffect } from 'react';

import { StarBackgroundAnimation } from '../components/contents/StarBackgroundAnimation';

// import '../styles/errorView.scss';

export default function NotFound() {
  const className = 'dark-theme' as any;

  const addBodyClass = (className: any) =>
    document.body.classList.add(className);

  const removeBodyClass = (className: any) =>
    document.body.classList.remove(className);

  useEffect(() => {
    addBodyClass(className);
  }, []);

  return (
    <div className="container-not-found h-screen w-screen">
      <Link href="/">
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
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                We're sorry, the page you were looking for isn't found here. The
                link you followed may either be broken or no longer exists.
                Please try again, or take a look at our.
              </p>
            </div>
            <div className="error__nav e-nav">
              <Link href="/" className="e-nav__link" />
            </div>
          </div>
        </section>
      </Link>
    </div>
  );
}
