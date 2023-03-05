import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

import { Routes, Route } from "react-router-dom";
import { Default } from "./views";
import { NotFound } from "./views/NotFound";
import { Navigate } from "react-router-dom";
import { Forbidden } from "./views/Forbidden";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/" element={<Default />} />
      <Route path="/pt-br" element={<Default />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/403" element={<Forbidden />} />
    </Routes>
  );
}

export default App;
