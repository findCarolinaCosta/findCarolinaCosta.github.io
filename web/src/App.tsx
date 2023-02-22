import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

import { useSelector } from "react-redux";
import { Theme } from "./redux/reducers/settings";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Default from "./views";
import { NotFound } from "./views/NotFound";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Default />} />
      <Route path="/pt-br" element={<Default />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
