import Skeleton from "react-loading-skeleton";

export function AboutSkeleton() {
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
        baseColor="#211d35"
        highlightColor="#3e3663"
        className="section__title"
        style={{
          marginBottom: "1rem",
        }}
      />
      <Skeleton
        height={21}
        width={108.75}
        baseColor="#211d35"
        highlightColor="#3e3663"
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
            baseColor="#211d35"
            highlightColor="#3e3663"
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
                baseColor="#211d35"
                highlightColor="#3e3663"
              />
              <Skeleton
                height={42}
                width={79.03}
                baseColor="#211d35"
                highlightColor="#3e3663"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
