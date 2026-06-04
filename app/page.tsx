import Image from "next/image";
import { Bus, TrendingDown, Building2, AlertTriangle, ExternalLink, Users, Zap } from "lucide-react";
import {
  KSRTC_DATA, DEFICIT_FY24,
  WORST_YEAR, BEST_YEAR_RELATIVE,
  LDF_AVG_LOSS, UDF_AVG_LOSS, PARTY_COLORS, PARTY_SYMBOL, CM_LEADERS,
  lossPercent, avg,
} from "@/lib/ksrtc-data";
import {
  PLComboChart, DeficitChart, PartyChart,
  DieselChart, WorkforceChart, SubventionChart, YearExplorer,
} from "@/components/charts";
import DataTable from "@/components/table";

function KsrtcBusSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="4" y="12" width="112" height="36" rx="6" stroke="currentColor" strokeWidth="2.5" />
      {/* Roof / destination board */}
      <rect x="12" y="6" width="96" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
      {/* Destination board text area */}
      <rect x="16" y="7.5" width="88" height="7" rx="2" fill="currentColor" opacity="0.15" />
      {/* Windows */}
      <rect x="12" y="20" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="36" y="20" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="60" y="20" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="84" y="20" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Door */}
      <rect x="4" y="22" width="6" height="20" rx="1" fill="currentColor" opacity="0.2" />
      {/* Wheels */}
      <circle cx="24" cy="50" r="8" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="50" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="94" cy="50" r="8" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="94" cy="50" r="3" fill="currentColor" opacity="0.4" />
      {/* Front grille */}
      <line x1="108" y1="20" x2="108" y2="40" stroke="currentColor" strokeWidth="1.5" />
      <line x1="104" y1="24" x2="115" y2="24" stroke="currentColor" strokeWidth="1" />
      <line x1="104" y1="29" x2="115" y2="29" stroke="currentColor" strokeWidth="1" />
      <line x1="104" y1="34" x2="115" y2="34" stroke="currentColor" strokeWidth="1" />
      {/* Headlight */}
      <rect x="108" y="18" width="7" height="5" rx="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function KPI({ icon, label, value, sub, pct, color = "#8B5CF6" }: {
  icon: React.ReactNode; label: string; value: string; sub?: string; pct?: string; color?: string;
}) {
  return (
    <div className="rounded-2xl border p-5 flex flex-col gap-2" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: color + "22", color }}>{icon}</div>
      <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted)" }}>{label}</p>
      <p className="text-2xl font-black" style={{ color }}>{value}</p>
      {pct && <p className="text-sm font-bold" style={{ color: color + "CC" }}>{pct}</p>}
      {sub && <p className="text-xs" style={{ color: "var(--muted)" }}>{sub}</p>}
    </div>
  );
}

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-black">{title}</h2>
        {sub && <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>{sub}</p>}
      </div>
      {children}
    </section>
  );
}

function Card({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-5 space-y-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--muted)" }}>{title}</p>
        {sub && <p className="text-xs mt-0.5" style={{ color: "var(--subtle)" }}>{sub}</p>}
      </div>
      {children}
    </div>
  );
}

