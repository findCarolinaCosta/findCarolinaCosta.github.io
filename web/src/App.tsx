import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

import { useSelector } from "react-redux";
import { Theme } from "./redux/reducers/settings";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Default from "./views";

function App() {
  const className = "dark-theme" as any;
const theme = useSelector(
    ({ settings }: { settings: { theme: Theme; icon: string } }) => settings
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
    <Routes>
      <Route path="/" element={<Default />} />
      <Route path="/pt-br" element={<Default />} />
    </Routes>
  );
}

export default App;
