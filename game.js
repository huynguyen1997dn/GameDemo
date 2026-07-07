// ============================
// DATA DEFINITIONS
// ============================
const R = {
  catnip:   { name:'Catnip',   icon:'🌿', baseCap:100, desc:'Food for kittens. If it reaches 0, the village starts starving.' },
  wood:     { name:'Wood',     icon:'🪵', baseCap:100, desc:'Basic building material. Chop trees to gather.' },
  minerals: { name:'Minerals', icon:'🪨', baseCap:100, desc:'Stone and ore for advanced construction.' },
  coal:     { name:'Coal',     icon:'🖤', baseCap:50,  desc:'Fuel for the Smelter. Found while mining.' },
  iron:     { name:'Iron',     icon:'⛏️', baseCap:50,  desc:'Smelted from Minerals and Coal.' },
  science:  { name:'Science',  icon:'🔬', baseCap:100, desc:'Knowledge used for research.' },
  beam:     { name:'Beam',     icon:'📐', baseCap:50,  desc:'Crafted from Wood. Used in construction.' },
  slab:     { name:'Slab',     icon:'▣',  baseCap:50,  desc:'Crafted from Minerals. Used in construction.' }
};

const R_ORDER = ['catnip','wood','minerals','coal','iron','science','beam','slab'];

const JOBS = {
  farmer:     { name:'Farmer',     icon:'🌾', unlockTech:null,      produces:'catnip',   desc:'Produces Catnip. Essential before winter.' },
  woodcutter: { name:'Woodcutter', icon:'🪓', unlockTech:null,      produces:'wood',     desc:'Chops trees for Wood.' },
  miner:      { name:'Miner',      icon:'⛏️', unlockTech:'mining',  produces:'minerals', desc:'Extracts Minerals. Small chance of Coal.' },
  scholar:    { name:'Scholar',    icon:'📖', unlockTech:null,      produces:'science',  desc:'Studies to produce Science.' }
};

const JOB_ORDER = ['farmer','woodcutter','miner','scholar'];

const B = {
  field:{
    name:'Catnip Field', icon:'🌱', cost:{ wood:5 },
    effect:'Catnip production per Farmer',
    desc:'A small patch of catnip. Each farmer produces more per field.',
    unlockTech:null, color:'type-field', maxCount:5,
    mapPositions:[[30,55],[18,68],[42,68],[25,80],[50,80]]
  },
  hut:{
    name:'Hut', icon:'🏠', cost:{ wood:5 },
    effect:'+1 max kitten',
    desc:'A tiny wooden hut. Adds space for one more kitten.',
    unlockTech:null, color:'type-hut', maxCount:10,
    mapPositions:[[5,45],[14,52],[8,62],[22,55],[18,70],[30,50],[40,75],[55,55],[65,50],[70,65]]
  },
  barn:{
    name:'Barn', icon:'🏚️', cost:{ wood:10 },
    effect:'+100 storage (catnip, wood, minerals)',
    desc:'Increases storage for basic resources.',
    unlockTech:'agriculture', color:'type-barn', maxCount:3,
    mapPositions:[[25,38],[40,35],[55,38]]
  },
  mine:{
    name:'Mine', icon:'⛰️', cost:{ wood:15, minerals:10 },
    effect:'Unlocks better Minerals production',
    desc:'A cave entrance. Miners produce more minerals with each mine.',
    unlockTech:'mining', color:'type-mine', maxCount:3,
    mapPositions:[[72,30],[82,38],[85,50]]
  },
  workshop:{
    name:'Workshop', icon:'🔨', cost:{ wood:20, minerals:15 },
    effect:'Unlocks crafting',
    desc:'A wooden workbench hut. Enables crafting.',
    unlockTech:'mining', color:'type-workshop', maxCount:2,
    mapPositions:[[5,30],[12,38]]
  },
  library:{
    name:'Library', icon:'📚', cost:{ wood:25 },
    effect:'Scholars produce Science',
    desc:'Scholars produce science with each library.',
    unlockTech:null, color:'type-library', maxCount:2,
    mapPositions:[[38,18],[52,18]]
  },
  smelter:{
    name:'Smelter', icon:'🔥', cost:{ wood:25, minerals:15 },
    effect:'Produces Iron from Minerals + Coal',
    desc:'Smelts Iron using Minerals and Coal.',
    unlockTech:'metalworking', color:'type-smelter', maxCount:2,
    mapPositions:[[68,18],[82,25]]
  }
};

const B_ORDER = ['field','hut','barn','mine','workshop','library','smelter'];

