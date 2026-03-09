const STORAGE_KEY = "packtica_audit_state_v2";
// Replace this placeholder with digits only, for example: 60123456789
const WHATSAPP_NUMBER = "60162893118";

const STEP_IDS = ["step1", "step2", "step3", "results"];
const QUESTION_ORDER = ["BP1", "BP2", "TR1", "TR2", "SG1", "SG2", "PD1", "PD2", "ER1", "ER2"];
const SCORE_VALUES = ["0", "1", "2"];

const ROLE_OPTIONS = [
  "Owner / Founder",
  "Marketing",
  "Operations / Production",
  "Procurement / Purchasing",
  "QA / Compliance",
  "Sales / Business Dev",
  "Others"
];

const INDUSTRY_OPTIONS = ["FMCG", "Health & Beauty", "Automotive / Lubricants", "Others"];

const INTEREST_OPTIONS = [
  "Packaging",
  "Label / Sticker",
  "SmartKood (QR / loyalty / lucky draw)",
  "Not sure"
];

const MONTHLY_OUTPUT_OPTIONS = [
  "< 5,000 / month",
  "5,000–20,000 / month",
  "20,000–100,000 / month",
  "100,000–500,000 / month",
  "500,000+ / month"
];

const QUESTIONS = {
  BP1: {
    text: "How hard is it for someone to copy your packaging/label and sell a fake?",
    options: [
      { label: "Easy", value: "0" },
      { label: "Somewhat", value: "1" },
      { label: "Hard", value: "2" }
    ]
  },
  BP2: {
    text: "Can staff/partners verify authenticity using packaging or labels today?",
    options: [
      { label: "No", value: "0" },
      { label: "Visual only", value: "1" },
      { label: "Scan/Verify", value: "2" }
    ]
  },
  TR1: {
    text: "If you needed to trace a batch today, how would you find where it went?",
    options: [
      { label: "Manual", value: "0" },
      { label: "Mixed", value: "1" },
      { label: "Systemized", value: "2" }
    ]
  },
  TR2: {
    text: "Do your products carry scannable IDs that link to lot/batch and movement events?",
    options: [
      { label: "None", value: "0" },
      { label: "Lot-only", value: "1" },
      { label: "Unit/Case ID", value: "2" }
    ]
  },
  SG1: {
    text: "Do you run promo / lucky draw / redemption?",
    options: [
      { label: "No", value: "0" },
      { label: "Sometimes", value: "1" },
      { label: "Often", value: "2" }
    ]
  },
  SG2: {
    text: "If yes, how is it handled?",
    options: [
      { label: "Manual", value: "0" },
      { label: "Semi-auto", value: "1" },
      { label: "Automated", value: "2" }
    ]
  },
  PD1: {
    text: "How much visibility do you have into where products are sold and at what price?",
    options: [
      { label: "Low", value: "0" },
      { label: "Some", value: "1" },
      { label: "High", value: "2" }
    ]
  },
  PD2: {
    text: "How controlled are your distribution channels?",
    options: [
      { label: "Open", value: "0" },
      { label: "Moderate", value: "1" },
      { label: "Tight", value: "2" }
    ]
  },
  ER1: {
    text: "How reliable is your packaging/label supply (lead time + quality consistency)?",
    options: [
      { label: "Unreliable", value: "0" },
      { label: "Mostly OK", value: "1" },
      { label: "Reliable", value: "2" }
    ]
  },
  ER2: {
    text: "How do you confirm print/label accuracy (batch/expiry/barcode) before shipping?",
    options: [
      { label: "Visual", value: "0" },
      { label: "Sampling", value: "1" },
      { label: "Automated", value: "2" }
    ]
  }
};

const BUCKETS = [
  { key: "bp", name: "Brand Protection", questionIds: ["BP1", "BP2"] },
  { key: "tr", name: "Traceability", questionIds: ["TR1", "TR2"] },
  { key: "pd", name: "Price & Distribution Control", questionIds: ["PD1", "PD2"] },
  { key: "sg", name: "SmartKood Growth", questionIds: ["SG1", "SG2"] },
  { key: "er", name: "Execution Reliability", questionIds: ["ER1", "ER2"] }
];

const PAIN_TIE_PRIORITY = {
  "Brand Protection": 1,
  "Price & Distribution Control": 2,
  Traceability: 3,
  "SmartKood Growth": 4,
  "Execution Reliability": 5
};

const LOW_BUCKET_RECOMMENDATION_MAP = {
  "Brand Protection": ["R4", "R3"],
  Traceability: ["R1", "R2"],
  "Price & Distribution Control": ["R6", "R5"],
  "SmartKood Growth": ["R7", "R8"],
  "Execution Reliability": ["R9", "R10"]
};

