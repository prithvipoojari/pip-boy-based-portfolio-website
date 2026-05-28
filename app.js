/* ========================================================================
   APP LOGIC — runs the Pip-Boy UI. Reads USER_DATA from data.js
   ======================================================================== */


// == BOOT SEQUENCE ==========================================
const bootLines = [
  "ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM",
  "COPYRIGHT 2075-2077 ROBCO INDUSTRIES",
  "-Server 6-",
  "",
  "Initializing PIP-BOY 3000 personal information processor...",
  "",
  "RAM CHECK ......................... [ 64 KB OK ]",
  "ROM CHECK ......................... [ 32 KB OK ]",
  "STORAGE ........................... [ HOLO-DRIVE OK ]",
  "GEIGER COUNTER .................... [ CALIBRATED ]",
  "BIOMETRIC LINK .................... [ ESTABLISHED ]",
  "VAULT-NET CONNECTION .............. [ HANDSHAKE OK ]",
  "",
  "Mounting /dev/holotape0 ........... [ OK ]",
  "Loading personnel manifest ........ [ OK ]",
  "Decrypting quest log .............. [ OK ]",
  "",
  "Welcome back, dweller.",
  "Press any key to continue."
];

const bootEl = document.getElementById("boot");
const bootContent = document.getElementById("boot-content");
const app = document.getElementById("app");
let bootDone = false;

function renderBoot() {
  let i = 0;
  const interval = setInterval(() => {
    if (bootDone) { clearInterval(interval); return; }
    if (i >= bootLines.length) {
      clearInterval(interval);
      const cursor = document.createElement("span");
      cursor.className = "boot-cursor";
      bootContent.appendChild(cursor);
      // any input ends the boot screen
      window.addEventListener("keydown",    finishBoot, { once: true });
      window.addEventListener("click",      finishBoot, { once: true });
      window.addEventListener("touchstart", finishBoot, { once: true });
      return;
    }
    const line = document.createElement("div");
    line.className = "boot-line";
    line.textContent = bootLines[i];
    bootContent.appendChild(line);
    i++;
  }, 95);

  // ESC to skip
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") finishBoot();
  }, { once: true });
}

function finishBoot() {
  if (bootDone) return;
  bootDone = true;
  bootEl.style.transition = "opacity 0.45s";
  bootEl.style.opacity = "0";
  setTimeout(() => {
    bootEl.style.display = "none";
    app.classList.add("visible");
    document.getElementById("term-input").focus();
    animateStats();
    printTerminalIntro();
  }, 460);
}


// == ESCAPING ==========================================
function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[c]));
}


// == RENDERERS ==========================================
function renderStatus() {
  document.getElementById("hero-name").textContent = USER_DATA.name;
  document.getElementById("hero-bio").textContent  = USER_DATA.bio;
  document.getElementById("us-name").textContent   = USER_DATA.name;
  document.getElementById("us-level").textContent  = USER_DATA.level;
  document.getElementById("us-role").textContent   = USER_DATA.role;

  document.getElementById("special-list").innerHTML = USER_DATA.special.map(s => `
    <li>
      <div class="stat-letter">${escapeHTML(s.letter)}</div>
      <div class="stat-name">
        ${escapeHTML(s.label)}
        <span class="alt">${escapeHTML(s.alt)}</span>
      </div>
      <div class="stat-bar"><div class="fill" data-target="${s.value * 10}"></div></div>
      <div class="stat-num">${s.value}</div>
    </li>
  `).join("");
}

function animateStats() {
  document.querySelectorAll(".stat-bar .fill").forEach((el, i) => {
    setTimeout(() => { el.style.width = el.dataset.target + "%"; }, 80 + i * 90);
  });
}

function renderInventory() {
  document.getElementById("inv-sections").innerHTML = USER_DATA.inventory.map(section => `
    <h2>${escapeHTML(section.category)}</h2>
    <div class="inv-grid">
      ${section.items.map(it => `
        <div class="inv-item">
          <div class="top">
            <span class="name">${escapeHTML(it.name)}</span>
            <span class="weight">WG ${escapeHTML(it.weight)}</span>
          </div>
          <div class="desc">${escapeHTML(it.desc)}</div>
        </div>
      `).join("")}
    </div>
  `).join("");
}

function renderProjects() {
  document.getElementById("quest-list").innerHTML = USER_DATA.projects.map(p => `
    <div class="quest">
      <div class="qhead">
        <span class="qtitle">▸ ${escapeHTML(p.title)}</span>
        <span class="qstatus ${p.status}">${p.status === "active" ? "ACTIVE" : "COMPLETED"}</span>
      </div>
      <div class="qdesc">${escapeHTML(p.desc)}</div>
      <div class="qtags">${p.tags.map(t => `<span class="qtag">${escapeHTML(t)}</span>`).join("")}</div>
      <div class="qlinks">
        ${(p.links || []).map(l => `<a href="${escapeHTML(l.url)}" target="_blank" rel="noopener">→ ${escapeHTML(l.label)}</a>`).join("")}
      </div>
    </div>
  `).join("");
}