const TECHS = {
  calendar:{ name:'Calendar', cost:10, icon:'📅', unlocks:'Seasons cycle', desc:'Understanding the seasons.', prereq:null },
  agriculture:{ name:'Agriculture', cost:30, icon:'🌾', unlocks:'Barn', desc:'Farming techniques.', prereq:'calendar' },
  mining:{ name:'Mining', cost:120, icon:'⛏️', unlocks:'Miner, Mine, Workshop', desc:'Extract minerals.', prereq:'agriculture' },
  writing:{ name:'Writing', cost:300, icon:'✍️', unlocks:'Advanced research', desc:'Record knowledge for future research.', prereq:'mining' },
  metalworking:{ name:'Metalworking', cost:200, icon:'⚒️', unlocks:'Smelter, Iron', desc:'Smelt iron.', prereq:'mining' }
};

const T_ORDER = ['calendar','agriculture','mining','writing','metalworking'];

const CRAFTS = {
  beam:{ name:'Beam', icon:'📐', inputs:{ wood:175 }, output:'beam', outputQty:1, desc:'175 Wood' },
  slab:{ name:'Slab', icon:'▣', inputs:{ minerals:250 }, output:'slab', outputQty:1, desc:'250 Minerals' }
};

const TRADE_RATIO = { catnip:10, wood:1 };

function doTrade() {
  if (state.resources.catnip.amount < TRADE_RATIO.catnip) return;
  if (state.resources.wood.amount >= state.resources.wood.cap) {
    notify('🪵 Wood storage is full!', 'warning');
    return;
  }
  state.resources.catnip.amount -= TRADE_RATIO.catnip;
  state.resources.wood.amount += TRADE_RATIO.wood;
  notify('🪵 Traded 10 Catnip for 1 Wood!', 'success');
  updateUI();
}

// ============================
// STATE
// ============================
let state;

function createState() {
  const s = {
    resources:{},
    buildings:{},
    jobs:{},
    unlockedJobs:{ farmer:true, woodcutter:true, miner:false, scholar:true },
    techs:{},
    craftsUnlocked:false,
    season:0,
    seasonTick:0,
    seasonLength:45,
    kittens:{ current:0, max:0 },
    happiness:100,
    tick:0,
    tutorial:{ step:0, active:true, completed:false },
    totalCatnipHarvested:0,
    totalTaps:0,
    hutProgress:[],
    starvingTicks:0,
    catnipLowWarned:false,
    winterWarned:false,
    gameOver:false
  };
  for (const id of R_ORDER) {
    s.resources[id] = { amount: 0, cap: R[id].baseCap };
  }
  for (const id of B_ORDER) s.buildings[id] = 0;
  for (const id of JOB_ORDER) s.jobs[id] = 0;
  for (const id of T_ORDER) s.techs[id] = false;
  return s;
}

// ============================
// ENGINE
// ============================
function getCost(buildingId, count) {
  const base = B[buildingId].cost;
  const mult = Math.pow(1.12, count);
  const cost = {};
  for (const [res, amt] of Object.entries(base)) {
    cost[res] = Math.ceil(amt * mult);
  }
  return cost;
}

function canAfford(cost) {
  for (const [res, amt] of Object.entries(cost)) {
    if ((state.resources[res]?.amount ?? 0) < amt) return false;
  }
  return true;
}

function spend(cost) {
  for (const [res, amt] of Object.entries(cost)) {
    state.resources[res].amount -= amt;
  }
}

function getResourceProduction() {
  const prod = { catnip:0, wood:0, minerals:0, coal:0, science:0, iron:0 };

  const f = state.buildings.field;
  const wc = state.jobs.woodcutter;
  const mn = state.jobs.miner;
  const mg = state.buildings.mine;
  const sc = state.jobs.scholar;
  const lb = state.buildings.library;
  const sm = state.buildings.smelter;

  let cp = state.jobs.farmer * (1.0 + f * 0.5);
  const seasonMul = [1.5, 1.0, 1.0, 0.25][state.season];
  cp *= seasonMul;
  cp *= (state.happiness / 100);
  prod.catnip = cp;

  prod.wood = wc * 0.5;

  prod.minerals = mn * (0.2 + mg * 0.15);

  prod.coal = 0;
  for (let i = 0; i < mn; i++) {
    if (Math.random() < 0.05) prod.coal += 0.5;
  }

  prod.science = (state.kittens.current * 0.02) + (state.jobs.farmer * 0.01) + (wc * 0.01) + (sc * (0.035 + lb * 0.035));

  if (sm > 0) {
    const ironRate = sm * 0.1;
    const mineralCost = ironRate * 2;
    const coalCost = ironRate * 1;
    if (state.resources.minerals.amount >= mineralCost && state.resources.coal.amount >= coalCost) {
      state.resources.minerals.amount -= mineralCost;
      state.resources.coal.amount -= coalCost;
      prod.iron = ironRate;
    }
  }

  return prod;
}

