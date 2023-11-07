import { useDispatch } from 'react-redux';
import ScrollSpy from 'react-ui-scrollspy';

import { handleActiveSection } from '../../redux/reducers/section';

interface IPropsScrollSpyContainer {
  children: React.ReactNode;
}

export default function ScrollSpyContainer({
  children,
}: IPropsScrollSpyContainer) {
  const dispatch = useDispatch();

  return (
    <ScrollSpy
      activeClass="active-link"
      onUpdateCallback={(id) => dispatch(handleActiveSection(id))}
      updateHistoryStack={false}
      useBoxMethod={false}
      scrollThrottle={0}
    >
      {children}
    </ScrollSpy>
  );
}
