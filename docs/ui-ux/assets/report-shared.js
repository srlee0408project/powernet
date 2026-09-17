/**
 * UX 보고서 공통: 플레이북 시점 전환 + 피드백 localStorage
 */
const UX_STORAGE_KEY = "meeting-agent-ux-v04";

function uxRefreshIcons() {
  if (window.lucide && typeof lucide.createIcons === "function") {
    lucide.createIcons({ attrs: { width: 20, height: 20, "stroke-width": 1.75 } });
  }
}

const LOADING = {
  captions: {
    p0: "T0 · 방금 「녹음 종료」를 누른 직후. 오디오 저장 → 전사 작업 등록.",
    p1: "약 30초~2분 · 전사 중. 필요하면 상단 「목록으로 이동」(처리는 계속).",
    p2: "약 2분 · 할 일과 제목이 준비되면 ④ 화면으로 자동 이동.",
    p3: "5분 이상 지연 · 메모·오디오는 바로, AI만 「다시 시도」."
  },
  urls: {
    p0: "https://app.example/processing/abc123",
    p1: "https://app.example/processing/abc123",
    p2: "https://app.example/meetings/abc123/summary",
    p3: "https://app.example/meetings/abc123/summary?ai=pending"
  },
  html: {
    p0: `<div class="web-shell"><aside class="web-sidebar collapsed"></aside><div class="web-main"><div class="web-topbar"><span>수요일 정기 회의</span><span class="status-pill processing">시작</span></div><div class="web-content narrow"><ul class="step-line"><li class="done"><i data-lucide="check-circle"></i> 녹음 저장</li><li class="now"><i data-lucide="loader-circle"></i> 대기열…</li><li><i data-lucide="circle"></i> 전사</li><li><i data-lucide="circle"></i> 할 일·제목</li></ul></div></div></div>`,
    p1: `<div class="web-shell"><aside class="web-sidebar collapsed"></aside><div class="web-main"><div class="web-topbar"><span>요약 생성 중</span><button type="button" class="btn btn-ghost btn-sm">목록으로 이동</button></div><div class="web-content narrow"><ul class="step-line"><li class="done"><i data-lucide="check-circle"></i> 저장</li><li class="now"><i data-lucide="loader-circle"></i> 전사 중…</li><li><i data-lucide="circle"></i> 할 일</li><li><i data-lucide="circle"></i> 제목</li></ul></div></div></div>`,
    p2: `<div class="web-shell"><aside class="web-sidebar collapsed"></aside><div class="web-main"><div class="web-content narrow"><input class="title-input" value="2026-09-10 (수) · 기능 A · 고객 이슈" readonly /><div class="tag">할 일</div><div class="todo-row"><input type="checkbox" disabled /><div>재현 로그 공유</div></div><div class="cols-2"><div class="panel ai"><div class="tag">AI 요약</div><div class="skeleton-line"></div><div class="skeleton-line" style="width:65%"></div></div><div class="panel"><div class="tag">내 메모</div><p class="user-note-text">2841 로그</p></div></div><p class="meta"><span class="status-pill ready">④ 자동 이동</span></p></div></div></div>`,
    p3: `<div class="web-shell"><aside class="web-sidebar collapsed"></aside><div class="web-main"><div class="web-content narrow"><input class="title-input" value="2026-09-10 (수) · 회의" readonly /><div class="panel"><div class="tag">내 메모</div>회의 중 적은 내용</div><button type="button" class="btn btn-secondary btn-sm"><i data-lucide="headphones"></i> 오디오</button><div class="panel ai" style="margin-top:12px"><p class="meta">AI 지연 · <span class="btn btn-ghost btn-sm">다시 시도</span></p></div></div></div></div>`
  }
};

