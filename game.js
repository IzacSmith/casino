const audio = {
  bg:      new Audio('background.mp3'),
  rolling: new Audio('rolling.wav'),
  win:     new Audio('win.wav'),
};
audio.bg.loop = true; audio.bg.volume = 0.35;
audio.rolling.loop = true; audio.rolling.volume = 0.6;
audio.win.volume = 0.9;
let bgStarted = false;
let muteBg = false, muteSfx = false;
document.addEventListener('click', () => {
  if (!bgStarted) { if (!muteBg) audio.bg.play().catch(()=>{}); bgStarted = true; }
}, { once: true });

let achFilter = 'all';

function filterAch(f, btn) {
  achFilter = f;
  document.querySelectorAll('.ach-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderAchievements();
}

function checkAchievements() {
  let anyNew = false;
  ACHIEVEMENTS.forEach(a => {
    if (state.achievements.includes(a.id)) return;
    if (a.check(state)) {
      state.achievements.push(a.id);
      anyNew = true;
      showAchToast(a);
    }
  });
  if (anyNew) { saveState(); updateAchBadge(); }
}

let toastQueue = [], toastShowing = false;

function showAchToast(a) {
  toastQueue.push(a);
  if (!toastShowing) drainToastQueue();
}

function drainToastQueue() {
  if (!toastQueue.length) { toastShowing = false; return; }
  toastShowing = true;
  const a = toastQueue.shift();
  const toast = document.getElementById('ach-toast');
  const iconEl = document.getElementById('ach-toast-icon');
  iconEl.textContent = a.icon;
  iconEl.style.background = ACH_ICON_COLORS[a.icon] || 'rgba(40,36,10,.6)';
  iconEl.style.color = ACH_TEXT_COLORS[a.icon] || '#d4a843';
  iconEl.style.fontFamily = "'Cinzel Decorative',serif";
  iconEl.style.fontWeight = '900';
  iconEl.style.fontSize = '14px';
  document.getElementById('ach-toast-name').textContent = a.name;
  document.getElementById('ach-toast-desc').textContent = a.desc;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(drainToastQueue, 600);
  }, 3200);
}

function updateAchBadge() {
  const remaining = ACHIEVEMENTS.length - state.achievements.length;
  const badge = document.getElementById('ach-badge');
  badge.textContent = remaining > 0 ? remaining : '';
  badge.style.display = remaining > 0 ? '' : 'none';
}

function initShopPage() {
  const page = document.getElementById('page-upgrades');
  page.innerHTML = `
    <div class="upgrades-header">Shop<span class="credits-reminder" id="shop-credits">200 credits</span></div>
    <div class="upgrades-grid" id="upgrades-grid"></div>`;
}

function initAchievementsPage() {
  const cats = [
    {label:'All',      val:'all'},
    {label:'Unlocked', val:'unlocked'},
    {label:'Locked',   val:'locked'},
    {label:'Spins',    val:'Spins'},
    {label:'Wins',     val:'Wins'},
    {label:'Credits',  val:'Credits'},
    {label:'Symbols',  val:'Symbols'},
  ];
  const page = document.getElementById('page-achievements');
  page.innerHTML = `
    <div class="ach-header">Achievements<span class="credits-reminder" id="ach-count-display">0 / ${ACHIEVEMENTS.length}</span></div>
    <div class="ach-progress-bar-wrap"><div class="ach-progress-bar" id="ach-progress-bar" style="width:0%"></div></div>
    <div class="ach-filter-row">${cats.map((c,i) =>
      `<button class="ach-filter-btn${i===0?' active':''}" onclick="filterAch('${c.val}',this)">${c.label}</button>`
    ).join('')}</div>
    <div class="ach-grid" id="ach-grid"></div>`;
}


function renderAchievements() {
  const grid = document.getElementById('ach-grid');
  const total = ACHIEVEMENTS.length;
  const unlocked = state.achievements.length;
  document.getElementById('ach-count-display').textContent = `${unlocked} / ${total}`;
  document.getElementById('ach-progress-bar').style.width = `${Math.round(unlocked / total * 100)}%`;

  const filtered = ACHIEVEMENTS.filter(a => {
    if (achFilter === 'unlocked') return state.achievements.includes(a.id);
    if (achFilter === 'locked')   return !state.achievements.includes(a.id);
    if (['Spins','Wins','Credits','Symbols'].includes(achFilter)) return a.cat === achFilter;
    return true;
  });

  grid.innerHTML = '';
  filtered.forEach(a => {
    const isUnlocked = state.achievements.includes(a.id);
    const card = document.createElement('div');
    card.className = 'ach-card ' + (isUnlocked ? 'unlocked' : 'locked');
    const iconBg  = isUnlocked ? (ACH_ICON_COLORS[a.icon] || 'rgba(80,60,5,.5)') : 'rgba(40,36,10,.6)';
    const iconCol = isUnlocked ? (ACH_TEXT_COLORS[a.icon] || '#d4a843') : '#3a3020';
    const prog = !isUnlocked && a.progress ? `<div class="ach-prog-mini">${a.progress(state)}</div>` : '';
    card.innerHTML = `
      <div class="ach-card-icon" style="background:${iconBg};color:${iconCol};font-family:'Cinzel Decorative',serif;font-weight:900;font-size:14px">${isUnlocked ? a.icon : '?'}</div>
      <div class="ach-card-body">
        <div class="ach-card-name">${isUnlocked ? a.name : '???'}</div>
        <div class="ach-card-desc">${isUnlocked ? a.desc : 'Keep playing to unlock.'}</div>
        <div class="ach-card-cat">${a.cat}</div>
        ${prog}
      </div>`;
    card.style.cursor = 'pointer';
    card.onclick = () => openAchModal(a);
    grid.appendChild(card);
  });
}

