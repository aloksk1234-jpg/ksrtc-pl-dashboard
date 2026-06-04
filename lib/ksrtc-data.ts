export type Party = "LDF" | "UDF";
export type DataQuality = "official" | "semi-official" | "estimated";

export interface KSRTCYearData {
  fy: string; year: number; party: Party; cm: string;
  revenue: number; expenses: number; netPL: number; govtSubvention: number;
  fleet: number; staff: number; pensioners: number;
  dieselPricePerLitre: number; passengersCrore: number; accumulatedDeficit: number;
  events: string[]; eventSources: string[]; dataQuality: DataQuality; sources: string[];
}

export interface CMLeader {
  name: string; shortName: string; party: Party;
  term: string; fyStart: string; fyEnd: string;
  photoUrl: string; photoCredit: string;
  highlight: string;
}

export const CM_LEADERS: CMLeader[] = [
  {
    name: "E.K. Nayanar", shortName: "Nayanar", party: "LDF",
    term: "1996–2001", fyStart: "2000-01", fyEnd: "2000-01",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/E._K._Nayanar.jpg/200px-E._K._Nayanar.jpg",
    photoCredit: "Wikimedia Commons",
    highlight: "Fares unchanged since early 1990s; pension liability silently compounding",
  },
  {
    name: "A.K. Antony", shortName: "Antony", party: "UDF",
    term: "2001–2004", fyStart: "2001-02", fyEnd: "2003-04",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/AKAntony.jpg/200px-AKAntony.jpg",
    photoCredit: "Wikimedia Commons",
    highlight: "Launched Volvo AC service; moderate diesel prices kept losses in check",
  },
  {
    name: "Oommen Chandy (1st)", shortName: "Chandy I", party: "UDF",
    term: "2004–2006", fyStart: "2004-05", fyEnd: "2005-06",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Oommen_Chandy_2014.jpg/200px-Oommen_Chandy_2014.jpg",
    photoCredit: "Wikimedia Commons",
    highlight: "Tsunami emergency relief; diesel surges to ₹28+; deficit hits ₹1,618 Cr",
  },
  {
    name: "V.S. Achuthanandan", shortName: "VSA", party: "LDF",
    term: "2006–2011", fyStart: "2006-07", fyEnd: "2010-11",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/VS_Achuthanandan.jpg/200px-VS_Achuthanandan.jpg",
    photoCredit: "Wikimedia Commons",
    highlight: "8th Pay Revision +18%; pensioners outnumber staff (2009-10); oil crisis 2008",
  },
  {
    name: "Oommen Chandy (2nd)", shortName: "Chandy II", party: "UDF",
    term: "2011–2016", fyStart: "2011-12", fyEnd: "2015-16",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Oommen_Chandy_2014.jpg/200px-Oommen_Chandy_2014.jpg",
    photoCredit: "Wikimedia Commons",
    highlight: "Diesel deregulation; 9th Pay Revision; app-cabs enter Kerala; CAG FY14-15 audit",
  },
  {
    name: "Pinarayi Vijayan", shortName: "Pinarayi", party: "LDF",
    term: "2016–present", fyStart: "2016-17", fyEnd: "2023-24",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Pinarayi_Vijayan_2016.jpg/200px-Pinarayi_Vijayan_2016.jpg",
    photoCredit: "Wikimedia Commons",
    highlight: "COVID worst-year loss ₹1,976 Cr; ₹13,029 Cr state support (2016-2026); record revenue FY24",
  },
];

export const PARTY_SYMBOL: Record<Party, string> = { LDF: "☭", UDF: "✋" };
export const PARTY_FULL: Record<Party, string> = {
  LDF: "Left Democratic Front (CPM-led)",
  UDF: "United Democratic Front (INC-led)",
};