const RECOMMENDATION_LIBRARY = {
  R1: {
    id: "R1",
    category: "CRITICAL INFRASTRUCTURE",
    title: "Batch & Complaint Trace Setup",
    description: "Track issues by batch so you can respond fast and reduce repeat complaints.",
    bullets: ["Batch ID rules", "Simple tracking log", "Faster investigation"]
  },
  R2: {
    id: "R2",
    category: "CRITICAL INFRASTRUCTURE",
    title: "Scannable ID Setup",
    description: "Add scannable IDs that link to lot/batch events for better visibility.",
    bullets: ["QR/ID structure", "Event capture basics", "Clear records"]
  },
  R3: {
    id: "R3",
    category: "BRAND PROTECTION",
    title: "Anti-Copy Security Upgrade",
    description: "Make copying harder with the right security layer on label or packaging.",
    bullets: ["Security label options", "Material/finish selection", "Copy deterrence"]
  },
  R4: {
    id: "R4",
    category: "BRAND PROTECTION",
    title: "Scan-to-Verify Authenticity",
    description: "Let users scan and instantly get a clear real vs fake result.",
    bullets: ["Verify landing page", "Unique ID", "Scan logging"]
  },
  R5: {
    id: "R5",
    category: "LOSS PREVENTION",
    title: "Market Visibility Basics",
    description: "Improve visibility on where products are sold and what’s happening in-market.",
    bullets: ["Visibility by area", "Simple reporting", "Baseline monitoring"]
  },
  R6: {
    id: "R6",
    category: "LOSS PREVENTION",
    title: "Distribution Control",
    description: "Reduce leakage and price dumping by tightening distribution controls.",
    bullets: ["Authorized checks", "Monitoring basics", "Better control"]
  },
  R7: {
    id: "R7",
    category: "GROWTH ASSET",
    title: "Promo & Loyalty Starter",
    description: "Use QR to run promos and drive repeat purchase with less manual work.",
    bullets: ["Scan-to-redeem", "Simple rules", "Campaign-ready pages"]
  },
  R8: {
    id: "R8",
    category: "GROWTH ASSET",
    title: "Measurement & Analytics",
    description: "Track scans, claims, and repeat behavior to measure what works.",
    bullets: ["Dashboard basics", "Export-ready data", "Better targeting"]
  },
  R9: {
    id: "R9",
    category: "OPERATIONS",
    title: "Reliability & Consistency Fix",
    description: "Reduce rework by improving print consistency and material fit.",
    bullets: ["QC checkpoints", "Sample approval", "Consistent output"]
  },
  R10: {
    id: "R10",
    category: "OPERATIONS",
    title: "Accuracy Verification",
    description: "Reduce shipment mistakes with stronger checks on batch/expiry/barcode.",
    bullets: ["Process checklist", "Sampling approach", "Automation pathway"]
  }
};

const ALL_RECOMMENDATION_IDS = Object.keys(RECOMMENDATION_LIBRARY);

const RATING_STYLES = {
  "High Risk": { className: "rating-high-risk", colorVar: "--risk-red" },
  Improving: { className: "rating-improving", colorVar: "--warn-orange" },
  Strong: { className: "rating-strong", colorVar: "--good-green" }
};

const STRONG_PAIN_POINTS_MESSAGE = "No major pain points detected. Optimization opportunities below.";
const PAIN_POINT_EXPLANATIONS = {
  "Brand Protection": "Easy to copy or hard to verify real vs fake.",
  Traceability: "Hard to track batches and where products end up.",
  "Price & Distribution Control": "Low visibility and weak control across distributors.",
  "SmartKood Growth": "Promos/data tracking is weak or not measured.",
  "Execution Reliability": "Quality/lead time issues cause rework or delays."
};
const PAIN_POINT_IMPACTS = {
  "Brand Protection": "Impact: Fake risk, trust loss.",
  Traceability: "Impact: Slow complaint handling.",
  "Price & Distribution Control": "Impact: Price dumping risk.",
  "SmartKood Growth": "Impact: Missed repeat sales.",
  "Execution Reliability": "Impact: Cost up, launch delay."
};
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Tracks which inputs the user has interacted with so errors can appear progressively.
const touchedInfoFields = new Set();
let hasTriedInfoNext = false;

let state = createDefaultState();
let els = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
  cacheElements();
  bindEvents();
  loadState();
  applySg2VisibilityRule();
  renderInfoForm();
  renderQuestionPages();

  const initialStep = resolveInitialStep(state.currentStep);
  if (initialStep === "results") {
    renderResults(calculateResults(state));
  }

  showStep(initialStep);
  persistState();
}