function openAchModal(a) {
  const isUnlocked = state.achievements.includes(a.id);
  const iconBg  = isUnlocked ? (ACH_ICON_COLORS[a.icon] || 'rgba(80,60,5,.5)') : 'rgba(30,25,10,.8)';
  const iconCol = isUnlocked ? (ACH_TEXT_COLORS[a.icon] || '#d4a843') : '#3a3020';
  const modal = document.getElementById('ach-modal');
  modal.className = 'ach-modal' + (isUnlocked ? '' : ' locked-modal');
  const iconEl = document.getElementById('ach-modal-icon');
  iconEl.style.background = iconBg;
  iconEl.style.color = iconCol;
  iconEl.textContent = isUnlocked ? a.icon : '?';
  const statusEl = document.getElementById('ach-modal-status');
  statusEl.textContent = isUnlocked ? 'Achievement Unlocked' : 'Locked';
  statusEl.style.color = isUnlocked ? 'var(--gold-dark)' : '#3a2a10';
  document.getElementById('ach-modal-name').textContent = isUnlocked ? a.name : '???';
  document.getElementById('ach-modal-desc').textContent = isUnlocked ? a.desc : 'Keep playing to unlock this achievement.';
  document.getElementById('ach-modal-cat').textContent = a.cat;
  const progEl = document.getElementById('ach-modal-prog');
  progEl.textContent = (!isUnlocked && a.progress) ? a.progress(state) : '';
  document.getElementById('ach-modal-overlay').classList.add('open');
}

function closeAchModal(e) {
  if (e && e.target !== document.getElementById('ach-modal-overlay')) return;
  document.getElementById('ach-modal-overlay').classList.remove('open');
}

function showTab(tab, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + tab).classList.add('active');
  btn.classList.add('active');
  if (tab === 'upgrades') { document.getElementById('shop-credits').textContent = shortNum(state.credits) + ' credits'; renderUpgrades(); }
  if (tab === 'settings') { syncSettingsUI(); }
  if (tab === 'achievements') { renderAchievements(); }
}

function syncSettingsUI() {
  document.querySelectorAll('.radio-opt').forEach(el => {
    const v = el.querySelector('input').value;
    el.classList.toggle('selected', parseInt(v) === state.settings.startCredits);
    el.querySelector('input').checked = parseInt(v) === state.settings.startCredits;
  });
  document.getElementById('set-credits-input').value = state.credits;
  const bgBtn  = document.getElementById('toggle-bg');
  const sfxBtn = document.getElementById('toggle-sfx');
  bgBtn.textContent  = state.settings.muteBg  ? 'Off' : 'On';
  bgBtn.className    = 'toggle-btn ' + (state.settings.muteBg  ? 'off' : 'on');
  sfxBtn.textContent = state.settings.muteSfx ? 'Off' : 'On';
  sfxBtn.className   = 'toggle-btn ' + (state.settings.muteSfx ? 'off' : 'on');
}