export default function Home() {
  const last = KSRTC_DATA[KSRTC_DATA.length - 1];
  const avgLossPct = avg(KSRTC_DATA.map(d => parseFloat(lossPercent(d)))).toFixed(1);
  const ldfAvgPct = avg(KSRTC_DATA.filter(d => d.party === "LDF").map(d => parseFloat(lossPercent(d)))).toFixed(1);
  const udfAvgPct = avg(KSRTC_DATA.filter(d => d.party === "UDF").map(d => parseFloat(lossPercent(d)))).toFixed(1);

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>

      {/* Nav */}
      <nav className="border-b px-6 lg:px-16 h-16 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md"
        style={{ borderColor: "var(--border)", background: "rgba(13,15,26,0.92)" }}>
        <div className="flex items-center gap-3">
          {/* KSRTC emblem color block */}
          <div className="w-9 h-9 rounded-lg flex items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#F04545,#C0392B)" }}>
            <Bus className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-black text-sm tracking-tight">KSRTC Kerala</span>
            <span className="text-xs ml-2" style={{ color: "var(--muted)" }}>P&amp;L Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-xs font-mono px-2 py-1 rounded" style={{ background: "var(--bg2)", color: "var(--muted)" }}>
            FY 2000-01 → {last.fy}
          </span>
          <span className="text-xs px-2 py-1 rounded-full border font-bold" style={{ borderColor: "#F0454444", color: "#F04545", background: "#F0454411" }}>
            24 Years of Losses
          </span>
        </div>
      </nav>

      <div className="px-6 lg:px-16 py-12 space-y-16 max-w-7xl mx-auto">

        {/* Hero */}
        <div className="space-y-6 fade-up">
          {/* Bus graphic banner */}
          <div className="rounded-2xl border overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #0D0F1A 0%, #1A0D0D 50%, #0D0D1A 100%)", borderColor: "#F0454433" }}>
            <div className="absolute inset-0 opacity-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="absolute" style={{ top: `${10 + i * 15}%`, left: `${-5 + i * 18}%`, transform: "rotate(-5deg)" }}>
                  <KsrtcBusSVG className="w-48 text-red-400" />
                </div>
              ))}
            </div>
            <div className="relative px-8 py-8 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs font-bold px-3 py-1 rounded-full border" style={{ borderColor: "#F0454444", color: "#F04545", background: "#F0454411" }}>Public Sector Analysis</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full border" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>Kerala, India</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full border" style={{ borderColor: "#F5B73144", color: "#F5B731", background: "#F5B73111" }}>24 Fiscal Years</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black leading-tight">
                  Kerala KSRTC<br />
                  <span style={{ color: "#F04545" }}>Profit &amp; Loss</span><br />
                  <span style={{ color: "var(--muted)", fontSize: "55%" }}>FY 2000-01 to FY 2023-24</span>
                </h1>
                <p className="max-w-xl text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  A 24-year forensic view of Kerala State Road Transport Corporation — annual revenue, expenses,
                  net P&amp;L with %, government subventions, diesel costs, workforce trends, political context, and the
                  specific causes behind each year&apos;s losses.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-black" style={{ color: "#F04545" }}>₹19,370 Cr</div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>Accumulated Deficit</div>
                  </div>
                  <div className="w-px h-10" style={{ background: "var(--border)" }} />
                  <div className="text-center">
                    <div className="text-2xl font-black" style={{ color: "#F5B731" }}>{avgLossPct}%</div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>Avg Loss / Revenue</div>
                  </div>
                  <div className="w-px h-10" style={{ background: "var(--border)" }} />
                  <div className="text-center">
                    <div className="text-2xl font-black" style={{ color: "#8B5CF6" }}>24/24</div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>Loss-Making Years</div>
                  </div>
                </div>
              </div>
              {/* Large bus graphic */}
              <div className="shrink-0 opacity-80" style={{ color: "#F04545" }}>
                <KsrtcBusSVG className="w-64 lg:w-80" />
                <div className="text-center mt-2">
                  <span className="text-xs font-bold tracking-widest" style={{ color: "#F04545" }}>KSRTC KERALA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl rounded-xl border p-4 flex items-start gap-3" style={{ borderColor: "#F5B73144", background: "#F5B73111" }}>
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#F5B731" }} />
            <div className="text-xs space-y-1">
              <p className="font-bold" style={{ color: "#F5B731" }}>Data Transparency Notice</p>
              <p style={{ color: "var(--muted)" }}>
                Official figures (FY 2015-16, 2016-17, 2022-23, 2023-24) sourced from Kerala State Planning Board
                Economic Reviews and CARE Ratings press releases. FY 2014-15 from CAG Report No. 5 of 2018.
                Earlier years estimated from trend analysis — marked ⚠ throughout. Event sources cited inline on tooltips.
              </p>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <Section title="At a Glance" sub="Key figures across all 24 fiscal years">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <KPI icon={<TrendingDown className="w-5 h-5" />} label="Balance-Sheet Deficit" value={`₹${(DEFICIT_FY24 / 1000).toFixed(2)}k Cr`} sub="CARE Ratings, Mar 2024" color="#F04545" />
            <KPI icon={<TrendingDown className="w-5 h-5" />} label="Worst Year Loss" value={`₹${Math.abs(WORST_YEAR.netPL)} Cr`} pct={`${lossPercent(WORST_YEAR)}% of revenue`} sub={`FY ${WORST_YEAR.fy} — COVID-19`} color="#F04545" />
            <KPI icon={<TrendingDown className="w-5 h-5" />} label="Best Relative Year" value={`₹${Math.abs(BEST_YEAR_RELATIVE.netPL)} Cr`} pct={`${lossPercent(BEST_YEAR_RELATIVE)}% of revenue`} sub={`FY ${BEST_YEAR_RELATIVE.fy}`} color="#F5B731" />
            <KPI icon={<Building2 className="w-5 h-5" />} label="LDF Avg Annual Loss" value={`₹${Math.abs(LDF_AVG_LOSS).toFixed(0)} Cr`} pct={`${ldfAvgPct}% of revenue`} sub={`${KSRTC_DATA.filter(d => d.party === "LDF").length} fiscal years`} color="#EF4444" />
            <KPI icon={<Building2 className="w-5 h-5" />} label="UDF Avg Annual Loss" value={`₹${Math.abs(UDF_AVG_LOSS).toFixed(0)} Cr`} pct={`${udfAvgPct}% of revenue`} sub={`${KSRTC_DATA.filter(d => d.party === "UDF").length} fiscal years`} color="#3B82F6" />
            <KPI icon={<Bus className="w-5 h-5" />} label="Loss-Making Years" value={`${KSRTC_DATA.filter(d => d.netPL < 0).length} / 24`} sub="Every year since FY 2000" color="#8B5CF6" />
          </div>
        </Section>

        {/* Leaders Gallery */}
        <Section title="Chief Ministers & Political Context" sub="Leaders who presided over KSRTC — party, term, and defining moment">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CM_LEADERS.map((cm) => {
              const pc = PARTY_COLORS[cm.party];
              const sym = PARTY_SYMBOL[cm.party];
              return (
                <div key={cm.name} className="rounded-2xl border overflow-hidden flex flex-col"
                  style={{ background: "var(--card)", borderColor: pc + "44" }}>
                  {/* Photo */}
                  <div className="relative aspect-square overflow-hidden" style={{ background: pc + "18" }}>
                    <Image
                      src={cm.photoUrl}
                      alt={`${cm.name} — Kerala CM`}
                      fill
                      className="object-cover object-top"
                      sizes="200px"
                      onError={undefined}
                    />
                    {/* Party symbol overlay */}
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: pc, color: "#fff", fontSize: 14 }}>
                      {sym}
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-3 flex-1 space-y-1.5">
                    <div>
                      <p className="text-xs font-black leading-tight">{cm.shortName}</p>
                      <p className="text-xs font-bold" style={{ color: pc }}>{cm.party} · {cm.term}</p>
                    </div>
                    <p className="text-xs leading-snug" style={{ color: "var(--muted)" }}>{cm.highlight}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Party symbol legend */}
          <div className="flex flex-wrap gap-6 mt-2">
            {([["LDF", "#EF4444", "☭", "CPM-led Left Democratic Front — sickle & hammer symbol"],
              ["UDF", "#3B82F6", "✋", "INC-led United Democratic Front — open hand (haath) symbol"]] as const).map(([p, c, s, desc]) => (
                <div key={p} className="flex items-center gap-2 text-sm">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: c }}>{s}</span>
                  <span style={{ color: "var(--muted)" }}><strong style={{ color: c }}>{p}</strong> — {desc}</span>
                </div>
              ))}
          </div>
        </Section>

        <Section title="Revenue vs Expenses vs Net P&L" sub="Annual operating figures — ₹ Crore. Hover any year for loss % and source.">
          <Card title="P&L Combo (Revenue / Expenses / Net Loss trend)" sub="Annotations mark COVID-19, Great Flood, Pay Revisions, Oil crises — hover for details">
            <PLComboChart />
          </Card>
        </Section>

        <Section title="Accumulated Balance-Sheet Deficit" sub="Anchored to 3 official data points — FY 2005-06, FY 2015-16, FY 2023-24">
          <Card title="Deficit trajectory (₹ Crore)" sub="Source: ACAD/KSRTC accounts, Kerala Planning Board 2016, CARE Ratings 2025">
            <DeficitChart />
          </Card>
        </Section>

        <Section title="LDF ☭ vs UDF ✋ — Who Lost More?" sub="Average annual losses and loss % of revenue during each coalition's tenure">
          <div className="rounded-2xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex flex-wrap gap-3 mb-4 text-sm">
              {[
                { color: "#EF4444", sym: "☭", label: "LDF", desc: "CPM-led (Nayanar 1996-01, Achuthanandan 2006-11, Pinarayi 2016-26)" },
                { color: "#3B82F6", sym: "✋", label: "UDF", desc: "INC-led (Antony 2001-04, Oommen Chandy 2004-06 & 2011-16)" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: p.color }}>{p.sym}</span>
                  <span style={{ color: "var(--muted)" }}><strong style={{ color: p.color }}>{p.label}</strong> — {p.desc}</span>
                </div>
              ))}
            </div>
            <PartyChart />
            <p className="text-xs mt-3" style={{ color: "var(--subtle)" }}>* LDF&apos;s higher average partly reflects that more recent years carry larger losses (inflation, pay revisions, COVID, floods). Loss % of revenue shown in chart tooltip.</p>
          </div>
        </Section>

        <Section title="Diesel Price vs Annual Loss" sub="Every ₹1/litre rise costs KSRTC ~₹13 Cr/year. Annotations cite PPAC India & geopolitical sources.">
          <Card title="Diesel ₹/litre (yellow) vs Annual Loss ₹ Cr (red bars)" sub="Sources: PPAC India historical retail prices, NDMA flood reports, MoHFW COVID data">
            <DieselChart />
          </Card>
        </Section>

        <Section title="Workforce & Fleet Trends" sub="Pensioners overtook active staff in FY 2009-10 — a structural inflection point">
          <Card title="Active staff vs Pensioners vs Fleet size" sub="Source: CAG Report No.5/2018, CARE Ratings 2024">
            <WorkforceChart />
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Pensioners > Active Staff", val: "FY 2009-10", sub: "Pension costs became the single largest expense. Source: CAG Report 2018", color: "#F04545" },
              { label: "Peak fleet", val: "~6,700 buses (2019)", sub: "Fleet contracted as old buses scrapped faster than new ones inducted", color: "#06C9B0" },
              { label: "Staff reduction 2000→2024", val: "~28% fewer", sub: "45k → 31k via VRS and attrition — Source: KSRTC annual reports", color: "#8B5CF6" },
            ].map((i) => (
              <div key={i.label} className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--muted)" }}>{i.label}</div>
                <div className="text-lg font-black mb-1" style={{ color: i.color }}>{i.val}</div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>{i.sub}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Government Subvention vs Uncovered Loss" sub="State fills part of the gap — the rest accumulates as debt. Hover bars for coverage %.">
          <Card title="Annual loss: subvention (green) vs uncovered gap (red)" sub="Hover any year to see what % of the loss state money covered">
            <SubventionChart />
          </Card>
        </Section>

        <Section title="Year-by-Year Explorer" sub="Click any fiscal year for the full financial snapshot, %, and sourced events">
          <YearExplorer />
        </Section>

        <Section title="Full Data Table" sub="Sort any column · filter by party · click a row to expand sourced events">
          <DataTable />
        </Section>

        {/* Why section */}
        <Section title="Why KSRTC Always Loses Money">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "👴", color: "#F04545", title: "1. Pension Time Bomb", body: "KSRTC's 1984 defined-benefit pension scheme covers 43,000+ retirees — more than its 31,000 active workers. Annual outflow: ₹864 Cr/year, paid directly by Kerala Treasury.", source: "CAG Report No.5/2018; CARE Ratings 2024" },
              { icon: "🎟️", color: "#F5B731", title: "2. Fare vs Cost Gap", body: "Fares are a political decision revised far less often than costs rise. Cost-per-km has consistently exceeded earnings-per-km by ₹15–25.", source: "Kerala Planning Board Economic Review 2017" },
              { icon: "⛽", color: "#8B5CF6", title: "3. Diesel Price Sensitivity", body: "Fuel is the #2 cost after staff. Every ₹1/litre increase costs ~₹13 Cr/year. Diesel rose 6× from ₹15 (2001) to ₹91 (2024).", source: "PPAC India historical diesel retail prices" },
              { icon: "💸", color: "#F04545", title: "4. Pay Revision Spikes", body: "Kerala's periodic pay revision commissions each added 15–20% to the salary bill overnight. KSRTC absorbs these immediately; fare revisions lag by years.", source: "GoK GO(P) No.90/2017/Fin; 8th PRC GO MS 138/2007" },
              { icon: "🚌", color: "#5B8EF5", title: "5. Private Competition", body: "Deregulated private buses and app-cabs (Ola/Uber from 2015) eroded KSRTC's most profitable short-haul segments while it retained obligations on loss-making rural routes.", source: "Kerala Transport Dept records; The Hindu Kerala 2015" },
              { icon: "🦠", color: "#06C9B0", title: "6. COVID-19 Shock", body: "FY 2020-21 was the worst year ever — lockdowns cut ridership to 175 Cr (from 380 Cr in 2019), forcing ₹961 Cr interest waiver + ₹3,194 Cr loan-to-equity conversion.", source: "Kerala Cabinet GO Oct 2020; Kerala PRD Live; CARE Ratings 2024" },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border p-5 space-y-2" style={{ background: "var(--card)", borderColor: c.color + "33" }}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{c.icon}</span>
                  <h3 className="font-black text-base" style={{ color: c.color }}>{c.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{c.body}</p>
                <p className="text-xs" style={{ color: "var(--subtle)" }}>Source: {c.source}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Government Timeline */}
        <Section title="Government Timeline">
          <div className="rounded-2xl border p-5 overflow-x-auto" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="min-w-[640px]">
              <div className="flex">
                {[
                  { label: "E.K. Nayanar", sym: "☭", term: "1996–2001", party: "LDF" as const, span: 1 },
                  { label: "A.K. Antony", sym: "✋", term: "2001–04", party: "UDF" as const, span: 3 },
                  { label: "O. Chandy I", sym: "✋", term: "2004–06", party: "UDF" as const, span: 2 },
                  { label: "V.S. Achuthanandan", sym: "☭", term: "2006–11", party: "LDF" as const, span: 5 },
                  { label: "Oommen Chandy II", sym: "✋", term: "2011–16", party: "UDF" as const, span: 5 },
                  { label: "Pinarayi Vijayan", sym: "☭", term: "2016–26", party: "LDF" as const, span: 8 },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center px-2 py-3 border-r text-center"
                    style={{ flex: s.span, background: PARTY_COLORS[s.party] + "18", borderColor: "var(--border)" }}>
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: PARTY_COLORS[s.party] }}>{s.sym}</span>
                      <span className="text-xs font-black" style={{ color: PARTY_COLORS[s.party] }}>{s.party}</span>
                    </div>
                    <span className="text-xs font-semibold leading-tight">{s.label}</span>
                    <span className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{s.term}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Data Sources */}
        <Section title="Data Sources & References">
          <div className="rounded-2xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "CAG of India — Reports on State Finances, Kerala (Annual)", url: "https://cag.gov.in/en/audit-report?lang=en&state=32", note: "FY 2014-15 P&L data, pension figures, fleet procurement audit" },
                { label: "Kerala Planning Board — Economic Review 2016 & 2017", url: "https://spb.kerala.gov.in/economic-review", note: "Official FY 2015-16 and FY 2016-17 revenue, deficit data" },
                { label: "CARE Ratings — KSRTC Kerala (Apr 2024 & Apr 2025)", url: "https://www.careratings.com", note: "FY 2022-23, 2023-24 figures; accumulated deficit ₹19,369.59 Cr" },
                { label: "PPAC India — Historical Diesel Retail Prices", url: "https://ppac.gov.in/content/212_1_PricesMSHSD.aspx", note: "All diesel price per litre data (2000–2024)" },
                { label: "NDMA — Kerala Floods 2018 Report", url: "https://ndma.gov.in", note: "Flood damage, KSRTC bus damage figures" },
                { label: "MoHFW India — COVID-19 Case Data", url: "https://mohfw.gov.in", note: "First Kerala COVID case 30 Jan 2020; lockdown timeline" },
                { label: "Kerala Finance Department — Budget Documents", url: "https://finance.kerala.gov.in", note: "Pay revision GOs, subvention amounts, VRS schemes" },
                { label: "The Hindu / Onmanorama / Mathrubhumi — News Archives", url: "https://www.thehindu.com", note: "Event verification — strikes, court orders, operational incidents" },
              ].map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-xl border transition-all hover:border-opacity-60"
                  style={{ borderColor: "var(--border)", background: "var(--bg2)" }}>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-1" style={{ color: "var(--subtle)" }} />
                  <div>
                    <p className="text-sm font-semibold">{s.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{s.note}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Section>

      </div>

      <footer className="border-t mt-10 px-6 lg:px-16 py-8" style={{ borderColor: "var(--border)", color: "var(--subtle)" }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <KsrtcBusSVG className="w-12 text-red-500 opacity-40" />
            <div>
              <p className="text-xs font-bold">KSRTC Kerala P&amp;L Dashboard</p>
              <p className="text-xs" style={{ color: "var(--subtle)" }}>FY 2000-01 to FY 2023-24 · Data from SPB, CARE Ratings, CAG of India, PPAC India</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Public interest research</span>
            <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Not affiliated with KSRTC</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