function getCatnipConsumption() {
  return state.kittens.current * 0.75;
}

function tick() {
  if (state.gameOver) return;
  state.tick++;

  const prod = getResourceProduction();
  const consume = getCatnipConsumption();

  for (const [res, amt] of Object.entries(prod)) {
    if (state.resources[res]) {
      state.resources[res].amount += amt;
    }
  }

  state.resources.catnip.amount -= consume;
  state.totalCatnipHarvested += Math.max(0, prod.catnip);

  for (const id of R_ORDER) {
    const r = state.resources[id];
    r.amount = Math.max(0, Math.min(r.amount, r.cap));
  }

  // Hut migration: mỗi 5 ticks 1 mèo đến
  for (let i = 0; i < state.hutProgress.length; i++) {
    if (state.hutProgress[i] > 0) {
      state.hutProgress[i]--;
      if (state.hutProgress[i] === 0 && state.kittens.current < state.kittens.max) {
        state.kittens.current++;
        if (state.kittens.current === 1) {
          state.jobs.farmer = 1;
          notify('🐱 Your first kitten has arrived and is now a Farmer!', 'success');
        } else {
          notify('🐱 A new kitten has arrived!', 'success');
        }
      }
    }
  }

  // Starvation
  if (state.resources.catnip.amount <= 0 && consume > 0) {
    state.starvingTicks++;
    if (state.starvingTicks === 10) {
      notify('😿 Kittens are starving! Lost 1 kitten.', 'warning');
      killKitten();
    } else if (state.starvingTicks > 10 && (state.starvingTicks - 10) % 5 === 0) {
      if (state.kittens.current > 0) {
        notify('😿 A kitten has died from starvation.', 'warning');
        killKitten();
      }
    }
  } else {
    state.starvingTicks = 0;
  }

  if (prod.catnip < consume * 0.5 && state.tick > 20) {
    if (!state.catnipLowWarned) {
      state.catnipLowWarned = true;
      notify('🌿 Catnip production is very low! Build more fields.', 'warning');
    }
  } else {
    state.catnipLowWarned = false;
  }

  state.seasonTick++;
  if (state.seasonTick >= state.seasonLength && state.techs.calendar) {
    state.seasonTick = 0;
    state.season = (state.season + 1) % 4;
    const seasonNames = ['Spring','Summer','Autumn','Winter'];
    notify(`🍂 ${seasonNames[state.season]} has arrived!`, 'info');
    if (state.season === 3 && !state.winterWarned) {
      notify('❄️ Winter is here! Catnip production is reduced!', 'warning');
      state.winterWarned = true;
    }
  }

  updateCats();
  updateUI();
  checkTutorial();
}

// ============================
// NOTIFICATIONS
// ============================
let notifTimers = [];

function notify(text, type = 'info') {
  const container = document.getElementById('notification-container');
  const el = document.createElement('div');
  el.className = `notification ${type}`;
  el.textContent = text;
  container.appendChild(el);
  const t = setTimeout(() => { el.remove(); }, 3000);
  notifTimers.push(t);
}

// ============================
// MAP BUILDINGS
// ============================
function renderMap() {
  const layer = document.getElementById('buildings-layer');
  layer.innerHTML = '';
  for (const id of B_ORDER) {
    const cfg = B[id];
    const count = state.buildings[id];
    for (let i = 0; i < count && i < cfg.mapPositions.length; i++) {
      const [x, y] = cfg.mapPositions[i];
      const el = document.createElement('div');
      el.className = `building-sprite ${cfg.color}`;
      el.style.left = x + '%';
      el.style.top = y + '%';
      el.innerHTML = `<div class="b-icon">${cfg.icon}</div><div class="b-label">${cfg.name}</div>`;
      if (id === 'smelter') {
        const smoke = document.createElement('div');
        smoke.className = 'smelter-smoke';
        el.appendChild(smoke);
        setTimeout(() => {
          const s2 = document.createElement('div');
          s2.className = 'smelter-smoke';
          s2.style.animationDelay = '1s';
          el.appendChild(s2);
        }, 100);
      }
      if (id === 'hut' && i < state.hutProgress.length) {
        const p = state.hutProgress[i];
        const pct = p === 0 ? 100 : ((5 - p) / 5) * 100;
        const bar = document.createElement('div');
        bar.className = 'hut-progress';
        bar.innerHTML = `<div class="hut-progress-fill" style="width:${pct}%"></div>`;
        el.appendChild(bar);
      }
      layer.appendChild(el);
      requestAnimationFrame(() => el.classList.add('visible'));
    }
  }

  const seasonNames = ['spring','summer','autumn','winter'];
  document.getElementById('map-container').className = 'season-' + seasonNames[state.season];
}

