import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { Theme } from "../../redux/reducers/theme";

export function AboutSkeleton() {
  const theme = useSelector(
    ({ theme }: { theme: { theme: Theme; icon: string } }) => theme
  );
  return (
    <section
      className="about section"
      id="about"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Skeleton
        height={55}
        width={200}
        baseColor={theme.theme == Theme.dark ? "#211d35" : "#CDCDCC"}
        highlightColor={theme.theme == Theme.dark ? "#3e3663" : ""}
        className="section__title"
        style={{
          marginBottom: "1rem",
        }}
      />
      <Skeleton
        height={21}
        width={108.75}
        baseColor={theme.theme == Theme.dark ? "#211d35" : "#CDCDCC"}
        highlightColor={theme.theme == Theme.dark ? "#3e3663" : ""}
        className="section__subtitle"
        style={{
          maxHeight: "90",
          marginBottom: "40px",
        }}
      />
      <div className="about__container container grid">
        <div className="about__data">
          <Skeleton
            height={75}
            width={768}
            baseColor={theme.theme == Theme.dark ? "#211d35" : "#CDCDCC"}
            highlightColor={theme.theme == Theme.dark ? "#3e3663" : ""}
            className="about__description"
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <Skeleton
                height={35}
                width={79.03}
                baseColor={theme.theme == Theme.dark ? "#211d35" : "#CDCDCC"}
                highlightColor={theme.theme == Theme.dark ? "#3e3663" : ""}
              />
              <Skeleton
                height={42}
                width={79.03}
                baseColor={theme.theme == Theme.dark ? "#211d35" : "#CDCDCC"}
                highlightColor={theme.theme == Theme.dark ? "#3e3663" : ""}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
