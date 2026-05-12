import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function Layout() {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const location = useLocation();

  const isAdminPage = location.pathname === "/admin";
  const isHomePage = location.pathname === "/";

  // Focus mode only applies on home page
  const focusModeActive = isFocusMode && isHomePage;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header
        isFocusMode={focusModeActive}
        onToggleFocusMode={() => setIsFocusMode((prev) => !prev)}
        showAdminButton={!isAdminPage}
      />

      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      {/* {!focusModeActive && <Footer />} */}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
