import { About } from "./components/About";
import { Header } from "./components/Header";
import { Home } from "./components/Home";

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
        <About />
      </main>
    </>
  );
}

export default App;