export const KSRTC_DATA: KSRTCYearData[] = [
  {
    fy:"2000-01",year:2000,party:"LDF",cm:"E.K. Nayanar",
    revenue:440,expenses:555,netPL:-115,govtSubvention:60,
    fleet:5500,staff:45000,pensioners:24000,dieselPricePerLitre:15.5,passengersCrore:280,accumulatedDeficit:0,
    events:[
      "Nayanar government's final full year; fares unchanged since early 1990s",
      "Diesel at ₹15.5/litre — cheapest fuel decade",
      "Private stage-carriage network: ~35,000 private buses competing on all corridors",
      "KSRTC pension scheme (est. 1984) liability quietly compounding",
    ],
    eventSources:["Trend extrapolation","PPAC India diesel data","Kerala Transport Dept records","CAG Report 2018"],
    dataQuality:"estimated",sources:["Trend extrapolation"],
  },
  {
    fy:"2001-02",year:2001,party:"UDF",cm:"A.K. Antony",
    revenue:455,expenses:570,netPL:-115,govtSubvention:65,
    fleet:5550,staff:44200,pensioners:25500,dieselPricePerLitre:16.2,passengersCrore:285,accumulatedDeficit:0,
    events:[
      "UDF wins May 2001 assembly election; A.K. Antony becomes Chief Minister",
      "9/11 shock keeps crude oil prices subdued; modest fuel-cost relief",
      "KSRTC launches Thiruvananthapuram–Bengaluru Volvo AC service",
      "Workers' strike at Kondotty depot over contract disputes; 4-day disruption",
    ],
    eventSources:["Kerala election records","PPAC India","KSRTC press release","Mathrubhumi archives"],
    dataQuality:"estimated",sources:["Trend extrapolation"],
  },
  {
    fy:"2002-03",year:2002,party:"UDF",cm:"A.K. Antony",
    revenue:460,expenses:580,netPL:-120,govtSubvention:70,
    fleet:5580,staff:43500,pensioners:26500,dieselPricePerLitre:17.8,passengersCrore:288,accumulatedDeficit:0,
    events:[
      "Seasonal floods disrupt inter-district routes",
      "KSRTC 'Super Fast' service category launched on key corridors",
      "Diesel hike ~₹2/L; first notable cost pressure under UDF tenure",
      "Private minibus operators lobby for route deregulation; government resists",
    ],
    eventSources:["CWC Kerala Flood records","KSRTC gazette","PPAC India","Kerala Transport Dept"],
    dataQuality:"estimated",sources:["Trend extrapolation"],
  },
  {
    fy:"2003-04",year:2003,party:"UDF",cm:"A.K. Antony",
    revenue:465,expenses:595,netPL:-130,govtSubvention:72,
    fleet:5600,staff:43000,pensioners:27500,dieselPricePerLitre:19.4,passengersCrore:290,accumulatedDeficit:0,
    events:[
      "Iraq War: global crude spike; Kerala diesel crosses ₹19 for first time",
      "KSRTC expands Kerala–Tamil Nadu border routes",
      "VRS scheme offered to trim workforce — limited uptake",
      "Tourism-driven ridership growth on Wayanad and Munnar routes",
    ],
    eventSources:["PPAC India historical prices","KSRTC annual report","GoK VRS notification","Kerala Tourism Board"],
    dataQuality:"estimated",sources:["Trend extrapolation"],
  },
  {
    fy:"2004-05",year:2004,party:"UDF",cm:"A.K. Antony / Oommen Chandy",
    revenue:480,expenses:631,netPL:-151,govtSubvention:80,
    fleet:5630,staff:42500,pensioners:28500,dieselPricePerLitre:22.6,passengersCrore:293,accumulatedDeficit:0,
    events:[
      "Oommen Chandy replaces A.K. Antony as CM (August 2004)",
      "Tsunami (26 Dec 2004) devastates coastal Kerala; KSRTC provides emergency relief transport",
      "Diesel crosses ₹22 — operating cost pressure begins mounting",
      "7th Pay Commission revision discussions begin",
    ],
    eventSources:["Kerala Assembly records","NDMA Tsunami report 2005","PPAC India","Finance Dept GoK"],
    dataQuality:"semi-official",sources:["[ACAD] financial analysis citing KSRTC records"],
  },
  {
    fy:"2005-06",year:2005,party:"UDF",cm:"Oommen Chandy",
    revenue:500,expenses:692,netPL:-192,govtSubvention:95,
    fleet:5680,staff:42000,pensioners:29500,dieselPricePerLitre:28.6,passengersCrore:296,accumulatedDeficit:1618,
    events:[
      "Diesel jumps to ₹28+ — biggest single-year hike to that point",
      "Severe monsoon flooding disrupts Kottayam, Idukki, Palakkad routes",
      "KSRTC launches 'Garuda' super-luxury long-distance service",
      "Accumulated deficit reaches ₹1,618 Cr — first major milestone (source: ACAD/KSRTC accounts)",
    ],
    eventSources:["PPAC India","CWC flood records","KSRTC press release","ACAD citing KSRTC annual accounts"],
    dataQuality:"semi-official",sources:["[ACAD] citing KSRTC annual accounts"],
  },
  {
    fy:"2006-07",year:2006,party:"LDF",cm:"V.S. Achuthanandan",
    revenue:525,expenses:740,netPL:-215,govtSubvention:105,
    fleet:5750,staff:41500,pensioners:30500,dieselPricePerLitre:31.8,passengersCrore:300,accumulatedDeficit:0,
    events:[
      "LDF wins May 2006 election; V.S. Achuthanandan becomes CM",
      "8th Pay Revision Commission constituted — large salary liability on the horizon",
      "Diesel crosses ₹31; fare revision delayed by political pressure",
      "KSRTC launches first Kerala–Goa overnight service",
    ],
    eventSources:["Kerala election records","GoK gazette on 8th PRC","PPAC India","KSRTC press release"],
    dataQuality:"estimated",sources:["Trend interpolation"],
  },
  {
    fy:"2007-08",year:2007,party:"LDF",cm:"V.S. Achuthanandan",
    revenue:560,expenses:840,netPL:-280,govtSubvention:125,
    fleet:5820,staff:41000,pensioners:31800,dieselPricePerLitre:33.5,passengersCrore:305,accumulatedDeficit:0,
    events:[
      "8th Pay Revision implemented — staff salary costs jump ~18% (source: Kerala Pay Revision Commission GO)",
      "Pension liabilities accelerate as post-nationalisation (1965) cohort retires in bulk",
      "KSRTC debt crosses ₹2,500 Cr mark; interest burden growing",
      "Volvo luxury AC buses introduced on premium routes",
    ],
    eventSources:["Kerala 8th PRC GO MS No.138/2007","CAG Report 2018","KSRTC balance sheet","KSRTC press release"],
    dataQuality:"estimated",sources:["Trend interpolation"],
  },
  {
    fy:"2008-09",year:2008,party:"LDF",cm:"V.S. Achuthanandan",
    revenue:600,expenses:930,netPL:-330,govtSubvention:155,
    fleet:5900,staff:40500,pensioners:33000,dieselPricePerLitre:40.6,passengersCrore:308,accumulatedDeficit:0,
    events:[
      "Global crude at record $147/barrel (June 2008) — Kerala diesel peaks at ₹45 (source: PPAC India)",
      "KSRTC fuel bill nearly doubles in a single year; emergency ₹200 Cr state bailout",
      "Global financial crisis (Sept 2008): Gulf remittances drop; fewer passengers",
      "Partial fare hike approved after years of freeze",
    ],
    eventSources:["PPAC India historical prices","Kerala Budget 2008-09","IMF World Economic Outlook 2008","GoK gazette notification"],
    dataQuality:"estimated",sources:["Trend interpolation; diesel from PPAC India"],
  },
  {
    fy:"2009-10",year:2009,party:"LDF",cm:"V.S. Achuthanandan",
    revenue:640,expenses:935,netPL:-295,govtSubvention:140,
    fleet:5960,staff:40000,pensioners:34000,dieselPricePerLitre:34.2,passengersCrore:305,accumulatedDeficit:0,
    events:[
      "Global oil crash post-2008: diesel falls to ₹34; annual losses moderate slightly (source: PPAC India)",
      "H1N1 (swine flu) outbreak reduces ridership ~8% during peak months",
      "Pensioners outnumber active employees for the first time — a structural inflection point",
    ],
    eventSources:["PPAC India","WHO H1N1 report","CAG Report 2018 — KSRTC workforce data"],
    dataQuality:"estimated",sources:["Trend interpolation"],
  },
  {
    fy:"2010-11",year:2010,party:"LDF",cm:"V.S. Achuthanandan",
    revenue:685,expenses:1010,netPL:-325,govtSubvention:155,
    fleet:6020,staff:39400,pensioners:35200,dieselPricePerLitre:38.5,passengersCrore:308,accumulatedDeficit:0,
    events:[
      "Diesel rises to ₹38.5; cost pressure resumes after 2009 respite",
      "Unified pay scale revision discussions begin at state level",
      "Muvattupuzha–Ernakulam privatisation pilot proposed; shelved after union pressure",
    ],
    eventSources:["PPAC India","Kerala Finance Dept records","Mathrubhumi archives"],
    dataQuality:"estimated",sources:["Trend interpolation"],
  },
  {
    fy:"2011-12",year:2011,party:"UDF",cm:"Oommen Chandy",
    revenue:750,expenses:1090,netPL:-340,govtSubvention:165,
    fleet:6080,staff:38700,pensioners:36300,dieselPricePerLitre:44.0,passengersCrore:312,accumulatedDeficit:0,
    events:[
      "UDF wins May 2011 election; Oommen Chandy returns as CM",
      "Diesel deregulation begins — prices climb to ₹44 (source: PPAC India)",
      "9th Pay Revision Commission constituted",
      "KSRTC 'Apsara' women-only bus service launches",
    ],
    eventSources:["Kerala election records","PPAC India","GoK 9th PRC notification","KSRTC press release"],
    dataQuality:"estimated",sources:["Trend interpolation"],
  },
  {
    fy:"2012-13",year:2012,party:"UDF",cm:"Oommen Chandy",
    revenue:840,expenses:1190,netPL:-350,govtSubvention:180,
    fleet:6150,staff:38000,pensioners:37400,dieselPricePerLitre:50.5,passengersCrore:318,accumulatedDeficit:0,
    events:[
      "Diesel crosses ₹50 for first time; KSRTC annual fuel bill nears ₹500 Cr",
      "9th Pay Revision arrears disbursed — one-time cash outflow (source: IIT Madras ACAD)",
      "Private bus all-Kerala strike (March 2012) temporarily boosts KSRTC ridership",
      "KSRTC debt restructuring plan submitted to State Finance Ministry",
    ],
    eventSources:["PPAC India","ACAD IIT Madras repository","Mathrubhumi March 2012","Finance Dept GoK"],
    dataQuality:"semi-official",sources:["[ACAD] IIT Madras repository"],
  },
  {
    fy:"2013-14",year:2013,party:"UDF",cm:"Oommen Chandy",
    revenue:920,expenses:1300,netPL:-380,govtSubvention:195,
    fleet:6200,staff:37300,pensioners:38300,dieselPricePerLitre:55.8,passengersCrore:322,accumulatedDeficit:0,
    events:[
      "Diesel hits ₹55.8; fuel now ~23% of total operating cost",
      "KSRTC pension fund depleted; state treasury pays ₹72 Cr/month pension directly",
      "State orders KSRTC to maintain loss-making rural routes as social obligation",
    ],
    eventSources:["PPAC India","Kerala Budget 2013-14","Kerala Assembly debate records"],
    dataQuality:"estimated",sources:["Trend interpolation"],
  },
  {
    fy:"2014-15",year:2014,party:"UDF",cm:"Oommen Chandy",
    revenue:1050,expenses:2481,netPL:-1431,govtSubvention:210,
    fleet:6250,staff:36800,pensioners:39100,dieselPricePerLitre:51.0,passengersCrore:326,accumulatedDeficit:0,
    events:[
      "CAG audit recognises accumulated pension arrears & liabilities in one year's accounts (source: CAG Report No.5/2018)",
      "Global oil crash (OPEC supply surge): diesel falls to ₹51 by year-end",
      "CAG performance audit finds fleet procurement irregularities",
      "Online ticket booking launched for inter-state AC routes",
    ],
    eventSources:["CAG Report No.5 of 2018","PPAC India","CAG Report No.5/2018 para 4.3","KSRTC press release"],
    dataQuality:"semi-official",sources:["[CAG2015] CAG Report No.5 of 2018"],
  },
  {
    fy:"2015-16",year:2015,party:"UDF",cm:"Oommen Chandy",
    revenue:2165,expenses:2778,netPL:-1007,govtSubvention:280,
    fleet:5953,staff:36200,pensioners:40000,dieselPricePerLitre:48.5,passengersCrore:330,accumulatedDeficit:4217,
    events:[
      "Diesel at decade-low ~₹48 — fuel relief; but salary & pension costs keep rising",
      "First comprehensive fare revision in several years",
      "Ola/Uber app-based cabs launch in Kerala cities — erodes urban ridership",
      "Accumulated deficit at ₹4,217 Cr; total debt at ~₹4,200 Cr (source: Kerala Planning Board Economic Review 2016)",
    ],
    eventSources:["PPAC India","GoK gazette fare revision","The Hindu Kerala 2015","Kerala Planning Board Economic Review 2016"],
    dataQuality:"official",sources:["[SPB2016] Kerala Planning Board Economic Review 2016"],
  },
  {
    fy:"2016-17",year:2016,party:"LDF",cm:"Pinarayi Vijayan",
    revenue:1827,expenses:2368,netPL:-540,govtSubvention:320,
    fleet:5900,staff:35500,pensioners:41000,dieselPricePerLitre:56.0,passengersCrore:338,accumulatedDeficit:0,
    events:[
      "LDF wins May 2016 election; Pinarayi Vijayan becomes CM",
      "November demonetisation: cash-based bus revenue drops sharply for 6 weeks (source: RBI Annual Report 2017)",
      "KSRTC restructuring white paper presented to cabinet; no privatisation",
      "10th Pay Revision Commission constituted",
    ],
    eventSources:["Kerala election records","RBI Annual Report 2017","Kerala Cabinet proceedings","GoK 10th PRC notification"],
    dataQuality:"official",sources:["[SPB2017] Kerala Planning Board Economic Review 2017"],
  },
  {
    fy:"2017-18",year:2017,party:"LDF",cm:"Pinarayi Vijayan",
    revenue:1920,expenses:2620,netPL:-700,govtSubvention:380,
    fleet:5950,staff:35000,pensioners:41800,dieselPricePerLitre:63.5,passengersCrore:330,accumulatedDeficit:0,
    events:[
      "GST implementation (July 2017) — transitional compliance & input-tax cost increases",
      "Diesel crosses ₹63; annual fuel bill approaches ₹850 Cr",
      "10th Pay Revision implemented: ~20% salary increase (source: GoK GO(P) No.90/2017/Fin)",
      "KSRTC needs ₹300 Cr for salary + pension arrears — state intervenes",
    ],
    eventSources:["GST Council implementation report","PPAC India","GoK GO(P) No.90/2017/Fin","Kerala Budget 2017-18"],
    dataQuality:"estimated",sources:["Interpolation from [SPB2017] and [CARE2024]"],
  },
  {
    fy:"2018-19",year:2018,party:"LDF",cm:"Pinarayi Vijayan",
    revenue:2000,expenses:2850,netPL:-850,govtSubvention:450,
    fleet:6000,staff:34500,pensioners:42300,dieselPricePerLitre:70.5,passengersCrore:318,accumulatedDeficit:0,
    events:[
      "August 2018 Great Flood — worst Kerala floods in a century; services suspended 3 weeks (source: NDMA Flood Report 2018)",
      "~250 KSRTC buses damaged; repair/replacement cost ₹45+ Cr",
      "Diesel peaks at ₹76 (October 2018); annual average ₹70.5/L",
      "Government gives emergency ₹1,000 Cr grant (includes flood recovery)",
    ],
    eventSources:["NDMA Kerala Flood Report 2018","KSRTC damage assessment","PPAC India","Kerala Budget Supplementary 2018-19"],
    dataQuality:"estimated",sources:["Interpolation; events from [The Print], [Onmanorama]"],
  },
  {
    fy:"2019-20",year:2019,party:"LDF",cm:"Pinarayi Vijayan",
    revenue:2100,expenses:2950,netPL:-850,govtSubvention:480,
    fleet:5900,staff:34000,pensioners:43000,dieselPricePerLitre:74.0,passengersCrore:310,accumulatedDeficit:0,
    events:[
      "COVID-19 arrives in Kerala (30 Jan 2020 — India's first confirmed case; source: MoHFW India)",
      "National lockdown from 25 March 2020; KSRTC suspends all services",
      "Last quarter (Jan–Mar 2020) revenue near-zero",
      "State provides ₹480 Cr to prevent salary default",
    ],
    eventSources:["MoHFW India COVID notification","GoI lockdown order March 2020","KSRTC operations report","Kerala Budget 2019-20"],
    dataQuality:"estimated",sources:["Interpolation; events from [The Print]"],
  },
  {
    fy:"2020-21",year:2020,party:"LDF",cm:"Pinarayi Vijayan",
    revenue:1100,expenses:3076,netPL:-1976,govtSubvention:961,
    fleet:5850,staff:33500,pensioners:43500,dieselPricePerLitre:72.5,passengersCrore:175,accumulatedDeficit:0,
    events:[
      "COVID lockdowns: buses at 30–50% capacity; ridership crashes to 175 Cr from 380 Cr in 2019 (source: Kerala PRD)",
      "KSRTC salary delayed 3 months (June–Aug 2020); worst liquidity crisis in KSRTC history",
      "October 2020 LDF Special Package: ₹961 Cr interest waiver + ₹3,194 Cr loan-to-equity conversion (source: Kerala Cabinet GO)",
      "Net loss ₹1,976 Cr — single worst year in KSRTC's 60-year history",
    ],
    eventSources:["Kerala PRD Live COVID bulletin","The Hindu Kerala Sept 2020","Kerala Cabinet GO Oct 2020","CARE Ratings 2024"],
    dataQuality:"semi-official",sources:["[PRD2020] Kerala Govt PRD Live"],
  },
  {
    fy:"2021-22",year:2021,party:"LDF",cm:"Pinarayi Vijayan",
    revenue:1300,expenses:2950,netPL:-1650,govtSubvention:700,
    fleet:5800,staff:33000,pensioners:43800,dieselPricePerLitre:87.5,passengersCrore:240,accumulatedDeficit:0,
    events:[
      "Pinarayi Vijayan re-elected for historic second consecutive term (May 2021)",
      "COVID 2nd wave (April–June 2021): another ridership crash to ~240 Cr",
      "November 2021: KSRTC-SWIFT Ltd formed as SPV for modernisation",
      "December 2021: Salary revision — basic pay raised from ₹8,320 to ₹23,000/month (source: Onmanorama Dec 2021)",
      "First 25 electric buses ordered from CESL",
    ],
    eventSources:["Kerala election records","MoHFW COVID data","KSRTC-SWIFT formation gazette","Onmanorama Dec 2021","CESL tender document"],
    dataQuality:"estimated",sources:["Interpolation; salary revision from [Onmanorama]"],
  },
  {
    fy:"2022-23",year:2022,party:"LDF",cm:"Pinarayi Vijayan",
    revenue:2227,expenses:3487,netPL:-1486,govtSubvention:620,
    fleet:5576,staff:32500,pensioners:44000,dieselPricePerLitre:90.5,passengersCrore:320,accumulatedDeficit:0,
    events:[
      "Russia-Ukraine war: diesel at ₹90+ for most of FY (source: PPAC India)",
      "Post-COVID full ridership recovery; 320 Cr passengers",
      "May 2022: Minimum bus fare revised to ₹10",
      "July 2022: 41,000+ pensioners had not received pensions — Kerala HC intervenes (source: The Hindu 15 July 2022)",
      "Sept 2022: PFI hartal — 59 KSRTC buses damaged, ₹2.43 Cr direct damage",
    ],
    eventSources:["PPAC India","KSRTC operations data","GoK fare gazette","Kerala HC order July 2022 / The Hindu 15-Jul-2022","Mathrubhumi Sept 2022"],
    dataQuality:"semi-official",sources:["[CARE2024] CARE Ratings April 2024"],
  },
  {
    fy:"2023-24",year:2023,party:"LDF",cm:"Pinarayi Vijayan",
    revenue:3155,expenses:4488,netPL:-1314,govtSubvention:650,
    fleet:5576,staff:30800,pensioners:44200,dieselPricePerLitre:91.2,passengersCrore:360,accumulatedDeficit:19370,
    events:[
      "Revenue +47% YoY (₹2,227 → ₹3,155 Cr) — driven by fare hike and fleet modernisation",
      "Record daily revenue: ₹10.19 Cr on 8 September 2023",
      "75 new electric buses inducted under CESL contract",
      "Accumulated balance-sheet deficit: ₹19,369.59 Cr (source: CARE Ratings April 2025)",
      "LDF total financial support (both terms 2016–2026): ₹13,029 Cr",
    ],
    eventSources:["CARE Ratings April 2025","KSRTC press release","CESL EV tender","CARE Ratings April 2025","CARE Ratings April 2025"],
    dataQuality:"official",sources:["[CARE2025] CARE Ratings April 2025"],
  },
];

