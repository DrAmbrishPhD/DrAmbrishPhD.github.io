// ===== Data =====
const STREAMS_DATA = [
  {id:'primary', n:'01', title:'PRIMARY RESEARCH', kicker:'GENERATE EVIDENCE', intro:'Generating original evidence to answer clinically relevant questions in patients and populations.', work:['Designed and led observational studies using healthcare databases including JMDC, MDV and IHD in Japan.','Developed study protocols for real-world studies, including J-ORBIT and paediatric allergy research.','Applied epidemiologic methods to cohort design, outcomes research and population-level questions.']},
  {id:'rwe', n:'02', title:'REAL-WORLD EVIDENCE', kicker:'UNDERSTAND PATIENTS', intro:'Using real-world data to understand treatment patterns, outcomes, healthcare utilisation and populations outside controlled trials.', work:['Extensive work with Japanese healthcare databases and real-world evidence programmes.','Developed protocols, cohorts, outcomes and analytical questions for RWE studies.','Worked across cardiometabolic, musculoskeletal, immunology and healthcare-utilisation questions.']},
  {id:'synthesis', n:'03', title:'EVIDENCE SYNTHESIS', kicker:'SYNTHESISE KNOWLEDGE', intro:'Turning a fragmented literature into structured, decision-relevant evidence.', work:['Led and contributed to systematic reviews, targeted literature reviews, meta-analyses and network meta-analyses.','Completed 11 targeted literature reviews, with additional evidence synthesis programmes ongoing.','Experience with Cochrane methods, comparative effectiveness and evidence-generation questions for HTA.']},
  {id:'economics', n:'04', title:'HEALTH ECONOMICS', kicker:'UNDERSTAND VALUE', intro:'Evaluating value by connecting outcomes, costs, quality of life and resource use.', work:['Applied health-economic thinking across cost-effectiveness, cost-utility and budget-impact questions.','Integrated epidemiology, clinical outcomes and humanistic evidence to support value assessment.','Worked on economic and outcomes questions spanning obesity, osteoarthritis, cardiometabolic disease and healthcare systems.']},
  {id:'hta', n:'05', title:'HTA & VALUE', kicker:'EVALUATE & DEMONSTRATE', intro:'Bringing evidence together for health technology assessment, reimbursement and market-access questions.', work:['Current work spans SLR, TLR, meta-analysis and global value-demonstration dossier development.','Experience with HTA frameworks and evidence expectations including NICE, CADTH and PBAC.','Translate comparative clinical, epidemiologic and economic evidence into payer-relevant value narratives.']},
  {id:'decision', n:'06', title:'DECISION EVIDENCE', kicker:'TRANSLATE EVIDENCE', intro:'Making evidence useful for real healthcare, reimbursement and access decisions.', work:['Connect evidence generation and synthesis to reimbursement, access and healthcare decision needs.','Build evidence narratives around burden, comparative value and unmet need.','Bring epidemiology, RWE, synthesis, health economics and HTA into one decision-oriented perspective.']}
];

const CAPABILITIES_DATA = [
  { n: '01', example: 'Cochrane systematic review and meta-analysis of Boswellia for osteoarthritis; colchicine SLR now cited in the 2025 Egyptian and 2024 Chinese clinical guidelines.' },
  { n: '02', example: 'Treatment patterns and healthcare resource use in paediatric atopic dermatitis using Japanese claims data, and real-world obesity management outcomes via the J-ORBIT database.' },
  { n: '03', example: 'Cost-utility analysis of yoga vs strengthening exercise for knee osteoarthritis, and a cost-utility analysis of regorafenib for hepatocellular carcinoma post-sorafenib.' },
  { n: '04', example: 'Longitudinal analysis of knee MRI biomarkers and symptoms over 6–9 years; contributions to Global Burden of Disease estimates for osteoarthritis and low back pain.' },
  { n: '05', example: 'Randomised trials of turmeric extract and of yoga vs strengthening exercise for knee osteoarthritis, and SF-6D health-state utility research on knee symptoms.' },
  { n: '06', example: 'Associate/guest editor roles, Cochrane Living Evidence Network guidance contribution, and peer review for ISPOR, ISPE, HTAi and CADTH conferences.' }
];
const CAP_TITLES = {'01':'Evidence synthesis','02':'Real-world evidence','03':'Health economics & HTA','04':'Epidemiology & population health','05':'Clinical & patient-centred evidence','06':'Evidence strategy & leadership'};