const FILL = {
  captions: {
    f1: "1차 · 제목 + 할 일이 먼저 도착. AI 요약 칸은 비어 있거나 회색 막대(skeleton).",
    f2: "2차 · 안건별 요약·결정 줄이 채워짐. 「저장」 가능."
  },
  html: {
    f1: `<input class="title-input" value="2026-09-10 (수) · 기능 A · 고객 이슈" readonly /><div class="tag">할 일</div><div class="todo-row"><input type="checkbox" /><div>재현 로그 공유</div></div><div class="cols-2"><div class="panel ai"><div class="tag">AI</div><div class="skeleton-line"></div><div class="skeleton-line"></div></div><div class="panel"><div class="tag">내 메모</div>2841 로그</div></div>`,
    f2: `<input class="title-input" value="2026-09-10 (수) · 기능 A · 고객 이슈" readonly /><div class="tag">할 일</div><div class="todo-row"><input type="checkbox" /><div>재현 로그 공유</div></div><div class="cols-2"><div class="panel ai"><div class="ai-summary-preview"><h5>기능 A 일정</h5><ul><li>API 우선</li></ul><div class="decision-line">결정: 버그fix 우선</div><h5>고객 이슈 #2841</h5><ul><li>재현 로그</li></ul></div></div><div class="panel"><p class="user-note-text">2841 로그 받기</p></div></div><p style="text-align:right;margin-top:16px"><button type="button" class="btn btn-primary"><i data-lucide="check"></i> 저장</button></p>`
  }
};

function initLoadingPhaseDemo() {
  const view = document.getElementById("loading-view");
  const cap = document.getElementById("loading-caption");
  const url = document.getElementById("loading-url");
  if (!view) return;

  function show(phase) {
    view.innerHTML = LOADING.html[phase] || "";
    if (cap) cap.textContent = LOADING.captions[phase] || "";
    if (url) url.textContent = LOADING.urls[phase] || "";
    uxRefreshIcons();
  }

  document.querySelectorAll("[data-loading-phase]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-loading-phase]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      show(btn.dataset.loadingPhase);
    });
  });
  show("p0");
}

function initFillPhaseDemo() {
  const view = document.getElementById("fill-view");
  const cap = document.getElementById("fill-caption");
  if (!view) return;

  function show(phase) {
    view.innerHTML = FILL.html[phase] || "";
    if (cap) cap.textContent = FILL.captions[phase] || "";
    uxRefreshIcons();
  }

  document.querySelectorAll("[data-fill-phase]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-fill-phase]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      show(btn.dataset.fillPhase);
    });
  });
  show("f1");
}

function initFilterDemo() {
  const btn = document.getElementById("filter-demo-btn");
  const tbody = document.querySelector("#filter-demo-table tbody");
  if (!btn || !tbody) return;
  let on = false;
  btn.addEventListener("click", () => {
    on = !on;
    btn.classList.toggle("filter-active", on);
    btn.textContent = on ? "미완료 할 일만 · 켜짐" : "미완료 할 일만";
    tbody.querySelectorAll("tr").forEach((row) => {
      const n = parseInt(row.dataset.openTodos || "0", 10);
      row.style.display = on && n === 0 ? "none" : "";
    });
  });
}

function uxLoadFeedback() {
  try {
    return JSON.parse(localStorage.getItem(UX_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function uxSaveFeedback(key, value) {
  const state = uxLoadFeedback();
  if (!state.feedback) state.feedback = {};
  state.feedback[key] = value;
  localStorage.setItem(UX_STORAGE_KEY, JSON.stringify(state));
}

function initFeedbackFields() {
  const state = uxLoadFeedback();
  document.querySelectorAll("[data-feedback]").forEach((ta) => {
    const k = ta.dataset.feedback;
    if (state.feedback && state.feedback[k] != null) ta.value = state.feedback[k];
    ta.addEventListener("input", () => uxSaveFeedback(k, ta.value));
  });
}

async function uxExportFeedback() {
  const state = uxLoadFeedback();
  const lines = ["# UX 피드백", ""];
  Object.keys(state.feedback || {}).sort().forEach((k) => {
    lines.push(k + ": " + (state.feedback[k] || "").trim() || "(없음)");
  });
  const text = lines.join("\n");
  try {
    await navigator.clipboard.writeText(text);
    alert("피드백을 클립보드에 복사했습니다.");
  } catch {
    prompt("복사해 주세요:", text);
  }
}

function initSidebarScrollSpy() {
  const links = document.querySelectorAll(".report-sidebar nav a[href^='#']");
  if (!links.length) return;
  const sections = [...links].map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
        }
      });
    },
    { rootMargin: "-20% 0px -60% 0px" }
  );
  sections.forEach((s) => obs.observe(s));
}

document.addEventListener("DOMContentLoaded", () => {
  initLoadingPhaseDemo();
  initFillPhaseDemo();
  initFilterDemo();
  initFeedbackFields();
  initSidebarScrollSpy();
  const exportBtn = document.getElementById("ux-export-btn");
  if (exportBtn) exportBtn.addEventListener("click", uxExportFeedback);
  uxRefreshIcons();
});
