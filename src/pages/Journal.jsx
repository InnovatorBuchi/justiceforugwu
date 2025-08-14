import React, { useState, useEffect } from "react";
export default function Journal() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ date: "", type: "", notes: "" });
  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("jfu_journal") || "[]"));
  }, []);
  function save(e) {
    e.preventDefault();
    const next = [...items, { ...form, id: crypto.randomUUID() }];
    localStorage.setItem("jfu_journal", JSON.stringify(next));
    setItems(next);
    setForm({ date: "", type: "", notes: "" });
  }
  return (
    <section className="card">
      <h2>Journal (private to this device)</h2>
      <form onSubmit={save} className="card">
        <div className="grid cols-2">
          <label>
            Date
            <input
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              type="date"
            />
          </label>
          <label>
            Incident Type
            <input
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
          </label>
        </div>
        <br />
        <label>
          Notes
          <textarea
            rows="4"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </label>
        <br />
        <button className="btn btn-accent">Save</button>
      </form>
      {items.length === 0 ? (
        <p className="small">No entries yet.</p>
      ) : (
        items.map((x) => (
          <div key={x.id} className="card" style={{ marginTop: 10 }}>
            <strong>
              {x.date} — {x.type}
            </strong>
            <br />
            <span className="small">{x.notes}</span>
          </div>
        ))
      )}
    </section>
  );
}
