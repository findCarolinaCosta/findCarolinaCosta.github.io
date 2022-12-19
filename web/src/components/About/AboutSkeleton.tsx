import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { Theme } from "../../redux/reducers/settings";
import { getScreenSize } from "../../utils/getScreen";

export function AboutSkeleton() {
const theme = useSelector(
    ({ settings }: { settings: { theme: Theme; icon: string } }) => settings
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
        height={getScreenSize({
          small: { size: 350, default: 35 },
          medium: { size: 568, default: 35 },
          medium2: { size: 768, default: 35 },
          large: { size: 1024, default: 55 },
        })}
        width={getScreenSize({
          small: { size: 350, default: 140 },
          medium: { size: 568, default: 140 },
          medium2: { size: 768, default: 140 },
          large: { size: 1024, default: 200 },
        })}
        baseColor={theme.theme == Theme.dark ? "#211d35" : "#CDCDCC"}
        highlightColor={theme.theme == Theme.dark ? "#3e3663" : ""}
        className="section__title"
        style={{
          marginBottom: "1rem",
        }}
      />
      <Skeleton
        height={getScreenSize({
          small: { size: 350, default: 20 },
          medium: { size: 568, default: 20 },
          medium2: { size: 768, default: 20 },
          large: { size: 1024, default: 21 },
        })}
        width={getScreenSize({
          small: { size: 350, default: 120 },
          medium: { size: 568, default: 120 },
          medium2: { size: 768, default: 120 },
          large: { size: 1024, default: 108.75 },
        })}
        baseColor={theme.theme == Theme.dark ? "#211d35" : "#CDCDCC"}
        highlightColor={theme.theme == Theme.dark ? "#3e3663" : "#CDCDCC"}
        className="section__subtitle"
        style={{
          maxHeight: "90",
          marginBottom: "40px",
        }}
      />
      <div className="about__container container grid">
        <div className="about__data">
          <Skeleton
            height={getScreenSize({
              small: { size: 350, default: 138 },
              medium: { size: 568, default: 92 },
              medium2: { size: 768, default: 69 },
              large: { size: 1024, default: 130 },
            })}
            width={getScreenSize({
              small: { size: 350, default: 318 },
              medium: { size: 568, default: 520 },
              medium2: { size: 768, default: 720 },
              large: { size: 1024, default: 768 },
            })}
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
