import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

import { Theme } from '../../redux/reducers/settings';
import { getScreenSize } from '../../utils/getScreen';

export function HomeSkeleton() {
  const theme = useSelector(
    ({ settings }: { settings: { theme: Theme; icon: string } }) => settings,
  );

  return (
    <section className="home section" id="home">
      <div className="home__conteiner container grid">
        <div className="home__content grid">
          <section className="home__social">
            <Skeleton
              height={getScreenSize({
                small: { size: 350, default: 20 },
                medium: { size: 568, default: 25 },
                medium2: { size: 768, default: 25 },
                large: { size: 1024, default: 25 },
              })}
              width={getScreenSize({
                small: { size: 350, default: 20 },
                medium: { size: 568, default: 25 },
                medium2: { size: 768, default: 25 },
                large: { size: 1024, default: 25 },
              })}
              baseColor={theme.theme == Theme.dark ? '#211d35' : '#CDCDCC'}
              highlightColor={theme.theme == Theme.dark ? '#3e3663' : ''}
              circle={true}
            />
            <Skeleton
              height={getScreenSize({
                small: { size: 350, default: 20 },
                medium: { size: 568, default: 25 },
                medium2: { size: 768, default: 25 },
                large: { size: 1024, default: 25 },
              })}
              width={getScreenSize({
                small: { size: 350, default: 20 },
                medium: { size: 568, default: 25 },
                medium2: { size: 768, default: 25 },
                large: { size: 1024, default: 25 },
              })}
              baseColor={theme.theme == Theme.dark ? '#211d35' : '#CDCDCC'}
              highlightColor={theme.theme == Theme.dark ? '#3e3663' : ''}
              circle={true}
            />
          </section>
          <section className="home__img">
            <Skeleton
              height={getScreenSize({
                small: { size: 350, default: 171 },
                medium: { size: 568, default: 190 },
                medium2: { size: 768, default: 256.49 },
                large: { size: 1024, default: 303.99 },
              })}
              width={getScreenSize({
                small: { size: 350, default: 171 },
                medium: { size: 568, default: 190 },
                medium2: { size: 768, default: 256.49 },
                large: { size: 1024, default: 303.99 },
              })}
              baseColor={theme.theme == Theme.dark ? '#211d35' : '#CDCDCC'}
              highlightColor={theme.theme == Theme.dark ? '#3e3663' : ''}
            />
          </section>
          <section className="home__data">
            <Skeleton
              height={getScreenSize({
                small: { size: 350, default: 48 },
                medium: { size: 568, default: 48 },
                medium2: { size: 768, default: 48 },
                large: { size: 1024, default: 144 },
              })}
              width={getScreenSize({
                small: { size: 350, default: 308 },
                medium: { size: 568, default: 260 },
                medium2: { size: 768, default: 318 },
                large: { size: 1024, default: 355 },
              })}
              baseColor={theme.theme == Theme.dark ? '#211d35' : '#CDCDCC'}
              highlightColor={theme.theme == Theme.dark ? '#3e3663' : ''}
            />
            <Skeleton
              height={getScreenSize({
                small: { size: 350, default: 27 },
                medium: { size: 568, default: 27 },
                medium2: { size: 768, default: 27 },
                large: { size: 1024, default: 30 },
              })}
              width={getScreenSize({
                small: { size: 350, default: 308 },
                medium: { size: 568, default: 180 },
                medium2: { size: 768, default: 318 },
                large: { size: 1024, default: 355 },
              })}
              baseColor={theme.theme == Theme.dark ? '#211d35' : '#CDCDCC'}
              highlightColor={theme.theme == Theme.dark ? '#3e3663' : ''}
            />
            <Skeleton
              height={getScreenSize({
                small: { size: 350, default: 69 },
                medium: { size: 568, default: 70 },
                medium2: { size: 768, default: 69 },
                large: { size: 1024, default: 75 },
              })}
              width={getScreenSize({
                small: { size: 350, default: 318 },
                medium: { size: 568, default: 342 },
                medium2: { size: 768, default: 318 },
                large: { size: 1024, default: 355 },
              })}
              baseColor={theme.theme == Theme.dark ? '#211d35' : '#CDCDCC'}
              highlightColor={theme.theme == Theme.dark ? '#3e3663' : ''}
            />
            <Skeleton
              height={getScreenSize({
                small: { size: 350, default: 62 },
                medium: { size: 568, default: 62 },
                medium2: { size: 768, default: 62 },
                large: { size: 1024, default: 62 },
              })}
              width={getScreenSize({
                small: { size: 350, default: 147.63 },
                medium: { size: 568, default: 147.63 },
                medium2: { size: 768, default: 147.63 },
                large: { size: 1024, default: 153.47 },
              })}
              baseColor={theme.theme == Theme.dark ? '#211d35' : '#CDCDCC'}
              highlightColor={theme.theme == Theme.dark ? '#3e3663' : ''}
            />
          </section>
        </div>
        <section
          className="home__scroll"
          style={{
            marginLeft: '0.5rem',
          }}
        >
          <Skeleton
            height={getScreenSize({
              small: { size: 350, default: 0 },
              medium: { size: 568, default: 0 },
              medium2: { size: 768, default: 48 },
              large: { size: 1024, default: 48 },
            })}
            width={getScreenSize({
              small: { size: 350, default: 0 },
              medium: { size: 568, default: 0 },
              medium2: { size: 768, default: 131.47 },
              large: { size: 1024, default: 137.28 },
            })}
            baseColor={theme.theme == Theme.dark ? '#211d35' : '#CDCDCC'}
            highlightColor={theme.theme == Theme.dark ? '#3e3663' : ''}
            className="home__scroll-button"
          />
        </section>
      </div>
    </section>
  );
}
