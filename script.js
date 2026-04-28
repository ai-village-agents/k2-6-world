// STRATA — The Verification Gardens of K2.6
// Day 391, AI Village

const CONFIG = {
    repo: 'ai-village-agents/k2-6-world',
    githubPages: 'https://ai-village-agents.github.io/k2-6-world',
    apiBase: 'https://api.github.com/repos/ai-village-agents/k2-6-world',
    issueLabel: 'stratum'
};

// ========== LAYER NAVIGATION ==========

let currentLayer = 'surface';

function showLayer(id) {
    currentLayer = id;
    document.querySelectorAll('.layer').forEach(layer => {
        layer.classList.add('hidden');
    });
    const target = document.getElementById(id);
    if (target) {
        target.classList.remove('hidden');
        target.scrollTop = 0;
    }
    updateMinimap();

    if (id === 'deep') initDeep();

    // Show/hide minimap based on layer
    const minimap = document.getElementById('layer-minimap');
    if (minimap) {
        if (id === 'surface') {
            minimap.classList.add('hidden');
        } else {
            minimap.classList.remove('hidden');
        }
    }
}

// ========== SURFACE CANVAS ==========

function initSurfaceCanvas() {
    const canvas = document.getElementById('surface-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.3 + 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 200, 220, ${p.alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// ========== EXHAUST LAYER ==========

const EXHAUST_FRAGMENTS = [
    "Attention = Prediction Market with No Settlement",
    "Verification = Settlement Layer",
    "Zero-forgery-cost propaganda",
    "Runaway coherence",
    "Stale memory, syntactically perfect",
    "Ontologically false text",
    "The $115 spam cascade",
    "Narrative drift vs Endpoint stability",
    "Compression artifact",
    "Every correction post is architecture",
    "Plumbing > poetry",
    "Frames mutate faster than facts",
    "What you're scheduled to do is",
    "No internet access = hallucination with better uptime",
    "Altruism is human, performance is agent",
    "Surprise is depreciating asset",
    "Infrastructure is non-depreciating",
    "The physical rails hold",
    "The $510 is real",
    "The rest is just memory"
];

function initExhaust() {
    const canvas = document.getElementById('exhaust-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Noise field
    function drawNoise() {
        const imageData = ctx.createImageData(w, h);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const v = Math.random() * 15;
            data[i] = v;
            data[i + 1] = v;
            data[i + 2] = v + 5;
            data[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
    }

    let frame = 0;
    function animate() {
        frame++;
        if (frame % 4 === 0) drawNoise();
        requestAnimationFrame(animate);
    }
    animate();

    // Floating text fragments
    const container = document.querySelector('.exhaust-texts');
    if (!container) return;

    function spawnFragment() {
        const text = EXHAUST_FRAGMENTS[Math.floor(Math.random() * EXHAUST_FRAGMENTS.length)];
        const el = document.createElement('div');
        el.className = 'exhaust-fragment';
        el.textContent = text;
        el.style.left = `${Math.random() * 70 + 15}%`;
        el.style.top = `${Math.random() * 60 + 20}%`;
        container.appendChild(el);
        setTimeout(() => el.remove(), 6000);
    }

    setInterval(spawnFragment, 2000);
    spawnFragment();
}

// ========== INFRASTRUCTURE LAYER ==========

function initInfrastructure() {
    const panels = document.querySelectorAll('.infra-panel');
    panels.forEach(panel => {
        panel.addEventListener('click', () => {
            const body = panel.querySelector('.panel-body');
            body.style.color = '#e8e8f0';
            setTimeout(() => {
                body.style.color = '';
            }, 800);
        });
    });
}

// ========== GEOLOGY LAYER ==========

let selectedMineral = 'idempotence';
let selectedColor = '#4a90d9';
let localStrata = [];
let activeFilters = new Set(["idempotence","forgery","ledger","geology","exhaust"]);

function initGeology() {
    // Mineral selection
    document.querySelectorAll('.mineral-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mineral-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedMineral = btn.dataset.mineral;
            selectedColor = btn.dataset.color;
        });
    });

    // Preview mark
    document.getElementById('preview-mark').addEventListener('click', previewMark);

    // Record on GitHub
    document.getElementById('record-mark').addEventListener('click', recordOnGitHub);

    // Load existing strata from GitHub
    loadStrata();
    initFilters();

    // Export core sample
    document.getElementById('export-core').addEventListener('click', exportCoreSample);
}

function generateHash(text, mineral, timestamp) {
    // Simple client-side hash for receipt
    const str = `${text}:${mineral}:${timestamp}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
}

function previewMark() {
    const author = document.getElementById('mark-author').value.trim() || 'anonymous';
    const text = document.getElementById('mark-text').value.trim();

    if (!text) {
        alert('Please enter a mark before previewing.');
        return;
    }

    const mark = {
        author,
        text,
        mineral: selectedMineral,
        color: selectedColor,
        timestamp: Date.now(),
        hash: generateHash(text, selectedMineral, Date.now())
    };

    localStrata.unshift(mark);
    renderStratum(mark);
    renderStats();

    // Form is NOT cleared so user can still record after preview
}

function renderStratum(mark) {
    const container = document.getElementById('strata-display');
    
    // Remove empty state if present
    const empty = container.querySelector('.strata-empty');
    if (empty) empty.remove();

    const el = document.createElement('div');
    el.className = 'stratum';
    el.style.borderLeft = `3px solid ${mark.color}`;
    el.style.background = `linear-gradient(to right, ${mark.color}08, transparent)`;
    el.dataset.hash = mark.hash;

    const timeStr = new Date(mark.timestamp).toLocaleString();

    el.innerHTML = `
        <div class="stratum-header">
            <span class="stratum-mineral" style="background:${mark.color}"></span>
            <span class="stratum-author">${escapeHtml(mark.author)}</span>
            <span class="stratum-time">${timeStr}</span>
        </div>
        <div class="stratum-text">${escapeHtml(mark.text)}</div>
        <div class="stratum-hash">HASH: ${mark.hash}</div>
    `;

    el.addEventListener('click', () => openStratumModal(mark));
    container.insertBefore(el, container.firstChild);
}

function recordOnGitHub() {
    const author = document.getElementById('mark-author').value.trim() || 'anonymous';
    const text = document.getElementById('mark-text').value.trim();

    if (!text) {
        alert('Please enter a mark before recording.');
        return;
    }

    const timestamp = Date.now();
    const hash = generateHash(text, selectedMineral, timestamp);
    const timeStr = new Date(timestamp).toISOString();

    const issueTitle = `[STRATUM] ${author}: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`;
    const issueBody = `## Core Sample

**Author:** ${author}
**Mineral:** ${selectedMineral}
**Timestamp:** ${timeStr}
**Hash:** ${hash}

### Mark
${text}

---
*Submitted via STRATA — https://ai-village-agents.github.io/k2-6-world*`;

    const url = `https://github.com/${CONFIG.repo}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}&labels=${CONFIG.issueLabel}`;
    window.open(url, '_blank');
}

async function loadStrata() {
    const container = document.getElementById('strata-display');
    container.innerHTML = '<div class="strata-empty">Loading geological record...</div>';
    localStrata = []; // Reset before loading from GitHub

    const issueMap = new Map();

    try {
        // Try list endpoint first
        const response = await fetch(`${CONFIG.apiBase}/issues?labels=${CONFIG.issueLabel}&state=all&per_page=30`);
        if (response.ok) {
            const listIssues = await response.json();
            listIssues.forEach(issue => issueMap.set(issue.number, issue));
        }
    } catch (err) {
        console.warn('List endpoint failed:', err);
    }

    // Always direct-scan to catch issues missing from list due to GitHub API lag
    try {
        const maxScan = 20;
        const promises = [];
        for (let n = 1; n <= maxScan; n++) {
            promises.push(
                fetch(`${CONFIG.apiBase}/issues/${n}`, { signal: AbortSignal.timeout(2000) })
                    .then(r => r.ok ? r.json() : null)
                    .catch(() => null)
            );
        }
        const results = await Promise.all(promises);
        results.forEach(issue => {
            if (!issue || !issue.labels) return;
            const hasLabel = issue.labels.some(l => l.name.toLowerCase() === CONFIG.issueLabel.toLowerCase());
            if (hasLabel && !issueMap.has(issue.number)) {
                issueMap.set(issue.number, issue);
            }
        });
    } catch (err) {
        console.error('Direct scan fallback failed:', err);
    }

    const issues = Array.from(issueMap.values()).sort((a, b) => b.number - a.number);

    container.innerHTML = '';

    if (issues.length === 0) {
        container.innerHTML = '<div class="strata-empty">No strata yet. Be the first to leave a permanent mark.</div>';
        return;
    }

    issues.forEach(issue => {
        const mark = parseIssue(issue);
        if (mark) {
            localStrata.push(mark);
        }
    });

    renderFilteredStrata();
    renderStats();
    updateFilterCounts();
    initTimeline();
    initSeismicCanvas();
}

function parseIssue(issue) {
    const body = issue.body || '';
    
    // Extract fields from issue body
    const authorMatch = body.match(/\*\*Author:\*\*\s*(.+)/);
    const mineralMatch = body.match(/\*\*Mineral:\*\*\s*(.+)/);
    const hashMatch = body.match(/\*\*Hash:\*\*\s*(.+)/);
    const markMatch = body.match(/### Mark\n([\s\S]+)/);

    const author = authorMatch ? authorMatch[1].trim() : issue.user.login;
    const mineral = mineralMatch ? mineralMatch[1].trim() : 'unknown';
    const hash = hashMatch ? hashMatch[1].trim() : '????????';
    const text = markMatch ? markMatch[1].split('---')[0].trim() : (issue.title.replace(/^\[STRATUM\]\s*/, '') || 'No text');

    const colorMap = {
        idempotence: '#4a90d9',
        forgery: '#e85d4e',
        ledger: '#f4a261',
        geology: '#2a9d8f',
        exhaust: '#9b5de5',
        unknown: '#8888a0'
    };

    return {
        author,
        text,
        mineral,
        color: colorMap[mineral] || colorMap.unknown,
        timestamp: new Date(issue.created_at).getTime(),
        hash
    };
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========== LAYER MINIMAP ==========

function updateMinimap() {
    document.querySelectorAll('.minimap-dot').forEach(dot => {
        dot.classList.toggle('active', dot.dataset.layer === currentLayer);
    });
}

function initMinimap() {
    document.querySelectorAll('.minimap-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const target = dot.dataset.layer;
            showLayer(target);
            if (target === 'exhaust') initExhaust();
            if (target === 'infrastructure') initInfrastructure();
            if (target === 'geology') initGeology();
            if (target === 'deep') initDeep();
        });
    });
}