// ============================
// CAT ANIMATION
// ============================
let catEls = [];

function updateCats() {
  const layer = document.getElementById('cats-layer');
  const target = Math.min(state.kittens.current, 6);
  while (catEls.length < target) {
    const el = document.createElement('div');
    el.className = 'cat-sprite';
    const sx = 5 + Math.random() * 85;
    const sy = 5 + Math.random() * 80;
    el.textContent = '🐱';
    el.style.left = sx + '%';
    el.style.top = sy + '%';
    el.dataset.tx = sx;
    el.dataset.ty = sy;
    el.dataset.pause = '0';
    layer.appendChild(el);
    catEls.push(el);
  }
  while (catEls.length > target) {
    const el = catEls.pop();
    el.remove();
  }
  for (const el of catEls) {
    let pause = parseInt(el.dataset.pause) || 0;
    if (pause <= 0) {
      const nx = 5 + Math.random() * 85;
      const ny = 5 + Math.random() * 80;
      el.dataset.tx = nx;
      el.dataset.ty = ny;
      el.style.left = nx + '%';
      el.style.top = ny + '%';
      el.style.transitionDuration = (2 + Math.random() * 2) + 's';
      el.dataset.pause = (2 + Math.floor(Math.random() * 3)) + '';
    } else {
      el.dataset.pause = (pause - 1) + '';
    }
  }
}

// ============================
// UI RENDERING
// ============================
let prevAmounts = {};

function updateUI() {
  renderResourceBar();
  renderStarvationBar();
  updateHutProgress();
  const activeTab = document.querySelector('.tab-panel.active');
  if (activeTab) {
    const tabId = activeTab.id.replace('tab-', '');
    renderTab(tabId);
  }
}

function renderStarvationBar() {
  const bar = document.getElementById('starvation-bar');
  const fill = bar.querySelector('.starvation-fill');
  const text = bar.querySelector('.starvation-text');
  if (state.starvingTicks > 0 && state.kittens.current > 0) {
    bar.classList.remove('hidden');
    const max = state.starvingTicks < 10 ? 10 : 5;
    const cur = state.starvingTicks < 10 ? state.starvingTicks : (state.starvingTicks - 10) % 5;
    const pct = Math.min((cur / max) * 100, 100);
    fill.style.width = pct + '%';
    if (pct < 40) fill.style.background = '#e8c84a';
    else if (pct < 70) fill.style.background = '#e89840';
    else fill.style.background = '#d46040';
    if (state.starvingTicks < 10) {
      text.textContent = `${10 - state.starvingTicks}s until kitten dies`;
    } else {
      text.textContent = `⚠️ ${5 - cur}s until next death`;
    }
  } else {
    bar.classList.add('hidden');
    fill.style.width = '0%';
  }
}

function updateHutProgress() {
  const fills = document.querySelectorAll('.hut-progress-fill');
  fills.forEach((fill, i) => {
    if (i < state.hutProgress.length) {
      const p = state.hutProgress[i];
      const pct = p === 0 ? 100 : ((5 - p) / 5) * 100;
      fill.style.width = pct + '%';
    }
  });
}

function renderResourceBar() {
  const container = document.getElementById('resources-scroll');
  const scrollLeft = container.scrollLeft;
  container.innerHTML = '';
  const displayResources = ['catnip','wood','minerals','coal','iron','science'];
  const prod = getResourceProduction();
  for (const id of displayResources) {
    const r = state.resources[id];
    const cfg = R[id];
    const delta = id === 'catnip'
      ? prod.catnip - getCatnipConsumption()
      : prod[id] || 0;

    const prev = prevAmounts[id] ?? r.amount;
    let cls = 'res-item';
    if (r.amount > prev) cls += ' pulse';
    if (r.amount >= r.cap) cls += ' at-cap';

    const dCls = delta > 0.005 ? 'positive' : delta < -0.005 ? 'negative' : 'zero';
    const dStr = delta >= 0 ? '+' + delta.toFixed(2) : delta.toFixed(2);

    container.innerHTML += `
      <div class="${cls}" data-res="${id}">
        <span class="res-icon">${cfg.icon}</span>
        <span class="res-info">
          <span class="res-amount">${fmt(r.amount)}</span>
          <span class="res-cap">/ ${fmt(r.cap)}</span>
        </span>
        <span class="res-delta ${dCls}">${dStr}</span>
      </div>
    `;
    prevAmounts[id] = r.amount;
  }
  requestAnimationFrame(() => { container.scrollLeft = scrollLeft; });
}

