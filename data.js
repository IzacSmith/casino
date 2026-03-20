const SVG = {
  SEVEN:`<svg viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><text x="27" y="38" text-anchor="middle" font-family="'Cinzel Decorative',serif" font-size="36" font-weight="900" fill="#e03030">7</text></svg>`,
  BAR:`<svg viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="14" width="40" height="12" rx="3" fill="#d4a843"/><rect x="11" y="28" width="32" height="9" rx="2.5" fill="#c09030"/><rect x="15" y="39" width="24" height="7" rx="2" fill="#a07820"/><text x="27" y="23" text-anchor="middle" font-family="Arial,sans-serif" font-size="7.5" font-weight="800" fill="#0a0a10" letter-spacing="1.5">BAR</text></svg>`,
  BELL:`<svg viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M27 7 C17 7 12 16 12 26 L12 37 L42 37 L42 26 C42 16 37 7 27 7Z" fill="#d4a843"/><rect x="9" y="35" width="36" height="5" rx="2.5" fill="#a07820"/><circle cx="27" cy="45" r="4.5" fill="#b88a20"/><ellipse cx="21" cy="19" rx="4" ry="3" fill="rgba(255,255,255,0.2)"/></svg>`,
  CHERRY:`<svg viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M27 16 Q31 7 38 9 Q44 11 40 18" stroke="#3a7a20" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M27 16 Q23 7 16 9 Q10 11 14 18" stroke="#3a7a20" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="39" cy="28" r="10" fill="#c0392b"/><circle cx="16" cy="28" r="10" fill="#c0392b"/><circle cx="35" cy="23" r="3.5" fill="rgba(255,255,255,0.28)"/><circle cx="12" cy="23" r="3.5" fill="rgba(255,255,255,0.28)"/></svg>`,
  LEMON:`<svg viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><ellipse cx="27" cy="30" rx="17" ry="13" fill="#e8c020"/><ellipse cx="10" cy="30" rx="5" ry="8" fill="#caa010"/><ellipse cx="44" cy="30" rx="5" ry="8" fill="#caa010"/><ellipse cx="27" cy="15" rx="4" ry="6" fill="#caa010"/><circle cx="21" cy="25" r="4" fill="rgba(255,255,255,0.22)"/></svg>`,
  GRAPE:`<svg viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><line x1="27" y1="8" x2="27" y2="16" stroke="#5a3090" stroke-width="2.5" stroke-linecap="round"/><path d="M27 13 Q35 10 37 15" stroke="#4a2070" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="20" cy="22" r="8" fill="#7040c0"/><circle cx="34" cy="22" r="8" fill="#7040c0"/><circle cx="27" cy="33" r="8" fill="#7040c0"/><circle cx="27" cy="44" r="7" fill="#5c30a8"/><circle cx="17" cy="18" r="3" fill="rgba(200,160,255,0.3)"/><circle cx="31" cy="18" r="3" fill="rgba(200,160,255,0.3)"/><circle cx="24" cy="29" r="3" fill="rgba(200,160,255,0.3)"/><circle cx="24" cy="40" r="2.5" fill="rgba(200,160,255,0.25)"/></svg>`,
  DIAMOND:`<svg viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><polygon points="27,5 47,23 27,49 7,23" fill="#50b8e8"/><polygon points="27,5 47,23 27,23" fill="#88d8ff"/><polygon points="7,23 27,23 27,49" fill="#309ab0"/><polygon points="17,23 27,5 37,23" fill="rgba(255,255,255,0.35)"/></svg>`,
};

const SYMBOL_KEYS  = ['SEVEN','DIAMOND','BELL','GRAPE','LEMON','CHERRY','CHERRY','LEMON','LEMON','GRAPE','GRAPE','BELL'];
const SYMBOL_NAMES = { SEVEN:'Seven', DIAMOND:'Diamond', BELL:'Bell', GRAPE:'Grape', LEMON:'Lemon', CHERRY:'Cherry' };
const SYMBOL_MULT  = { SEVEN:80, DIAMOND:40, BELL:14, GRAPE:7, LEMON:4, CHERRY:3 };
const PAYTABLE_ROWS = [
  { keys:['SEVEN','SEVEN','SEVEN'],       mult:'× 80' },
  { keys:['DIAMOND','DIAMOND','DIAMOND'], mult:'× 40' },
  { keys:['BELL','BELL','BELL'],          mult:'× 14' },
  { keys:['GRAPE','GRAPE','GRAPE'],       mult:'× 7'  },
  { keys:['LEMON','LEMON','LEMON'],       mult:'× 4'  },
  { keys:['CHERRY','CHERRY','CHERRY'],    mult:'× 3'  },
  { keys:[], label:'Any 2 match',         mult:'× 1.5'  },
];