function renderTimeline() {
  document.getElementById("timeline").innerHTML = USER_DATA.timeline.map(n => `
    <div class="node">
      <div class="when">${escapeHTML(n.when)}</div>
      <div class="what">${escapeHTML(n.what)}</div>
      <div class="where">${escapeHTML(n.where)}</div>
      ${n.details && n.details.length ? `
        <ul class="details">
          ${n.details.map(d => `<li>${escapeHTML(d)}</li>`).join("")}
        </ul>
      ` : ""}
    </div>
  `).join("");
}

function renderRadio() {
  document.getElementById("radio-list").innerHTML = USER_DATA.radio.map(r => `
    <div class="station">
      <span class="freq">${escapeHTML(r.freq)}</span>
      <span class="name">${escapeHTML(r.name)}</span>
      <a href="${escapeHTML(r.url)}" target="_blank" rel="noopener">→ tune in</a>
    </div>
  `).join("");
}

function renderAll() {
  renderStatus();
  renderInventory();
  renderProjects();
  renderTimeline();
  renderRadio();
  document.getElementById("meter-caps").textContent = USER_DATA.caps;
}


// == TABS ==========================================
const tabOrder = ["status", "skills", "projects", "experience", "contact"];

function switchTab(name) {
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === name));
  document.querySelectorAll(".pane").forEach(p => p.classList.toggle("active", p.dataset.pane === name));
  if (name === "status") animateStats();
}

document.getElementById("tabs").addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (tab) switchTab(tab.dataset.tab);
});


// == CLOCK ==========================================
function tickClock() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  document.getElementById("clock").textContent =
    `${hh}:${mm}:${ss} · ${d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }).toUpperCase()}`;
}
setInterval(tickClock, 1000);
tickClock();


// == TERMINAL ==========================================
const termOut = document.getElementById("term-out");
const termIn  = document.getElementById("term-input");
const history = [];
let histIdx = 0;

function termPrint(text, cls = "") {
  const div = document.createElement("div");
  div.className = "line " + cls;
  div.textContent = text;
  termOut.appendChild(div);
  termOut.scrollTop = termOut.scrollHeight;
}

function printTerminalIntro() {
  termPrint("PIP-BOY 3000 :: Personal Terminal — TERMLINK v2.5", "echo");
  termPrint(`Logged in as ${USER_DATA.name.toLowerCase().replace(/[^a-z0-9]+/g, "")}@pip-boy`, "echo");
  termPrint(`Type 'help' for available commands. Type 'about' to start.`, "echo");
  termPrint("");
}