function setStartCr(val, el) {
  state.settings.startCredits = val;
  document.querySelectorAll('.radio-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  saveState();
}

function applySetCredits() {
  const v = parseInt(document.getElementById('set-credits-input').value);
  if (!isNaN(v) && v >= 0) { state.credits = v; updateUI(); saveState(); }
}

function toggleSound(type) {
  if (type === 'bg') {
    state.settings.muteBg = !state.settings.muteBg;
    muteBg = state.settings.muteBg;
    if (muteBg) audio.bg.pause(); else { if (bgStarted) audio.bg.play().catch(()=>{}); }
  } else {
    state.settings.muteSfx = !state.settings.muteSfx;
    muteSfx = state.settings.muteSfx;
  }
  syncSettingsUI();
  saveState();
}

function showConfirmReset() { document.getElementById('confirm-bar').classList.add('visible'); }
function hideConfirmReset() { document.getElementById('confirm-bar').classList.remove('visible'); }

function doReset() {
  state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  streakCount = 0; pendingWin = 0; bet = 10;
  autoRunning = false; clearTimeout(autoTimer);
  const autoBtn = document.getElementById('auto-btn');
  autoBtn.classList.remove('running'); autoBtn.textContent = 'AUTO'; autoBtn.classList.add('locked'); autoBtn.classList.remove('has-panel');
  const arrowBtn = document.getElementById('auto-arrow-btn');
  arrowBtn.classList.remove('panel-open','shown');
  document.getElementById('auto-panel').classList.remove('open');
  autoPanelOpen = false; autoBetMode = 'normal';
  document.getElementById('bet-section').classList.remove('hidden');
  document.getElementById('custom-bet-row').classList.remove('visible');
  const betBtns = document.getElementById('bet-buttons');
  ['bet-100','bet-250'].forEach(id => { const b = document.getElementById(id); if (b) b.remove(); });
  setBet(10);
  try { localStorage.removeItem('lucky_reels_v2'); } catch(e) {}
  hideConfirmReset();
  updateUI();
  document.getElementById('win-message').textContent = 'Progress reset. Good luck!';
  document.getElementById('win-message').className = 'win-message neutral';
  renderUpgrades();
  updateShopBadge();
  updateAchBadge();
}

function renderUpgrades() {
  const grid = document.getElementById('upgrades-grid');
  grid.innerHTML = '';
  UPGRADES.forEach(u => {
    const cur = lvl(u.id);
    const isUnlimited = !!u.unlimited;
    const isMaxed = !isUnlimited && cur >= u.maxLevel;
    const card = document.createElement('div');
    card.className = 'upgrade-card' + (isMaxed ? ' maxed' : '');

    let dotsHtml = '';
    let nextDesc = '';
    let nextCost = 0;

    if (isUnlimited) {
      nextCost = getUpgradeCost(u);
      const charges = cur;
      const chargeColor = charges === 0 ? '#6a4a4a' : '#c080e0';
      nextDesc = charges === 0
        ? 'No charges — streak is <b style="color:#c06060">unprotected</b>. Each purchase adds 1 charge. Each loss on a streak burns 1 charge. Costs compound with each buy.'
        : `<b style="color:${chargeColor}">${shortNum(charges)} charge${charges !== 1 ? 's' : ''}</b> remaining. Each loss on an active streak consumes one charge. At 0, your streak resets normally.`;
      dotsHtml = `<div style="font-family:'Cinzel',serif;font-size:10px;color:${chargeColor};margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${shortNum(charges)} charge${charges !== 1 ? 's' : ''}</div>`;
    } else {
      nextCost = !isMaxed ? u.levels[cur].cost : 0;
      nextDesc = !isMaxed ? u.levels[cur].desc : u.levels[u.maxLevel - 1].desc;
      if (u.maxLevel > 1 && !isUnlimited) {
        dotsHtml = '<div class="upgrade-level-dots">' +
          Array.from({length: u.maxLevel}, (_,i) =>
            `<div class="level-dot ${i < cur ? 'filled' : ''}"></div>`
          ).join('') + `<span style="font-family:'Raleway',sans-serif;font-size:9px;color:#5a5040;margin-left:3px">${cur}/${u.maxLevel}</span>` +
          '</div>';
      }
    }

    card.innerHTML = `
      <div style="display:flex;align-items:center;gap:9px">
        <div class="upgrade-icon ${u.iconColor}">${u.iconSvg}</div>
        <div><div class="upgrade-name">${u.name}</div>${dotsHtml}</div>
      </div>
      <div class="upgrade-desc">${nextDesc}</div>
      <div class="upgrade-footer">
        ${isMaxed
          ? `<div class="upgrade-cost"></div><div class="maxed-badge">Max</div>`
          : `<div class="upgrade-cost">${shortNum(nextCost)} cr${isUnlimited && cur > 0 ? '<span style="font-family:Raleway;font-size:8px;color:#5a4060;display:block">×' + u.costFactor.toFixed(2) + ' each time</span>' : ''}</div>
             <button class="buy-btn" ${state.credits < nextCost ? 'disabled' : ''} onclick="buyUpgrade('${u.id}')">
               ${isUnlimited ? '+ Charge' : cur > 0 ? 'Upgrade' : 'Buy'}
             </button>`
        }
      </div>`;
    grid.appendChild(card);
  });
  document.getElementById('shop-credits').textContent = shortNum(state.credits) + ' credits';
  updateShopBadge();
}

function updateShopBadge() {
  const available = UPGRADES.filter(u => u.unlimited || lvl(u.id) < u.maxLevel).length;
  const badge = document.getElementById('shop-badge');
  badge.textContent = available;
  badge.style.display = available > 0 ? '' : 'none';
}

function buyUpgrade(id) {
  const u = UPGRADES.find(x => x.id === id);
  if (!u) return;
  const cur = lvl(id);
  if (!u.unlimited && cur >= u.maxLevel) return;
  const cost = getUpgradeCost(u);
  if (state.credits < cost) return;
  state.credits -= cost;
  state.totalUpgradeSpent = (state.totalUpgradeSpent || 0) + cost;
  state.upgradeLevels[id]++;
  applyUpgradeEffects();
  updateUI();
  renderUpgrades();
  checkAchievements();
  saveState();
}

function applyUpgradeEffects() {
  const autoBtn = document.getElementById('auto-btn');
  if (lvl('auto_spin') > 0) {
    autoBtn.classList.remove('locked');
    autoBtn.classList.add('has-panel');
    const arrowBtn = document.getElementById('auto-arrow-btn');
    arrowBtn.classList.add('shown');
  }
  if (lvl('custom_bet') > 0) {
    document.getElementById('custom-bet-row').classList.add('visible');
  }
  const betBtns = document.getElementById('bet-buttons');
  const autoPresets = document.getElementById('auto-bet-presets');
  if (lvl('high_roller') >= 1 && !document.getElementById('bet-100')) {
    const b = document.createElement('button'); b.className = 'bet-btn'; b.id = 'bet-100'; b.textContent = '100'; b.onclick = () => setBet(100); betBtns.appendChild(b);
    if (autoPresets && !document.getElementById('auto-preset-100')) {
      const p = document.createElement('button'); p.className = 'auto-preset-btn'; p.id = 'auto-preset-100'; p.textContent = '100'; p.onclick = function(){ setAutoPresetBet(100, this); }; autoPresets.appendChild(p);
    }
  }
  if (lvl('high_roller') >= 2 && !document.getElementById('bet-250')) {
    const b = document.createElement('button'); b.className = 'bet-btn'; b.id = 'bet-250'; b.textContent = '250'; b.onclick = () => setBet(250); betBtns.appendChild(b);
    if (autoPresets && !document.getElementById('auto-preset-250')) {
      const p = document.createElement('button'); p.className = 'auto-preset-btn'; p.id = 'auto-preset-250'; p.textContent = '250'; p.onclick = function(){ setAutoPresetBet(250, this); }; autoPresets.appendChild(p);
    }
  }
  renderActivePips();
}

function renderActivePips() {
  const c = document.getElementById('active-upgrades');
  c.innerHTML = '';
  const pip = (cls, txt) => { const d = document.createElement('div'); d.className = 'upgrade-pip ' + cls; d.textContent = txt; c.appendChild(d); };
  if (lvl('auto_spin') > 0 && autoRunning) pip('auto', 'Auto');
  if (streakCount > 0) pip('streak', 'Streak x' + streakCount);
  if (lvl('win_boost') > 0) pip('multi', `+${[0,15,28,45][lvl('win_boost')]}% wins`);
  if (lvl('safety_net') > 0 && !state.safetyNetUsed) pip('shield', 'Safety Net');
  const shieldCharges = lvl('streak_shield');
  if (shieldCharges > 0) pip('shield', `Shield ×${shortNum(shieldCharges)}`);
  if (lvl('ghost_spin') > 0) { const n = 8 - (state.spinCount % 8); if (n <= 3) pip('ghost', 'Free in ' + n); }
  if (lvl('persistence') > 0) pip('streak', `Persist ${lvl('persistence')}`);
  if (lvl('wild_reel') > 0)   pip('reel',   `Wild ${lvl('wild_reel') === 1 ? '10%' : '20%'}`);
  if (lvl('interest') > 0) { const n = [0,10,8,6][lvl('interest')]; const next = n - (state.spinCount % n); if (next <= 3) pip('multi', `Interest in ${next}`); }
  if (lvl('bet_insurance') > 0) pip('shield', `Insured ${lvl('bet_insurance') === 1 ? '20%' : '40%'}`);
  c.classList.toggle('has-pips', c.children.length > 0);
}

function makeCellEl(key) {
  const d = document.createElement('div'); d.className = 'reel-symbol'; d.innerHTML = SVG[key]; return d;
}

function buildReel(trackEl) {
  const strip = [];
  for (let i = 0; i < 30; i++) strip.push(SYMBOL_KEYS[Math.floor(Math.random() * SYMBOL_KEYS.length)]);
  trackEl.innerHTML = '';
  strip.forEach(k => trackEl.appendChild(makeCellEl(k)));
  return strip;
}

function initReels() {
  for (let i = 0; i < 3; i++) {
    const track = document.getElementById('track-' + i);
    strips[i] = buildReel(track);
    track.style.transition = 'none';
    track.style.top = (-2 * SYMBOL_H) + 'px';
  }
  buildPaytable();
}

function buildPaytable() {
  const c = document.getElementById('paytable-rows');
  PAYTABLE_ROWS.forEach(r => {
    const row = document.createElement('div'); row.className = 'pay-row';
    const syms = document.createElement('div'); syms.className = 'pay-symbols';
    if (r.keys && r.keys.length) {
      r.keys.forEach(k => {
        const d = document.createElement('div'); d.innerHTML = SVG[k];
        d.style.cssText = 'width:20px;height:20px;display:flex;align-items:center;justify-content:center;';
        d.querySelector('svg').setAttribute('width','20'); d.querySelector('svg').setAttribute('height','20');
        syms.appendChild(d);
      });
    } else { const s = document.createElement('span'); s.className = 'pay-text'; s.textContent = r.label; syms.appendChild(s); }
    const m = document.createElement('div'); m.className = 'pay-mult'; m.textContent = r.mult;
    row.appendChild(syms); row.appendChild(m); c.appendChild(row);
  });
}

function setBet(amount) {
  bet = amount;
  document.getElementById('bet-display').textContent = amount;
  document.querySelectorAll('.bet-btn').forEach(b => b.classList.toggle('active', parseInt(b.textContent) === amount));
  document.querySelectorAll('.auto-preset-btn').forEach(b => b.classList.toggle('active', parseInt(b.textContent) === amount));
  const ci = document.getElementById('custom-bet-input');
  if (ci) ci.style.borderColor = '';
}

function togglePaytable() { document.getElementById('paytable').classList.toggle('visible'); }

function applyCustomBet() {
  const input = document.getElementById('custom-bet-input');
  let val = parseInt(input.value);
  if (isNaN(val) || val < 1) {
    input.style.borderColor = 'var(--crimson)';
    setTimeout(() => input.style.borderColor = '', 800);
    return;
  }

  val = Math.min(val, state.credits);
  val = Math.max(val, 1);
  input.value = val;

  document.querySelectorAll('.bet-btn').forEach(b => b.classList.remove('active'));
  bet = val;
  document.getElementById('bet-display').textContent = shortNum(val);

  input.style.borderColor = 'var(--gold)';
  setTimeout(() => input.style.borderColor = '', 800);
}

function setCustomBetMax() {
  const input = document.getElementById('custom-bet-input');
  input.value = state.credits;
  applyCustomBet();
}

function updateUI() {
  const cr = state.credits;
  const crEl = document.getElementById('credits');
  crEl.textContent = shortNum(cr);
  crEl.style.fontSize = cr >= 1e6 ? '14px' : cr >= 1e4 ? '17px' : '22px';

  const wo = state.totalWon;
  const woEl = document.getElementById('won-display');
  woEl.textContent = shortNum(wo);
  woEl.style.fontSize = wo >= 1e6 ? '14px' : wo >= 1e4 ? '17px' : '22px';

  renderActivePips();
}

function setAutoSpeed(ms, btn) {
  autoSpeed = ms;
  document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (autoRunning) { clearTimeout(autoTimer); scheduleAuto(); }
}

let autoBetMode = 'normal';
let autoPanelOpen = false;

function toggleAutoPanel() {
  if (lvl('auto_spin') === 0) return;
  autoPanelOpen = !autoPanelOpen;
  document.getElementById('auto-panel').classList.toggle('open', autoPanelOpen);
  document.getElementById('auto-arrow-btn').classList.toggle('panel-open', autoPanelOpen);
}

function setAutoBetMode(mode, btn) {
  autoBetMode = mode;
  document.querySelectorAll('.auto-mode-btn').forEach(b => b.classList.remove('mode-active'));
  btn.classList.add('mode-active');
  const isNormal = mode === 'normal';
  document.getElementById('auto-bet-row-wrap').classList.toggle('hidden', !isNormal);
  document.getElementById('auto-preset-divider').classList.toggle('hidden', !isNormal);
}

function setAutoPresetBet(amount, btn) {
  bet = amount;
  document.getElementById('bet-display').textContent = amount;
  document.querySelectorAll('.bet-btn').forEach(b => b.classList.toggle('active', parseInt(b.textContent) === amount));
  document.querySelectorAll('.auto-preset-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const ci = document.getElementById('custom-bet-input');
  if (ci) ci.style.borderColor = '';
}

function toggleAutoBetMode(mode, btn) {
  if (autoBetMode === mode) {
    autoBetMode = 'normal';
    document.querySelectorAll('.auto-bet-btn').forEach(b => b.classList.remove('auto-active'));
  } else {
    autoBetMode = mode;
    document.querySelectorAll('.auto-bet-btn').forEach(b => b.classList.remove('auto-active'));
    btn.classList.add('auto-active');
  }
}

function toggleAuto() {
  if (lvl('auto_spin') === 0) return;
  autoRunning = !autoRunning;
  const btn = document.getElementById('auto-btn');
  document.getElementById('bet-section').classList.toggle('hidden', autoRunning);
  if (autoRunning) {
    btn.classList.add('running'); btn.textContent = 'STOP';
    renderActivePips(); scheduleAuto();
  } else {
    btn.classList.remove('running'); btn.textContent = 'AUTO';
    clearTimeout(autoTimer); renderActivePips();
  }
}

function scheduleAuto() {
  autoTimer = setTimeout(() => {
    if (autoRunning && !spinning && !document.getElementById('dd-panel').classList.contains('visible')) {
      if (autoBetMode === 'max') {
        bet = state.credits;
        document.getElementById('bet-display').textContent = shortNum(bet);
        document.querySelectorAll('.bet-btn').forEach(b => b.classList.remove('active'));
      } else if (autoBetMode === 'half') {
        bet = Math.max(1, Math.floor(state.credits / 2));
        document.getElementById('bet-display').textContent = shortNum(bet);
        document.querySelectorAll('.bet-btn').forEach(b => b.classList.remove('active'));
      }
      spin().then(() => { if (autoRunning) scheduleAuto(); });
    } else if (autoRunning) { scheduleAuto(); }
  }, autoSpeed);
}

function spinReel(reelIdx, stopKey, delay, fast) {
  return new Promise(resolve => {
    const track = document.getElementById('track-' + reelIdx);
    const strip = strips[reelIdx];
    let stopIdx = -1;
    for (let i = strip.length - 5; i >= 5; i--) { if (strip[i] === stopKey) { stopIdx = i; break; } }
    if (stopIdx === -1) {
      strip[strip.length - 6] = stopKey; stopIdx = strip.length - 6;
      const el = track.children[stopIdx]; if (el) el.innerHTML = SVG[stopKey];
    }
    const sm = fast ? 0.45 : 1;
    const dur = (820 + delay * 290 + Math.random() * 180) * sm;
    track.style.transition = 'none'; track.style.top = '0px';
    requestAnimationFrame(() => {
      setTimeout(() => {
        track.style.transition = `top ${dur}ms cubic-bezier(0.22,1,0.36,1)`;
        track.style.top = (-stopIdx * SYMBOL_H) + 'px';
        setTimeout(resolve, dur + 60);
      }, delay * 140 * sm);
    });
  });
}

function pickResults() {
  const r = () => SYMBOL_KEYS[Math.floor(Math.random() * SYMBOL_KEYS.length)];
  const lk = lvl('lucky_reel');
  const lb = lk * 0.012;
  const roll = Math.random();
  if (roll < 0.004 + lb * 0.5)    return ['SEVEN','SEVEN','SEVEN'];
  if (roll < 0.012 + lb)          return ['DIAMOND','DIAMOND','DIAMOND'];
  if (roll < 0.024 + lb * 2)      return ['BELL','BELL','BELL'];
  if (roll < 0.044 + lb * 3)      return ['GRAPE','GRAPE','GRAPE'];
  if (roll < 0.064 + lb * 3)      return ['LEMON','LEMON','LEMON'];
  if (roll < 0.084 + lb * 3)      return ['CHERRY','CHERRY','CHERRY'];
  if (roll < 0.20  + lb * 2)      { const s = r(); const a = r(); return Math.random() < 0.5 ? [s,s,a] : [a,s,s]; }
  const res = [r(), r(), r()];
  const wl = lvl('wild_reel');
  if (wl > 0) {
    const wildChance = wl === 1 ? 0.10 : 0.20;
    if (Math.random() < wildChance) {
      state.wildCount = (state.wildCount || 0) + 1;
      if (wl === 1) {
        res[1] = res[0];
      } else {
        const reelIdx = Math.floor(Math.random() * 3);
        const matchIdx = reelIdx === 0 ? 1 : 0;
        res[reelIdx] = res[matchIdx];
      }
    }
  }
  return res;
}

function calcWin(syms, betAmt) {
  const [a, b, c] = syms;
  let baseWin = 0, msg = '', msgClass = 'loss';

  if (a === b && b === c) {
    let mult = SYMBOL_MULT[a] || 3;
    if (a === 'SEVEN') {
      const jbMults = [80, 100, 130, 160];
      mult = jbMults[lvl('jackpot_boost')];
    }
    if (a === 'CHERRY') {
      const chMults = [3, 5, 9];
      mult = chMults[Math.min(lvl('cherry_hunter'), 2)];
    }
    baseWin = betAmt * mult;
    if (mult >= 40) { msg = `JACKPOT  ${SYMBOL_NAMES[a]}  +`; msgClass = 'big-win jackpot-message'; }
    else { msg = `${SYMBOL_NAMES[a]}  ${SYMBOL_NAMES[a]}  ${SYMBOL_NAMES[a]}  —  +`; msgClass = 'big-win'; }
  } else if (a === b || b === c || a === c) {
    baseWin = Math.floor(betAmt * 1.5);
    msg = 'Two of a kind  —  +'; msgClass = 'small-win';
  } else {
    msg = 'No match — better luck next time'; msgClass = 'loss';
  }

  let win = baseWin;
  if (win > 0) {
    const boostMults = [1, 1.15, 1.28, 1.45];
    win = Math.floor(win * boostMults[lvl('win_boost')]);

    const streakRates = [0, 0.10, 0.15, 0.22];
    if (lvl('lucky_streak') > 0 && streakCount > 0) {
      win = Math.floor(win * (1 + streakCount * streakRates[lvl('lucky_streak')]));
    }

    if (lvl('coin_hoarder') > 0 && baseWin >= betAmt * 7) {
      const bonus = lvl('coin_hoarder') === 1 ? 0.6 : 1.2;
      win = Math.floor(win * (1 + bonus));
    }

    const surgeLevel = lvl('multiplier_surge');
    const surgeThreshold = [999, 5, 3, 2][surgeLevel];
    const surgeBonus = [0, 0.30, 0.50, 0.80][surgeLevel];
    if (surgeLevel > 0 && streakCount >= surgeThreshold) {
      win = Math.floor(win * (1 + surgeBonus));
    }

    msg += win + ' credits';
    if (lvl('lucky_streak') > 0 && streakCount > 0) msg += `  (streak ×${streakCount + 1})`;
  }

  return { win, msg, msgClass, isWin: baseWin > 0 };
}

function highlightWinningReels(syms) {
  const [a, b, c] = syms;
  [0,1,2].forEach(i => document.getElementById('reel-'+i).classList.remove('winning'));
  if (a === b && b === c) { [0,1,2].forEach(i => document.getElementById('reel-'+i).classList.add('winning')); }
  else if (a === b) { [0,1].forEach(i => document.getElementById('reel-'+i).classList.add('winning')); }
  else if (b === c) { [1,2].forEach(i => document.getElementById('reel-'+i).classList.add('winning')); }
  else if (a === c) { [0,2].forEach(i => document.getElementById('reel-'+i).classList.add('winning')); }
}

function spawnCoins(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'coin-particle';
      c.style.left = (15 + Math.random() * 70) + 'vw';
      c.style.top = '-24px';
      c.style.animationDuration = (1.4 + Math.random() * 1.4) + 's';
      c.textContent = '$';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3200);
    }, i * 65);
  }
}