const UPGRADES = [
  {
    id: 'auto_spin', name: 'Auto Spin', maxLevel: 1, iconColor: 'blue',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 3 A8 8 0 1 1 3 11" stroke="#60a8e0" stroke-width="2" stroke-linecap="round"/><polyline points="3,7 3,11 7,11" stroke="#60a8e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    levels: [{ cost: 600, desc: 'Enables auto-spin with adjustable speed controls.' }],
  },
  {
    id: 'double_down', name: 'Double Down', maxLevel: 1, iconColor: 'green',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="3" y="16" font-family="'Cinzel Decorative',serif" font-size="13" font-weight="900" fill="#80c040">2x</text></svg>`,
    levels: [{ cost: 750, desc: 'After a win, gamble the payout to double it — or lose it.' }],
  },
  {
    id: 'lucky_streak', name: 'Lucky Streak', maxLevel: 3, iconColor: 'orange',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="2,16 7,9 11,13 15,6 20,8" stroke="#e09050" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    levels: [
      { cost: 900,  desc: 'Each consecutive win stacks +10% onto payouts.' },
      { cost: 2000, desc: 'Streak bonus grows to +15% per win.' },
      { cost: 3800, desc: 'Streak bonus peaks at +22% per win.' },
    ],
  },
  {
    id: 'win_boost', name: 'Win Boost', maxLevel: 3, iconColor: 'gold',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="11,2 13.5,8.5 20.5,8.5 15,12.5 17,19 11,15 5,19 7,12.5 1.5,8.5 8.5,8.5" fill="#d4a843"/></svg>`,
    levels: [
      { cost: 1500, desc: 'All winnings permanently increased by +15%.' },
      { cost: 3200, desc: 'Win bonus grows to +28%.' },
      { cost: 6000, desc: 'Win bonus maximized at +45%.' },
    ],
  },
  {
    id: 'safety_net', name: 'Safety Net', maxLevel: 2, iconColor: 'purple',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 2 L19 6 L19 12 C19 16 15 19.5 11 21 C7 19.5 3 16 3 12 L3 6 Z" stroke="#c080e0" stroke-width="1.8" fill="none"/><path d="M7 11 L10 14 L15 8" stroke="#c080e0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    levels: [
      { cost: 1000, desc: 'On bust, receive 100 rescue credits once per run.' },
      { cost: 2500, desc: 'Rescue upgraded to 300 credits.' },
    ],
  },
  {
    id: 'high_roller', name: 'High Roller', maxLevel: 2, iconColor: 'red',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="#e06060" stroke-width="1.8"/><text x="11" y="15" text-anchor="middle" font-family="'Cinzel',serif" font-size="7" font-weight="700" fill="#e06060">100+</text></svg>`,
    levels: [
      { cost: 1800, desc: 'Unlocks a 100-credit bet option.' },
      { cost: 4500, desc: 'Unlocks a 250-credit bet for extreme risk.' },
    ],
  },
  {
    id: 'lucky_reel', name: 'Lucky Reel', maxLevel: 3, iconColor: 'teal',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="16" height="16" rx="3" stroke="#40c0b0" stroke-width="1.8"/><circle cx="11" cy="11" r="3" fill="#40c0b0"/></svg>`,
    levels: [
      { cost: 1200, desc: 'Slightly raises odds for all three-of-a-kind results.' },
      { cost: 2800, desc: 'Odds boost doubled. Near-misses become rarer.' },
      { cost: 5500, desc: 'Maximum luck. Three-of-a-kind odds tripled from base.' },
    ],
  },
  {
    id: 'coin_hoarder', name: 'Coin Hoarder', maxLevel: 2, iconColor: 'amber',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="9" r="6" stroke="#d4a843" stroke-width="1.8"/><path d="M5 16 C5 19 17 19 17 16" stroke="#d4a843" stroke-width="1.8" fill="none"/></svg>`,
    levels: [
      { cost: 1400, desc: 'Wins of 7× bet or more pay an extra +60% on top.' },
      { cost: 3500, desc: 'Big win bonus grows to +120%.' },
    ],
  },
  {
    id: 'ghost_spin', name: 'Ghost Spin', maxLevel: 1, iconColor: 'gray',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 20 L5 10 Q5 3 11 3 Q17 3 17 10 L17 20 L14 17 L11 20 L8 17 Z" stroke="#8090a0" stroke-width="1.8" fill="none"/></svg>`,
    levels: [{ cost: 2800, desc: 'Every 8th spin is free — bet is fully refunded regardless of result.' }],
  },
  {
    id: 'custom_bet', name: 'Custom Bet', maxLevel: 1, iconColor: 'amber',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="6" width="18" height="10" rx="2" stroke="#d4a843" stroke-width="1.8"/><line x1="7" y1="9" x2="7" y2="13" stroke="#d4a843" stroke-width="1.5" stroke-linecap="round"/><line x1="11" y1="9" x2="11" y2="13" stroke="#d4a843" stroke-width="1.5" stroke-linecap="round"/><line x1="15" y1="9" x2="15" y2="13" stroke="#d4a843" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    levels: [{ cost: 500, desc: 'Adds a custom bet input — type any amount up to your current credits. Use MAX to go all in.' }],
  },
  {
    id: 'jackpot_boost', name: 'Jackpot Boost', maxLevel: 3, iconColor: 'red',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="11" y="10" text-anchor="middle" font-family="'Cinzel Decorative',serif" font-size="9" font-weight="900" fill="#e04040">7</text><polyline points="6,13 11,19 16,13" stroke="#e04040" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    levels: [
      { cost: 3000,  desc: 'Triple 7s now pay ×100 instead of ×80.' },
      { cost: 7000,  desc: 'Triple 7s upgraded to ×130.' },
      { cost: 15000, desc: 'Triple 7s maxed at ×160. Absolute jackpot.' },
    ],
  },
  {
    id: 'persistence', name: 'Persistence', maxLevel: 2, iconColor: 'orange',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 11 Q11 4 18 11 Q11 18 4 11Z" stroke="#e09050" stroke-width="1.8" fill="none"/><circle cx="11" cy="11" r="2.5" fill="#e09050"/></svg>`,
    levels: [
      { cost: 2500, desc: 'Losing a spin only cuts your streak by half instead of resetting it.' },
      { cost: 5500, desc: 'Losing only cuts streak by 1. You almost never lose your streak.' },
    ],
  },
  {
    id: 'wild_reel', name: 'Wild Reel', maxLevel: 2, iconColor: 'teal',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="16" height="16" rx="3" stroke="#40c0b0" stroke-width="1.8"/><text x="11" y="15" text-anchor="middle" font-family="serif" font-size="11" font-weight="900" fill="#40c0b0">W</text></svg>`,
    levels: [
      { cost: 3500, desc: '10% chance the middle reel becomes wild — matching any symbol.' },
      { cost: 8000, desc: 'Wild chance rises to 20%. Any reel can go wild, not just the middle.' },
    ],
  },
  {
    id: 'interest', name: 'Interest', maxLevel: 3, iconColor: 'gold',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="7" r="3" stroke="#d4a843" stroke-width="1.5"/><circle cx="15" cy="15" r="3" stroke="#d4a843" stroke-width="1.5"/><line x1="5" y1="17" x2="17" y2="5" stroke="#d4a843" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    levels: [
      { cost: 2000, desc: 'Earn 2% of your credits as a bonus every 10 spins.' },
      { cost: 4500, desc: 'Interest rises to 4%, paid every 8 spins.' },
      { cost: 9000, desc: 'Interest maxed at 7%, paid every 6 spins.' },
    ],
  },
  {
    id: 'second_chance', name: 'Second Chance', maxLevel: 1, iconColor: 'green',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 11 A6 6 0 1 1 11 17" stroke="#80c040" stroke-width="1.8" stroke-linecap="round"/><polyline points="5,7 5,11 9,11" stroke="#80c040" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    levels: [{ cost: 4000, desc: 'On a loss, 25% chance one reel re-spins for free — potentially turning it into a win.' }],
  },
  {
    id: 'cherry_hunter', name: 'Cherry Hunter', maxLevel: 2, iconColor: 'red',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="13" r="4" fill="#c0392b"/><circle cx="14" cy="13" r="4" fill="#c0392b"/><path d="M11 9 Q13 4 17 5" stroke="#3a7a20" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`,
    levels: [
      { cost: 1600, desc: 'Triple Cherries now pay ×5 instead of ×3.' },
      { cost: 4000, desc: 'Triple Cherries upgraded to ×9.' },
    ],
  },
  {
    id: 'bet_insurance', name: 'Bet Insurance', maxLevel: 2, iconColor: 'purple',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 2 L19 6 L19 12 C19 16 15 19.5 11 21 C7 19.5 3 16 3 12 L3 6 Z" stroke="#c080e0" stroke-width="1.8" fill="none"/><text x="11" y="15" text-anchor="middle" font-family="serif" font-size="9" fill="#c080e0">%</text></svg>`,
    levels: [
      { cost: 2200, desc: 'Recover 20% of your bet back on any losing spin.' },
      { cost: 5000, desc: 'Insurance payout raised to 40% of bet on loss.' },
    ],
  },
  {
    id: 'multiplier_surge', name: 'Multiplier Surge', maxLevel: 3, iconColor: 'amber',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="2,18 6,10 10,14 14,7 19,9" stroke="#d4a843" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="16,6 19,9 16,12" stroke="#d4a843" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    levels: [
      { cost: 4500,  desc: 'On a win streak of 5+, all payouts get an extra +30% on top of streak bonuses.' },
      { cost: 10000, desc: 'Surge triggers at streak 3+, bonus grows to +50%.' },
      { cost: 20000, desc: 'Surge triggers at streak 2+, bonus maxed at +80%.' },
    ],
  },
  {
    id: 'streak_shield', name: 'Streak Shield', maxLevel: 9999, unlimited: true,
    baseCost: 2200, costFactor: 1.5, iconColor: 'purple',
    iconSvg: `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 2 L19 6 L19 12 C19 16 15 19.5 11 21 C7 19.5 3 16 3 12 L3 6 Z" stroke="#a060d0" stroke-width="1.8" fill="none"/><text x="11" y="15" text-anchor="middle" font-family="serif" font-size="9" fill="#a060d0">S</text></svg>`,
    levels: [],
  },
];

