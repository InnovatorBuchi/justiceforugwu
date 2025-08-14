import React, { useState } from "react";
export default function CheckIn() {
  const [a, setA] = useState(null),
    [b, setB] = useState(null),
    [c, setC] = useState(null);
  const distress = [a, b, c].filter((x) => x === "yes").length >= 1;
  return (
    <section className="card">
      <h2>How Are You Feeling?</h2>
      <p className="small">
        Gentle check‑in. If you’re in immediate danger, call local emergency
        services. You are not alone.
      </p>
      <FormQ
        q="Do you sometimes feel you shouldn’t be here?"
        val={a}
        set={setA}
      />
      <FormQ q="Have you felt like giving up lately?" val={b} set={setB} />
      <FormQ
        q="Would you like help or someone to talk to?"
        val={c}
        set={setC}
      />
      {a && b && c && (
        <div className="card" style={{ marginTop: 12 }}>
          {distress ? (
            <>
              <p>
                <strong>You’re not alone.</strong> Help is available right now:
              </p>
              <ul>
                <li>
                  <a href="tel:988">Call 988 (US Suicide & Crisis Lifeline)</a>
                </li>
                <li>
                  <a href="sms:741741">Text 741741 (Crisis Text Line)</a>
                </li>
                <li>
                  <a
                    href="https://humantraffickinghotline.org"
                    target="_blank"
                    rel="noopener"
                  >
                    National Human Trafficking Hotline
                  </a>
                </li>
              </ul>
              <p className="small">
                If talking is hard, try writing in Journal or reading a survivor
                story in About.
              </p>
            </>
          ) : (
            <p>
              Thank you for checking in. If your feelings change, this page is
              here for you. You matter.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
function FormQ({ q, val, set }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <label>{q}</label>
      <br />
      <label>
        <input
          type="radio"
          name={q}
          checked={val === "yes"}
          onChange={() => set("yes")}
        />{" "}
        Yes
      </label>{" "}
      <label>
        <input
          type="radio"
          name={q}
          checked={val === "no"}
          onChange={() => set("no")}
        />{" "}
        No
      </label>
    </div>
  );
}