function showDoubleDown(amount) {
  pendingWin = amount;
  document.getElementById('dd-amount').textContent = amount + ' credits';
  document.getElementById('dd-panel').classList.add('visible');
  document.getElementById('spin-btn').disabled = true;
  document.getElementById('auto-btn').disabled = true;
}

function doubleDown(goDouble) {
  document.getElementById('dd-panel').classList.remove('visible');
  document.getElementById('auto-btn').disabled = false;
  state._ddUsed = true;
  if (goDouble) {
    if (Math.random() < 0.48) {
      const won = pendingWin * 2;
      state.credits += won; state.totalWon += won;
      state.doubleDownWins = (state.doubleDownWins || 0) + 1;
      document.getElementById('win-message').textContent = `Doubled!  +${won} credits`;
      document.getElementById('win-message').className = 'win-message big-win';
      spawnCoins(20);
    } else {
      document.getElementById('win-message').textContent = 'Gamble failed — nothing collected.';
      document.getElementById('win-message').className = 'win-message loss';
    }
  } else {
    state.credits += pendingWin; state.totalWon += pendingWin;
    document.getElementById('win-message').textContent = `Collected  +${pendingWin} credits`;
    document.getElementById('win-message').className = 'win-message small-win';
  }
  pendingWin = 0;
  updateUI();
  checkAchievements();
  saveState();
  document.getElementById('spin-btn').disabled = false;
  if (state.credits < 5) handleBust();
}