const DEFAULT_STATE = {
  credits: 200,
  totalWon: 0,
  upgradeLevels: Object.fromEntries(UPGRADES.map(u => [u.id, 0])),
  safetyNetUsed: false,
  spinCount: 0,
  totalWins: 0,
  maxStreak: 0,
  totalUpgradeSpent: 0,
  doubleDownWins: 0,
  ghostSpinsUsed: 0,
  tripleCounts: { SEVEN:0, DIAMOND:0, BELL:0, GRAPE:0, LEMON:0, CHERRY:0 },
  totalBusts: 0,
  lowestCredits: 9999,
  achievements: [],
  autoSpinCount: 0,
  secondChanceCount: 0,
  interestEarned: 0,
  wildCount: 0,
  insuranceCount: 0,
  biggestWin: 0,
  settings: { startCredits: 200, muteBg: false, muteSfx: false },
};

let state = JSON.parse(JSON.stringify(DEFAULT_STATE));
let bet = 10, spinning = false, streakCount = 0, pendingWin = 0;
let autoRunning = false, autoSpeed = 2200, autoTimer = null;
const strips = [];
const SYMBOL_H = 100;

function lvl(id) { return state.upgradeLevels[id] || 0; }

function getUpgradeCost(u) {
  if (u.unlimited) return Math.round(u.baseCost * Math.pow(u.costFactor, lvl(u.id)));
  const cur = lvl(u.id);
  return cur < u.levels.length ? u.levels[cur].cost : 0;
}