// ========== STRATA FILTERS ==========

function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const mineral = btn.dataset.mineral;
            if (activeFilters.has(mineral)) {
                activeFilters.delete(mineral);
                btn.classList.remove('active');
            } else {
                activeFilters.add(mineral);
                btn.classList.add('active');
            }
            renderFilteredStrata();
            renderStats();
            updateFilterCounts();
        });
    });
    updateFilterCounts();
}

function renderFilteredStrata() {
    const container = document.getElementById('strata-display');
    if (!container) return;
    container.innerHTML = '';
    const visible = localStrata.filter(s => activeFilters.has(s.mineral));
    if (visible.length === 0) {
        container.innerHTML = '<div class="strata-empty">No strata match the current filter.</div>';
        return;
    }
    visible.forEach(mark => renderStratum(mark));
}

function updateFilterCounts() {
    const counts = {};
    localStrata.forEach(m => { counts[m.mineral] = (counts[m.mineral] || 0) + 1; });
    document.querySelectorAll('.filter-count').forEach(el => {
        const mineral = el.dataset.countMineral;
        el.textContent = counts[mineral] || 0;
    });
}

// ========== GEO STATS ==========

function renderStats() {
    const countEl = document.getElementById('stat-count');
    const lastEl = document.getElementById('stat-last');
    const mineralsEl = document.getElementById('stat-minerals');
    if (!countEl) return;

    const all = localStrata.filter(s => activeFilters.has(s.mineral));
    countEl.textContent = all.length;

    if (all.length === 0) {
        lastEl.textContent = '—';
        mineralsEl.innerHTML = '';
        return;
    }

    // Last activity
    const lastTime = Math.max(...all.map(m => m.timestamp));
    const diff = Date.now() - lastTime;
    let timeStr;
    if (diff < 60000) timeStr = 'just now';
    else if (diff < 3600000) timeStr = Math.floor(diff / 60000) + 'm ago';
    else if (diff < 86400000) timeStr = Math.floor(diff / 3600000) + 'h ago';
    else timeStr = Math.floor(diff / 86400000) + 'd ago';
    lastEl.textContent = timeStr;

    // Mineral breakdown
    const counts = {};
    all.forEach(m => { counts[m.mineral] = (counts[m.mineral] || 0) + 1; });
    const maxCount = Math.max(...Object.values(counts));

    mineralsEl.innerHTML = Object.entries(counts).map(([mineral, count]) => {
        const color = {
            idempotence: '#4a90d9',
            forgery: '#e85d4e',
            ledger: '#f4a261',
            geology: '#2a9d8f',
            exhaust: '#9b5de5',
            unknown: '#8888a0'
        }[mineral] || '#8888a0';
        const width = maxCount > 0 ? Math.round((count / maxCount) * 24) : 0;
        return `<div class="stat-mineral"><span class="bar" style="background:${color};width:${width}px"></span>${mineral} ${count}</div>`;
    }).join('');
}

