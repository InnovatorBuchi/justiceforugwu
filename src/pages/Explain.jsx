import React from "react";
export default function Explain() {
  return (
    <section className="card">
      <h2>What Is Trauma?</h2>
      <p>
        Trauma is a deeply upsetting thing that happens to someone. It can be
        hard to see, but it can feel very heavy inside.
      </p>
      <div className="grid cols-2" style={{ alignItems: "center" }}>
        <div className="card">
          <strong>🌧️ Storm Cloud</strong>
          <br />
          <span className="small">
            Imagine a storm cloud following you. It weighs down your heart and
            makes everything feel harder.
          </span>
        </div>
        <div className="card">
          <strong>💔 Cracked Heart</strong>
          <br />
          <span className="small">
            Hurt can linger even after danger ends. That doesn’t mean you’re
            weak—it means you’re human.
          </span>
        </div>
        <div className="card">
          <strong>🌱 Healing Plant</strong>
          <br />
          <span className="small">
            You can’t erase trauma, but you can heal. With safety, care, and
            time, people grow again.
          </span>
        </div>
        <div className="card">
          <strong>🧭 Choices & Control</strong>
          <br />
          <span className="small">
            You deserve control, clear choices, and respect. This site is
            designed for emotional safety.
          </span>
        </div>
      </div>
    </section>
  );
}