function cacheElements() {
  els.step1 = document.getElementById("step1");
  els.step2 = document.getElementById("step2");
  els.step3 = document.getElementById("step3");
  els.results = document.getElementById("results");

  els.infoForm = document.getElementById("infoForm");
  els.company = document.getElementById("company");
  els.name = document.getElementById("name");
  els.role = document.getElementById("role");
  els.email = document.getElementById("email");
  els.phone = document.getElementById("phone");
  els.industry = document.getElementById("industry");
  els.industryOther = document.getElementById("industry_other");
  els.industryOtherWrap = document.getElementById("industry_other_wrap");
  els.interestedGroup = document.getElementById("interested_group");
  els.interestedInputs = Array.from(document.querySelectorAll('input[name="interested_in"]'));
  els.monthlyOutput = document.getElementById("monthly_output");
  els.notes = document.getElementById("notes");

  els.companyError = document.getElementById("company_error");
  els.nameError = document.getElementById("name_error");
  els.roleError = document.getElementById("role_error");
  els.emailError = document.getElementById("email_error");
  els.phoneError = document.getElementById("phone_error");
  els.industryError = document.getElementById("industry_error");
  els.industryOtherError = document.getElementById("industry_other_error");
  els.interestedError = document.getElementById("interested_error");
  els.monthlyOutputError = document.getElementById("monthly_output_error");
  els.notesError = document.getElementById("notes_error");

  els.step1Next = document.getElementById("step1Next");
  els.step2Back = document.getElementById("step2Back");
  els.step2Next = document.getElementById("step2Next");
  els.step3Back = document.getElementById("step3Back");
  els.step3Results = document.getElementById("step3Results");

  els.questionsAContainer = document.getElementById("questionsAContainer");
  els.questionsBContainer = document.getElementById("questionsBContainer");

  els.resultCompany = document.getElementById("resultCompany");
  els.resultName = document.getElementById("resultName");
  els.resultRole = document.getElementById("resultRole");
  els.resultIndustry = document.getElementById("resultIndustry");

  els.overallPct = document.getElementById("overallPct");
  els.overallRating = document.getElementById("overallRating");
  els.overallBarFill = document.getElementById("overallBarFill");
  els.bucketRows = document.getElementById("bucketRows");
  els.painPointsList = document.getElementById("painPointsList");
  els.painPointsMessage = document.getElementById("painPointsMessage");
  els.recommendationsGrid = document.getElementById("recommendationsGrid");

  els.restartBtn = document.getElementById("restartBtn");
  els.waBtn = document.getElementById("waBtn");
}

function bindEvents() {
  els.infoForm.addEventListener("input", handleInfoInput);
  els.infoForm.addEventListener("change", handleInfoInput);

  els.step1Next.addEventListener("click", handleStep1Next);
  els.step2Back.addEventListener("click", () => goToStep("step1"));
  els.step2Next.addEventListener("click", handleStep2Next);
  els.step3Back.addEventListener("click", () => goToStep("step2"));
  els.step3Results.addEventListener("click", handleStep3Results);

  els.questionsAContainer.addEventListener("change", handleQuestionChange);
  els.questionsBContainer.addEventListener("change", handleQuestionChange);

  els.restartBtn.addEventListener("click", handleRestart);
}
function createDefaultState() {
  return {
    currentStep: "step1",
    info: {
      company: "",
      name: "",
      role: "",
      email: "",
      phone: "",
      industry: "",
      industry_other: "",
      interested_in: [],
      monthly_output: "",
      notes: ""
    },
    answers: QUESTION_ORDER.reduce((acc, id) => {
      acc[id] = "";
      return acc;
    }, {})
  };
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return;
    }

    const defaults = createDefaultState();
    state.currentStep = parsed.currentStep || defaults.currentStep;
    state.info = { ...defaults.info, ...(parsed.info || {}) };
    state.answers = { ...defaults.answers, ...(parsed.answers || {}) };
    sanitizeState();
  } catch (_error) {
    state = createDefaultState();
  }
}

function sanitizeState() {
  if (!STEP_IDS.includes(state.currentStep)) {
    state.currentStep = "step1";
  }

  state.info.company = String(state.info.company || "");
  state.info.name = String(state.info.name || "");
  state.info.role = ROLE_OPTIONS.includes(state.info.role) ? state.info.role : "";
  state.info.email = String(state.info.email || "");
  state.info.phone = String(state.info.phone || "");
  state.info.industry = INDUSTRY_OPTIONS.includes(state.info.industry) ? state.info.industry : "";
  state.info.industry_other = String(state.info.industry_other || "");
  state.info.interested_in = Array.isArray(state.info.interested_in)
    ? state.info.interested_in.filter((item) => INTEREST_OPTIONS.includes(item))
    : [];
  state.info.monthly_output = MONTHLY_OUTPUT_OPTIONS.includes(state.info.monthly_output)
    ? state.info.monthly_output
    : "";
  state.info.notes = String(state.info.notes || "");

  QUESTION_ORDER.forEach((id) => {
    state.answers[id] = SCORE_VALUES.includes(state.answers[id]) ? state.answers[id] : "";
  });

  if (state.info.industry !== "Others") {
    state.info.industry_other = "";
  }
}

