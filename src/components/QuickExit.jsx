import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import QuickExit from "./components/QuickExit.jsx";

import Home from "./pages/Home.jsx";
import Explain from "./pages/Explain.jsx";
import Identify from "./pages/Identify.jsx";
import CheckIn from "./pages/CheckIn.jsx";
import Report from "./pages/Report.jsx";
import Locker from "./pages/Locker.jsx";
import About from "./pages/About.jsx";
import Journal from "./pages/Journal.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const [discreet, setDiscreet] = useState(
    localStorage.getItem("jfu_discreet") === "1"
  );
  const location = useLocation();

  // Persist Discreet Mode
  useEffect(() => {
    document.body.classList.toggle("discreet", discreet);
    localStorage.setItem("jfu_discreet", discreet ? "1" : "0");
  }, [discreet]);

  const isHome = location.pathname === "/";

  return (
    <>
      {/* NAV */}
      <div className="mast" role="navigation" aria-label="Primary">
        <div className="inner">
          <strong>Justice For Ugwu</strong>
          <nav className="navlinks">
            <Link to="/">Home</Link>
            <Link to="/explain">Understand Trauma</Link>
            <Link to="/identify">Identify Risk</Link>
            <Link to="/check-in">Check-In</Link>
            <Link to="/report">Witness Prep</Link>
            <Link to="/locker">Evidence Vault</Link>
            <Link to="/about">About</Link>
            <Link to="/journal">Journal</Link>
          </nav>

          <label
            className="small"
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <input
              type="checkbox"
              checked={discreet}
              onChange={(e) => setDiscreet(e.target.checked)}
            />{" "}
            Discreet
          </label>

          {/* Hard external navigation; cannot be intercepted by the router */}
          <QuickExit />
        </div>
      </div>

      {/* HERO (home only) */}
      {isHome ? (
        <header className="hero">
          <div className="wrap">
            <Home />
          </div>
        </header>
      ) : null}

      {/* ROUTES */}
      <main className="wrap">
        <Routes>
          <Route path="/" element={null} />
          <Route path="/explain" element={<Explain />} />
          <Route path="/identify" element={<Identify />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/report" element={<Report />} />
          <Route path="/locker" element={<Locker />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          background: "#0B1233",
          color: "#cbd5ff",
          marginTop: 40,
          borderTop: "1px solid #1b255a",
        }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong>Justice For Ugwu</strong>
            <br />
            <span className="small">Built to educate, equip, and empower.</span>
          </div>
          <div className="badge">
            Press <strong>Esc</strong> for Quick Exit
          </div>
          <div className="badge">
            Built by Onyebuchi Michael Ugwu — Survivor. Analyst. Witness.
          </div>
        </div>
      </footer>

      {/* Floating Quick Exit */}
      <QuickExit className="panic" />
    </>
  );
}