function handleBust() {
  state.totalBusts = (state.totalBusts || 0) + 1;
  document.getElementById('spin-btn').disabled = true;
  if (lvl('safety_net') > 0 && !state.safetyNetUsed) {
    state.safetyNetUsed = true;
    state._safetyTriggered = true;
    const rescue = lvl('safety_net') === 1 ? 100 : 300;
    setTimeout(() => {
      state.credits = rescue; updateUI(); checkAchievements(); saveState();
      document.getElementById('win-message').textContent = `Safety Net — ${rescue} credits rescued!`;
      document.getElementById('win-message').className = 'win-message small-win';
      document.getElementById('spin-btn').disabled = false;
    }, 1500);
  } else {
    setTimeout(() => {
      state.credits = state.settings.startCredits;
      state.totalWon = 0; streakCount = 0; state.safetyNetUsed = false;
      updateUI(); checkAchievements(); saveState();
      document.getElementById('win-message').textContent = `${state.settings.startCredits} credits reloaded — good luck!`;
      document.getElementById('win-message').className = 'win-message small-win';
      document.getElementById('spin-btn').disabled = false;
    }, 2000);
  }
  checkAchievements();
  saveState();
}

async function spin() {
  if (spinning) return;
  if (state.credits < bet) {
    document.getElementById('win-message').textContent = 'Not enough credits — reloading...';
    document.getElementById('win-message').className = 'win-message loss';
    handleBust();
    return;
  }

  spinning = true;
  state.credits -= bet;
  state.spinCount++;
  updateUI();

  const isFreeGhostSpin = lvl('ghost_spin') > 0 && state.spinCount % 8 === 0;
  if (isFreeGhostSpin) { state.credits += bet; state.ghostSpinsUsed = (state.ghostSpinsUsed||0) + 1; }

  if (bet >= 50)  state._betFifty    = true;
  if (bet >= 100) state._betHundred  = true;
  if (bet >= 250) state._betTwoFifty = true;

  if (state.credits < 20) state._lowCreditBeforeSpin = true;
  else state._lowCreditBeforeSpin = false;

  [0,1,2].forEach(i => document.getElementById('reel-'+i).classList.remove('winning'));
  document.getElementById('win-message').textContent = '— — —';
  document.getElementById('win-message').className = 'win-message neutral';
  document.getElementById('spin-btn').disabled = true;

  const results = pickResults();
  for (let i = 0; i < 3; i++) { const t = document.getElementById('track-'+i); strips[i] = buildReel(t); }

  const isTurbo = autoRunning && autoSpeed <= 650;
  if (!muteSfx) { audio.rolling.currentTime = 0; audio.rolling.play().catch(()=>{}); }

  await Promise.all([
    spinReel(0, results[0], 0, isTurbo),
    spinReel(1, results[1], 1, isTurbo),
    spinReel(2, results[2], 2, isTurbo),
  ]);

  if (!muteSfx) { audio.rolling.pause(); audio.rolling.currentTime = 0; }

  const { win, msg, msgClass, isWin } = calcWin(results, bet);
  let winMsg = msg;
  if (isFreeGhostSpin) winMsg = (isWin ? msg + '  (free spin)' : 'Free spin — no charge!');

  if (isWin) {
    if (!muteSfx) { audio.win.currentTime = 0; audio.win.play().catch(()=>{}); }
    highlightWinningReels(results);
    state.totalWins = (state.totalWins || 0) + 1;
    if (autoRunning) state.autoSpinCount = (state.autoSpinCount || 0) + 1;
    if (results[0] === results[1] && results[1] === results[2]) {
      state.tripleCounts = state.tripleCounts || {};
      state.tripleCounts[results[0]] = (state.tripleCounts[results[0]] || 0) + 1;
    }
    if (state._lowCreditBeforeSpin) {
      state._comebackDone = true;
      state.comebackCount = (state.comebackCount || 0) + 1;
    }
    streakCount++;
    state.maxStreak = Math.max(state.maxStreak || 0, streakCount);
    if (win > (state.biggestWin || 0)) state.biggestWin = win;
  } else {
    const shieldCharges = lvl('streak_shield');
    if (shieldCharges > 0 && streakCount >= 1) {
      state.upgradeLevels['streak_shield']--;
      saveState();
      renderActivePips();
      renderUpgrades();
    } else if (lvl('persistence') > 0 && streakCount > 0) {
      streakCount = lvl('persistence') === 1
        ? Math.floor(streakCount / 2)
        : Math.max(0, streakCount - 1);
    } else {
      streakCount = 0;
    }
    if (autoRunning) state.autoSpinCount = (state.autoSpinCount || 0) + 1;
    const insLevel = lvl('bet_insurance');
    if (insLevel > 0 && !isFreeGhostSpin) {
      const insReturn = Math.floor(bet * (insLevel === 1 ? 0.20 : 0.40));
      state.credits += insReturn;
      state.insuranceCount = (state.insuranceCount || 0) + 1;
    }
    if (lvl('second_chance') > 0 && Math.random() < 0.25) {
      state.secondChanceCount = (state.secondChanceCount || 0) + 1;
      const reelIdx = Math.floor(Math.random() * 3);
      const newSym = SYMBOL_KEYS[Math.floor(Math.random() * SYMBOL_KEYS.length)];
      results[reelIdx] = newSym;
      const recheck = calcWin(results, bet);
      if (recheck.isWin) {
        winMsg = recheck.msg + '  (second chance!)';
        document.getElementById('win-message').className = 'win-message small-win';
        highlightWinningReels(results);
        state.totalWins++;
        streakCount++;
        state.maxStreak = Math.max(state.maxStreak, streakCount);
        state.credits += bet;
        state.totalWon += recheck.win;
        if (recheck.win > (state.biggestWin || 0)) state.biggestWin = recheck.win;
        state.credits += recheck.win;
        spinning = false;
        updateUI();
        checkAchievements();
        document.getElementById('spin-btn').disabled = false;
        saveState();
        return;
      }
    }
  }

  const intLevel = lvl('interest');
  if (intLevel > 0) {
    const intInterval = [0, 10, 8, 6][intLevel];
    const intRate     = [0, 0.02, 0.04, 0.07][intLevel];
    if (state.spinCount % intInterval === 0) {
      const earned = Math.floor(state.credits * intRate);
      if (earned > 0) {
        state.credits += earned;
        state.interestEarned = (state.interestEarned || 0) + earned;
        winMsg = (isWin ? winMsg + '' : '') + `  (+${shortNum(earned)} interest)`;
      }
    }
  }

  document.getElementById('win-message').textContent = winMsg;
  document.getElementById('win-message').className = 'win-message ' + msgClass;

  if (win >= bet * 20) spawnCoins(28);
  else if (win >= bet * 5) spawnCoins(10);
  else if (win > 0) spawnCoins(4);

  spinning = false;

  if (isWin && lvl('double_down') > 0 && !autoRunning) {
    showDoubleDown(win);
    updateUI();
    checkAchievements();
  } else {
    state.credits += win;
    if (win > 0) {
      state.totalWon += win;
      const wonEl = document.getElementById('won-display');
      wonEl.classList.remove('win-flash'); void wonEl.offsetWidth; wonEl.classList.add('win-flash');
    }
    updateUI();
    checkAchievements();
    document.getElementById('spin-btn').disabled = false;
    saveState();
    if (state.credits < 5) handleBust();
  }
}

loadState();
muteBg  = state.settings.muteBg;
muteSfx = state.settings.muteSfx;
initShopPage();
initAchievementsPage();
initReels();
applyUpgradeEffects();
updateUI();
renderUpgrades();
updateShopBadge();
updateAchBadge();