function shortNum(n) {
  if (n < 1000) return n.toString();
  const tiers = [
    [1e18, 'Qt'], [1e15, 'Qd'], [1e12, 'T'],
    [1e9,  'B'],  [1e6,  'M'], [1e3, 'k']
  ];
  for (const [val, suffix] of tiers) {
    if (n >= val) {
      const d = n / val;
      return (d % 1 === 0 ? d.toFixed(0) : d.toFixed(1).replace(/\.0$/, '')) + suffix;
    }
  }
  return n.toString();
}

function saveState() {
  try {
    localStorage.setItem('lucky_reels_v2', JSON.stringify(state));
    const el = document.getElementById('save-indicator');
    if (el) { el.textContent = 'Saved'; el.classList.add('saved'); setTimeout(() => { el.textContent = 'Autosave enabled'; el.classList.remove('saved'); }, 1500); }
  } catch(e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem('lucky_reels_v2');
    if (!raw) return;
    const saved = JSON.parse(raw);
    state.credits  = saved.credits  ?? DEFAULT_STATE.credits;
    state.totalWon = saved.totalWon ?? 0;
    state.safetyNetUsed = saved.safetyNetUsed ?? false;
    state.spinCount     = saved.spinCount     ?? 0;
    state.totalWins     = saved.totalWins     ?? 0;
    state.maxStreak     = saved.maxStreak     ?? 0;
    state.totalUpgradeSpent = saved.totalUpgradeSpent ?? 0;
    state.doubleDownWins    = saved.doubleDownWins    ?? 0;
    state.ghostSpinsUsed    = saved.ghostSpinsUsed    ?? 0;
    state.totalBusts        = saved.totalBusts        ?? 0;
    state.lowestCredits     = saved.lowestCredits     ?? 9999;
    state.achievements      = saved.achievements      ?? [];
    state.autoSpinCount     = saved.autoSpinCount     ?? 0;
    state.secondChanceCount = saved.secondChanceCount ?? 0;
    state.interestEarned    = saved.interestEarned    ?? 0;
    state.wildCount         = saved.wildCount         ?? 0;
    state.insuranceCount    = saved.insuranceCount    ?? 0;
    state.biggestWin        = saved.biggestWin        ?? 0;
    if (saved.tripleCounts) Object.assign(state.tripleCounts, saved.tripleCounts);
    if (saved.settings) Object.assign(state.settings, saved.settings);
    if (saved.upgradeLevels) {
      UPGRADES.forEach(u => {
        if (saved.upgradeLevels[u.id] !== undefined) {
          state.upgradeLevels[u.id] = u.unlimited
            ? Math.max(0, saved.upgradeLevels[u.id])
            : Math.min(saved.upgradeLevels[u.id], u.maxLevel);
        }
      });
    }
  } catch(e) {}
}