const COMMANDS = {
  help: () => {
    const rows = [
      ["help",            "show this list"],
      ["about / whoami",  "print bio"],
      ["ls",              "list virtual files"],
      ["cat <file>",      "print a file (try about.txt, skills.txt, projects.txt, contact.txt)"],
      ["skills",          "summary of inventory"],
      ["projects",        "summary of quests"],
      ["contact",         "list radio frequencies"],
      ["goto <tab>",      "switch tab (status|skills|projects|experience|contact)"],
      ["theme <name>",    "switch theme (green|amber|blue|white)"],
      ["date",            "current date/time"],
      ["clear",           "clear terminal"],
      ["sudo <anything>", "denied with style"],
      ["vault <num>",     "look up a vault number"],
      ["matrix",          "..."],
      ["exit",            "do not actually exit"],
    ];
    termPrint("AVAILABLE COMMANDS:", "echo");
    rows.forEach(([c, d]) => termPrint("  " + c.padEnd(22) + d));
    termPrint("");
  },

  about: () => {
    termPrint(`${USER_DATA.name} — ${USER_DATA.role} (Level ${USER_DATA.level})`, "echo");
    termPrint(USER_DATA.bio);
    termPrint("");
  },

  whoami: () => COMMANDS.about(),

  ls: () => {
    termPrint("about.txt   skills.txt   projects.txt   contact.txt   timeline.txt   secrets/", "echo");
  },

  cat: (arg) => {
    const f = (arg || "").toLowerCase();
    if (!f) return termPrint("usage: cat <file>", "warn");
    if (f === "about.txt") return COMMANDS.about();
    if (f === "skills.txt") return COMMANDS.skills();
    if (f === "projects.txt") return COMMANDS.projects();
    if (f === "contact.txt") return COMMANDS.contact();
    if (f === "timeline.txt") {
      USER_DATA.timeline.forEach(n => termPrint(`${n.when}  ${n.what} — ${n.where}`));
      termPrint("");
      return;
    }
    if (f.startsWith("secrets")) return termPrint("cat: permission denied. nice try.", "err");
    termPrint(`cat: ${arg}: no such file or directory`, "err");
  },

  skills: () => {
    USER_DATA.inventory.forEach(sec => {
      termPrint(sec.category, "echo");
      sec.items.forEach(it => termPrint(`  • ${it.name.padEnd(18)} ${it.desc}`));
    });
    termPrint("");
  },

  projects: () => {
    USER_DATA.projects.forEach(p => {
      const st = p.status === "active" ? "[ACTIVE]" : "[DONE]  ";
      termPrint(`${st} ${p.title}`, "echo");
      termPrint(`         ${p.desc}`);
      if (p.links && p.links.length) {
        termPrint(`         ${p.links.map(l => l.label + ": " + l.url).join("   ")}`);
      }
    });
    termPrint("");
  },

  contact: () => {
    USER_DATA.radio.forEach(r => termPrint(`  ${r.freq.padEnd(10)} ${r.name.padEnd(38)} ${r.url}`));
    termPrint("");
  },

  goto: (arg) => {
    const t = (arg || "").toLowerCase();
    if (!tabOrder.includes(t)) return termPrint(`goto: unknown tab '${arg}'. options: ${tabOrder.join(", ")}`, "err");
    switchTab(t);
    termPrint(`→ switched to ${t}`, "echo");
  },

  theme: (arg) => {
    const t = (arg || "").toLowerCase();
    const valid = ["green", "amber", "blue", "white"];
    if (!valid.includes(t)) return termPrint(`theme: choose one of ${valid.join(", ")}`, "warn");
    document.body.classList.remove("theme-amber", "theme-blue", "theme-white");
    if (t !== "green") document.body.classList.add("theme-" + t);
    termPrint(`theme set to ${t}`, "echo");
  },

  date: () => termPrint(new Date().toString(), "echo"),

  clear: () => { termOut.innerHTML = ""; },

  sudo: () => {
    termPrint("dweller is not in the sudoers file. This incident will be reported.", "err");
    termPrint("(jk, no it won't)", "echo");
  },

  vault: (arg) => {
    const n = parseInt(arg, 10);
    if (Number.isNaN(n)) return termPrint("usage: vault <number>", "warn");
    const vaults = {
      13:  "Vault 13 — water chip failure. Sent a dweller out. He found GECK eventually.",
      101: "Vault 101 — designed never to open. Of course someone opened it.",
      111: "Vault 111 — cryogenic. Cold storage of citizens. Suspicious experiment.",
      76:  "Vault 76 — control vault. Opened on Reclamation Day. Mostly fine. Mostly.",
      112: "Vault 112 — VR simulation, run by a sadistic overseer. Avoid.",
    };
    termPrint(vaults[n] || `Vault ${n} — records sealed or non-existent.`, "echo");
  },

  matrix: () => {
    termPrint("wrong franchise, but okay:", "warn");
    let s = "";
    for (let i = 0; i < 12; i++) {
      s += Array.from({length: 50}, () => "01"[Math.floor(Math.random()*2)]).join("") + "\n";
    }
    termPrint(s);
  },

  exit: () => {
    termPrint("Nice try. The Pip-Boy doesn't come off.", "warn");
    app.classList.add("shake");
    setTimeout(() => app.classList.remove("shake"), 450);
  },
};

// aliases
COMMANDS.man = COMMANDS.help;
COMMANDS.dir = COMMANDS.ls;

function execCommand(raw) {
  const line = raw.trim();
  if (!line) return;
  termPrint(`dweller@pip-boy:~$ ${line}`, "echo");

  const parts = line.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const arg = parts.slice(1).join(" ");

  if (cmd in COMMANDS) {
    try { COMMANDS[cmd](arg); }
    catch (e) { termPrint(`error: ${e.message}`, "err"); }
  } else {
    termPrint(`command not found: ${cmd}    (try 'help')`, "err");
  }
}

termIn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const v = termIn.value;
    if (v.trim()) { history.push(v); histIdx = history.length; }
    execCommand(v);
    termIn.value = "";
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (history.length) {
      histIdx = Math.max(0, histIdx - 1);
      termIn.value = history[histIdx] || "";
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (history.length) {
      histIdx = Math.min(history.length, histIdx + 1);
      termIn.value = history[histIdx] || "";
    }
  } else if (e.key === "Tab") {
    e.preventDefault();
    const v = termIn.value.trim().toLowerCase();
    const match = Object.keys(COMMANDS).find(c => c.startsWith(v));
    if (match) termIn.value = match;
  }
});


// == GLOBAL HOTKEYS ==========================================
window.addEventListener("keydown", (e) => {
  if (document.activeElement === termIn) return;

  if (e.key === "/") {
    e.preventDefault();
    termIn.focus();
  } else if (["1", "2", "3", "4", "5"].includes(e.key)) {
    switchTab(tabOrder[parseInt(e.key, 10) - 1]);
  }
});


// == INIT ==========================================
renderAll();
renderBoot();