import { Routes, Route } from "react-router-dom";
import Detail from "../pages/Detail";
import App from "../pages/App";
import NotFound from "../pages/NotFound";

export default function Navigation() {
  return (
    <div className="homepage">
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/cat/:id" element={<Detail/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}