const SCALE_STORIES = {
  gbd: "Contributions to Global Burden of Disease programmes covering osteoarthritis, low back pain, diabetes, cardiovascular disease, tobacco, ageing, cancer and other diseases and risk factors — work that scales from a single dataset into estimates used across 204 countries and territories.",
  policy: "Contributed to the iDSI HTA Toolkit, designed to help health ministries and government agencies build sustainable local HTA mechanisms for priority-setting in health — extending evidence generation into practical government tools.",
  guidelines: "Research contributions supporting WHO Healthy Housing guidance and the World Federation of Hemophilia management guidelines. A systematic review and meta-analysis of colchicine for osteoarthritis was cited in the 2025 Egyptian clinical practice guidelines for knee osteoarthritis and the 2024 Chinese guidelines for gout management, directly informing clinical recommendations.",
  ebm: "Cochrane author and contributor, including guidance from the Cochrane Living Evidence Network on living systematic reviews, and contributor to evidence summaries through the Joanna Briggs Institute — work that shapes how other researchers produce and update evidence."
};
const SCALE_LABELS = {gbd:'GLOBAL BURDEN OF DISEASE', policy:'HEALTH SYSTEMS', guidelines:'GLOBAL HEALTH GUIDANCE', ebm:'EVIDENCE-BASED MEDICINE'};

const TOOLKIT_DETAILS = {
  'MDV (Japan)': 'Japanese hospital claims database used in real-world treatment-pattern and healthcare-utilisation research.',
  'CDAH (Australia)': 'Longitudinal Australian cohort data used in knee MRI biomarker and symptom research.',
  'KLoSA (Korea)': 'Korean Longitudinal Study of Ageing data behind research on metabolic syndrome trajectories and knee pain.',
  'JMDC (Japan)': 'Japanese claims database used for paediatric atopic dermatitis treatment-pattern research.',
  'DistillerSR': 'Systematic review screening and data extraction for Cochrane and other evidence syntheses.',
  'Covidence': 'Systematic review management used across evidence synthesis projects.',
  'RevMan': "Cochrane's meta-analysis software, used in the Boswellia and colchicine systematic reviews.",
  'TreeAge': 'Decision-analytic and cost-effectiveness modelling, including the regorafenib HCC and yoga vs exercise cost-utility analyses.'
};
const HTA_DETAILS = {
  'NICE': 'Cost-effectiveness models built to NICE reference-case methods — QALYs, EQ-5D-5L, discounting — as in the yoga vs strengthening exercise cost-utility analysis.',
  'CADTH': 'Evidence and value-dossier structures aligned to CADTH submission methods for musculoskeletal and oncology cost-effectiveness questions.',
  'PBAC': 'Cost-utility analysis of regorafenib for hepatocellular carcinoma structured for PBAC-aligned reimbursement evidence.'
};

// ===== State =====
let activeStream = 'primary';
let activeCapability = '01';
let activeScale = 'gbd';
let activeToolkit = null;
let activeAgency = null;
let pubFilter = 'all';
let streamTimer, capTimer, scaleTimer;

// ===== Evidence landscape (hero) =====
function renderStreamDetail(id){
  const s = STREAMS_DATA.find(x => x.id === id);
  document.getElementById('detailNum').textContent = s.n;
  document.getElementById('detailKicker').textContent = s.kicker;
  document.getElementById('detailTitle').textContent = s.title;
  document.getElementById('detailIntro').textContent = s.intro;
  const list = document.getElementById('detailWork');
  list.innerHTML = s.work.map(w => `<li>${w}</li>`).join('');
}
function setActiveStream(id, restart){
  activeStream = id;
  document.querySelectorAll('.evidence-node').forEach(n => n.classList.toggle('active', n.dataset.stream === id));
  renderStreamDetail(id);
  if (restart) startStreamCycle();
}
function startStreamCycle(){
  clearInterval(streamTimer);
  streamTimer = setInterval(() => {
    const idx = STREAMS_DATA.findIndex(s => s.id === activeStream);
    const next = STREAMS_DATA[(idx + 1) % STREAMS_DATA.length];
    setActiveStream(next.id, false);
  }, 4000);
}

// ===== Capabilities =====
function setActiveCapability(n, restart){
  activeCapability = n;
  document.querySelectorAll('.cap-card').forEach(c => c.classList.toggle('active', c.dataset.cap === n));
  document.getElementById('capExampleLabel').textContent = 'EXAMPLE — ' + CAP_TITLES[n];
  document.getElementById('capExampleText').textContent = CAPABILITIES_DATA.find(c => c.n === n).example;
  if (restart) startCapCycle();
}
function startCapCycle(){
  clearInterval(capTimer);
  capTimer = setInterval(() => {
    const idx = CAPABILITIES_DATA.findIndex(c => c.n === activeCapability);
    const next = CAPABILITIES_DATA[(idx + 1) % CAPABILITIES_DATA.length];
    setActiveCapability(next.n, false);
  }, 4500);
}

