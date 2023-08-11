import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

import { sections } from '.';
import { Theme } from '../../redux/reducers/settings';
import { getScreenSize } from '../../utils/getScreen';

export function HeaderSkeleton() {
  const theme = useSelector(
    ({ settings }: { settings: { theme: Theme; icon: string } }) => settings,
  );

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Skeleton
          height={25}
          width={69.25}
          baseColor={theme.theme == Theme.dark ? '#211d35' : '#CDCDCC'}
          highlightColor={theme.theme == Theme.dark ? '#3e3663' : ''}
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
                  highlightColor={theme.theme == Theme.dark ? '#3e3663' : ''}
                />
              </li>
            ))}
          </ul>
          <div className="nav__btns">
            <Skeleton
              height={20}
              width={20}
              baseColor={theme.theme == Theme.dark ? '#211d35' : '#CDCDCC'}
              highlightColor={theme.theme == Theme.dark ? '#3e3663' : ''}
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
