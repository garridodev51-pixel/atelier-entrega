import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AdminGallery from "./pages/AdminGallery.jsx";
import ClientGallery from "./pages/ClientGallery.jsx";
import { isAdmin } from "./lib/store";

function Private({ children }) {
  if (!isAdmin()) return <Navigate to="/admin" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/painel" element={<Private><AdminHome /></Private>} />
      <Route path="/painel/:id" element={<Private><AdminGallery /></Private>} />
      <Route path="/g/:slug" element={<ClientGallery />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