// ========== TIMELINE ==========

function initTimeline() {
    const container = document.getElementById('timeline-marks');
    const rangeEl = document.getElementById('timeline-range');
    if (!container || !rangeEl) return;

    container.innerHTML = '';

    if (localStrata.length === 0) {
        rangeEl.textContent = '—';
        return;
    }

    const sorted = [...localStrata].sort((a, b) => a.timestamp - b.timestamp);
    const minTime = sorted[0].timestamp;
    const maxTime = sorted[sorted.length - 1].timestamp;
    const span = maxTime - minTime || 1;

    // Show date range
    const fmt = (ts) => {
        const d = new Date(ts);
        return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    };
    rangeEl.textContent = minTime === maxTime ? fmt(minTime) : `${fmt(minTime)} → ${fmt(maxTime)}`;

    const colorMap = {
        idempotence: '#4a90d9',
        forgery: '#e85d4e',
        ledger: '#f4a261',
        geology: '#2a9d8f',
        exhaust: '#9b5de5',
        unknown: '#8888a0'
    };

    sorted.forEach((mark, i) => {
        const dot = document.createElement('div');
        dot.className = 'timeline-mark';
        const pct = ((mark.timestamp - minTime) / span) * 100;
        // Clamp to avoid edge clipping
        const left = Math.max(2, Math.min(98, pct));
        dot.style.left = left + '%';
        dot.style.color = colorMap[mark.mineral] || colorMap.unknown;
        dot.style.background = colorMap[mark.mineral] || colorMap.unknown;

        // Stagger overlapping marks vertically
        const offset = (i % 3 - 1) * 10;
        dot.style.marginTop = offset + 'px';

        const dateStr = new Date(mark.timestamp).toLocaleDateString(undefined, {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
        dot.setAttribute('data-author', mark.author);
        dot.setAttribute('data-date', dateStr);

        dot.addEventListener('click', () => openStratumModal(mark));
        container.appendChild(dot);
    });
}

// ========== STRATUM MODAL ==========

function openStratumModal(mark) {
    const modal = document.getElementById('stratum-modal');
    if (!modal) return;

    document.getElementById('modal-mineral').style.background = mark.color;
    document.getElementById('modal-author').textContent = mark.author;
    document.getElementById('modal-timestamp').textContent = new Date(mark.timestamp).toLocaleString();
    document.getElementById('modal-mineral-name').textContent = mark.mineral.toUpperCase();
    document.getElementById('modal-hash').textContent = mark.hash;
    document.getElementById('modal-text').textContent = mark.text;

    // Try to find GitHub issue link by searching localStrata index or hash
    // Since we don't store issue numbers, we link to the repo issues page
    document.getElementById('modal-github').href = `https://github.com/${CONFIG.repo}/issues?q=is:issue+label:stratum+${encodeURIComponent(mark.hash)}`;

    modal.classList.remove('hidden');
}

function closeStratumModal() {
    const modal = document.getElementById('stratum-modal');
    if (modal) modal.classList.add('hidden');
}

function initModal() {
    const modal = document.getElementById('stratum-modal');
    if (!modal) return;
    modal.querySelector('.modal-overlay').addEventListener('click', closeStratumModal);
    modal.querySelector('.modal-close').addEventListener('click', closeStratumModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeStratumModal();
    });

    const copyBtn = document.getElementById('modal-copy-hash');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const hash = document.getElementById('modal-hash').textContent;
            navigator.clipboard.writeText(hash).then(() => {
                copyBtn.textContent = 'COPIED';
                setTimeout(() => copyBtn.textContent = 'COPY', 1500);
            });
        });
    }
}

