import { useEffect } from "react";
import { useSelector } from "react-redux";
import { About } from "./components/About";
import { ContactMe } from "./components/ContactMe";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Portfolios } from "./components/Portfolio";
import { Qualification } from "./components/Qualification";
import { ScrollTop } from "./components/Scroll/Top";
import { Services } from "./components/Services";
import { Skills } from "./components/Skills";
import { Theme } from "./redux/reducers/theme";

function App() {
  const className = "dark-theme" as any;
  const theme = useSelector(
    ({ theme }: { theme: { theme: Theme; icon: string } }) => theme
  );

  const addBodyClass = (className: any) =>
    document.body.classList.add(className);

  const removeBodyClass = (className: any) =>
    document.body.classList.remove(className);

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
  });

  return (
    <>
      <Header />
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
    </>
  );
}

export default App;