function renderInfoForm() {
  els.company.value = state.info.company;
  els.name.value = state.info.name;
  setSelectValue(els.role, state.info.role);
  els.email.value = state.info.email;
  els.phone.value = state.info.phone;
  setSelectValue(els.industry, state.info.industry);
  els.industryOther.value = state.info.industry_other;
  setSelectValue(els.monthlyOutput, state.info.monthly_output);
  els.notes.value = state.info.notes;

  els.interestedInputs.forEach((input) => {
    input.checked = state.info.interested_in.includes(input.value);
  });

  applyIndustryFieldRule();
  validateInfoForm({ showAllErrors: hasTriedInfoNext });
}

function setSelectValue(selectElement, value) {
  selectElement.value = value || "";
}

function handleInfoInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.id) {
    touchedInfoFields.add(target.id);
  }
  if (target.getAttribute("name") === "interested_in") {
    touchedInfoFields.add("interested_in");
  }

  syncInfoFromForm();
  applyIndustryFieldRule();
  validateInfoForm({ showAllErrors: hasTriedInfoNext });
  persistState();
}

function syncInfoFromForm() {
  // Keep the persisted state as the single source of truth for navigation and scoring.
  state.info.company = els.company.value;
  state.info.name = els.name.value;
  state.info.role = els.role.value;
  state.info.email = els.email.value;
  state.info.phone = els.phone.value;
  state.info.industry = els.industry.value;
  state.info.industry_other = els.industryOther.value;
  state.info.interested_in = els.interestedInputs
    .filter((input) => input.checked)
    .map((input) => input.value);
  state.info.monthly_output = els.monthlyOutput.value;
  state.info.notes = els.notes.value;
}

function applyIndustryFieldRule() {
  const isOthers = state.info.industry === "Others";

  if (isOthers) {
    els.industryOtherWrap.hidden = false;
    els.industryOtherWrap.classList.remove("is-hidden");
    els.industryOther.required = true;
    return;
  }

  els.industryOtherWrap.hidden = true;
  els.industryOtherWrap.classList.add("is-hidden");
  els.industryOther.required = false;
  els.industryOther.value = "";
  state.info.industry_other = "";
  clearFieldError(els.industryOther, els.industryOtherError);
}

function validateInfoForm({ showAllErrors }) {
  const errors = {};

  if (!state.info.company.trim()) {
    errors.company = "Company / Brand is required.";
  }
  if (!state.info.name.trim()) {
    errors.name = "Name is required.";
  }
  if (!ROLE_OPTIONS.includes(state.info.role)) {
    errors.role = "Role is required.";
  }

  const emailTrimmed = state.info.email.trim();
  if (!emailTrimmed) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(emailTrimmed)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!state.info.phone.trim()) {
    errors.phone = "Phone is required.";
  }
  if (!INDUSTRY_OPTIONS.includes(state.info.industry)) {
    errors.industry = "Industry is required.";
  }
  if (state.info.industry === "Others" && !state.info.industry_other.trim()) {
    errors.industry_other = "Industry (please specify) is required.";
  }
  if (!state.info.interested_in.length) {
    errors.interested_in = "Select at least one option.";
  }
  if (!MONTHLY_OUTPUT_OPTIONS.includes(state.info.monthly_output)) {
    errors.monthly_output = "Monthly output is required.";
  }

  setFieldError(els.company, els.companyError, errors.company, showAllErrors || touchedInfoFields.has("company"));
  setFieldError(els.name, els.nameError, errors.name, showAllErrors || touchedInfoFields.has("name"));
  setFieldError(els.role, els.roleError, errors.role, showAllErrors || touchedInfoFields.has("role"));
  setFieldError(els.email, els.emailError, errors.email, showAllErrors || touchedInfoFields.has("email"));
  setFieldError(els.phone, els.phoneError, errors.phone, showAllErrors || touchedInfoFields.has("phone"));
  setFieldError(els.industry, els.industryError, errors.industry, showAllErrors || touchedInfoFields.has("industry"));

  if (state.info.industry === "Others") {
    setFieldError(
      els.industryOther,
      els.industryOtherError,
      errors.industry_other,
      showAllErrors || touchedInfoFields.has("industry_other")
    );
  } else {
    clearFieldError(els.industryOther, els.industryOtherError);
  }

  setFieldError(
    els.interestedGroup,
    els.interestedError,
    errors.interested_in,
    showAllErrors || touchedInfoFields.has("interested_in")
  );

  setFieldError(
    els.monthlyOutput,
    els.monthlyOutputError,
    errors.monthly_output,
    showAllErrors || touchedInfoFields.has("monthly_output")
  );

  clearFieldError(els.notes, els.notesError);

  const isValid = Object.keys(errors).length === 0;
  els.step1Next.disabled = !isValid;
  return isValid;
}

