import { About } from "./components/About";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Qualification } from "./components/Qualification";
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
      </main>
    </>
  );
}

export default App;