const ACHIEVEMENTS = [
  { id:'first_spin',    cat:'Spins',   icon:'S', name:'First Pull',         desc:'Spin the reels for the first time.',             check: s => s.spinCount >= 1 },
  { id:'spin_10',       cat:'Spins',   icon:'S', name:'Getting Started',    desc:'Spin 10 times.',                                 check: s => s.spinCount >= 10 },
  { id:'spin_50',       cat:'Spins',   icon:'S', name:'Regular',            desc:'Spin 50 times.',                                 check: s => s.spinCount >= 50 },
  { id:'spin_100',      cat:'Spins',   icon:'S', name:'Dedicated',          desc:'Spin 100 times.',                                check: s => s.spinCount >= 100, progress: s => `${s.spinCount}/100` },
  { id:'spin_250',      cat:'Spins',   icon:'S', name:'Committed',          desc:'Spin 250 times.',                                check: s => s.spinCount >= 250, progress: s => `${s.spinCount}/250` },
  { id:'spin_500',      cat:'Spins',   icon:'S', name:'Obsessed',           desc:'Spin 500 times.',                                check: s => s.spinCount >= 500, progress: s => `${s.spinCount}/500` },
  { id:'spin_1000',     cat:'Spins',   icon:'S', name:'Machine Whisperer',  desc:'Spin 1,000 times.',                              check: s => s.spinCount >= 1000, progress: s => `${s.spinCount}/1000` },
  { id:'first_win',     cat:'Wins',    icon:'W', name:'First Blood',        desc:'Win on any spin.',                               check: s => s.totalWins >= 1 },
  { id:'wins_10',       cat:'Wins',    icon:'W', name:'Lucky',              desc:'Win 10 times.',                                  check: s => s.totalWins >= 10 },
  { id:'wins_25',       cat:'Wins',    icon:'W', name:'Sharp Eye',          desc:'Win 25 times.',                                  check: s => s.totalWins >= 25, progress: s => `${s.totalWins}/25` },
  { id:'wins_50',       cat:'Wins',    icon:'W', name:'Consistent',         desc:'Win 50 times.',                                  check: s => s.totalWins >= 50, progress: s => `${s.totalWins}/50` },
  { id:'wins_100',      cat:'Wins',    icon:'W', name:'Winner',             desc:'Win 100 times.',                                 check: s => s.totalWins >= 100, progress: s => `${s.totalWins}/100` },
  { id:'wins_250',      cat:'Wins',    icon:'W', name:'Champion',           desc:'Win 250 times.',                                 check: s => s.totalWins >= 250, progress: s => `${s.totalWins}/250` },
  { id:'streak_3',      cat:'Wins',    icon:'W', name:'Hot Streak',         desc:'Win 3 spins in a row.',                          check: s => s.maxStreak >= 3 },
  { id:'streak_5',      cat:'Wins',    icon:'W', name:'On Fire',            desc:'Win 5 spins in a row.',                          check: s => s.maxStreak >= 5 },
  { id:'streak_10',     cat:'Wins',    icon:'W', name:'Unstoppable',        desc:'Win 10 spins in a row.',                         check: s => s.maxStreak >= 10, progress: s => `Best: ${s.maxStreak}/10` },
  { id:'streak_20',     cat:'Wins',    icon:'W', name:'Legendary Run',      desc:'Win 20 spins in a row.',                         check: s => s.maxStreak >= 20, progress: s => `Best: ${s.maxStreak}/20` },
  { id:'streak_30',     cat:'Wins',    icon:'W', name:'God Mode',           desc:'Win 30 spins in a row.',                         check: s => s.maxStreak >= 30, progress: s => `Best: ${s.maxStreak}/30` },
  { id:'cr_500',        cat:'Credits', icon:'C', name:'Pocket Change',      desc:'Hold 500 credits at once.',                      check: s => s.credits >= 500 },
  { id:'cr_1000',       cat:'Credits', icon:'C', name:'Comfortable',        desc:'Hold 1,000 credits at once.',                    check: s => s.credits >= 1000 },
  { id:'cr_2500',       cat:'Credits', icon:'C', name:'Well Off',           desc:'Hold 2,500 credits at once.',                    check: s => s.credits >= 2500 },
  { id:'cr_5000',       cat:'Credits', icon:'C', name:'Rich',               desc:'Hold 5,000 credits at once.',                    check: s => s.credits >= 5000 },
  { id:'cr_10000',      cat:'Credits', icon:'C', name:'Wealthy',            desc:'Hold 10,000 credits at once.',                   check: s => s.credits >= 10000 },
  { id:'cr_50000',      cat:'Credits', icon:'C', name:'Millionaire',        desc:'Hold 50,000 credits at once.',                   check: s => s.credits >= 50000 },
  { id:'won_100',       cat:'Credits', icon:'C', name:'First Hundred',      desc:'Win 100 total credits.',                         check: s => s.totalWon >= 100, progress: s => `${s.totalWon}/100` },
  { id:'won_1000',      cat:'Credits', icon:'C', name:'Big Earner',         desc:'Win 1,000 total credits.',                       check: s => s.totalWon >= 1000, progress: s => `${s.totalWon}/1000` },
  { id:'won_5000',      cat:'Credits', icon:'C', name:'High Earner',        desc:'Win 5,000 total credits.',                       check: s => s.totalWon >= 5000, progress: s => `${s.totalWon}/5000` },
  { id:'won_20000',     cat:'Credits', icon:'C', name:'Fortune',            desc:'Win 20,000 total credits.',                      check: s => s.totalWon >= 20000, progress: s => `${s.totalWon}/20000` },
  { id:'won_100000',    cat:'Credits', icon:'C', name:'Legend',             desc:'Win 100,000 total credits.',                     check: s => s.totalWon >= 100000, progress: s => `${s.totalWon}/100000` },
  { id:'triple_cherry', cat:'Symbols', icon:'R', name:'Cherry Picker',      desc:'Land triple Cherries.',                          check: s => (s.tripleCounts.CHERRY||0) >= 1 },
  { id:'triple_lemon',  cat:'Symbols', icon:'Y', name:'Lemon Drop',         desc:'Land triple Lemons.',                            check: s => (s.tripleCounts.LEMON||0) >= 1 },
  { id:'triple_grape',  cat:'Symbols', icon:'P', name:'Grape Harvest',      desc:'Land triple Grapes.',                            check: s => (s.tripleCounts.GRAPE||0) >= 1 },
  { id:'triple_bell',   cat:'Symbols', icon:'G', name:'Bell Ringer',        desc:'Land triple Bells.',                             check: s => (s.tripleCounts.BELL||0) >= 1 },
  { id:'triple_diamond',cat:'Symbols', icon:'B', name:'Diamond Heist',      desc:'Land triple Diamonds.',                          check: s => (s.tripleCounts.DIAMOND||0) >= 1 },
  { id:'triple_seven',  cat:'Symbols', icon:'7', name:'Lucky Sevens',       desc:'Land triple 7s — jackpot!',                      check: s => (s.tripleCounts.SEVEN||0) >= 1 },
  { id:'cherry_x5',     cat:'Symbols', icon:'R', name:'Cherry Addict',      desc:'Land triple Cherries 5 times.',                  check: s => (s.tripleCounts.CHERRY||0) >= 5, progress: s => `${s.tripleCounts.CHERRY||0}/5` },
  { id:'diamond_x3',    cat:'Symbols', icon:'B', name:'Diamond Collector',  desc:'Land triple Diamonds 3 times.',                  check: s => (s.tripleCounts.DIAMOND||0) >= 3, progress: s => `${s.tripleCounts.DIAMOND||0}/3` },
  { id:'seven_x3',      cat:'Symbols', icon:'7', name:'Jackpot Junkie',     desc:'Land triple 7s three times.',                    check: s => (s.tripleCounts.SEVEN||0) >= 3, progress: s => `${s.tripleCounts.SEVEN||0}/3` },
  { id:'seven_x10',     cat:'Symbols', icon:'7', name:'Jackpot King',       desc:'Land triple 7s ten times.',                      check: s => (s.tripleCounts.SEVEN||0) >= 10, progress: s => `${s.tripleCounts.SEVEN||0}/10` },
  { id:'bet_50',        cat:'Spins',   icon:'$', name:'Big Bet',            desc:'Place a 50-credit bet.',                         check: s => s._betFifty },
  { id:'bet_100',       cat:'Spins',   icon:'$', name:'High Stakes',        desc:'Place a 100-credit bet.',                        check: s => s._betHundred },
  { id:'bet_250',       cat:'Spins',   icon:'$', name:'All In',             desc:'Place a 250-credit bet.',                        check: s => s._betTwoFifty },
  { id:'dd_first',      cat:'Wins',    icon:'D', name:'Gambler',            desc:'Use Double Down for the first time.',             check: s => s._ddUsed },
  { id:'dd_win',        cat:'Wins',    icon:'D', name:'Risk Taker',         desc:'Win a Double Down.',                             check: s => s.doubleDownWins >= 1 },
  { id:'dd_win5',       cat:'Wins',    icon:'D', name:'Daredevil',          desc:'Win 5 Double Downs.',                            check: s => s.doubleDownWins >= 5, progress: s => `${s.doubleDownWins}/5` },
  { id:'first_upgrade', cat:'Credits', icon:'U', name:'First Step',         desc:'Purchase your first upgrade.',                   check: s => s.totalUpgradeSpent >= 1 },
  { id:'spent_3000',    cat:'Credits', icon:'U', name:'Investor',           desc:'Spend 3,000 credits on upgrades.',               check: s => s.totalUpgradeSpent >= 3000, progress: s => `${s.totalUpgradeSpent}/3000` },
  { id:'spent_10000',   cat:'Credits', icon:'U', name:'High Spender',       desc:'Spend 10,000 credits on upgrades.',              check: s => s.totalUpgradeSpent >= 10000, progress: s => `${s.totalUpgradeSpent}/10000` },
  { id:'max_upgrade',   cat:'Credits', icon:'U', name:'Perfection',         desc:'Max out any upgrade to its highest level.',      check: s => UPGRADES.some(u => s.upgradeLevels[u.id] >= u.maxLevel) },
  { id:'busted',        cat:'Spins',   icon:'X', name:'Rock Bottom',        desc:'Hit 0 credits.',                                 check: s => s.totalBusts >= 1 },
  { id:'comeback',      cat:'Wins',    icon:'W', name:'Comeback Kid',       desc:'Win a spin while holding fewer than 20 credits.', check: s => s._comebackDone },
  { id:'safety_first',  cat:'Spins',   icon:'S', name:'Safety First',       desc:'Trigger the Safety Net.',                        check: s => s._safetyTriggered },
  { id:'ghost_rider',   cat:'Spins',   icon:'G', name:'Ghost Rider',        desc:'Use 5 free Ghost Spins.',                        check: s => s.ghostSpinsUsed >= 5,  progress: s => `${s.ghostSpinsUsed}/5` },
  { id:'ghost_x20',     cat:'Spins',   icon:'G', name:'Phantom',            desc:'Use 20 free Ghost Spins.',                       check: s => s.ghostSpinsUsed >= 20, progress: s => `${s.ghostSpinsUsed}/20` },
  { id:'ghost_x50',     cat:'Spins',   icon:'G', name:'Spectral',           desc:'Use 50 free Ghost Spins.',                       check: s => s.ghostSpinsUsed >= 50, progress: s => `${s.ghostSpinsUsed}/50` },
  { id:'spin_2000',     cat:'Spins',   icon:'S', name:'No Life',            desc:'Spin 2,000 times.',                              check: s => s.spinCount >= 2000,    progress: s => `${s.spinCount}/2000` },
  { id:'spin_5000',     cat:'Spins',   icon:'S', name:'Send Help',          desc:'Spin 5,000 times.',                              check: s => s.spinCount >= 5000,    progress: s => `${s.spinCount}/5000` },
  { id:'auto_100',      cat:'Spins',   icon:'S', name:'Hands Free',         desc:'Complete 100 auto spins.',                       check: s => s.autoSpinCount >= 100, progress: s => `${s.autoSpinCount}/100` },
  { id:'auto_500',      cat:'Spins',   icon:'S', name:'Autopilot',          desc:'Complete 500 auto spins.',                       check: s => s.autoSpinCount >= 500, progress: s => `${s.autoSpinCount}/500` },
  { id:'auto_2000',     cat:'Spins',   icon:'S', name:'Robot',              desc:'Complete 2,000 auto spins.',                     check: s => s.autoSpinCount >= 2000,progress: s => `${s.autoSpinCount}/2000` },
  { id:'busted_x5',     cat:'Spins',   icon:'X', name:'Glutton for Pain',   desc:'Go broke 5 times.',                              check: s => s.totalBusts >= 5,      progress: s => `${s.totalBusts}/5` },
  { id:'busted_x10',    cat:'Spins',   icon:'X', name:'Masochist',          desc:'Go broke 10 times.',                             check: s => s.totalBusts >= 10,     progress: s => `${s.totalBusts}/10` },
  { id:'second_chance_1',cat:'Spins',  icon:'S', name:'Lucky Break',        desc:'Trigger Second Chance for the first time.',      check: s => s.secondChanceCount >= 1 },
  { id:'second_chance_10',cat:'Spins', icon:'S', name:'Escape Artist',      desc:'Trigger Second Chance 10 times.',                check: s => s.secondChanceCount >= 10,progress: s => `${s.secondChanceCount}/10` },
  { id:'wild_first',    cat:'Symbols', icon:'W', name:'Wild Card',          desc:'Trigger a Wild Reel for the first time.',        check: s => s.wildCount >= 1 },
  { id:'wild_x10',      cat:'Symbols', icon:'W', name:'Going Wild',         desc:'Trigger a Wild Reel 10 times.',                  check: s => s.wildCount >= 10,      progress: s => `${s.wildCount}/10` },
  { id:'wild_x50',      cat:'Symbols', icon:'W', name:'Wild at Heart',      desc:'Trigger a Wild Reel 50 times.',                  check: s => s.wildCount >= 50,      progress: s => `${s.wildCount}/50` },
  { id:'insurance_1',   cat:'Spins',   icon:'S', name:'Covered',            desc:'Trigger Bet Insurance for the first time.',      check: s => s.insuranceCount >= 1 },
  { id:'insurance_50',  cat:'Spins',   icon:'S', name:'Safety Net Pro',     desc:'Trigger Bet Insurance 50 times.',                check: s => s.insuranceCount >= 50, progress: s => `${s.insuranceCount}/50` },
  { id:'wins_500',      cat:'Wins',    icon:'W', name:'Veteran',            desc:'Win 500 times.',                                 check: s => s.totalWins >= 500,     progress: s => `${s.totalWins}/500` },
  { id:'wins_1000',     cat:'Wins',    icon:'W', name:'Seasoned Pro',       desc:'Win 1,000 times.',                               check: s => s.totalWins >= 1000,    progress: s => `${s.totalWins}/1000` },
  { id:'streak_50',     cat:'Wins',    icon:'W', name:'Demigod',            desc:'Win 50 spins in a row.',                         check: s => s.maxStreak >= 50,      progress: s => `Best: ${s.maxStreak}/50` },
  { id:'streak_100',    cat:'Wins',    icon:'W', name:'Ascended',           desc:'Win 100 spins in a row.',                        check: s => s.maxStreak >= 100,     progress: s => `Best: ${s.maxStreak}/100` },
  { id:'dd_win10',      cat:'Wins',    icon:'D', name:'Double Trouble',     desc:'Win 10 Double Downs.',                           check: s => s.doubleDownWins >= 10, progress: s => `${s.doubleDownWins}/10` },
  { id:'dd_win25',      cat:'Wins',    icon:'D', name:'Double Agent',       desc:'Win 25 Double Downs.',                           check: s => s.doubleDownWins >= 25, progress: s => `${s.doubleDownWins}/25` },
  { id:'comeback_x5',   cat:'Wins',    icon:'W', name:'Unbreakable',        desc:'Win from under 20 credits 5 times.',             check: s => (s.comebackCount||0) >= 5, progress: s => `${s.comebackCount||0}/5` },
  { id:'cr_100000',     cat:'Credits', icon:'C', name:'Mogul',              desc:'Hold 100,000 credits at once.',                  check: s => s.credits >= 100000 },
  { id:'cr_500000',     cat:'Credits', icon:'C', name:'Tycoon',             desc:'Hold 500,000 credits at once.',                  check: s => s.credits >= 500000 },
  { id:'won_500000',    cat:'Credits', icon:'C', name:'Unstoppable Force',  desc:'Win 500,000 total credits.',                     check: s => s.totalWon >= 500000,   progress: s => `${s.totalWon}/500k` },
  { id:'won_1m',        cat:'Credits', icon:'C', name:'Immortal',           desc:'Win 1,000,000 total credits.',                   check: s => s.totalWon >= 1000000,  progress: s => `${s.totalWon}/1M` },
  { id:'spent_30000',   cat:'Credits', icon:'U', name:'Whale',              desc:'Spend 30,000 credits on upgrades.',              check: s => s.totalUpgradeSpent >= 30000,  progress: s => `${s.totalUpgradeSpent}/30k` },
  { id:'spent_100000',  cat:'Credits', icon:'U', name:'All In',             desc:'Spend 100,000 credits on upgrades.',             check: s => s.totalUpgradeSpent >= 100000, progress: s => `${s.totalUpgradeSpent}/100k` },
  { id:'interest_1000', cat:'Credits', icon:'C', name:'Compound Interest',  desc:'Earn 1,000 credits from Interest.',              check: s => s.interestEarned >= 1000,      progress: s => `${s.interestEarned}/1000` },
  { id:'interest_10000',cat:'Credits', icon:'C', name:'Passive Income',     desc:'Earn 10,000 credits from Interest.',             check: s => s.interestEarned >= 10000,     progress: s => `${s.interestEarned}/10k` },
  { id:'biggest_500',   cat:'Credits', icon:'C', name:'Big Payout',         desc:'Win 500 credits from a single spin.',            check: s => s.biggestWin >= 500 },
  { id:'biggest_5000',  cat:'Credits', icon:'C', name:'Massive Payout',     desc:'Win 5,000 credits from a single spin.',          check: s => s.biggestWin >= 5000 },
  { id:'biggest_50000', cat:'Credits', icon:'C', name:'Life Changing',      desc:'Win 50,000 credits from a single spin.',         check: s => s.biggestWin >= 50000 },
  { id:'cherry_x10',    cat:'Symbols', icon:'R', name:'Cherry Farm',        desc:'Land triple Cherries 10 times.',                 check: s => (s.tripleCounts.CHERRY||0) >= 10,  progress: s => `${s.tripleCounts.CHERRY||0}/10` },
  { id:'bell_x5',       cat:'Symbols', icon:'G', name:'Bell Tower',         desc:'Land triple Bells 5 times.',                    check: s => (s.tripleCounts.BELL||0) >= 5,     progress: s => `${s.tripleCounts.BELL||0}/5` },
  { id:'grape_x5',      cat:'Symbols', icon:'P', name:'Vineyard',           desc:'Land triple Grapes 5 times.',                   check: s => (s.tripleCounts.GRAPE||0) >= 5,    progress: s => `${s.tripleCounts.GRAPE||0}/5` },
  { id:'lemon_x5',      cat:'Symbols', icon:'Y', name:'Lemonade Stand',     desc:'Land triple Lemons 5 times.',                   check: s => (s.tripleCounts.LEMON||0) >= 5,    progress: s => `${s.tripleCounts.LEMON||0}/5` },
  { id:'seven_x25',     cat:'Symbols', icon:'7', name:'Lucky Streak King',  desc:'Land triple 7s 25 times.',                      check: s => (s.tripleCounts.SEVEN||0) >= 25,   progress: s => `${s.tripleCounts.SEVEN||0}/25` },
  { id:'all_triples',   cat:'Symbols', icon:'7', name:'Collector',          desc:'Land every symbol as a triple at least once.',   check: s => Object.values(s.tripleCounts||{}).every(v => v >= 1) },
  { id:'all_upgrades',  cat:'Credits', icon:'U', name:'Completionist',      desc:'Purchase at least one level of every upgrade.',  check: s => UPGRADES.filter(u=>!u.unlimited).every(u => (s.upgradeLevels[u.id]||0) >= 1) },
];

const ACH_ICON_COLORS = { S:'rgba(60,120,200,.25)', W:'rgba(200,120,20,.25)', C:'rgba(180,130,10,.25)', R:'rgba(160,30,30,.25)', Y:'rgba(160,130,10,.25)', P:'rgba(100,30,160,.25)', G:'rgba(30,120,100,.25)', B:'rgba(30,100,160,.25)', '7':'rgba(180,30,30,.25)', '$':'rgba(30,120,30,.25)', D:'rgba(30,140,30,.25)', U:'rgba(180,130,20,.25)', X:'rgba(80,80,80,.25)' };
const ACH_TEXT_COLORS  = { S:'#60a0e0', W:'#d09030', C:'#d4a843', R:'#e05050', Y:'#d0c020', P:'#a060d0', G:'#40c0a0', B:'#4090d0', '7':'#e04040', '$':'#50b050', D:'#60c060', U:'#c0a020', X:'#909090' };