import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Scrollspy from 'react-scrollspy';

import { IRequestState } from '../../redux/reducers/request';
import { handleActiveSection, setSections } from '../../redux/reducers/section';
import { handleTheme, Theme } from '../../redux/reducers/settings';
import { Language } from '../contents/Language';
import { HeaderSkeleton } from './HeaderSkeleton';
export const sections: string[] = [
  'home',
  'about',
  'skills',
  'qualification',
  'services',
  'portfolio',
  'contact',
];

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

  const pathPt = usePathname().includes('pt-br');

  useEffect(() => {
    const theme = localStorage.getItem('theme') as Theme;

    if (theme) {
      dispatch(handleTheme(theme));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSections(sections));
  }, [dispatch]);

  useEffect(() => {
    if (request) {
      setIsLoading(
        !(
          request.projects.length > 0 &&
          request.qualificationList.length > 0 &&
          request.services.length > 0 &&
          request.skillsList.length > 0
        ),
      );
    }
  }, [request]);

  useEffect(() => {
    (() => setScreenWidth(window.innerWidth))();
  });

  if (isLoading && screenWidth >= 768) return <HeaderSkeleton />;

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
          <Scrollspy
            items={sections}
            currentClassName="active-link"
            onUpdate={(el) => dispatch(handleActiveSection(el.id))}
            className="nav__list grid"
          >
            <li
              className="nav__item"
              onClick={() => setShowResponsiveMenu(false)}
            >
              <a
                href="#home"
                className={`nav__link ${
                  currentSection == 'home' ? 'active-link' : ''
                }`}
              >
                <i className="uil uil-estate nav__icon"></i>{' '}
                {pathPt ? 'Início' : 'Home'}
              </a>
            </li>
            <li
              className="nav__item"
              onClick={() => setShowResponsiveMenu(false)}
            >
              <a
                href="#about"
                className={`nav__link ${
                  currentSection == 'about' ? 'active-link' : ''
                }`}
              >
                <i className="uil uil-user nav__icon"></i>{' '}
                {pathPt ? 'Sobre' : 'About'}
              </a>
            </li>
            <li
              className="nav__item"
              onClick={() => setShowResponsiveMenu(false)}
            >
              <a
                href="#skills"
                className={`nav__link ${
                  currentSection == 'skills' ? 'active-link' : ''
                }`}
              >
                <i className="uil uil-file-alt nav__icon"></i>
                {pathPt ? 'Habilidades' : 'Skills'}
              </a>
            </li>
            <li
              className="nav__item"
              onClick={() => setShowResponsiveMenu(false)}
            >
              <a
                href="#qualification"
                className={`nav__link ${
                  currentSection == 'qualification' ? 'active-link' : ''
                }`}
              >
                <i className="uil uil-graduation-cap nav__icon"></i>
                {pathPt ? 'Qualificação' : 'Qualification'}
              </a>
            </li>
            <li
              className="nav__item"
              onClick={() => setShowResponsiveMenu(false)}
            >
              <a
                href="#services"
                className={`nav__link ${
                  currentSection == 'services' ? 'active-link' : ''
                }`}
              >
                <i className="uil uil-briefcase-alt nav__icon"></i>
                {pathPt ? 'Serviços' : 'Services'}
              </a>
            </li>
            <li
              className="nav__item"
              onClick={() => setShowResponsiveMenu(false)}
            >
              <a
                href="#portfolio"
                className={`nav__link ${
                  currentSection == 'portfolio' ? 'active-link' : ''
                }`}
              >
                <i className="uil uil-scenery nav__icon"></i> Portfolio
              </a>
            </li>
            <li
              className="nav__item"
              onClick={() => setShowResponsiveMenu(false)}
            >
              <a
                href="#contact"
                className={`nav__link ${
                  currentSection == 'contact' ? 'active-link' : ''
                }`}
              >
                <i className="uil uil-message nav__icon"></i>
                {pathPt ? 'Contato' : 'Contact'}
              </a>
            </li>
          </Scrollspy>
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
