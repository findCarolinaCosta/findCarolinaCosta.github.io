import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { IRequestState } from "../../redux/reducers/request";
import { HomeImg } from "./HomeImg";

export function HomeSkeleton() {
  return (
    <section className="home section" id="home">
      <div className="home__conteiner container grid">
        <div className="home__content grid">
          <section className="home__social">
            <Skeleton
              height={25}
              width={25}
              baseColor="#211d35"
              highlightColor="#3e3663"
              circle={true}
            />
            <Skeleton
              height={25}
              width={25}
              baseColor="#211d35"
              highlightColor="#3e3663"
              circle={true}
            />
          </section>
          <section className="home__img">
            <Skeleton
              height={303.99}
              width={303.99}
              baseColor="#211d35"
              highlightColor="#3e3663"
            />
          </section>
          <section className="home__data">
            <Skeleton
              height={144}
              width={355}
              baseColor="#211d35"
              highlightColor="#3e3663"
            />
            <Skeleton
              height={30}
              width={355}
              baseColor="#211d35"
              highlightColor="#3e3663"
            />
            <Skeleton
              height={75}
              width={355}
              baseColor="#211d35"
              highlightColor="#3e3663"
            />
            <Skeleton
              height={62}
              width={153.47}
              baseColor="#211d35"
              highlightColor="#3e3663"
            />
          </section>
        </div>
        <section
          className="home__scroll"
          style={{
            marginLeft: "0.5rem",
          }}
        >
          <Skeleton
            height={48}
            width={137.28}
            baseColor="#211d35"
            highlightColor="#3e3663"
            className="home__scroll-button"
          />
        </section>
      </div>
    </section>
  );
}
