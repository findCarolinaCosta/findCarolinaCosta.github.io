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

function App() {
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