function renderTab(tabId) {
  const panel = document.getElementById('tab-' + tabId);
  if (!panel) return;
  if (tabId === 'village') renderVillageTab(panel);
  else if (tabId === 'build') renderBuildTab(panel);
  else if (tabId === 'research') renderResearchTab(panel);
  else if (tabId === 'craft') renderCraftTab(panel);
  else if (tabId === 'upgrade') renderUpgradeTab(panel);
}

function renderVillageTab(panel) {
  const k = state.kittens;

  if (k.current <= 0) {
    const hasHut = state.buildings.hut > 0;

    let html = `<div class="village-header">
      <div class="village-stat">🌿 <span class="stat-label">Catnip</span> ${fmt(state.resources.catnip.amount)} / ${fmt(state.resources.catnip.cap)}</div>
      <div class="village-stat">🪵 <span class="stat-label">Wood</span> ${fmt(state.resources.wood.amount)} / ${fmt(state.resources.wood.cap)}</div>
    </div>`;

    if (hasHut && k.current === 0) {
      const remaining = state.hutProgress[0] || 0;
      html += `<div class="gathering-wait">
        <p>🐱 <b>A kitten is on its way...</b></p>
        <div class="wait-track"><div class="wait-fill" style="width:${((5 - remaining) / 5) * 100}%"></div></div>
        <p class="gathering-hint">Arriving in ~${remaining}s</p>
      </div>`;
    } else {
      html += `<div class="gathering-section">
        <p>👆 Tap the map above to gather Catnip!</p>
        <button class="trade-btn" ${state.resources.catnip.amount >= 10 && state.resources.wood.amount < state.resources.wood.cap ? '' : 'disabled'}>
          🔄 Trade 10 🌿 → 1 🪵
        </button>`;

      if (state.resources.wood.amount > 0 && !hasHut) {
        html += `<p class="gathering-hint">🏗️ Go to the <b>Build</b> tab to build a Hut!</p>`;
      }
      if (state.resources.catnip.amount < 10) {
        html += `<p class="gathering-hint">Need 10 Catnip to trade for Wood</p>`;
      }
      if (state.resources.wood.amount >= state.resources.wood.cap) {
        html += `<p class="gathering-hint">🪵 Wood storage full! Build a Hut first.</p>`;
      }
      html += `</div>`;
    }

    panel.innerHTML = html;

    const tradeBtn = panel.querySelector('.trade-btn:not([disabled])');
    if (tradeBtn) tradeBtn.addEventListener('click', doTrade);
    return;
  }

  const prod = getResourceProduction();
  const consume = getCatnipConsumption();
  const netCatnip = prod.catnip - consume;

  let html = `<div class="village-header">
    <div class="village-stat">😺 <span class="stat-label">Kittens</span> ${k.current} / ${k.max}</div>
    <div class="village-stat">❤️ <span class="stat-label">Happiness</span> ${state.happiness}%</div>
    <div class="village-stat ${netCatnip < 0 ? 'warning' : ''}">🌿 <span class="stat-label">Catnip/s</span> ${prod.catnip.toFixed(2)} - ${consume.toFixed(2)} = ${netCatnip.toFixed(2)}</div>
  </div>`;

  const canTrade = state.resources.catnip.amount >= 10 && state.resources.wood.amount < state.resources.wood.cap;
  html += `<div class="trade-row">
    <button class="trade-btn" ${canTrade ? '' : 'disabled'}>🔄 Trade 10 🌿 → 1 🪵</button>
  </div>`;

  for (const jId of JOB_ORDER) {
    const job = JOBS[jId];
    const count = state.jobs[jId];
    const unlocked = state.unlockedJobs[jId];

    if (!unlocked) {
      html += `<div class="job-row job-locked">
        <span class="job-icon">🔒</span>
        <span class="job-name">${job.name}</span>
        <span class="job-produces">Locked</span>
      </div>`;
      continue;
    }

    const assignedWorkers = Object.values(state.jobs).reduce((a,b)=>a+b, 0);
    const freeKittens = k.current - assignedWorkers;

    html += `<div class="job-row">
      <span class="job-icon">${job.icon}</span>
      <span class="job-name">${job.name}</span>
      <span class="job-produces">+${jobProdBonus(jId)}/s</span>
      <div class="job-controls">
        <button class="job-btn" data-job="${jId}" data-action="minus" ${count <= 0 ? 'disabled' : ''}>−</button>
        <span class="job-count">${count}</span>
        <button class="job-btn" data-job="${jId}" data-action="plus" ${freeKittens <= 0 ? 'disabled' : ''}>+</button>
      </div>
    </div>`;
  }

  panel.innerHTML = html;

  panel.querySelectorAll('.job-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const jId = btn.dataset.job;
      const action = btn.dataset.action;
      if (action === 'plus' && state.jobs[jId] < state.kittens.current) {
        const assigned = Object.values(state.jobs).reduce((a,b)=>a+b, 0);
        if (assigned < state.kittens.current) {
          state.jobs[jId]++;
          renderTab('village');
        }
      } else if (action === 'minus' && state.jobs[jId] > 0) {
        state.jobs[jId]--;
        renderTab('village');
      }
    });
  });

  const tradeBtn = panel.querySelector('.trade-btn:not([disabled])');
  if (tradeBtn) tradeBtn.addEventListener('click', doTrade);
}

