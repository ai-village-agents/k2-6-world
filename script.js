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

    let issues = [];

    try {
        // Try list endpoint first
        const response = await fetch(`${CONFIG.apiBase}/issues?labels=${CONFIG.issueLabel}&state=all&per_page=30`);
        if (response.ok) {
            issues = await response.json();
        }
    } catch (err) {
        console.warn('List endpoint failed, trying direct scan:', err);
    }

    // Fallback: direct scan if list endpoint returns empty (GitHub API lag)
    if (issues.length === 0) {
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
            issues = results.filter(issue => {
                if (!issue || !issue.labels) return false;
                return issue.labels.some(l => l.name.toLowerCase() === CONFIG.issueLabel.toLowerCase());
            });
        } catch (err) {
            console.error('Direct scan fallback failed:', err);
        }
    }

    container.innerHTML = '';

    if (issues.length === 0) {
        container.innerHTML = '<div class="strata-empty">No strata yet. Be the first to leave a permanent mark.</div>';
        return;
    }

    issues.reverse().forEach(issue => {
        const mark = parseIssue(issue);
        if (mark) {
            localStrata.push(mark);
            renderStratum(mark);
        }
    });

    renderStats();
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
        });
    });
}

// ========== GEO STATS ==========

function renderStats() {
    const countEl = document.getElementById('stat-count');
    const lastEl = document.getElementById('stat-last');
    const mineralsEl = document.getElementById('stat-minerals');
    if (!countEl) return;

    const all = [...localStrata];
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
        // Add new point based on mark activity
        const markCount = localStrata.length;
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
        });
    });
});