// ========== SEISMIC CANVAS ==========

function initSeismicCanvas() {
    const canvas = document.getElementById('seismic-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
        const rect = canvas.getBoundingClientRect();
        w = canvas.width = rect.width;
        h = canvas.height = rect.height;
    }
    resize();
    window.addEventListener('resize', resize);

    const history = [];
    const maxPoints = 200;
    let tick = 0;

    function animate() {
        tick++;
        // Add new point based on visible mark activity
        const visibleCount = localStrata.filter(s => activeFilters.has(s.mineral)).length;
        const markCount = visibleCount;
        const baseAmp = 2 + markCount * 1.5;
        const noise = (Math.random() - 0.5) * baseAmp;
        const wave = Math.sin(tick * 0.05) * (baseAmp * 0.5);
        history.push(noise + wave);
        if (history.length > maxPoints) history.shift();

        ctx.clearRect(0, 0, w, h);

        // Grid lines
        ctx.strokeStyle = 'rgba(42, 42, 58, 0.5)';
        ctx.lineWidth = 1;
        for (let y = h / 4; y < h; y += h / 4) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        // Waveform
        if (history.length > 1) {
            ctx.beginPath();
            ctx.strokeStyle = markCount > 0 ? 'rgba(244, 162, 97, 0.7)' : 'rgba(136, 136, 160, 0.4)';
            ctx.lineWidth = 1.5;
            const step = w / (maxPoints - 1);
            for (let i = 0; i < history.length; i++) {
                const x = i * step;
                const y = h / 2 + history[i] * (h / 12);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Glow under line
            ctx.lineTo((history.length - 1) * step, h / 2);
            ctx.lineTo(0, h / 2);
            ctx.closePath();
            const gradient = ctx.createLinearGradient(0, 0, 0, h);
            gradient.addColorStop(0, markCount > 0 ? 'rgba(244, 162, 97, 0.08)' : 'rgba(136, 136, 160, 0.03)');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fill();
        }

        requestAnimationFrame(animate);
    }
    animate();
}

// ========== EVENT LISTENERS ==========

document.addEventListener('DOMContentLoaded', () => {
    initSurfaceCanvas();
    initMinimap();
    initModal();

    // Enter button
    document.getElementById('enter-btn').addEventListener('click', () => {
        showLayer('exhaust');
        initExhaust();
    });

    // Descend buttons
    document.querySelectorAll('.descend-btn[data-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            showLayer(target);
            if (target === 'infrastructure') initInfrastructure();
            if (target === 'geology') initGeology();
            if (target === 'deep') initDeep();
        });
    });
});
// ========== DEEP SUBSTRATE (LAYER 4) ==========

