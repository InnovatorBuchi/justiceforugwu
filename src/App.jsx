import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Explain from "./pages/Explain.jsx";
import Identify from "./pages/Identify.jsx";
import CheckIn from "./pages/CheckIn.jsx";
import Report from "./pages/Report.jsx";
import Locker from "./pages/Locker.jsx";
import About from "./pages/About.jsx";
import Journal from "./pages/Journal.jsx";
import NotFound from "./pages/NotFound.jsx";

function goSafe() {
  window.location.replace("https://www.google.com/weather");
}

export default function App() {
  const [discreet, setDiscreet] = useState(
    localStorage.getItem("jfu_discreet") === "1"
  );
  const location = useLocation();
  useEffect(() => {
    document.body.classList.toggle("discreet", discreet);
    localStorage.setItem("jfu_discreet", discreet ? "1" : "0");
  }, [discreet]);
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") goSafe();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);
  const isHome = location.pathname === "/";

  return (
    <>
      {/* NAV */}
      <div className="mast" role="navigation" aria-label="Primary">
        <div className="inner">
          <div className="brand">
            <span className="shield">✓</span> <span>Justice for Ugwu</span>
          </div>
          <nav className="navlinks">
            <Link to="/">
              <span>🏠</span> Home
            </Link>
            <Link to="/explain">
              <span>💬</span> What Is Trauma?
            </Link>
            <Link to="/identify">
              <span>🛡️</span> Check Yourself
            </Link>
            <Link to="/check-in">
              <span>💗</span> How Are You?
            </Link>
            <Link to="/report">
              <span>📝</span> Report Tool
            </Link>
            <Link to="/locker">
              <span>🗂️</span> Evidence Vault
            </Link>
            <Link to="/about">
              <span>📖</span> My Story
            </Link>
            <Link to="/journal">
              <span>🗒️</span> Journal
            </Link>
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
          <button className="btn btn-danger" onClick={goSafe}>
            Quick Exit
          </button>
        </div>
      </div>

      {/* HERO (home only) */}
      {isHome && (
        <header className="hero">
          <div className="wrap center">
            <h1>
              <span style={{ fontWeight: 800 }}>Justice For Ugwu:</span>
              <br />
              <span className="teal" style={{ fontWeight: 800 }}>
                A Survivor's Platform for Truth and Tools
              </span>
            </h1>
            <p className="sub">
              “I was trafficked. I was erased. I fought back—with proof.”
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: 12,
              }}
            >
              <Link className="btn btn-accent" to="/identify">
                🛡️ Identify Risk
              </Link>
              <Link className="btn btn-pill" to="/explain">
                💬 Understand Trauma
              </Link>
              <Link className="btn btn-pill" to="/locker">
                🗂️ View My Case File
              </Link>
            </div>
          </div>
        </header>
      )}

      {/* ROUTES */}
      <main className="wrap">
        <Routes>
          <Route path="/" element={<Home />} />
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
      <footer>
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
          <div className="small">
            This site does not track or advertise. It exists to empower and
            protect.
          </div>
          <div className="badge">
            Press <strong>Esc</strong> for Quick Exit
          </div>
        </div>
        <div className="wrap center small" style={{ paddingBottom: 18 }}>
          <a href="/">Start Here</a> · <a href="/report">Contact</a> ·{" "}
          <a href="/check-in">Emergency: Text 741741 | Call 988</a>
          <div style={{ marginTop: 16, opacity: 0.7 }}>
            "Trauma doesn't define you. Truth empowers you. Justice heals
            communities."
          </div>
        </div>
      </footer>

      <button
        className="btn btn-danger panic"
        onClick={goSafe}
        aria-label="Quick Exit"
      >
        Quick Exit
      </button>
    </>
  );
}
