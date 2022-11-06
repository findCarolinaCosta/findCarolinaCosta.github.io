import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleTheme, Theme } from "../../redux/reducers/theme";

export function Header() {
  const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector(
    ({ theme }: { theme: { theme: Theme; icon: string } }) => theme
  );

  useEffect(() => {
    const theme = localStorage.getItem("theme") as Theme;

    if (theme) {
      dispatch(handleTheme(theme));
    }
  }, []);

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <a href="#" className="nav__logo">
          Carolina
        </a>

        <div
          className={showResponsiveMenu ? "nav__menu show-menu" : "nav__menu"}
          id="nav-menu"
        >
          <ul className="nav__list grid">
            <li
              className="nav__item"
              onClick={() => setShowResponsiveMenu(false)}
            >
              <a href="#home" className="nav__link active-link">
                <i className="uil uil-estate nav__icon"></i> Home
              </a>
            </li>
            <li
              className="nav__item"
              onClick={() => setShowResponsiveMenu(false)}
            >
              <a href="#about" className="nav__link">
                <i className="uil uil-user nav__icon"></i> About
              </a>
            </li>
            <li
              className="nav__item"
              onClick={() => setShowResponsiveMenu(false)}
            >
              <a href="#skills" className="nav__link">
                <i className="uil uil-file-alt nav__icon"></i> Skills
              </a>
            </li>
            <li
              className="nav__item"
              onClick={() => setShowResponsiveMenu(false)}
            >
              <a href="#qualification" className="nav__link">
                <i className="uil uil-graduation-cap nav__icon"></i>
                Qualification
              </a>
            </li>
            <li
              className="nav__item"
              onClick={() => setShowResponsiveMenu(false)}
            >
              <a href="#services" className="nav__link">
                <i className="uil uil-briefcase-alt nav__icon"></i> Services
              </a>
            </li>
            <li
              className="nav__item"
              onClick={() => setShowResponsiveMenu(false)}
            >
              <a href="#portfolio" className="nav__link">
                <i className="uil uil-scenery nav__icon"></i> Portfolio
              </a>
            </li>
            <li
              className="nav__item"
              onClick={() => setShowResponsiveMenu(false)}
            >
              <a href="#contact" className="nav__link">
                <i className="uil uil-message nav__icon"></i> Contact
              </a>
            </li>
          </ul>
          <i
            className="uil uil-times nav__close nav__icon"
            id="nav-close"
            onClick={() => setShowResponsiveMenu(false)}
          ></i>
        </div>
        <div className="nav__btns">
          {/* <!-- Theme change button --> */}
          <i
            className={`uil ${theme.icon} change-theme`}
            id="theme-button"
            onClick={() =>
              dispatch(
                handleTheme(
                  theme.theme == Theme.dark ? Theme.default : Theme.dark
                )
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
      </nav>
    </header>
  );
}