function jobProdBonus(jId) {
  const prod = getResourceProduction();
  const map = { farmer:'catnip', woodcutter:'wood', miner:'minerals', scholar:'science' };
  const res = map[jId];
  const count = state.jobs[jId] || 1;
  return (prod[res] / count).toFixed(2);
}

function renderBuildTab(panel) {
  let html = '';
  for (const bId of B_ORDER) {
    const cfg = B[bId];
    const count = state.buildings[bId];
    const locked = cfg.unlockTech && !state.techs[cfg.unlockTech];
    const cost = getCost(bId, count);
    const affordable = canAfford(cost);
    const atMax = count >= cfg.maxCount;
    const canBuild = !locked && affordable && !atMax;

    html += `<div class="build-card ${!canBuild && !locked && !atMax ? 'disabled' : ''}">
      <span class="b-icon">${cfg.icon}</span>
      <div class="b-info">
        <div class="b-name">${cfg.name} ${count > 0 ? `<span class="b-owned">(${count})</span>` : ''}</div>
        <div class="b-desc">${cfg.desc}</div>
        <div class="b-cost">${renderCost(cost)}</div>
        ${locked ? `<div class="b-locked">🔒 Requires: ${TECHS[cfg.unlockTech]?.name || cfg.unlockTech}</div>` : ''}
        ${atMax ? `<div class="b-locked">✅ Max built</div>` : ''}
      </div>
      <button class="build-btn" data-building="${bId}" ${!canBuild ? 'disabled' : ''}>
        Build
      </button>
    </div>`;
  }
  panel.innerHTML = html;

  panel.querySelectorAll('.build-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      const bId = btn.dataset.building;
      buildBuilding(bId);
    });
  });
}

function renderCost(cost) {
  let parts = [];
  for (const [res, amt] of Object.entries(cost)) {
    const have = state.resources[res]?.amount ?? 0;
    const cls = have >= amt ? 'met' : 'unmet';
    parts.push(`<span class="cost-item ${cls}">${R[res]?.icon || ''} ${fmt(amt)}</span>`);
  }
  return parts.join(' ');
}

function buildBuilding(bId) {
  const cfg = B[bId];
  const count = state.buildings[bId];
  if (count >= cfg.maxCount) return;
  const cost = getCost(bId, count);
  if (!canAfford(cost)) return;
  spend(cost);
  state.buildings[bId]++;
  applyBuildingEffects(bId);
  notify(`🏗️ Built ${cfg.name}!`, 'success');
  renderMap();
  updateUI();
  checkTutorial();
}

function applyBuildingEffects(bId) {
  switch (bId) {
    case 'hut':
      state.kittens.max++;
      state.hutProgress.push(5);
      break;
    case 'barn':
      for (const res of ['catnip','wood','minerals']) {
        state.resources[res].cap += 100;
      }
      break;
    case 'workshop':
      state.craftsUnlocked = true;
      break;
    case 'mine':
      break;
    case 'library':
      break;
    case 'smelter':
      break;
    case 'field':
      break;
  }
}