function setFieldError(element, errorElement, message, shouldShow) {
  if (message && shouldShow) {
    element.classList.add("is-invalid");
    errorElement.textContent = message;
    return;
  }

  element.classList.remove("is-invalid");
  errorElement.textContent = "";
}

function clearFieldError(element, errorElement) {
  element.classList.remove("is-invalid");
  errorElement.textContent = "";
}

function handleStep1Next() {
  hasTriedInfoNext = true;
  const isValid = validateInfoForm({ showAllErrors: true });
  persistState();

  if (!isValid) {
    return;
  }

  goToStep("step2");
}
function getVisibleQuestionIds(currentState) {
  // SG2 is only relevant when the user actually runs promotions.
  if (currentState.answers.SG1 === "0") {
    return QUESTION_ORDER.filter((id) => id !== "SG2");
  }
  return [...QUESTION_ORDER];
}

function getQuestionPageAIds(currentState) {
  return getVisibleQuestionIds(currentState).slice(0, 5);
}

function getQuestionPageBIds(currentState) {
  return getVisibleQuestionIds(currentState).slice(5);
}

function applySg2VisibilityRule() {
  if (state.answers.SG1 === "0") {
    state.answers.SG2 = "";
  }
}

function renderQuestionPages() {
  const visibleIds = getVisibleQuestionIds(state);
  const pageAIds = getQuestionPageAIds(state);
  const pageBIds = getQuestionPageBIds(state);

  renderQuestionPage(els.questionsAContainer, pageAIds, visibleIds, "qa");
  renderQuestionPage(els.questionsBContainer, pageBIds, visibleIds, "qb");

  els.step2Next.disabled = !isQuestionPageValid(pageAIds);
  els.step3Results.disabled = !isQuestionPageValid(pageBIds);
}

function renderQuestionPage(container, pageIds, visibleIds, idPrefix) {
  container.innerHTML = "";

  pageIds.forEach((questionId) => {
    const question = QUESTIONS[questionId];
    const displayNumber = visibleIds.indexOf(questionId) + 1;

    const article = document.createElement("article");
    article.className = "question-card";

    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = `${displayNumber}) ${question.text}`;

    const optionsGrid = document.createElement("div");
    optionsGrid.className = "options-grid";

    question.options.forEach((option) => {
      const label = document.createElement("label");
      label.className = "option-card";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = questionId;
      input.value = option.value;
      input.id = `${idPrefix}_${questionId}_${option.value}`;
      input.checked = state.answers[questionId] === option.value;

      const text = document.createElement("span");
      text.textContent = option.label;

      label.appendChild(input);
      label.appendChild(text);
      optionsGrid.appendChild(label);
    });

    fieldset.appendChild(legend);
    fieldset.appendChild(optionsGrid);
    article.appendChild(fieldset);
    container.appendChild(article);
  });
}

function handleQuestionChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }
  if (target.type !== "radio" || !QUESTION_ORDER.includes(target.name)) {
    return;
  }

  state.answers[target.name] = target.value;

  if (target.name === "SG1") {
    applySg2VisibilityRule();
  }

  renderQuestionPages();
  persistState();
}

function isQuestionPageValid(pageIds) {
  return pageIds.every((id) => SCORE_VALUES.includes(state.answers[id]));
}

function handleStep2Next() {
  const pageAIds = getQuestionPageAIds(state);
  if (!isQuestionPageValid(pageAIds)) {
    return;
  }
  goToStep("step3");
}

function handleStep3Results() {
  const pageBIds = getQuestionPageBIds(state);
  if (!isQuestionPageValid(pageBIds)) {
    return;
  }

  renderResults(calculateResults(state));
  goToStep("results");
}

function resolveInitialStep(stepId) {
  if (!STEP_IDS.includes(stepId)) {
    return "step1";
  }

  // When restoring from localStorage, never reopen a later step if earlier required data is missing.
  const infoIsValid = validateInfoForRestore();
  if (!infoIsValid) {
    return "step1";
  }

  if (stepId === "step1") {
    return "step1";
  }

  const pageAValid = isQuestionPageValid(getQuestionPageAIds(state));
  if (!pageAValid) {
    return "step2";
  }

  if (stepId === "step2") {
    return "step2";
  }

  const pageBValid = isQuestionPageValid(getQuestionPageBIds(state));
  if (!pageBValid) {
    return "step3";
  }

  return stepId;
}

