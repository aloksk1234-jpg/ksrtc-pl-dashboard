"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
  Area, AreaChart,
} from "recharts";
import { KSRTC_DATA, PARTY_COLORS, LDF_YEARS, UDF_YEARS, avg, lossPercent, expenseRatio, subventionCoverage } from "@/lib/ksrtc-data";

const ICON_PATHS: Record<string, React.ReactNode> = {
  fuel: <><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5"/><path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16"/><path d="M2 21h13"/><path d="M3 9h11"/></>,
  biohazard: <><circle cx="12" cy="11.9" r="2"/><path d="M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6"/><path d="m8.9 10.1 1.4.8"/><path d="M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5"/><path d="m15.1 10.1-1.4.8"/><path d="M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2"/><path d="M12 13.9v1.6"/><path d="M13.5 5.4c-1-.2-2-.2-3 0"/><path d="M17 16.4c.7-.7 1.2-1.6 1.5-2.5"/><path d="M5.5 13.9c.3.9.8 1.8 1.5 2.5"/></>,
  swords: <><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/></>,
  waves: <><path d="M2 12q2.5 2 5 0t5 0 5 0 5 0"/><path d="M2 19q2.5 2 5 0t5 0 5 0 5 0"/><path d="M2 5q2.5 2 5 0t5 0 5 0 5 0"/></>,
  'file-text': <><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></>,
  'indian-rupee': <><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></>,
  'users-round': <><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></>,
};

function useChartColors() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const check = () => setDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return {
    grid: dark ? "#252840" : "#E2E0DB",
    tick: dark ? "#8B90AC" : "#6B6963",
  };
}

const TTP: React.CSSProperties = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  color: "var(--fg)",
  fontSize: 12,
  padding: "10px 14px",
};

function EventMarker({
  viewBox,
  iconKey,
  title,
  detail,
  color,
  url,
}: {
  viewBox?: { x: number; y: number; width: number; height: number };
  iconKey: keyof typeof ICON_PATHS;
  title: string;
  detail: string;
  color: string;
  url?: string;
}) {
  const [hovered, setHovered] = useState(false);
  if (!viewBox) return null;
  const { x, y } = viewBox;

  const popupW = 200;
  const popupH = url ? 96 : 76;
  const popupY = y - popupH - 6;
  const popupX = Math.max(x - 100, 4);

  return (
    // Hover on the whole group — popup + circle — so moving into the card doesn't dismiss it
    <g
      style={{ pointerEvents: "all" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <>
          {/* Transparent bridge fills the gap between popup bottom and circle top */}
          <rect x={popupX} y={y - 6} width={popupW} height={10} fill="transparent" />
          <foreignObject x={popupX} y={popupY} width={popupW} height={popupH} style={{ overflow: "visible" }}>
            <div style={{
              background: "var(--card)",
              border: `1.5px solid ${color}`,
              borderRadius: 8,
              padding: "7px 10px",
              fontSize: 11,
              lineHeight: 1.5,
              boxShadow: "0 4px 20px rgba(0,0,0,0.22)",
              pointerEvents: "auto",
            }}>
              <div style={{ fontWeight: 700, color, marginBottom: 2 }}>{title}</div>
              <div style={{ color: "var(--muted)" }}>{detail}</div>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: 6,
                    color,
                    fontSize: 10,
                    fontWeight: 700,
                    textDecoration: "none",
                    opacity: 0.85,
                  }}
                  onMouseOver={e => (e.currentTarget.style.opacity = "1")}
                  onMouseOut={e => (e.currentTarget.style.opacity = "0.85")}
                >
                  View source ↗
                </a>
              )}
            </div>
          </foreignObject>
        </>
      )}
      <g style={{ cursor: "pointer" }}>
        <circle
          cx={x} cy={y + 13}
          r={10}
          fill={color}
          fillOpacity={hovered ? 0.28 : 0.13}
          stroke={color}
          strokeWidth={hovered ? 2 : 1.5}
          style={{ transition: "fill-opacity 0.15s" }}
        />
        <svg
          x={x - 7} y={y + 6}
          width={14} height={14}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pointerEvents: "none" }}
        >
          {ICON_PATHS[iconKey]}
        </svg>
      </g>
    </g>
  );
}

