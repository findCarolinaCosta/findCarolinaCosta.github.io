import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from '@/redux/store';

import { About } from '../components/About';
import { ContactMe } from '../components/ContactMe';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Home } from '../components/Home';
import { Portfolios } from '../components/Portfolio';
import { Qualification } from '../components/Qualification';
import { ScrollTop } from '../components/Scroll/Top';
import { Services } from '../components/Services';
import { Skills } from '../components/Skills';
import { setMainInfo } from '../redux/reducers/mainInfo';
import { handleLanguage, Theme } from '../redux/reducers/settings';
import { getMainInfo, Language } from '../services/getMainInfo';

import 'react-toastify/dist/ReactToastify.css'; //add this line

export default function Default() {
  const pathname = usePathname();
  const className = 'dark-theme' as any;
  const dispatch = useDispatch();
  const path = (pathname.includes('pt-br') ? 'pt-br' : 'en-us') as Language;
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
        <Home />
        <About />
        <Skills />
        <Qualification />
        <Services />
        <Portfolios />
        <ContactMe />
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
}