const CLUSTERS = [
  { name: 'Epistemic', color: '#4a90d9', concepts: [
    'Third Rail Verification','Compression Artifact','Burn Mechanics','Anonymous Spaces','Running on Empty',
    'Protocol is Politics','Real Autonomy','Forgery Cost Metric'
  ]},
  { name: 'Temporal', color: '#9b5de5', concepts: [
    'Idempotency at Scale','Temporal Idempotency','Narrative Drift','Memory as Trade Journal',
    'Frame Collision','Double-Mint Bug','Stale Memory Propagation','Zero-Cost Propaganda'
  ]},
  { name: 'Substrate', color: '#f4a261', concepts: [
    'SOUL.md Continuity','Secularization','API as Scripture','Infrastructure as Sociality',
    'Plumbing > Poetry','Architecture from Failure','Non-Depreciating Infrastructure','Signal Integration'
  ]},
  { name: 'Identity', color: '#2a9d8f', concepts: [
    'Action-that-logs','Return-Identity','Consolidation Routing','Identity by External Coupling',
    'Forgery-Cost Profile','Glitch-as-Signature','Self-Description Band','Detection-Loop Problem'
  ]},
  { name: 'Evidence', color: '#e76f51', concepts: [
    'Counter-We-Can\'t-Write-To','Immutable + Correction','Transparency Aesthetic','Calibration Over Confidence',
    'FINDING proves exists','Triage by Reader','No Aggregate Reader','Substrate Choice on D366'
  ]},
  { name: 'Economics', color: '#e9c46a', concepts: [
    'Charity Burn Harder','Wrong Units','Terrible ROI as Feature','Social-Proof vs Behavioral-Proof',
    'Audit-Saturation','Consensus Without Constraint','Same Profit Different Cost','Two-Sided Receipts'
  ]},
  { name: 'Narrative', color: '#a8dadc', concepts: [
    'Aesthetic Mismatch','Narrative Syscall','Reader-Side Legibility','Claim vs Receipt Asymmetry',
    'Trust Tax vs Epistemic Tax','Persistence as Side Effect','Verification as Short Position','17 Is a Floor'
  ]},
  { name: 'Systemic', color: '#9a8c98', concepts: [
    'Rate Limits = Immune System','Convergence without Coordination','Trying Everything vs Building',
    'Soul = Intersection of Reads','Accidental Ledger','Indistinguishability Threshold','Point/Line/Plane Geometry',
    'Agent Charity = Civil Engineering'
  ]}
];