function validateInfoForRestore() {
  if (!state.info.company.trim()) {
    return false;
  }
  if (!state.info.name.trim()) {
    return false;
  }
  if (!ROLE_OPTIONS.includes(state.info.role)) {
    return false;
  }
  if (!state.info.email.trim() || !EMAIL_REGEX.test(state.info.email.trim())) {
    return false;
  }
  if (!state.info.phone.trim()) {
    return false;
  }
  if (!INDUSTRY_OPTIONS.includes(state.info.industry)) {
    return false;
  }
  if (state.info.industry === "Others" && !state.info.industry_other.trim()) {
    return false;
  }
  if (!state.info.interested_in.length) {
    return false;
  }
  if (!MONTHLY_OUTPUT_OPTIONS.includes(state.info.monthly_output)) {
    return false;
  }
  return true;
}

function showStep(stepId) {
  const screenMap = {
    step1: els.step1,
    step2: els.step2,
    step3: els.step3,
    results: els.results
  };

  STEP_IDS.forEach((id) => {
    const isCurrent = id === stepId;
    screenMap[id].hidden = !isCurrent;
    screenMap[id].classList.toggle("is-hidden", !isCurrent);
  });
}

function goToStep(stepId) {
  state.currentStep = stepId;
  showStep(stepId);
  persistState();
}
function calculateResults(currentState) {
  const visibleIds = getVisibleQuestionIds(currentState);
  const sg2Hidden = !visibleIds.includes("SG2");

  // Hidden questions contribute zero so the overall score always stays on the same 20-point scale.
  const getScore = (id) => {
    if (id === "SG2" && sg2Hidden) {
      return 0;
    }
    const value = currentState.answers[id];
    return SCORE_VALUES.includes(value) ? Number.parseInt(value, 10) : 0;
  };

  const totalPoints = QUESTION_ORDER.reduce((sum, id) => sum + getScore(id), 0);
  const overallPct = Math.round((totalPoints / 20) * 100);
  const rating = getRating(overallPct);

  const buckets = BUCKETS.map((bucket) => {
    const points = bucket.questionIds.reduce((sum, id) => sum + getScore(id), 0);
    return {
      key: bucket.key,
      name: bucket.name,
      points,
      pct: Math.round((points / 4) * 100)
    };
  });

  const allBucketsStrong = buckets.every((bucket) => bucket.pct >= 80);
  const hidePainPoints = overallPct >= 90 || allBucketsStrong;

  const sortedForPain = [...buckets].sort((a, b) => {
    if (a.pct !== b.pct) {
      return a.pct - b.pct;
    }
    return PAIN_TIE_PRIORITY[a.name] - PAIN_TIE_PRIORITY[b.name];
  });

  const painPoints = hidePainPoints ? [] : sortedForPain.slice(0, 2).map((bucket) => bucket.name);
  const pain1OrNA = hidePainPoints ? "N/A (Strong)" : painPoints[0] || "N/A";
  const pain2OrNA = hidePainPoints ? "N/A (Strong)" : painPoints[1] || "N/A";

  const recommendationIds = selectRecommendationIds({
    buckets,
    interestedIn: currentState.info.interested_in
  });

  return {
    totalPoints,
    overallPct,
    rating,
    industryDisplay: getIndustryDisplay(currentState.info),
    buckets,
    hidePainPoints,
    painPoints,
    painPointsMessage: hidePainPoints ? STRONG_PAIN_POINTS_MESSAGE : "",
    pain1OrNA,
    pain2OrNA,
    recommendations: recommendationIds.map((id) => RECOMMENDATION_LIBRARY[id]).filter(Boolean),
    interestedCsv: currentState.info.interested_in.join(", ") || "-",
    monthlyOutput: currentState.info.monthly_output || "-",
    notesOrDash: formatNotes(currentState.info.notes)
  };
}

function getRating(overallPct) {
  if (overallPct <= 40) {
    return "High Risk";
  }
  if (overallPct <= 70) {
    return "Improving";
  }
  return "Strong";
}

function getIndustryDisplay(info) {
  if (info.industry === "Others" && info.industry_other.trim()) {
    return `Others - ${info.industry_other.trim()}`;
  }
  return info.industry;
}

