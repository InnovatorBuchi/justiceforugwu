import React, { useEffect, useState } from "react";
const AUTH_KEY = "jfu_auth";

export default function Locker() {
  const [email, setEmail] = useState("");
  const [authed, setAuthed] = useState(!!localStorage.getItem(AUTH_KEY));
  const [list, setList] = useState([]);
  useEffect(() => {
    refresh();
  }, []);
  function refresh() {
    setList(JSON.parse(localStorage.getItem("jfu_files") || "[]"));
  }
  async function hashFile(file) {
    const buf = await file.arrayBuffer();
    const hash = await crypto.subtle.digest("SHA-256", buf);
    return [...new Uint8Array(hash)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  async function upload(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const file = fd.get("file");
    if (!file?.name) return alert("Choose a file");
    const entry = {
      id: crypto.randomUUID(),
      title: fd.get("title") || file.name,
      category: fd.get("category") || "document",
      public: fd.get("public") === "on",
      sha256: await hashFile(file),
      date: new Date().toISOString(),
    };
    const cur = JSON.parse(localStorage.getItem("jfu_files") || "[]");
    cur.push(entry);
    localStorage.setItem("jfu_files", JSON.stringify(cur));
    refresh();
    e.target.reset();
    alert("Saved (hash only, MVP).");
  }

  return (
    <section className="card">
      <h2>Evidence Vault</h2>
      <p className="small">
        Public exhibits are visible to everyone. Sensitive items require
        sign‑in.
      </p>

      <div className="grid cols-2" style={{ marginTop: 10 }}>
        <div className="card">
          <strong>Public Evidence</strong>
          {list.filter((x) => x.public).length === 0 && (
            <p className="small">No public items yet.</p>
          )}
          {list
            .filter((x) => x.public)
            .map((x) => (
              <div key={x.id} className="card" style={{ marginTop: 8 }}>
                <strong>{x.title}</strong>
                <br />
                <span className="small">
                  {x.category} — {new Date(x.date).toLocaleString()}
                </span>
                <br />
                <span className="small">SHA‑256: {x.sha256}</span>
              </div>
            ))}
        </div>

        <div className="card">
          <strong>Private (Investigators)</strong>
          {!authed ? (
            <div>
              <p className="small">
                Restricted. Enter an email to unlock a local session
                (placeholder until Supabase).
              </p>
              <input
                placeholder="your@email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div style={{ marginTop: 8 }}>
                <button
                  className="btn btn-accent"
                  onClick={() => {
                    if (!email.includes("@"))
                      return alert("Enter a valid email");
                    localStorage.setItem(AUTH_KEY, email);
                    setAuthed(true);
                  }}
                >
                  Sign in (Local)
                </button>
              </div>
            </div>
          ) : (
            <>
              {list.filter((x) => !x.public).length === 0 && (
                <p className="small">No private items yet.</p>
              )}
              {list
                .filter((x) => !x.public)
                .map((x) => (
                  <div key={x.id} className="card" style={{ marginTop: 8 }}>
                    <strong>{x.title}</strong>
                    <br />
                    <span className="small">
                      {x.category} — {new Date(x.date).toLocaleString()}
                    </span>
                    <br />
                    <span className="small">SHA‑256: {x.sha256}</span>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>

      <form onSubmit={upload} className="card" style={{ marginTop: 12 }}>
        <h3 style={{ margin: "0 0 8px" }}>Add Evidence (local MVP)</h3>
        <div className="grid cols-2">
          <label>
            Title
            <input name="title" />
          </label>
          <label>
            Category
            <select name="category">
              <option>court</option>
              <option>email</option>
              <option>screenshot</option>
            </select>
          </label>
        </div>
        <br />
        <label>
          File
          <input name="file" type="file" required />
        </label>
        <br />
        <label className="small">
          <input name="public" type="checkbox" /> Make Public
        </label>
        <br />
        <br />
        <button className="btn btn-accent" type="submit">
          Save (hash only)
        </button>{" "}
        <button className="btn" type="button" onClick={() => window.print()}>
          Export Case Pack (print)
        </button>
      </form>
    </section>
  );
}