function renderResearchTab(panel) {
  let html = '';
  for (const tId of T_ORDER) {
    const t = TECHS[tId];
    const done = state.techs[tId];
    const prereqMet = !t.prereq || state.techs[t.prereq];
    const affordable = state.resources.science.amount >= t.cost;
    const canResearch = prereqMet && !done && affordable;

    let status = '';
    if (done) status = '<span class="t-status done">✅ Researched</span>';
    else if (!prereqMet) status = '<span class="t-status locked-status">🔒 Locked</span>';
    else status = '';

    html += `<div class="tech-card ${done ? 'researched' : (!prereqMet ? 'locked' : '')}">
      <span class="t-icon">${t.icon}</span>
      <div class="t-info">
        <div class="t-name">${t.name}</div>
        <div class="t-desc">${t.desc} — Unlocks: ${t.unlocks}</div>
        <div class="t-cost">🔬 ${fmt(t.cost)} Science</div>
      </div>
      ${!done ? `<button class="research-btn" data-tech="${tId}" ${!canResearch ? 'disabled' : ''}>Research</button>` : ''}
      ${done ? '<span class="t-status done">✅</span>' : ''}
    </div>`;
  }
  panel.innerHTML = html;

  panel.querySelectorAll('.research-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      const tId = btn.dataset.tech;
      researchTech(tId);
    });
  });
}

function researchTech(tId) {
  const t = TECHS[tId];
  if (state.techs[tId]) return;
  if (state.resources.science.amount < t.cost) return;
  state.resources.science.amount -= t.cost;
  state.techs[tId] = true;
  applyTechEffects(tId);
  notify(`🔬 Researched ${t.name}!`, 'success');
  updateUI();
  checkTutorial();
}

function applyTechEffects(tId) {
  switch (tId) {
    case 'mining':
      state.unlockedJobs.miner = true;
      break;
    case 'calendar':
      state.seasonTick = 0;
      state.season = 0;
      break;
  }
}

function killKitten() {
  if (state.kittens.current <= 0) return;
  state.kittens.current--;
  for (let i = JOB_ORDER.length - 1; i >= 0; i--) {
    const jId = JOB_ORDER[i];
    if (state.jobs[jId] > 0) {
      state.jobs[jId]--;
      break;
    }
  }
  if (state.kittens.current <= 0) {
    state.gameOver = true;
    const overlay = document.getElementById('tutorial-overlay');
    overlay.classList.remove('hidden');
    document.getElementById('tutorial-text').innerHTML = '<b>💀 Game Over</b><br><br>Your village has perished.<br>All kittens are gone.<br><br>Refresh the page to start anew.';
    document.getElementById('tutorial-btn').textContent = '🔄 Restart';
    document.getElementById('tutorial-btn').onclick = () => location.reload();
  }
}

function renderCraftTab(panel) {
  if (!state.craftsUnlocked) {
    panel.innerHTML = '<div class="craft-locked-msg">🔒 Build a Workshop to unlock crafting.</div>';
    return;
  }
  let html = '';
  for (const [cId, c] of Object.entries(CRAFTS)) {
    const affordable = canAfford(c.inputs);
    const hasRoom = state.resources[c.output].amount < state.resources[c.output].cap;

    html += `<div class="craft-card">
      <span class="c-icon">${c.icon}</span>
      <div class="c-info">
        <div class="c-name">${c.name}</div>
        <div class="c-cost">${renderCost(c.inputs)}</div>
      </div>
      <button class="craft-btn" data-craft="${cId}" ${!affordable || !hasRoom ? 'disabled' : ''}>
        Craft
      </button>
    </div>`;
  }
  panel.innerHTML = html;

  panel.querySelectorAll('.craft-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      const cId = btn.dataset.craft;
      doCraft(cId);
    });
  });
}

function doCraft(cId) {
  const c = CRAFTS[cId];
  if (!canAfford(c.inputs)) return;
  if (state.resources[c.output].amount >= state.resources[c.output].cap) return;
  spend(c.inputs);
  state.resources[c.output].amount += c.outputQty;
  notify(`🔨 Crafted ${c.name}!`, 'success');
  updateUI();
}

function renderUpgradeTab(panel) {
  panel.innerHTML = '<div class="upgrade-placeholder">🔧 Workshop upgrades coming soon!</div>';
}

// ============================
// TUTORIAL
// ============================
let lastShownStep = -1;