export function PLComboChart() {
  const ct = useChartColors();
  const data = KSRTC_DATA.map(d => ({
    fy: d.fy.slice(0, 4),
    Revenue: d.revenue,
    Expenses: d.expenses,
    "Net P&L": d.netPL,
    lossPercent: parseFloat(lossPercent(d)),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const row = KSRTC_DATA.find(d => d.fy.startsWith(label));
    return (
      <div style={TTP}>
        <p className="font-bold mb-1">FY {label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: ₹{Math.abs(p.value).toLocaleString("en-IN")} Cr
          </p>
        ))}
        {row && <p style={{ color: "#F5B731" }}>Loss %: {lossPercent(row)}% of revenue</p>}
        {row && <p style={{ color: ct.tick, fontSize: 10, marginTop: 4 }}>Subvention: ₹{row.govtSubvention} Cr ({subventionCoverage(row)}% of loss)</p>}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={340}>
      <ComposedChart data={data} margin={{ top: 92, right: 8, bottom: 4, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} />
        <XAxis dataKey="fy" tick={{ fill: ct.tick, fontSize: 11 }} tickLine={false} />
        <YAxis yAxisId="l" tick={{ fill: ct.tick, fontSize: 11 }} tickFormatter={(v: number) => `₹${(Math.abs(v) / 1000).toFixed(0)}k`} tickLine={false} axisLine={false} />
        <YAxis yAxisId="r" orientation="right" tick={{ fill: ct.tick, fontSize: 11 }} tickFormatter={(v: number) => `₹${(Math.abs(v) / 1000).toFixed(1)}k`} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: ct.tick, fontSize: 12 }} />
        <ReferenceLine yAxisId="r" y={0} stroke={ct.grid} strokeDasharray="4 4" />

        <ReferenceLine yAxisId="r" x="2008" stroke="#F5B73155" strokeDasharray="3 3"
          label={<EventMarker iconKey="fuel" title="Oil Crisis 2008" detail="Crude at $147/bbl — diesel surges to ₹34/L" color="#F5B731" url="https://ppac.gov.in/retail-selling-price-rsp-of-petrol-diesel-and-domestic-lpg/rsp-of-petrol-and-diesel-at-delhi-up-to-15-6-2017" />} />
        <ReferenceLine yAxisId="r" x="2014" stroke="#8B5CF655" strokeDasharray="3 3"
          label={<EventMarker iconKey="file-text" title="CAG Audit" detail="Pension arrears flagged — Report No.5/2018" color="#8B5CF6" url="https://cag.gov.in/webroot/uploads/download_audit_report/2018/Report_No_5_of_2018_-_Public_Sector_Undertakings_Government_of_Kerala.pdf" />} />
        <ReferenceLine yAxisId="r" x="2017" stroke="#06C9B055" strokeDasharray="3 3"
          label={<EventMarker iconKey="indian-rupee" title="10th Pay Revision" detail="+20% salary bill overnight; fares unchanged" color="#06C9B0" url="https://finance.kerala.gov.in/payRevOrdr.jsp" />} />
        <ReferenceLine yAxisId="r" x="2018" stroke="#5B8EF555" strokeDasharray="3 3"
          label={<EventMarker iconKey="waves" title="Great Flood 2018" detail="₹45 Cr bus damage; ridership falls 30%" color="#5B8EF5" url="https://nidm.gov.in/PDF/pubs/KeralaFlood_18.pdf" />} />
        <ReferenceLine yAxisId="r" x="2020" stroke="#F0454555" strokeDasharray="3 3"
          label={<EventMarker iconKey="biohazard" title="COVID-19 Lockdown" detail="Worst year: ₹1,976 Cr loss; ₹3,194 Cr debt-to-equity" color="#F04545" url="https://covid19dashboard.mohfw.gov.in/" />} />
        <ReferenceLine yAxisId="r" x="2022" stroke="#F5B73155" strokeDasharray="3 3"
          label={<EventMarker iconKey="swords" title="Ukraine War" detail="Diesel hits ₹90+/L; annual loss spikes again" color="#F5B731" url="https://ppac.gov.in/retail-selling-price-rsp-of-petrol-diesel-and-domestic-lpg/rsp-of-petrol-and-diesel-in-metro-cities-since-16-6-2017" />} />

        <Bar yAxisId="l" dataKey="Revenue" fill="#10D97C" opacity={0.75} radius={[3, 3, 0, 0]} />
        <Bar yAxisId="l" dataKey="Expenses" fill="#F04545" opacity={0.75} radius={[3, 3, 0, 0]} />
        <Line yAxisId="r" type="monotone" dataKey="Net P&L" stroke="#F5B731" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export function DeficitChart() {
  const ct = useChartColors();
  const anchors: Record<string, number> = { "2005-06": 1618, "2015-16": 4217, "2023-24": 19370 };
  const allFYs = KSRTC_DATA.map(d => d.fy);
  const filled: (number | null)[] = KSRTC_DATA.map(d => anchors[d.fy] ?? null);
  const keys = Object.keys(anchors);
  keys.forEach((sk, ki) => {
    const ek = keys[ki + 1]; if (!ek) return;
    const si = allFYs.indexOf(sk), ei = allFYs.indexOf(ek);
    const sv = anchors[sk], ev = anchors[ek];
    for (let i = si + 1; i < ei; i++) filled[i] = Math.round(sv + ((i - si) / (ei - si)) * (ev - sv));
  });
  const data = KSRTC_DATA.map((d, i) => ({ fy: d.fy.slice(0, 4), Deficit: filled[i] }));
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 92, right: 8, bottom: 4, left: 0 }}>
        <defs>
          <linearGradient id="defGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F04545" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#F04545" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} />
        <XAxis dataKey="fy" tick={{ fill: ct.tick, fontSize: 11 }} tickLine={false} />
        <YAxis tick={{ fill: ct.tick, fontSize: 11 }} tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k Cr`} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={TTP} />
        <ReferenceLine x="2020" stroke="#F0454555" strokeDasharray="3 3"
          label={<EventMarker iconKey="biohazard" title="COVID-19 Peak Loss" detail="₹1,976 Cr single-year loss — accumulated deficit accelerates" color="#F04545" url="https://covid19dashboard.mohfw.gov.in/" />} />
        <ReferenceLine x="2014" stroke="#8B5CF655" strokeDasharray="3 3"
          label={<EventMarker iconKey="file-text" title="CAG Audit" detail="Official confirmation of pension time-bomb" color="#8B5CF6" url="https://cag.gov.in/webroot/uploads/download_audit_report/2018/Report_No_5_of_2018_-_Public_Sector_Undertakings_Government_of_Kerala.pdf" />} />
        <Area type="monotone" dataKey="Deficit" stroke="#F04545" strokeWidth={2} fill="url(#defGrad)" connectNulls />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function PartyChart() {
  const ct = useChartColors();
  const ldfAvg = avg(LDF_YEARS.map(d => Math.abs(d.netPL)));
  const udfAvg = avg(UDF_YEARS.map(d => Math.abs(d.netPL)));
  const ldfLossPcts = LDF_YEARS.map(d => parseFloat(lossPercent(d)));
  const udfLossPcts = UDF_YEARS.map(d => parseFloat(lossPercent(d)));
  const ldfAvgPct = avg(ldfLossPcts).toFixed(1);
  const udfAvgPct = avg(udfLossPcts).toFixed(1);
  const data = [...LDF_YEARS.map(d => ({ fy: d.fy.slice(0, 4), Loss: Math.abs(d.netPL), party: "LDF", pct: parseFloat(lossPercent(d)) })),
  ...UDF_YEARS.map(d => ({ fy: d.fy.slice(0, 4), Loss: Math.abs(d.netPL), party: "UDF", pct: parseFloat(lossPercent(d)) }))]
    .sort((a, b) => parseInt(a.fy) - parseInt(b.fy));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const row = KSRTC_DATA.find(d => d.fy.startsWith(label));
    return (
      <div style={TTP}>
        <p className="font-bold mb-1">FY {label}</p>
        <p style={{ color: "#F04545" }}>Loss: ₹{payload[0]?.value?.toLocaleString("en-IN")} Cr</p>
        {row && <p style={{ color: "#F5B731" }}>Loss % of revenue: {lossPercent(row)}%</p>}
        {row && <p style={{ color: ct.tick, fontSize: 10 }}>Expense ratio: {expenseRatio(row)}%</p>}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "LDF Avg Annual Loss", val: ldfAvg, pct: ldfAvgPct, color: "#EF4444", n: LDF_YEARS.length },
          { label: "UDF Avg Annual Loss", val: udfAvg, pct: udfAvgPct, color: "#3B82F6", n: UDF_YEARS.length },
        ].map(p => (
          <div key={p.label} className="rounded-xl border p-4 text-center" style={{ borderColor: p.color + "44", background: p.color + "0D" }}>
            <div className="text-2xl font-black" style={{ color: p.color }}>₹{p.val.toFixed(0)} Cr</div>
            <div className="text-sm font-bold mt-0.5" style={{ color: p.color + "CC" }}>{p.pct}% of revenue</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{p.label}</div>
            <div className="text-xs" style={{ color: "var(--subtle)" }}>({p.n} fiscal years)</div>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} />
          <XAxis dataKey="fy" tick={{ fill: ct.tick, fontSize: 10 }} tickLine={false} />
          <YAxis tick={{ fill: ct.tick, fontSize: 10 }} tickFormatter={(v: number) => `₹${v}`} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={ldfAvg} stroke="#EF4444" strokeDasharray="4 4" label={{ value: "LDF avg", fill: "#EF4444", fontSize: 10 }} />
          <ReferenceLine y={udfAvg} stroke="#3B82F6" strokeDasharray="4 4" label={{ value: "UDF avg", fill: "#3B82F6", fontSize: 10 }} />
          <Bar dataKey="Loss" fill="#8B5CF6" opacity={0.75} radius={[3, 3, 0, 0]} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DieselChart() {
  const ct = useChartColors();
  const data = KSRTC_DATA.map(d => ({
    fy: d.fy.slice(0, 4),
    "Diesel (₹/L)": d.dieselPricePerLitre,
    "Annual Loss": Math.abs(d.netPL),
    lossPercent: parseFloat(lossPercent(d)),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const row = KSRTC_DATA.find(d => d.fy.startsWith(label));
    return (
      <div style={TTP}>
        <p className="font-bold mb-1">FY {label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {p.name.includes("Diesel") ? `₹${p.value}/L` : `₹${p.value} Cr`}
          </p>
        ))}
        {row && <p style={{ color: "#F5B731" }}>Loss as % of revenue: {lossPercent(row)}%</p>}
        {row && row.eventSources[0] && (
          <p style={{ color: ct.tick, fontSize: 10, marginTop: 4 }}>Source: {row.eventSources[0]}</p>
        )}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={270}>
      <ComposedChart data={data} margin={{ top: 92, right: 8, bottom: 4, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} />
        <XAxis dataKey="fy" tick={{ fill: ct.tick, fontSize: 11 }} tickLine={false} />
        <YAxis yAxisId="l" tick={{ fill: "#F5B731", fontSize: 11 }} tickFormatter={(v: number) => `₹${v}`} tickLine={false} axisLine={false} />
        <YAxis yAxisId="r" orientation="right" tick={{ fill: "#F04545", fontSize: 11 }} tickFormatter={(v: number) => `₹${v} Cr`} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: ct.tick, fontSize: 12 }} />

        <ReferenceLine yAxisId="l" x="2008" stroke="#F5B73155" strokeDasharray="3 3"
          label={<EventMarker iconKey="fuel" title="Iraq War / Crude Peak" detail="Crude at $147/bbl — diesel ₹34/L in Kerala" color="#F5B731" url="https://ppac.gov.in/retail-selling-price-rsp-of-petrol-diesel-and-domestic-lpg/rsp-of-petrol-and-diesel-at-delhi-up-to-15-6-2017" />} />
        <ReferenceLine yAxisId="l" x="2020" stroke="#06C9B055" strokeDasharray="3 3"
          label={<EventMarker iconKey="biohazard" title="COVID-19" detail="Demand collapse; diesel prices briefly fell" color="#06C9B0" url="https://covid19dashboard.mohfw.gov.in/" />} />
        <ReferenceLine yAxisId="l" x="2022" stroke="#F0454555" strokeDasharray="3 3"
          label={<EventMarker iconKey="swords" title="Ukraine War" detail="Diesel surges to ₹90+/L — worst since 2014" color="#F04545" url="https://ppac.gov.in/retail-selling-price-rsp-of-petrol-diesel-and-domestic-lpg/rsp-of-petrol-and-diesel-in-metro-cities-since-16-6-2017" />} />

        <Bar yAxisId="r" dataKey="Annual Loss" fill="#F04545" opacity={0.6} radius={[3, 3, 0, 0]} />
        <Line yAxisId="l" type="monotone" dataKey="Diesel (₹/L)" stroke="#F5B731" strokeWidth={2} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export function WorkforceChart() {
  const ct = useChartColors();
  const data = KSRTC_DATA.map(d => ({ fy: d.fy.slice(0, 4), "Active Staff": d.staff, Pensioners: d.pensioners, Fleet: d.fleet }));
  return (
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart data={data} margin={{ top: 92, right: 8, bottom: 4, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} />
        <XAxis dataKey="fy" tick={{ fill: ct.tick, fontSize: 11 }} tickLine={false} />
        <YAxis yAxisId="l" tick={{ fill: ct.tick, fontSize: 11 }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} tickLine={false} axisLine={false} />
        <YAxis yAxisId="r" orientation="right" tick={{ fill: "#06C9B0", fontSize: 11 }} domain={[4000, 8000]} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={TTP} />
        <Legend wrapperStyle={{ color: ct.tick, fontSize: 12 }} />
        <ReferenceLine yAxisId="l" x="2009" stroke="#F0454555" strokeDasharray="4 4"
          label={<EventMarker iconKey="users-round" title="Pensioners Exceed Active Staff" detail="Pension becomes single largest expense item" color="#F04545" url="https://cag.gov.in/webroot/uploads/download_audit_report/2018/Report_No_5_of_2018_-_Public_Sector_Undertakings_Government_of_Kerala.pdf" />} />
        <ReferenceLine yAxisId="l" x="2020" stroke="#06C9B055" strokeDasharray="3 3"
          label={<EventMarker iconKey="biohazard" title="COVID-19" detail="Recruitment frozen; fleet idle; ridership collapses" color="#06C9B0" url="https://covid19dashboard.mohfw.gov.in/" />} />
        <Line yAxisId="l" type="monotone" dataKey="Active Staff" stroke="#8B5CF6" strokeWidth={2} dot={false} />
        <Line yAxisId="l" type="monotone" dataKey="Pensioners" stroke="#F04545" strokeWidth={2} dot={false} />
        <Bar yAxisId="r" dataKey="Fleet" fill="#06C9B0" opacity={0.45} radius={[2, 2, 0, 0]} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export function SubventionChart() {
  const ct = useChartColors();
  const data = KSRTC_DATA.map(d => ({
    fy: d.fy.slice(0, 4),
    "Govt Subvention": d.govtSubvention,
    Uncovered: Math.abs(d.netPL) - d.govtSubvention,
    "Total Loss": Math.abs(d.netPL),
    coverage: parseFloat(subventionCoverage(d)),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const row = KSRTC_DATA.find(d => d.fy.startsWith(label));
    return (
      <div style={TTP}>
        <p className="font-bold mb-1">FY {label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color || "var(--fg)" }}>
            {p.name}: ₹{p.value?.toLocaleString("en-IN")} Cr
          </p>
        ))}
        {row && <p style={{ color: "#10D97C" }}>Subvention coverage: {subventionCoverage(row)}% of loss</p>}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} />
        <XAxis dataKey="fy" tick={{ fill: ct.tick, fontSize: 11 }} tickLine={false} />
        <YAxis tick={{ fill: ct.tick, fontSize: 11 }} tickFormatter={(v: number) => `₹${v} Cr`} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: ct.tick, fontSize: 12 }} />
        <Bar dataKey="Govt Subvention" stackId="a" fill="#10D97C" opacity={0.75} />
        <Bar dataKey="Uncovered" stackId="a" fill="#F04545" opacity={0.75} radius={[3, 3, 0, 0]} />
        <Line type="monotone" dataKey="Total Loss" stroke="#F5B731" strokeWidth={2} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export function YearExplorer() {
  const [fy, setFY] = useState(KSRTC_DATA[18].fy);
  const row = KSRTC_DATA.find(d => d.fy === fy) ?? KSRTC_DATA[0];
  const pc = PARTY_COLORS[row.party];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {KSRTC_DATA.map(d => (
          <button key={d.fy} onClick={() => setFY(d.fy)}
            className="text-xs px-2.5 py-1 rounded-full border transition-all"
            style={{ borderColor: d.fy === fy ? pc : "var(--border)", background: d.fy === fy ? pc + "22" : "var(--card)", color: d.fy === fy ? pc : "var(--muted)", fontWeight: d.fy === fy ? 700 : 400 }}>
            {d.fy.slice(0, 4)}
          </button>
        ))}
      </div>
      <motion.div key={fy} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
        className="rounded-2xl border p-5 space-y-4" style={{ background: "var(--card)", borderColor: pc + "44" }}>
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-xl font-black">FY {row.fy}</h3>
            <p className="text-sm" style={{ color: "var(--muted)" }}>CM: {row.cm}</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: pc + "22", color: pc }}>{row.party} Government</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Revenue", val: `₹${row.revenue} Cr`, color: "#10D97C" },
            { label: "Expenses", val: `₹${row.expenses} Cr`, sub: `${expenseRatio(row)}% of revenue`, color: "#F04545" },
            { label: "Net P&L", val: `−₹${Math.abs(row.netPL)} Cr`, sub: `${lossPercent(row)}% of revenue`, color: "#F5B731" },
            { label: "Govt Subvention", val: `₹${row.govtSubvention} Cr`, sub: `${subventionCoverage(row)}% of loss covered`, color: "#8B5CF6" },
          ].map(m => (
            <div key={m.label} className="rounded-xl border p-3" style={{ borderColor: m.color + "33", background: m.color + "0D" }}>
              <div className="text-xs" style={{ color: "var(--muted)" }}>{m.label}</div>
              <div className="text-base font-black mt-0.5" style={{ color: m.color }}>{m.val}</div>
              {m.sub && <div className="text-xs mt-0.5" style={{ color: m.color + "AA" }}>{m.sub}</div>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          {[
            { label: "Fleet", val: `${row.fleet.toLocaleString("en-IN")} buses` },
            { label: "Active Staff", val: `${(row.staff / 1000).toFixed(1)}k` },
            { label: "Pensioners", val: `${(row.pensioners / 1000).toFixed(1)}k` },
            { label: "Diesel", val: `₹${row.dieselPricePerLitre}/L` },
          ].map(m => (
            <div key={m.label} className="rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "var(--bg2)" }}>
              <div className="text-xs" style={{ color: "var(--muted)" }}>{m.label}</div>
              <div className="font-bold mt-0.5">{m.val}</div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>Key Events & Causes</p>
          <ul className="space-y-1.5">
            {row.events.map((e, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span style={{ color: pc }} className="mt-0.5 shrink-0">▸</span>
                <span style={{ color: "var(--fg)" }}>
                  {e}
                  {row.eventSources[i] && (
                    <span className="ml-1.5 text-xs" style={{ color: "var(--subtle)" }}>
                      [{row.eventSources[i]}]
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {row.dataQuality === "official"
          ? <p className="text-xs" style={{ color: "#10D97C" }}>✓ Official — Kerala Planning Board / CARE Ratings</p>
          : row.dataQuality === "semi-official"
            ? <p className="text-xs" style={{ color: "#8B5CF6" }}>◑ Semi-official — CAG report / academic study</p>
            : <p className="text-xs" style={{ color: "var(--subtle)" }}>⚠ Estimated — interpolated from verified anchors</p>}
      </motion.div>
    </div>
  );
}
