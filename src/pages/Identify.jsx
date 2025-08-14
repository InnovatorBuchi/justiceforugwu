import React, { useState } from "react";
const STEPS = [
  {
    title: "Safety & Control",
    qs: [
      "Has anyone used force, threats, or deception to control where you live or work?",
      "Is your passport/ID withheld from you?",
      "Are you monitored or escorted in ways that limit your freedom?",
      "Have documents or medical records been altered without your consent?",
      "Have threats been made toward your family if you don’t comply?",
    ],
  },
  {
    title: "Movement & Work",
    qs: [
      "Were you moved to another city/country and is your movement restricted?",
      "Are wages withheld or hours extreme with little/no pay?",
      "Are you unable to leave work or paying off a debt you didn’t freely accept?",
      "Do you depend on someone who withholds basics (food, meds, rest)?",
    ],
  },
  {
    title: "Sexual Exploitation & Threats",
    qs: [
      "Are you pressured or forced to perform sexual acts for money or favors?",
      "Do you fear harm, arrest, or deportation if you refuse demands?",
      "Do you experience intimidation, stalking, or harassment related to work/housing?",
      "Are security devices removed or used against you?",
      "Have you been isolated from friends/advocates or denied help?",
    ],
  },
];
export default function Identify() {
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState(new Set());
  const idx = (i) => `${step}:${i}`;
  const toggle = (i) => {
    const k = idx(i),
      s = new Set(checked);
    s.has(k) ? s.delete(k) : s.add(k);
    setChecked(s);
  };
  const next = () => (step < STEPS.length - 1 ? setStep(step + 1) : null);
  const back = () => (step > 0 ? setStep(step - 1) : null);
  const count = checked.size;
  let tone = "Low indicators",
    msg = "Few indicators appear here. This is not a diagnosis.";
  if (count >= 3) {
    tone = "High concern";
    msg = "Multiple high‑risk indicators. Consider confidential help now.";
  } else if (count >= 1) {
    tone = "Some concern";
    msg =
      "Some warning signs present. Consider documenting and seeking confidential advice.";
  }

  return (
    <section className="card">
      <h2>Identify Risk</h2>
      <div className="small">
        Step {step + 1} of {STEPS.length} — <strong>{STEPS[step].title}</strong>
      </div>
      <div style={{ marginTop: 10 }}>
        {STEPS[step].qs.map((q, i) => (
          <div key={i} style={{ margin: "6px 0" }}>
            <label>
              <input
                type="checkbox"
                onChange={() => toggle(i)}
                checked={checked.has(idx(i))}
              />{" "}
              {q}
            </label>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        <button className="btn" onClick={back} disabled={step === 0}>
          Back
        </button>
        <button
          className="btn btn-accent"
          onClick={next}
          disabled={step === STEPS.length - 1}
        >
          Next
        </button>
      </div>
      {step === STEPS.length - 1 && (
        <div className="card" style={{ marginTop: 12 }}>
          <strong>{tone}</strong>
          <br />
          <span className="small">{msg}</span>
          <div
            style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}
          >
            <a
              className="btn btn-accent"
              href="https://humantraffickinghotline.org"
              target="_blank"
              rel="noopener"
            >
              US: Polaris
            </a>
            <a
              className="btn"
              href="https://www.ice.gov/webform/hsi-tip-form"
              target="_blank"
              rel="noopener"
            >
              US: HSI Tip
            </a>
            <a
              className="btn btn-accent"
              href="https://naptip.gov.ng"
              target="_blank"
              rel="noopener"
            >
              Nigeria: NAPTIP
            </a>
            <a
              className="btn"
              href="https://efcc.gov.ng"
              target="_blank"
              rel="noopener"
            >
              Nigeria: EFCC
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