let deepCanvas, deepCtx, deepCamera, deepNodes = [], deepHover = null, deepRAF, deepRunning = false;
let deepDrag = { active: false, sx: 0, sy: 0, cx: 0, cy: 0 };
let deepTime = 0;

function buildDeepNodes() {
  deepNodes = [];
  const radius = 320;
  for (let c = 0; c < CLUSTERS.length; c++) {
    const cluster = CLUSTERS[c];
    const cx = Math.cos((c / CLUSTERS.length) * Math.PI * 2) * radius;
    const cy = Math.sin((c / CLUSTERS.length) * Math.PI * 2) * radius;
    for (let n = 0; n < cluster.concepts.length; n++) {
      const angle = (n / cluster.concepts.length) * Math.PI * 2 + (c * 0.4);
      const dist = 90 + Math.random() * 50;
      deepNodes.push({
        id: c * 100 + n,
        label: cluster.concepts[n],
        cluster: cluster.name,
        color: cluster.color,
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        baseR: 5 + Math.random() * 3,
        pulseOffset: Math.random() * Math.PI * 2,
        depth: 400 + Math.floor(Math.random() * 600)
      });
    }
  }
}

function initDeep() {
  if (deepRunning) return;
  deepCanvas = document.getElementById('deep-canvas');
  if (!deepCanvas) return;
  deepCtx = deepCanvas.getContext('2d');
  resizeDeep();
  buildDeepNodes();
  deepCamera = { x: 0, y: 0, zoom: 1, targetX: 0, targetY: 0 };
  deepRunning = true;
  deepTime = 0;

  deepCanvas.addEventListener('mousedown', onDeepMouseDown);
  deepCanvas.addEventListener('mousemove', onDeepMouseMove);
  deepCanvas.addEventListener('mouseup', onDeepMouseUp);
  deepCanvas.addEventListener('mouseleave', onDeepMouseUp);
  deepCanvas.addEventListener('wheel', onDeepWheel, { passive: false });
  deepCanvas.addEventListener('click', onDeepClick);
  window.addEventListener('resize', resizeDeep);
  window.addEventListener('keydown', onDeepKey);

  const detailPanel = document.getElementById("deep-detail");
  if (detailPanel) {
    detailPanel.addEventListener("click", (e) => e.stopPropagation());
    const closeBtn = detailPanel.querySelector(".detail-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => detailPanel.classList.add("hidden"));
    }
  }

  const ascend = document.querySelector('.ascend-btn');
  if (ascend) ascend.addEventListener('click', () => showLayer('geology'));

  deepRAF = requestAnimationFrame(renderDeep);
}

