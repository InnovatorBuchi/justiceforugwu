import React from "react";

export default function Home() {
  return (
    <>
      {/* My Story / Video card */}
      <section className="card center">
        <h2>My Story: From Survivor to Advocate</h2>
        <div
          style={{
            position: "relative",
            height: 260,
            border: "1px solid var(--line)",
            borderRadius: 18,
            background: "#f3f6fa",
            display: "grid",
            placeItems: "center",
            color: "#3b556d",
          }}
        >
          <div style={{ fontSize: 48, color: "var(--teal)" }}>▶</div>
          <div
            className="small"
            style={{ position: "absolute", bottom: 16, width: "100%" }}
          >
            Video content will be embedded here (YouTube integration)
          </div>
        </div>
      </section>

      {/* Tools for Survivors and Supporters */}
      <section style={{ marginTop: 26 }}>
        <h2 className="center">Tools for Survivors and Supporters</h2>
        <div className="grid cols-4">
          <ToolCard
            title="Trauma Screener"
            desc="Confidential self-assessment to understand your experiences."
            cta="Take Assessment"
            href="/identify"
            emoji="🛡️"
          />
          <ToolCard
            title="Safety Check-In"
            desc="Quick, safe way to assess how you're feeling right now."
            cta="Check In Now"
            href="/check-in"
            emoji="💗"
          />
          <ToolCard
            title="Report Builder"
            desc="Organize your story in a trauma-informed way."
            cta="Start Report"
            href="/report"
            emoji="📝"
          />
          <ToolCard
            title="Private Journal"
            desc="Safe space for your thoughts (stored locally only)."
            cta="Open Journal"
            href="/journal"
            emoji="🗒️"
          />
        </div>
      </section>

      {/* Need Help band */}
      <section className="helpband center">
        <h2 style={{ marginTop: 0 }}>Need Help Right Now?</h2>
        <div className="grid cols-3" style={{ marginTop: 10 }}>
          <HelpPill title="Crisis Text Line" desc="Text HOME to 741741" />
          <HelpPill title="Suicide Prevention" desc="Call or Text 988" />
          <HelpPill title="Human Trafficking" desc="1-888-373-7888" />
        </div>
      </section>
    </>
  );
}

function ToolCard({ title, desc, cta, href, emoji }) {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <div style={{ fontSize: 32 }}>{emoji}</div>
      <div style={{ fontWeight: 800, marginTop: 6 }}>{title}</div>
      <div className="small" style={{ marginTop: 6 }}>
        {desc}
      </div>
      <div style={{ marginTop: 10 }}>
        <a className="btn btn-pill" href={href}>
          {cta}
        </a>
      </div>
    </div>
  );
}

function HelpPill({ title, desc }) {
  return (
    <div
      className="card"
      style={{
        textAlign: "center",
        background: "#fff",
        borderColor: "#ffdede",
      }}
    >
      <div style={{ fontWeight: 800, color: "#b51d1d" }}>{title}</div>
      <div className="small">{desc}</div>
    </div>
  );
}
