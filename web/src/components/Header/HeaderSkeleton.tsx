import Skeleton from "react-loading-skeleton";

export function HeaderSkeleton() {
  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Skeleton
          height={25}
          width={69.25}
          baseColor="#211d35"
          highlightColor="#3e3663"
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
            {[1, 2, 3, 4, 5, 6, 7].map(() => (
              <li>
                <Skeleton
                  height={21}
                  width={60}
                  baseColor="#211d35"
                  highlightColor="#3e3663"
                />
              </li>
            ))}
          </ul>
          <div className="nav__btns">
            <Skeleton
              height={20}
              width={20}
              baseColor="#211d35"
              highlightColor="#3e3663"
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