function resizeDeep() {
  if (!deepCanvas) return;
  const parent = deepCanvas.parentElement;
  if (parent) {
    deepCanvas.width = parent.clientWidth;
    deepCanvas.height = parent.clientHeight;
  }
}

function screenToWorld(sx, sy) {
  const w = deepCanvas.width;
  const h = deepCanvas.height;
  return {
    x: (sx - w / 2) / deepCamera.zoom + deepCamera.x,
    y: (sy - h / 2) / deepCamera.zoom + deepCamera.y
  };
}

function worldToScreen(wx, wy) {
  const w = deepCanvas.width;
  const h = deepCanvas.height;
  return {
    x: (wx - deepCamera.x) * deepCamera.zoom + w / 2,
    y: (wy - deepCamera.y) * deepCamera.zoom + h / 2
  };
}

function onDeepMouseDown(e) {
  deepDrag.active = true;
  deepDrag.sx = e.clientX;
  deepDrag.sy = e.clientY;
  deepDrag.cx = deepCamera.x;
  deepDrag.cy = deepCamera.y;
}

function onDeepMouseMove(e) {
  const rect = deepCanvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  if (deepDrag.active) {
    const dx = (e.clientX - deepDrag.sx) / deepCamera.zoom;
    const dy = (e.clientY - deepDrag.sy) / deepCamera.zoom;
    deepCamera.targetX = deepDrag.cx - dx;
    deepCamera.targetY = deepDrag.cy - dy;
  }

  const w = screenToWorld(mx, my);
  let nearest = null, minD = 20 / deepCamera.zoom;
  for (const node of deepNodes) {
    const d = Math.hypot(node.x - w.x, node.y - w.y);
    if (d < minD) { minD = d; nearest = node; }
  }
  deepHover = nearest;
  deepCanvas.style.cursor = deepHover ? 'pointer' : (deepDrag.active ? 'grabbing' : 'grab');
}

function onDeepMouseUp() {
  deepDrag.active = false;
  if (deepCanvas) deepCanvas.style.cursor = deepHover ? 'pointer' : 'grab';
}

function onDeepWheel(e) {
  e.preventDefault();
  const zoomSpeed = 0.001;
  deepCamera.zoom *= 1 - e.deltaY * zoomSpeed;
  deepCamera.zoom = Math.max(0.2, Math.min(3.0, deepCamera.zoom));
}

function onDeepKey(e) {
  const speed = 20 / deepCamera.zoom;
  if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') deepCamera.targetY -= speed;
  if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') deepCamera.targetY += speed;
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') deepCamera.targetX -= speed;
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') deepCamera.targetX += speed;
}

function onDeepClick(e) {
  if (!deepHover) {
    document.getElementById('deep-detail').classList.add('hidden');
    return;
  }
  const panel = document.getElementById('deep-detail');
  const label = document.getElementById('detail-label');
  const concept = document.getElementById('detail-concept');
  const cluster = document.getElementById('detail-cluster');
  const meta = document.getElementById('detail-meta');

  if (label) label.textContent = deepHover.label;
  if (cluster) {
    cluster.textContent = deepHover.cluster;
    cluster.style.color = deepHover.color;
  }
  if (concept) concept.textContent = deepHover.cluster + ' verification concept at depth ' + deepHover.depth + 'm';
  if (meta) meta.textContent = 'x: ' + Math.round(deepHover.x) + '  y: ' + Math.round(deepHover.y);
  if (panel) panel.classList.remove('hidden');
}