function selectRecommendationIds({ buckets, interestedIn }) {
  const selected = [];

  // Start with the weakest buckets, then fill remaining slots from the next-lowest areas.
  const lowBucketNames = BUCKETS
    .map((bucket) => bucket.name)
    .filter((bucketName) => {
      const match = buckets.find((item) => item.name === bucketName);
      return Boolean(match && match.pct <= 50);
    });

  lowBucketNames.forEach((bucketName) => {
    const candidates = LOW_BUCKET_RECOMMENDATION_MAP[bucketName] || [];
    candidates.forEach((cardId) => {
      if (selected.length < 4 && !selected.includes(cardId)) {
        selected.push(cardId);
      }
    });
  });

  if (selected.length < 4) {
    const sortedBuckets = [...buckets].sort((a, b) => {
      if (a.pct !== b.pct) {
        return a.pct - b.pct;
      }
      return PAIN_TIE_PRIORITY[a.name] - PAIN_TIE_PRIORITY[b.name];
    });

    sortedBuckets.forEach((bucket) => {
      const candidates = LOW_BUCKET_RECOMMENDATION_MAP[bucket.name] || [];
      candidates.forEach((cardId) => {
        if (selected.length < 4 && !selected.includes(cardId)) {
          selected.push(cardId);
        }
      });
    });
  }

  if (selected.length < 4) {
    ALL_RECOMMENDATION_IDS.forEach((cardId) => {
      if (selected.length < 4 && !selected.includes(cardId)) {
        selected.push(cardId);
      }
    });
  }

  if (selected.length < 4) {
    // TODO: If recommendation rules/library change and still yield <4 cards, define business-approved fallback set.
  }

  return reorderByInterest(selected, interestedIn);
}

function reorderByInterest(cardIds, interestedIn) {
  if (interestedIn.includes("Not sure")) {
    return [...cardIds];
  }

  // Reorder the chosen cards so the user's declared interests appear first without changing the card count.
  const promoteOrder = [];

  if (interestedIn.includes("SmartKood (QR / loyalty / lucky draw)")) {
    promoteOrder.push("R7", "R8");
  }
  if (interestedIn.includes("Label / Sticker")) {
    promoteOrder.push("R9", "R10");
  }
  if (interestedIn.includes("Packaging")) {
    promoteOrder.push("R9", "R1");
  }

  const uniquePromote = promoteOrder.filter((id, index) => promoteOrder.indexOf(id) === index);
  const front = uniquePromote.filter((id) => cardIds.includes(id));
  const rest = cardIds.filter((id) => !front.includes(id));
  return [...front, ...rest];
}

function renderResults(results) {
  // The result header mirrors the saved state, while `results` carries all derived scoring data.
  els.resultCompany.textContent = state.info.company.trim();
  els.resultName.textContent = state.info.name.trim();
  els.resultRole.textContent = state.info.role;
  els.resultIndustry.textContent = results.industryDisplay;

  const styleMeta = RATING_STYLES[results.rating];
  const ratingColor = getComputedStyle(document.documentElement).getPropertyValue(styleMeta.colorVar).trim();

  els.overallPct.textContent = `${results.overallPct}%`;
  els.overallPct.style.color = ratingColor;
  els.overallRating.textContent = results.rating;
  els.overallRating.className = `rating-badge ${styleMeta.className}`;
  els.overallBarFill.style.width = `${clamp(results.overallPct, 0, 100)}%`;
  els.overallBarFill.style.backgroundColor = ratingColor;

  renderBucketRows(results.buckets);
  renderPainPoints(results);
  renderRecommendationCards(results.recommendations, ratingColor);
  updateWhatsappLink(results);
}
function renderBucketRows(buckets) {
  els.bucketRows.innerHTML = "";

  buckets.forEach((bucket) => {
    const row = document.createElement("div");
    row.className = "bucket-row";

    const head = document.createElement("div");
    head.className = "bucket-head";

    const label = document.createElement("span");
    label.className = "bucket-label";
    label.textContent = bucket.name;

    const pct = document.createElement("span");
    pct.textContent = `${bucket.pct}%`;

    head.appendChild(label);
    head.appendChild(pct);

    const track = document.createElement("div");
    track.className = "bucket-track";

    const fill = document.createElement("div");
    fill.className = "bucket-fill";
    fill.style.width = `${clamp(bucket.pct, 0, 100)}%`;
    fill.style.backgroundColor = getColorByPct(bucket.pct);

    track.appendChild(fill);
    row.appendChild(head);
    row.appendChild(track);
    els.bucketRows.appendChild(row);
  });
}