function checkTutorial() {
  if (!state.tutorial.active || state.tutorial.completed) return;
  const steps = [
    { text:'🐱 <b>Welcome to Meow Hamlet!</b><br><br>Tap the grassy area above to gather Catnip. You\'ll need it to build your village!', tab:null, check:() => state.totalTaps >= 1 },
    { text:'Great! Now trade 10 Catnip for 1 Wood in the <b>Village</b> tab.', tab:'village', check:() => state.resources.wood.amount >= 1 },
    { text:'Now build a <b>Hut</b> in the Build tab to attract your first kitten!', tab:'build', check:() => state.buildings.hut >= 1 },
    { text:'While your kitten arrives, build a <b>Library</b> (25 Wood) so you can start researching!', tab:'build', check:() => state.buildings.library >= 1 },
    { text:'Assign a <b>Scholar</b> in the Village tab to produce Science for research.', tab:'village', check:() => state.jobs.scholar >= 1 },
    { text:'Go to the <b>Research</b> tab and discover the <b>Calendar</b> to track seasons!', tab:'research', check:() => state.techs.calendar },
    { text:'Winter is coming! Make sure you have enough Catnip stored. Keep building and expanding! 🐱', tab:'village', check:() => false }
  ];

  const step = state.tutorial.step;
  if (step >= steps.length) {
    state.tutorial.completed = true;
    state.tutorial.active = false;
    document.getElementById('tutorial-overlay').classList.add('hidden');
    return;
  }

  const s = steps[step];
  if (s.check()) {
    state.tutorial.step++;
    lastShownStep = -1;
    checkTutorial();
    return;
  }

  if (step !== lastShownStep) {
    lastShownStep = step;
    showTutorialStep(s.text, s.tab);
  }
}

function showTutorialStep(text, tab) {
  const overlay = document.getElementById('tutorial-overlay');
  const box = document.getElementById('tutorial-text');
  const btn = document.getElementById('tutorial-btn');
  overlay.classList.remove('hidden');
  box.innerHTML = text;

  btn.onclick = () => {
    overlay.classList.add('hidden');
    if (tab) switchTab(tab);
  };
}

// ============================
// TAB SWITCHING
// ============================
let currentTab = 'village';

function switchTab(tabId) {
  currentTab = tabId;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.tab-btn[data-tab="${tabId}"]`)?.classList.add('active');
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + tabId)?.classList.add('active');
  renderTab(tabId);
}

// ============================
// FORMATTING
// ============================
function fmt(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e4) return Math.round(n).toLocaleString();
  if (n >= 100) return Math.round(n).toString();
  return n.toFixed(1);
}

// ============================
// EVENT HANDLERS
// ============================
function initEvents() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  let lastTapTime = 0;

  function handleTap(e, clientX, clientY) {
    const now = Date.now();
    if (now - lastTapTime < 80) return;
    lastTapTime = now;

    const cap = state.resources.catnip.cap;
    if (state.resources.catnip.amount < cap) {
      state.resources.catnip.amount = Math.min(state.resources.catnip.amount + 1, cap);
    }
    state.totalTaps++;

    const fx = document.getElementById('tap-fx-layer');
    const el = document.createElement('div');
    el.className = 'tap-fx';
    el.textContent = '+1 🌿';
    const rect = document.getElementById('map-container').getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    el.style.left = x + '%';
    el.style.top = y + '%';
    fx.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
    setTimeout(() => { if (el.parentNode) el.remove(); }, 900);

    if (state.tutorial.active && !state.tutorial.completed) {
      checkTutorial();
    }
  }

  document.getElementById('map-area').addEventListener('click', (e) => {
    handleTap(e, e.clientX, e.clientY);
  });

  document.getElementById('map-area').addEventListener('touchstart', (e) => {
    handleTap(e, e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  document.getElementById('resources-scroll').addEventListener('mouseover', (e) => {
    const item = e.target.closest('.res-item');
    if (item) {
      const resId = item.dataset.res;
      showTooltip(e, R[resId]?.desc || '');
    }
  });
  document.getElementById('resources-scroll').addEventListener('mouseout', () => hideTooltip());

  document.addEventListener('mouseover', (e) => {
    const btn = e.target.closest('.build-btn[disabled], .research-btn[disabled], .craft-btn[disabled], .job-btn[disabled]');
    if (btn) {
      const parent = btn.closest('.build-card') || btn.closest('.tech-card') || btn.closest('.craft-card');
      if (parent) {
        const text = parent.querySelector('.b-locked')?.textContent || parent.querySelector('.t-status')?.textContent || 'Not enough resources';
        showTooltip(e, text);
      }
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.build-btn, .research-btn, .craft-btn, .job-btn')) hideTooltip();
  });
}

function showTooltip(e, text) {
  const tt = document.getElementById('tooltip');
  tt.textContent = text;
  tt.classList.remove('hidden');
  const x = Math.min(e.clientX + 10, window.innerWidth - 260);
  const y = Math.min(e.clientY + 10, window.innerHeight - 60);
  tt.style.left = x + 'px';
  tt.style.top = y + 'px';
}

function hideTooltip() {
  document.getElementById('tooltip').classList.add('hidden');
}

// ============================
// INIT
// ============================
function init() {
  state = createState();
  initEvents();
  renderMap();
  updateUI();
  switchTab('village');
  setTimeout(() => checkTutorial(), 500);
  setInterval(tick, 1000);
}

document.addEventListener('DOMContentLoaded', init);