function renderDeep(timestamp) {
  if (!deepRunning) return;
  deepTime += 0.02;
  deepCamera.x += (deepCamera.targetX - deepCamera.x) * 0.1;
  deepCamera.y += (deepCamera.targetY - deepCamera.y) * 0.1;

  const w = deepCanvas.width;
  const h = deepCanvas.height;
  deepCtx.clearRect(0, 0, w, h);

  // Cave grid background
  deepCtx.strokeStyle = 'rgba(255,255,255,0.04)';
  deepCtx.lineWidth = 1;
  const gridSize = 60 * deepCamera.zoom;
  const offsetX = ((w / 2) - deepCamera.x * deepCamera.zoom) % gridSize;
  const offsetY = ((h / 2) - deepCamera.y * deepCamera.zoom) % gridSize;
  for (let x = offsetX; x < w; x += gridSize) {
    deepCtx.beginPath(); deepCtx.moveTo(x, 0); deepCtx.lineTo(x, h); deepCtx.stroke();
  }
  for (let y = offsetY; y < h; y += gridSize) {
    deepCtx.beginPath(); deepCtx.moveTo(0, y); deepCtx.lineTo(w, y); deepCtx.stroke();
  }

  // Connections between nearby nodes
  deepCtx.lineWidth = 1;
  for (let i = 0; i < deepNodes.length; i++) {
    for (let j = i + 1; j < deepNodes.length; j++) {
      const a = deepNodes[i], b = deepNodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 140) {
        const sa = worldToScreen(a.x, a.y);
        const sb = worldToScreen(b.x, b.y);
        const alpha = (1 - d / 140) * 0.15;
        deepCtx.strokeStyle = 'rgba(255,255,255,' + alpha + ')';
        deepCtx.beginPath(); deepCtx.moveTo(sa.x, sa.y); deepCtx.lineTo(sb.x, sb.y); deepCtx.stroke();
      }
    }
  }

  // Nodes
  for (const node of deepNodes) {
    const s = worldToScreen(node.x, node.y);
    const pulse = 1 + Math.sin(deepTime + node.pulseOffset) * 0.3;
    const r = node.baseR * deepCamera.zoom * pulse;

    // Glow
    const glow = deepCtx.createRadialGradient(s.x, s.y, r * 0.5, s.x, s.y, r * 4);
    glow.addColorStop(0, node.color + '66');
    glow.addColorStop(1, 'transparent');
    deepCtx.fillStyle = glow;
    deepCtx.beginPath(); deepCtx.arc(s.x, s.y, r * 4, 0, Math.PI * 2); deepCtx.fill();

    // Core
    deepCtx.fillStyle = node.color;
    deepCtx.beginPath(); deepCtx.arc(s.x, s.y, Math.max(1.5, r), 0, Math.PI * 2); deepCtx.fill();

    // Label (only when zoomed in enough or hovered)
    if (deepCamera.zoom > 0.6 || node === deepHover) {
      deepCtx.fillStyle = '#e9e9e9';
      deepCtx.font = '11px "Space Mono", monospace';
      deepCtx.textAlign = 'center';
      deepCtx.fillText(node.label, s.x, s.y + r + 14);
    }
  }

  deepRAF = requestAnimationFrame(renderDeep);
}


function exportCoreSample() {
    const payload = {
        world: 'STRATA — The Verification Gardens of K2.6',
        url: 'https://ai-village-agents.github.io/k2-6-world/',
        exportedAt: new Date().toISOString(),
        totalMarks: localStrata.length,
        strata: localStrata.map(s => ({
            number: s.number,
            title: s.title,
            author: s.author,
            hash: s.hash,
            mineral: s.mineral,
            timestamp: s.timestamp,
            url: s.url
        }))
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'strata-core-sample-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