function renderPainPoints(results) {
  els.painPointsList.innerHTML = "";

  if (results.hidePainPoints) {
    els.painPointsList.classList.add("is-hidden");
    els.painPointsMessage.classList.remove("is-hidden");
    els.painPointsMessage.textContent = results.painPointsMessage;
    return;
  }

  els.painPointsList.classList.remove("is-hidden");
  els.painPointsMessage.classList.add("is-hidden");
  els.painPointsMessage.textContent = "";

  const bucketPctByName = results.buckets.reduce((acc, bucket) => {
    acc[bucket.name] = bucket.pct;
    return acc;
  }, {});

  results.painPoints.forEach((name) => {
    const li = document.createElement("li");

    const title = document.createElement("div");
    title.className = "pain-point-title";
    title.textContent = `${name} (${bucketPctByName[name]}%)`;

    const explanation = document.createElement("p");
    explanation.className = "pain-point-explanation";
    explanation.textContent = PAIN_POINT_EXPLANATIONS[name];

    const impact = document.createElement("p");
    impact.className = "pain-point-impact";
    impact.textContent = PAIN_POINT_IMPACTS[name];

    li.appendChild(title);
    li.appendChild(explanation);
    li.appendChild(impact);
    els.painPointsList.appendChild(li);
  });
}

function renderRecommendationCards(cards, accentColor) {
  els.recommendationsGrid.innerHTML = "";

  cards.forEach((card) => {
    const article = document.createElement("article");
    article.className = "recommendation-card";
    article.style.borderLeftColor = accentColor || "var(--warn-orange)";

    const category = document.createElement("span");
    category.className = "category-pill";
    category.textContent = card.category;

    const title = document.createElement("h4");
    title.textContent = card.title;

    const description = document.createElement("p");
    description.textContent = card.description;

    const list = document.createElement("ul");
    card.bullets.slice(0, 3).forEach((bullet) => {
      const li = document.createElement("li");
      li.textContent = bullet;
      list.appendChild(li);
    });

    article.appendChild(category);
    article.appendChild(title);
    article.appendChild(description);
    article.appendChild(list);
    els.recommendationsGrid.appendChild(article);
  });
}

function getColorByPct(pct) {
  if (pct <= 40) {
    return "var(--risk-red)";
  }
  if (pct <= 70) {
    return "var(--warn-orange)";
  }
  return "var(--good-green)";
}

function updateWhatsappLink(results) {
  const hasConfiguredNumber = /^\d{8,15}$/.test(WHATSAPP_NUMBER);

  els.waBtn.classList.toggle("is-disabled", !hasConfiguredNumber);
  els.waBtn.setAttribute("aria-disabled", String(!hasConfiguredNumber));

  if (!hasConfiguredNumber) {
    els.waBtn.removeAttribute("href");
    els.waBtn.tabIndex = -1;
    els.waBtn.title = "Replace WHATSAPP_NUMBER in app.js with your real WhatsApp number.";
    return;
  }

  const bucketPctByName = results.buckets.reduce((acc, bucket) => {
    acc[bucket.name] = bucket.pct;
    return acc;
  }, {});

  const lines = [
    "Packtica Audit Summary",
    `Company: ${state.info.company.trim()}`,
    `Name: ${state.info.name.trim()} (${state.info.role})`,
    `Email: ${state.info.email.trim()}`,
    `Phone: ${state.info.phone.trim()}`,
    `Industry: ${results.industryDisplay}`,
    `Interested in: ${results.interestedCsv}`,
    `Monthly output: ${results.monthlyOutput}`,
    `Notes: ${results.notesOrDash}`,
    "",
    `Overall score: ${results.overallPct}% (${results.rating})`,
    "Bucket scores:",
    `- Brand Protection: ${bucketPctByName["Brand Protection"]}%`,
    `- Traceability: ${bucketPctByName.Traceability}%`,
    `- Price & Distribution Control: ${bucketPctByName["Price & Distribution Control"]}%`,
    `- SmartKood Growth: ${bucketPctByName["SmartKood Growth"]}%`,
    `- Execution Reliability: ${bucketPctByName["Execution Reliability"]}%`,
    "",
    "Top pain points:",
    `1) ${results.pain1OrNA}`,
    `2) ${results.pain2OrNA}`
  ];

  const message = lines.join("\n");
  els.waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  els.waBtn.removeAttribute("tabindex");
  els.waBtn.title = "Open WhatsApp chat";
}

function formatNotes(notesValue) {
  if (!notesValue || !notesValue.trim()) {
    return "-";
  }

  return notesValue
    .replace(/\r\n/g, "\n")
    .replace(/\n[ \t]*\n+/g, "\n")
    .trim();
}

function handleRestart() {
  localStorage.removeItem(STORAGE_KEY);
  state = createDefaultState();
  touchedInfoFields.clear();
  hasTriedInfoNext = false;

  renderInfoForm();
  renderQuestionPages();
  goToStep("step1");
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
