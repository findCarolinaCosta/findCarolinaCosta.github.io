import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { sections } from ".";
import { Theme } from "../../redux/reducers/theme";

export function HeaderSkeleton() {
  const theme = useSelector(
    ({ theme }: { theme: { theme: Theme; icon: string } }) => theme
  );

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Skeleton
          height={25}
          width={69.25}
          baseColor={theme.theme == Theme.dark ? "#211d35" : "#CDCDCC"}
          highlightColor={theme.theme == Theme.dark ? "#3e3663" : ""}
        />

        <div
          id="nav-menu"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
          }}
        >
          <ul className="nav__list grid">
            {sections.map(() => (
              <li>
                <Skeleton
                  height={21}
                  width={60}
                  baseColor={theme.theme == Theme.dark ? "#211d35" : "#CDCDCC"}
                  highlightColor={theme.theme == Theme.dark ? "#3e3663" : ""}
                />
              </li>
            ))}
          </ul>
          <div className="nav__btns">
            <Skeleton
              height={20}
              width={20}
              baseColor={theme.theme == Theme.dark ? "#211d35" : "#CDCDCC"}
              highlightColor={theme.theme == Theme.dark ? "#3e3663" : ""}
              circle={true}
            />
            <div className="nav__toggle" id="nav-toggle">
              <i className="uil uil-apps nav__icon"></i>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
