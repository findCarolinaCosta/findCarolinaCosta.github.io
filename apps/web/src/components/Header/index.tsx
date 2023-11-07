import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRequestState } from '../../redux/reducers/request';
import { handleTheme, Theme } from '../../redux/reducers/settings';
import { Language } from '../contents/Language';
import { HeaderSkeleton } from './HeaderSkeleton';

export function Header() {
  const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector(
    ({ settings }: { settings: { theme: Theme; icon: string } }) => settings,
  );
  const currentSection = useSelector(
    ({ section }: { section: { activeSection: string } }) =>
      section.activeSection,
  );
  const [isLoading, setIsLoading] = useState(true);
  const request = useSelector(
    ({ request }: { request: IRequestState }) => request,
  );
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const pathPt = usePathname()?.includes('pt-br');
  const sections = useSelector(
    ({
      section,
    }: {
      section: {
        sections: {
          pt: string;
          en: string;
          icon: string;
        }[];
      };
    }) => section.sections,
  );

  useEffect(() => {
    const theme = localStorage.getItem('theme') as Theme;

    if (theme) {
      dispatch(handleTheme(theme));
    }
  }, [dispatch]);

  useEffect(() => {
    if (request) {
      setIsLoading(
        !(
          request.projects.length > 0 &&
          request.qualificationList.length > 0 &&
          request.services.length > 0 &&
          request.skillsList.length > 0 &&
          screenWidth >= 768
        ),
      );
    }
  }, [request, screenWidth, theme]);

  useEffect(() => {
    (() => setScreenWidth(window.innerWidth))();
  });

  if (isLoading) return <HeaderSkeleton />;

  return (
    <header className={`header ${isLoading && 'display__none'}`} id="header">
      <nav className="nav container">
        <a href="#" className="nav__logo">
          Carolina
        </a>

        <div
          className={showResponsiveMenu ? 'nav__menu show-menu' : 'nav__menu'}
          id="nav-menu"
        >
          <ul className="nav__list grid">
            {sections.map((section, i) => {
              return (
                <li
                  key={i}
                  className="nav__item list-none"
                  onClick={() => setShowResponsiveMenu(false)}
                >
                  <a
                    href={`#${section.en.toLowerCase()}`}
                    className={`${
                      section.en.toLowerCase() == currentSection
                        ? 'active-link'
                        : ''
                    } nav__link`}
                    data-to-scrollspy-id={section.en.toLowerCase()}
                  >
                    <i className={`uil ${section.icon} nav__icon`}></i>
                    {pathPt ? section.pt : section.en}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-between">
            <Language className="md:hidden" />
            <i
              className="uil uil-times nav__close nav__icon"
              id="nav-close"
              onClick={() => setShowResponsiveMenu(false)}
            ></i>
          </div>
        </div>
        <div className="nav__btns">
          {/* <!-- Theme change button --> */}
          <i
            className={`uil ${theme.icon} change-theme`}
            id="theme-button"
            onClick={() =>
              dispatch(
                handleTheme(
                  theme.theme == Theme.dark ? Theme.default : Theme.dark,
                ),
              )
            }
          ></i>

          <div
            className="nav__toggle"
            id="nav-toggle"
            onClick={() => setShowResponsiveMenu(true)}
          >
            <i className="uil uil-apps nav__icon"></i>
          </div>
        </div>
        <Language className="hidden md:block" />
      </nav>
    </header>
  );
}
