import { About } from "./components/About";
import { ContactMe } from "./components/ContactMe";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Portfolios } from "./components/Portfolio";
import { Qualification } from "./components/Qualification";
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
    </>
  );
}

export default App;
