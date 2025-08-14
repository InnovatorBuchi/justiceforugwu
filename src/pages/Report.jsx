import React, { useRef, useState } from "react";
export default function Report() {
  const f = useRef();
  const [txt, setTxt] = useState("");
  const gen = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(f.current).entries());
    const out = `Trauma‑informed summary:\n\nWhat: ${data.what}\nWhen/Where: ${data.whenWhere}\nWho: ${data.who}\nAsk: ${data.ask}\n\nI request a survivor‑centered response, preservation of evidence, and next steps.`;
    setTxt(out);
  };
  const copy = async () => {
    if (!txt) return;
    try {
      await navigator.clipboard.writeText(txt);
      alert("Copied.");
    } catch {
      alert("Copy failed");
    }
  };
  const save = () => {
    const list = JSON.parse(localStorage.getItem("jfu_reports") || "[]");
    list.push({ txt, ts: new Date().toISOString() });
    localStorage.setItem("jfu_reports", JSON.stringify(list));
    alert("Saved locally (MVP).");
  };
  return (
    <section className="card">
      <h2>Report / Witness Prep</h2>
      <form ref={f}>
        <label>
          What happened?
          <br />
          <textarea name="what" rows="4" />
        </label>
        <br />
        <br />
        <label>
          When & where?
          <br />
          <input name="whenWhere" />
        </label>
        <br />
        <br />
        <label>
          Who was involved?
          <br />
          <input name="who" />
        </label>
        <br />
        <br />
        <label>
          What do you need to ask for?
          <br />
          <input name="ask" />
        </label>
        <br />
        <br />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn btn-accent" onClick={gen}>
            Generate Summary
          </button>
          <button className="btn" type="button" onClick={copy}>
            Copy
          </button>
          <button className="btn" type="button" onClick={() => window.print()}>
            Print
          </button>
          <button className="btn" type="button" onClick={save}>
            Save (local)
          </button>
        </div>
      </form>
      {txt && (
        <pre className="card" style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>
          {txt}
        </pre>
      )}
    </section>
  );
}
