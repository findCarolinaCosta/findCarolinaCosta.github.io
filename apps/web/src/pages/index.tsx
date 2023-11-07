import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { About } from '../components/About';
import { ContactMe } from '../components/ContactMe';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Home } from '../components/Home';
import { Portfolios } from '../components/Portfolio';
import { Qualification } from '../components/Qualification';
import { ScrollTop } from '../components/Scroll/Top';
import ScrollSpyContainer from '../components/ScrollSpyContainer';
import { Services } from '../components/Services';
import { Skills } from '../components/Skills';
import { setMainInfo } from '../redux/reducers/mainInfo';
import { handleLanguage, Theme } from '../redux/reducers/settings';
import { getMainInfo, Language } from '../services/getMainInfo';

import 'react-toastify/dist/ReactToastify.css';

export default function Default() {
  const className = 'dark-theme' as any;
  const dispatch = useDispatch();
  const path = Language['en-us'];
  const theme = useSelector(
    ({ settings }: { settings: { theme: Theme; icon: string } }) => settings,
  );

  const addBodyClass = (className: any) =>
    document.body.classList.add(className);

  const removeBodyClass = (className: any) =>
    document.body.classList.remove(className);

  useEffect(() => {
    dispatch(handleLanguage(path));
    getMainInfo(path).then(({ data: { payload } }) =>
      dispatch(setMainInfo({ data: payload[0] })),
    );
  }, [dispatch, path]);

  useEffect(() => {
    if (theme.theme == Theme.dark) {
      className instanceof Array
        ? className.map(addBodyClass)
        : addBodyClass(className);
    } else {
      className instanceof Array
        ? className.map(removeBodyClass)
        : removeBodyClass(className);
    }
  }, [theme.theme]);

  return (
    <div className="div-main">
      <Header />
      <ToastContainer />
      <main>
        <ScrollSpyContainer>
          <Home />
          <About />
          <Skills />
          <Qualification />
          <Services />
          <Portfolios />
          <ContactMe />
        </ScrollSpyContainer>
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
}