// ===== Impact / scale cards =====
function setActiveScale(id, restart){
  activeScale = id;
  document.querySelectorAll('.scale-card').forEach(c => c.classList.toggle('active', c.dataset.scale === id));
  document.getElementById('scaleDetailLabel').textContent = SCALE_LABELS[id];
  document.getElementById('scaleDetailText').textContent = SCALE_STORIES[id];
  if (restart) startScaleCycle();
}
function startScaleCycle(){
  clearInterval(scaleTimer);
  const ids = Object.keys(SCALE_LABELS);
  scaleTimer = setInterval(() => {
    const idx = ids.indexOf(activeScale);
    setActiveScale(ids[(idx + 1) % ids.length], false);
  }, 4500);
}

// ===== Recognition: toolkit / agency pills =====
function toggleToolkit(name){
  activeToolkit = activeToolkit === name ? null : name;
  document.querySelectorAll('.toolkit-pill').forEach(p => p.classList.toggle('active', p.dataset.tool === activeToolkit));
  document.getElementById('toolkitDetail').textContent = activeToolkit ? TOOLKIT_DETAILS[activeToolkit] : '';
}
function toggleAgency(name){
  activeAgency = activeAgency === name ? null : name;
  document.querySelectorAll('.agency-pill').forEach(p => p.classList.toggle('active', p.dataset.agency === activeAgency));
  document.getElementById('agencyDetail').textContent = activeAgency ? HTA_DETAILS[activeAgency] : '';
}

// ===== Publications =====
function setPubFilter(cat){
  pubFilter = cat;
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.filter === cat));
  document.querySelectorAll('.pub-card').forEach(card => {
    card.classList.toggle('visible', cat === 'all' || card.dataset.category === cat);
  });
}
function togglePub(card){
  card.classList.toggle('expanded');
  card.querySelector('.pub-toggle-icon').textContent = card.classList.contains('expanded') ? '–' : '↗';
}

// ===== Visible research identity links =====
function addResearchIdentityLinks(){
  const container = document.querySelector('.about-links');
  if (!container || container.dataset.identityEnhanced === 'true') return;
  container.dataset.identityEnhanced = 'true';

  const links = [
    ['University of Tasmania','https://discover.utas.edu.au/Ambrish.Singh'],
    ['Google Scholar','https://scholar.google.com/citations?user=s-DOTWcAAAAJ&hl=en'],
    ['ResearchGate','https://www.researchgate.net/profile/Ambrish-Singh-3?ev=hdr_xprf'],
    ['Scopus','https://www.scopus.com/pages/authors/57214875932'],
    ['Research profile','/profile.html']
  ];

  links.forEach(([label, url]) => {
    const a = document.createElement('a');
    a.href = url;
    a.textContent = label + ' ↗';
    if (url.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener'; }
    container.appendChild(a);
  });

  const style = document.createElement('style');
  style.textContent = `
    .about-links{display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center}
    .about-links a{white-space:nowrap}
  `;
  document.head.appendChild(style);
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  document.querySelectorAll('.evidence-node').forEach(n => {
    n.addEventListener('click', () => setActiveStream(n.dataset.stream, true));
  });
  setActiveStream(activeStream, false);
  startStreamCycle();

  document.querySelectorAll('.cap-card').forEach(c => {
    c.addEventListener('click', () => setActiveCapability(c.dataset.cap, true));
  });
  setActiveCapability(activeCapability, false);
  startCapCycle();

  document.querySelectorAll('.scale-card').forEach(c => {
    c.addEventListener('click', () => setActiveScale(c.dataset.scale, true));
  });
  setActiveScale(activeScale, false);
  startScaleCycle();

  document.querySelectorAll('.toolkit-pill').forEach(p => {
    p.addEventListener('click', () => toggleToolkit(p.dataset.tool));
  });
  document.querySelectorAll('.agency-pill').forEach(p => {
    p.addEventListener('click', () => toggleAgency(p.dataset.agency));
  });

  document.querySelectorAll('.chip').forEach(c => {
    c.addEventListener('click', () => setPubFilter(c.dataset.filter));
  });
  setPubFilter('all');
  document.querySelectorAll('.pub-card').forEach(card => {
    card.addEventListener('click', () => togglePub(card));
  });

  addResearchIdentityLinks();
});