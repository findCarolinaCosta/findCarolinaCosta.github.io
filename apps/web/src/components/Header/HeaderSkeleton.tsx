import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

import { Theme } from '../../redux/reducers/settings';
import { getScreenSize } from '../../utils/getScreen';

export function HeaderSkeleton() {
  const theme = useSelector(
    ({ settings }: { settings: { theme: Theme; icon: string } }) => settings,
  );
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

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Skeleton
          height={25}
          width={69.25}
          baseColor={theme.theme == Theme.dark ? '#211d35' : '#CDCDCC'}
          highlightColor={theme.theme == Theme.dark ? '#3e3663' : '#f5f5f5'}
        />

        <div
          id="nav-menu"
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
          }}
        >
          <ul className="nav__list grid">
            {sections.map(() => (
              <li key={Math.random()}>
                <Skeleton
                  key={Math.random()}
                  height={getScreenSize({
                    small: { size: 350, default: 0 },
                    medium: { size: 568, default: 0 },
                    medium2: { size: 768, default: 21 },
                    large: { size: 1024, default: 21 },
                  })}
                  width={getScreenSize({
                    small: { size: 350, default: 0 },
                    medium: { size: 568, default: 0 },
                    medium2: { size: 768, default: 54 },
                    large: { size: 1024, default: 60 },
                  })}
                  baseColor={theme.theme == Theme.dark ? '#211d35' : '#CDCDCC'}
                  highlightColor={
                    theme.theme == Theme.dark ? '#3e3663' : '#f5f5f5'
                  }
                />
              </li>
            ))}
          </ul>
          <div className="nav__btns">
            <Skeleton
              height={20}
              width={20}
              baseColor={theme.theme == Theme.dark ? '#211d35' : '#CDCDCC'}
              highlightColor={theme.theme == Theme.dark ? '#3e3663' : '#f5f5f5'}
              circle={true}
            />
            <div className="nav__toggle" id="nav-toggle">
              <i className="uil uil-apps nav__icon"></i>
            </div>
          </div>
          <div>
            <div className="flex space-x-2.5 mx-2 mt-5 md:mt-0 md:flex-col md:space-x-0 md:mx-0 lg:space-x-2.5 lg:flex-row lg:mx-0">
              <Skeleton
                height={23}
                width={27}
                baseColor={theme.theme == Theme.dark ? '#211d35' : '#CDCDCC'}
                highlightColor={
                  theme.theme == Theme.dark ? '#3e3663' : '#f5f5f5'
                }
                className="text-lg"
              />
              <Skeleton
                height={23}
                width={27}
                baseColor={theme.theme == Theme.dark ? '#211d35' : '#CDCDCC'}
                highlightColor={
                  theme.theme == Theme.dark ? '#3e3663' : '#f5f5f5'
                }
                className="text-lg"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