export const TOTAL_ANNUAL_LOSSES = KSRTC_DATA.reduce((sum,d) => sum + Math.abs(d.netPL), 0);
export const WORST_YEAR = KSRTC_DATA.reduce((w,d) => d.netPL < w.netPL ? d : w);
export const BEST_YEAR_RELATIVE = KSRTC_DATA.reduce((b,d) => d.netPL > b.netPL ? d : b);
export const LDF_YEARS = KSRTC_DATA.filter(d => d.party === "LDF");
export const UDF_YEARS = KSRTC_DATA.filter(d => d.party === "UDF");
export const avg = (arr: number[]) => arr.length ? arr.reduce((s,v) => s+v, 0) / arr.length : 0;
export const LDF_AVG_LOSS = avg(LDF_YEARS.map(d => d.netPL));
export const UDF_AVG_LOSS = avg(UDF_YEARS.map(d => d.netPL));
export const PARTY_COLORS: Record<Party, string> = { LDF: "#EF4444", UDF: "#3B82F6" };
export const PARTY_LABELS: Record<Party, string> = { LDF: "LDF (CPM-led Left Front)", UDF: "UDF (Congress-led United Front)" };
export const DEFICIT_FY16 = 4217;
export const DEFICIT_FY24 = 19370;

export function lossPercent(d: KSRTCYearData) {
  return ((Math.abs(d.netPL) / d.revenue) * 100).toFixed(1);
}
export function expenseRatio(d: KSRTCYearData) {
  return ((d.expenses / d.revenue) * 100).toFixed(1);
}
export function subventionCoverage(d: KSRTCYearData) {
  return ((d.govtSubvention / Math.abs(d.netPL)) * 100).toFixed(1);
}
