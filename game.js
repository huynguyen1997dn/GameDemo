// ============================
// DATA DEFINITIONS
// ============================
const R = {
  catnip:    { name:'Catnip',    icon:'🌿', baseCap:100, color:'#00FF00', type:'common', craftable:false, transient:false, visible:true, calculatePerTick:true, desc:'Food for kittens. If it reaches 0, the village starts starving.' },
  wood:      { name:'Wood',      icon:'🪵', baseCap:100, color:'#8B4513', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:true, desc:'Basic building material. Chop trees to gather.' },
  minerals:  { name:'Minerals',  icon:'🪨', baseCap:100, color:'#808080', type:'common', craftable:false, transient:false, visible:true, calculatePerTick:true, desc:'Stone and ore for advanced construction.' },
  coal:      { name:'Coal',      icon:'🖤', baseCap:50,  color:'#333333', type:'common', craftable:false, transient:false, visible:true, calculatePerTick:true, desc:'Fuel for the Smelter. Found while mining.' },
  iron:      { name:'Iron',      icon:'⛏️', baseCap:50,  color:'#B7410E', type:'common', craftable:false, transient:false, visible:true, calculatePerTick:true, desc:'Smelted from Minerals and Coal.' },
  titanium:  { name:'Titanium',  icon:'💎', baseCap:10,  color:'#C0C0C0', type:'common', craftable:false, transient:false, visible:true, calculatePerTick:true, desc:'A rare, strong metal found deep underground.' },
  gold:      { name:'Gold',      icon:'🪙', baseCap:25,  color:'#FFD700', type:'common', craftable:false, transient:false, visible:true, calculatePerTick:true, desc:'Precious metal for advanced crafting.' },
  science:   { name:'Science',   icon:'🔬', baseCap:100, color:'#01A9DB', type:'common', craftable:false, transient:true,  visible:true, calculatePerTick:true, desc:'Knowledge used for research.' },
  culture:   { name:'Culture',   icon:'🎭', baseCap:100, color:'#DF01D7', type:'common', craftable:false, transient:true,  visible:true, calculatePerTick:true, desc:'Art and entertainment for your kittens.' },
  faith:     { name:'Faith',     icon:'🕯️', baseCap:100, color:'#808080', type:'common', craftable:false, transient:true,  visible:true, calculatePerTick:true, desc:'Spiritual devotion of your village.' },
  beam:      { name:'Beam',      icon:'📐', baseCap:50,  color:'#8B6914', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'Crafted from Wood. Used in construction.' },
  slab:      { name:'Slab',      icon:'▣',  baseCap:50,  color:'#808080', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'Crafted from Minerals. Used in construction.' },
  plate:     { name:'Plate',     icon:'🛡️', baseCap:50,  color:'#B7410E', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'Crafted from Iron. Used in advanced construction.' },
  steel:     { name:'Steel',     icon:'⚔️', baseCap:50,  color:'#708090', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'An alloy of Coal and Iron.' },
  gear:      { name:'Gear',      icon:'⚙️', baseCap:25,  color:'#A0A0A0', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'Precision-crafted mechanical component.' },
  scaffold:  { name:'Scaffold',  icon:'🏗️', baseCap:25,  color:'#CD853F', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'A construction framework of Beam and Slab.' },
  parchment: { name:'Parchment', icon:'📜', baseCap:50,  color:'#F5DEB3', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'Thin material for writing, made from Catnip.' },
  manuscript:{ name:'Manuscript',icon:'📖', baseCap:25,  color:'#D2B48C', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'A written document of knowledge and culture.' }
};

const R_ORDER = ['catnip','wood','minerals','coal','iron','titanium','gold','science','culture','faith','beam','slab','plate','steel','gear','scaffold','parchment','manuscript'];

const JOBS = {
  farmer:     { name:'Farmer',     icon:'🌾', unlockTech:null,          produces:'catnip',   desc:'Produces Catnip. Essential before winter.' },
  woodcutter: { name:'Woodcutter', icon:'🪓', unlockTech:null,          produces:'wood',     desc:'Chops trees for Wood.' },
  miner:      { name:'Miner',      icon:'⛏️', unlockTech:'mining',      produces:'minerals', desc:'Extracts Minerals. Small chance of Coal.' },
  scholar:    { name:'Scholar',    icon:'📖', unlockTech:null,          produces:'science',  desc:'Studies to produce Science.' },
  priest:     { name:'Priest',     icon:'✝️', unlockTech:'theology',    produces:'faith',    desc:'Produces Faith in the Chapel or Temple.' },
  engineer:   { name:'Engineer',   icon:'🔧', unlockTech:'construction',produces:'craft',    desc:'Works in the Workshop on automation.' }
};

const JOB_ORDER = ['farmer','woodcutter','miner','scholar','priest','engineer'];

const B = {
  field:{
    name:'Catnip Field', icon:'🌱', cost:{ wood:5 },
    effect:'+0.125 catnip/s base + 50% per Farmer',
    desc:'A small patch of catnip. Each farmer produces more per field.',
    unlockTech:null, color:'type-field', maxCount:5,
    effects:{ catnipPerTickBase:0.125 },
    mapPositions:[[30,55],[18,68],[42,68],[25,80],[50,80]]
  },
  hut:{
    name:'Hut', icon:'🏠', cost:{ wood:5 },
    effect:'+1 max kitten',
    desc:'A tiny wooden hut. Adds space for one more kitten.',
    unlockTech:null, color:'type-hut', maxCount:10,
    effects:{ maxKittens:1 },
    mapPositions:[[5,45],[14,52],[8,62],[22,55],[18,70],[30,50],[40,75],[55,55],[65,50],[70,65]]
  },
  barn:{
    name:'Barn', icon:'🏚️', cost:{ wood:10 },
    effect:'+100 storage (catnip, wood, minerals)',
    desc:'Increases storage for basic resources.',
    unlockTech:'agriculture', color:'type-barn', maxCount:3,
    effects:{ catnipMax:100, woodMax:200, mineralsMax:250 },
    mapPositions:[[25,38],[40,35],[55,38]]
  },
  pasture:{
    name:'Pasture', icon:'🌿', cost:{ wood:10, catnip:10 },
    effect:'+5% catnip production ratio',
    desc:'Kittens graze and improve catnip yield.',
    unlockTech:'agriculture', color:'type-pasture', maxCount:5,
    effects:{ catnipRatio:0.03 },
    mapPositions:[[35,60],[45,65],[55,60],[42,72],[52,75]]
  },
  mine:{
    name:'Mine', icon:'⛰️', cost:{ wood:15, minerals:10 },
    effect:'+0.2 minerals/s base, +20% mineral production ratio',
    desc:'A cave entrance. Miners produce more minerals with each mine.',
    unlockTech:'mining', color:'type-mine', maxCount:5,
    effects:{ mineralsPerTickBase:0.2, mineralsRatio:0.2 },
    mapPositions:[[72,30],[82,38],[85,50],[88,60],[80,70]]
  },
  workshop:{
    name:'Workshop', icon:'🔨', cost:{ wood:20, minerals:15 },
    effect:'Unlocks crafting',
    desc:'A wooden workbench hut. Enables crafting.',
    unlockTech:'mining', color:'type-workshop', maxCount:2,
    effects:{},
    mapPositions:[[5,30],[12,38]]
  },
  library:{
    name:'Library', icon:'📚', cost:{ wood:25 },
    effect:'+10% science ratio, +250 science max',
    desc:'Scholars produce science with each library.',
    unlockTech:null, color:'type-library', maxCount:5,
    effects:{ scienceRatio:0.1, scienceMax:250 },
    mapPositions:[[38,18],[52,18],[30,8],[48,8],[60,12]]
  },
  smelter:{
    name:'Smelter', icon:'🔥', cost:{ wood:25, minerals:15 },
    effect:'Produces Iron from Minerals + Coal',
    desc:'Smelts Iron using Minerals and Coal.',
    unlockTech:'metalworking', color:'type-smelter', maxCount:3,
    effects:{},
    mapPositions:[[68,18],[82,25],[75,35]]
  },
  warehouse:{
    name:'Warehouse', icon:'🏭', cost:{ wood:30, minerals:20 },
    effect:'+75% storage ratio bonus',
    desc:'Large storage facility. Increases all resource caps.',
    unlockTech:'construction', color:'type-warehouse', maxCount:3,
    effects:{ warehouseStorageRatio:0.75 },
    mapPositions:[[20,42],[30,45],[40,48]]
  },
  loghouse:{
    name:'Log House', icon:'🪵', cost:{ wood:40, minerals:10 },
    effect:'+2 max kittens',
    desc:'A sturdy log cabin. Houses more kittens.',
    unlockTech:'construction', color:'type-loghouse', maxCount:5,
    effects:{ maxKittens:2 },
    mapPositions:[[10,48],[22,50],[35,52],[48,48],[58,52]]
  },
  academy:{
    name:'Academy', icon:'🎓', cost:{ wood:50, minerals:30, beam:5 },
    effect:'+20% science ratio, +500 science max',
    desc:'An institution of higher learning.',
    unlockTech:'education', color:'type-academy', maxCount:5,
    effects:{ scienceRatio:0.2, scienceMax:500 },
    mapPositions:[[45,10],[58,12],[70,15]]
  },
  amphitheatre:{
    name:'Amphitheatre', icon:'🎭', cost:{ wood:40, minerals:25 },
    effect:'+0.1 culture/s, +5% happiness',
    desc:'A place of entertainment and culture.',
    unlockTech:'philosophy', color:'type-amphitheatre', maxCount:5,
    effects:{ culturePerTickBase:0.1, happinessBonus:0.05 },
    mapPositions:[[15,20],[25,25],[35,22]]
  },
  chapel:{
    name:'Chapel', icon:'⛪', cost:{ wood:30, minerals:15 },
    effect:'+0.05 faith/s',
    desc:'A small place of worship.',
    unlockTech:'theology', color:'type-chapel', maxCount:5,
    effects:{ faithPerTickBase:0.05 },
    mapPositions:[[60,22],[70,25],[80,20]]
  },
  temple:{
    name:'Temple', icon:'🏛️', cost:{ wood:60, minerals:40, slab:10 },
    effect:'+0.15 faith/s, +500 faith max',
    desc:'A grand temple to the cat gods.',
    unlockTech:'theology', color:'type-temple', maxCount:2,
    effects:{ faithPerTickBase:0.15, faithMax:500 },
    mapPositions:[[65,30],[78,32]]
  },
  mint:{
    name:'Mint', icon:'🪙', cost:{ wood:75, minerals:50, plate:10 },
    effect:'+0.05 gold/s (consumes culture)',
    desc:'Produces gold coins from culture.',
    unlockTech:'currency', color:'type-mint', maxCount:3,
    effects:{ goldPerTickBase:0.05 },
    mapPositions:[[42,5],[55,5],[68,5]]
  },
  mansion:{
    name:'Mansion', icon:'🏰', cost:{ wood:100, minerals:60, slab:15 },
    effect:'+4 max kittens',
    desc:'A luxurious mansion for your growing village.',
    unlockTech:'engineering', color:'type-mansion', maxCount:5,
    effects:{ maxKittens:4 },
    mapPositions:[[65,42],[75,45],[82,50],[88,55],[75,58]]
  },
  harbor:{
    name:'Harbor', icon:'⚓', cost:{ wood:120, minerals:80, beam:15 },
    effect:'+50% storage ratio bonus',
    desc:'A harbor for trade ships. Boosts storage.',
    unlockTech:'navigation', color:'type-harbor', maxCount:3,
    effects:{ harborStorageRatio:0.5 },
    mapPositions:[[10,70],[20,75],[30,78]]
  },
  factory:{
    name:'Factory', icon:'🏭', cost:{ wood:150, minerals:100, steel:20, gear:5 },
    effect:'+50% global craft ratio',
    desc:'An industrial factory. Improves all crafting.',
    unlockTech:'mechanization', color:'type-factory', maxCount:3,
    effects:{ craftRatio:0.5 },
    mapPositions:[[58,42],[70,45],[82,48]]
  }
};

const B_ORDER = ['field','hut','barn','pasture','mine','workshop','library','smelter','warehouse','loghouse','academy','amphitheatre','chapel','temple','mint','mansion','harbor','factory'];

const TECHS = {
  calendar:{ name:'Calendar', cost:10, icon:'📅', unlocks:'Seasons cycle', desc:'Understanding the seasons.', prereq:null },
  agriculture:{ name:'Agriculture', cost:30, icon:'🌾', unlocks:'Barn, Pasture, Farmer', desc:'Farming techniques.', prereq:'calendar' },
  mining:{ name:'Mining', cost:120, icon:'⛏️', unlocks:'Miner, Mine, Workshop', desc:'Extract minerals.', prereq:'agriculture' },
  writing:{ name:'Writing', cost:300, icon:'✍️', unlocks:'Advanced research', desc:'Record knowledge for future research.', prereq:'mining' },
  metalworking:{ name:'Metalworking', cost:200, icon:'⚒️', unlocks:'Smelter, Iron', desc:'Smelt iron.', prereq:'mining' },
  construction:{ name:'Construction', cost:400, icon:'🏗️', unlocks:'Warehouse, Log House, Engineer', desc:'Better buildings.', prereq:'mining' },
  education:{ name:'Education', cost:600, icon:'🎓', unlocks:'Academy', desc:'Higher learning.', prereq:'writing' },
  philosophy:{ name:'Philosophy', cost:800, icon:'💭', unlocks:'Amphitheatre', desc:'The art of thinking.', prereq:'writing' },
  theology:{ name:'Theology', cost:1200, icon:'✝️', unlocks:'Chapel, Temple, Priest', desc:'Study of the divine.', prereq:'philosophy' },
  engineering:{ name:'Engineering', cost:1500, icon:'⚙️', unlocks:'Mansion', desc:'Advanced construction.', prereq:'construction' },
  navigation:{ name:'Navigation', cost:2500, icon:'🧭', unlocks:'Harbor', desc:'Sailing the seas.', prereq:'engineering' },
  currency:{ name:'Currency', cost:3000, icon:'🪙', unlocks:'Mint', desc:'Standardized money.', prereq:'engineering' },
  mechanization:{ name:'Mechanization', cost:5000, icon:'⚡', unlocks:'Factory', desc:'Industrial revolution.', prereq:'engineering' }
};

const T_ORDER = ['calendar','agriculture','mining','writing','metalworking','construction','education','philosophy','theology','engineering','navigation','currency','mechanization'];

const CRAFTS = {
  wood:{ name:'Wood', icon:'🪵', inputs:{ catnip:100 }, output:'wood', outputQty:1, desc:'100 Catnip → 1 Wood' },
  beam:{ name:'Beam', icon:'📐', inputs:{ wood:175 }, output:'beam', outputQty:1, desc:'175 Wood → 1 Beam' },
  slab:{ name:'Slab', icon:'▣', inputs:{ minerals:250 }, output:'slab', outputQty:1, desc:'250 Minerals → 1 Slab' },
  plate:{ name:'Plate', icon:'🛡️', inputs:{ iron:125 }, output:'plate', outputQty:1, desc:'125 Iron → 1 Plate' },
  steel:{ name:'Steel', icon:'⚔️', inputs:{ coal:100, iron:100 }, output:'steel', outputQty:1, desc:'100 Coal + 100 Iron → 1 Steel' },
  gear:{ name:'Gear', icon:'⚙️', inputs:{ steel:15 }, output:'gear', outputQty:1, desc:'15 Steel → 1 Gear' },
  scaffold:{ name:'Scaffold', icon:'🏗️', inputs:{ beam:1, slab:1 }, output:'scaffold', outputQty:1, desc:'1 Beam + 1 Slab → 1 Scaffold' },
  parchment:{ name:'Parchment', icon:'📜', inputs:{ catnip:100 }, output:'parchment', outputQty:1, desc:'100 Catnip → 1 Parchment' },
  manuscript:{ name:'Manuscript', icon:'📖', inputs:{ parchment:1, culture:25 }, output:'manuscript', outputQty:1, desc:'1 Parchment + 25 Culture → 1 Manuscript' }
};

// ============================
// WORKSHOP UPGRADES
// ============================
const UPGRADES = {
  mineralHoes:{
    name:'Mineral Hoes', icon:'⛏️',
    desc:'Mineral-tipped hoes. +50% catnip job production.',
    effects:{ catnipJobRatio:0.5 },
    prices:[{name:'minerals',val:275},{name:'science',val:100}],
    unlocks:{ upgrades:['ironHoes'] }
  },
  ironHoes:{
    name:'Iron Hoes', icon:'⛏️',
    desc:'Strong iron hoes. +30% catnip job production.',
    effects:{ catnipJobRatio:0.3 },
    prices:[{name:'iron',val:25},{name:'science',val:200}]
  },
  mineralAxes:{
    name:'Mineral Axes', icon:'🪓',
    desc:'Mineral axes. +70% wood job production.',
    effects:{ woodJobRatio:0.7 },
    prices:[{name:'minerals',val:500},{name:'science',val:100}],
    unlocks:{ upgrades:['ironAxes'] }
  },
  ironAxes:{
    name:'Iron Axes', icon:'🪓',
    desc:'Iron axes. +50% wood job production.',
    effects:{ woodJobRatio:0.5 },
    prices:[{name:'iron',val:50},{name:'science',val:200}],
    unlocks:{ upgrades:['steelAxe'] }
  },
  steelAxe:{
    name:'Steel Axe', icon:'🪓',
    desc:'Steel axes. +50% wood job production.',
    effects:{ woodJobRatio:0.5 },
    prices:[{name:'steel',val:5},{name:'science',val:500}]
  },
  mineralPickaxes:{
    name:'Mineral Pickaxes', icon:'⛏️',
    desc:'Mineral pickaxes. +50% minerals job production.',
    effects:{ mineralsJobRatio:0.5 },
    prices:[{name:'minerals',val:750},{name:'science',val:100}],
    unlocks:{ upgrades:['ironPickaxes'] }
  },
  ironPickaxes:{
    name:'Iron Pickaxes', icon:'⛏️',
    desc:'Iron pickaxes. +50% minerals job production.',
    effects:{ mineralsJobRatio:0.5 },
    prices:[{name:'iron',val:75},{name:'science',val:200}],
    unlocks:{ upgrades:['steelPickaxes'] }
  },
  steelPickaxes:{
    name:'Steel Pickaxes', icon:'⛏️',
    desc:'Steel pickaxes. +50% minerals job production.',
    effects:{ mineralsJobRatio:0.5 },
    prices:[{name:'steel',val:10},{name:'science',val:500}]
  },
  reinforcedSaw:{
    name:'Reinforced Saw', icon:'🪚',
    desc:'+100% beam craft ratio (double output).',
    effects:{ beamCraftRatio:1 },
    prices:[{name:'iron',val:5},{name:'science',val:250}]
  },
  blastFurnace:{
    name:'Blast Furnace', icon:'🔥',
    desc:'+100% steel craft ratio (double output).',
    effects:{ steelCraftRatio:1 },
    prices:[{name:'steel',val:10},{name:'science',val:1000}]
  },
  underwaterFloor:{
    name:'Underwater Floor', icon:'💧',
    desc:'+100% parchment craft ratio (double output).',
    effects:{ parchmentCraftRatio:1 },
    prices:[{name:'iron',val:10},{name:'science',val:500}]
  },
  cuneiform:{
    name:'Cuneiform', icon:'✍️',
    desc:'+100% manuscript craft ratio.',
    effects:{ manuscriptCraftRatio:1 },
    prices:[{name:'gold',val:10},{name:'science',val:2000}]
  },
  printingPress:{
    name:'Printing Press', icon:'📰',
    desc:'+100% manuscript craft ratio.',
    effects:{ manuscriptCraftRatio:1 },
    prices:[{name:'steel',val:20},{name:'gear',val:10},{name:'science',val:5000}]
  },
  efficientRefining:{
    name:'Efficient Refining', icon:'⚗️',
    desc:'+50% steel craft ratio.',
    effects:{ steelCraftRatio:0.5 },
    prices:[{name:'titanium',val:5},{name:'science',val:10000}]
  },
  reinforcedBarn:{
    name:'Reinforced Barn', icon:'🏚️',
    desc:'+100% barn storage ratio.',
    effects:{ barnStorageRatio:1 },
    prices:[{name:'iron',val:10},{name:'science',val:500}]
  },
  cargoShips:{
    name:'Cargo Ships', icon:'🚢',
    desc:'+100% harbor storage ratio.',
    effects:{ harborStorageRatio:1 },
    prices:[{name:'steel',val:20},{name:'gold',val:10},{name:'science',val:3000}]
  },
  deepMining:{
    name:'Deep Mining', icon:'⛰️',
    desc:'+0.003 coal/s base from mines.',
    effects:{ coalPerTickBase:0.003 },
    prices:[{name:'steel',val:15},{name:'science',val:2000}]
  },
  hydraulicPress:{
    name:'Hydraulic Press', icon:'🔧',
    desc:'+100% gear craft ratio.',
    effects:{ gearCraftRatio:1 },
    prices:[{name:'gear',val:10},{name:'science',val:5000}]
  },
  factoryLogistics:{
    name:'Factory Logistics', icon:'📦',
    desc:'+50% global craft ratio.',
    effects:{ craftRatio:0.5 },
    prices:[{name:'gear',val:20},{name:'titanium',val:5},{name:'science',val:10000}]
  }
};

const UPGRADE_ORDER = ['mineralHoes','ironHoes','mineralAxes','ironAxes','steelAxe','mineralPickaxes','ironPickaxes','steelPickaxes','reinforcedSaw','blastFurnace','underwaterFloor','cuneiform','printingPress','efficientRefining','reinforcedBarn','cargoShips','deepMining','hydraulicPress','factoryLogistics'];

function getTradeCost() {
  return Math.ceil(10 * Math.pow(1.12, state.tradeCount));
}

function doTrade() {
  const cost = getTradeCost();
  if (state.resources.catnip.amount < cost) return;
  if (state.resources.wood.amount >= state.resources.wood.cap) {
    notify('🪵 Wood storage is full!', 'warning');
    return;
  }
  state.resources.catnip.amount -= cost;
  state.resources.wood.amount++;
  state.tradeCount++;
  notify(`🪵 Traded ${cost} Catnip for 1 Wood!`, 'success');
  updateUI();
}

// ============================
// STATE
// ============================
let state;

function createResource(id) {
  const cfg = R[id];
  return {
    name: id,
    amount: 0,
    cap: cfg.baseCap || 0,
    perTickCached: 0,
    unlocked: id === 'catnip' || id === 'wood',
    isHidden: false
  };
}

function createState() {
  const s = {
    resources:{},
    buildings:{},
    jobs:{},
    unlockedJobs:{ farmer:true, woodcutter:true, miner:false, scholar:true, priest:false, engineer:false },
    techs:{},
    upgrades:{},
    craftsUnlocked:false,
    season:0,
    seasonTick:0,
    seasonLength:45,
    kittens:{ current:0, max:5 },
    happiness:100,
    tick:0,
    tutorial:{ step:0, active:true, completed:false },
    totalCatnipHarvested:0,
    totalTaps:0,
    tradeCount:0,
    hutProgress:[],
    starvingTicks:0,
    deathTimeout:0,
    catnipLowWarned:false,
    winterWarned:false,
    gameOver:false
  };
  for (const id of R_ORDER) {
    s.resources[id] = createResource(id);
  }
  for (const id of B_ORDER) s.buildings[id] = 0;
  for (const id of JOB_ORDER) s.jobs[id] = 0;
  for (const id of T_ORDER) s.techs[id] = false;
  for (const id of UPGRADE_ORDER) s.upgrades[id] = false;
  s.buildings.field = 1;
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

function canAffordPriceList(prices) {
  for (const p of prices) {
    if ((state.resources[p.name]?.amount ?? 0) < p.val) return false;
  }
  return true;
}

function spend(cost) {
  for (const [res, amt] of Object.entries(cost)) {
    state.resources[res].amount -= amt;
  }
}

function spendPriceList(prices) {
  for (const p of prices) {
    state.resources[p.name].amount -= p.val;
  }
}

// ============================
// EFFECTS SYSTEM
// ============================
let _effectsCache = {};
let _effectsDirty = true;

function getEffect(name) {
  if (!_effectsDirty && _effectsCache[name] !== undefined) return _effectsCache[name];
  let total = 0;

  for (const [id, count] of Object.entries(state.buildings)) {
    if (count > 0 && B[id]?.effects?.[name]) {
      total += B[id].effects[name] * count;
    }
  }

  for (const [id, researched] of Object.entries(state.upgrades)) {
    if (researched && UPGRADES[id]?.effects?.[name]) {
      total += UPGRADES[id].effects[name];
    }
  }

  _effectsCache[name] = total;
  return total;
}

function markEffectsDirty() {
  _effectsDirty = true;
  _effectsCache = {};
}

function recalcEffects() {
  for (const name of Object.keys(_effectsCache)) {
    _effectsCache[name] = undefined;
  }
  _effectsCache = {};
  _effectsDirty = false;

  for (const [id, count] of Object.entries(state.buildings)) {
    if (count > 0 && B[id]?.effects) {
      for (const [eff, val] of Object.entries(B[id].effects)) {
        _effectsCache[eff] = (_effectsCache[eff] || 0) + val * count;
      }
    }
  }

  for (const [id, researched] of Object.entries(state.upgrades)) {
    if (researched && UPGRADES[id]?.effects) {
      for (const [eff, val] of Object.entries(UPGRADES[id].effects)) {
        _effectsCache[eff] = (_effectsCache[eff] || 0) + val;
      }
    }
  }
}

// ============================
// HAPPINESS
// ============================
function calcHappiness() {
  let happiness = 1.0;
  const kittens = state.kittens.current;
  if (kittens > 5) {
    happiness -= 0.02 * (kittens - 5);
  }
  happiness += getEffect('happinessBonus');
  happiness = Math.max(0.25, happiness);
  return happiness;
}

// ============================
// PRODUCTION ENGINE
// ============================
function getWeatherMod(resName) {
  if (resName !== 'catnip') return 1.0;
  const mods = [1.5, 1.0, 1.0, 0.25];
  return mods[state.season];
}

function calcResourcePerTick(resName) {
  const cfg = R[resName];
  if (!cfg || !cfg.calculatePerTick) return 0;

  let perTick = 0;

  // Step 1: building base production
  perTick += getEffect(resName + 'PerTickBase');

  // Step 2: season modifier (catnip only)
  perTick *= getWeatherMod(resName);

  // Step 3: job production from JOBS table
  let resProduction = 0;
  for (const [jId, job] of Object.entries(JOBS)) {
    if (job.produces === resName && state.jobs[jId] > 0) {
      const happiness = calcHappiness();
      const jMod = JOB_MODS[jId] || 0;
      let jobProd = state.jobs[jId] * jMod;
      if (jobProd > 0) jobProd *= happiness;
      resProduction += jobProd;
    }
  }

  // Step 4: base job production
  perTick += resProduction;

  // Step 5: job ratio effects (workshop tool upgrades)
  perTick += resProduction * getEffect(resName + 'JobRatio');

  // Step 6: ratio effects (building multipliers)
  perTick *= 1 + getEffect(resName + 'Ratio');

  // Step 7: auto-production
  perTick += getEffect(resName + 'PerTickAutoprod');

  // Step 8: direct building production
  perTick += getEffect(resName + 'PerTickProd');

  // Step 9-10: consumption
  let resConsumption = 0;
  if (resName === 'catnip') {
    resConsumption = state.kittens.current * 0.75;
  }
  perTick -= resConsumption;

  return perTick;
}

const JOB_MODS = {
  farmer: 1.0,
  woodcutter: 0.5,
  miner: 0.1,
  scholar: 0.035,
  priest: 0.05,
  engineer: 0
};

function addRes(res, value) {
  if (value === 0 || !res) return 0;
  const limit = Math.max(res.amount, res.cap);
  res.amount += value;
  if (res.amount > limit) res.amount = limit;
  if (res.amount < 0.0000000001) res.amount = 0;
  if (!res.unlocked && res.amount > 0) res.unlocked = true;
  return value;
}

function getResourceProduction() {
  const prod = { catnip:0, wood:0, minerals:0, coal:0, science:0, iron:0, titanium:0, gold:0, culture:0, faith:0 };
  for (const id of Object.keys(prod)) {
    prod[id] = calcResourcePerTick(id);
  }

  // Coal from miners (small chance)
  const mn = state.jobs.miner;
  for (let i = 0; i < mn; i++) {
    if (Math.random() < 0.05) prod.coal += 0.5;
  }

  return prod;
}

function processSmelter() {
  const sm = state.buildings.smelter;
  if (sm <= 0) return 0;
  const ironRate = sm * 0.1;
  const mineralCost = ironRate * 2;
  const coalCost = ironRate * 1;
  const minerals = state.resources.minerals;
  const coal = state.resources.coal;
  if (minerals.amount >= mineralCost && coal.amount >= coalCost) {
    minerals.amount -= mineralCost;
    coal.amount -= coalCost;
    return ironRate;
  }
  return 0;
}

function processMint() {
  const mintCount = state.buildings.mint;
  if (mintCount <= 0) return 0;
  const culture = state.resources.culture;
  if (culture.amount <= 0) return 0;
  const cultureConsumed = mintCount * 0.04;
  const available = Math.min(cultureConsumed, culture.amount);
  culture.amount -= available;
  return getEffect('goldPerTickBase') * mintCount;
}

function getCatnipConsumption() {
  return state.kittens.current * 0.75;
}

function resPoolUpdate(prod) {
  if (!prod) prod = getResourceProduction();

  for (const id of R_ORDER) {
    const res = state.resources[id];
    const cfg = R[id];

    // 1. Update maxValue from effects
    const effMax = getEffect(id + 'Max');
    let maxVal = effMax > 0 ? effMax : (cfg.baseCap || 0);
    if (maxVal <= 0) maxVal = cfg.baseCap || 0;
    // Apply barn/warehouse/harbor ratio for basic resources
    if (id === 'catnip' || id === 'wood' || id === 'minerals' || id === 'coal' || id === 'iron' || id === 'titanium' || id === 'gold') {
      maxVal = applyStorageRatio(id, maxVal);
    }
    res.cap = Math.max(res.cap, maxVal);

    // 2. Calculate perTick
    let resPerTick = prod[id] || 0;
    if (id === 'iron') resPerTick += processSmelter();
    if (id === 'gold') resPerTick += processMint();
    res.perTickCached = resPerTick;

    // 3. Apply production
    if (resPerTick !== 0) {
      addRes(res, resPerTick);
    }

    // 4. Auto-unlock
    if (!res.unlocked && res.amount > 0) {
      res.unlocked = true;
    }
  }
}

function applyStorageRatio(resName, baseMax) {
  const barnCount = state.buildings.barn;
  const warehouseCount = state.buildings.warehouse;
  const harborCount = state.buildings.harbor;

  const totalB = barnCount + warehouseCount + harborCount;
  if (totalB === 0) return baseMax;

  let ratio = 1;
  const warehouseEff = getEffect('warehouseStorageRatio');
  const harborEff = getEffect('harborStorageRatio');
  const barnEff = getEffect('barnStorageRatio');

  const wRatio = 1 + (warehouseCount * (warehouseEff || 0.75) + harborCount * (harborEff || 0.5)) / totalB;
  const extraBarn = barnCount * (barnEff || 0);
  ratio = wRatio + extraBarn;

  return baseMax * ratio;
}

function tick() {
  if (state.gameOver) return;
  state.tick++;

  // Recalculate happiness
  state.happiness = Math.round(calcHappiness() * 100);

  // Resource production
  const prod = getResourceProduction();
  resPoolUpdate(prod);

  state.totalCatnipHarvested += Math.max(0, prod.catnip);
  const consume = getCatnipConsumption();

  // Clamp all resources
  for (const id of R_ORDER) {
    const r = state.resources[id];
    if (r.amount < 0) r.amount = 0;
    if (r.amount > r.cap) r.amount = r.cap;
  }

  // Hut migration: every 5 ticks 1 kitten arrives
  if (state.deathTimeout > 0) state.deathTimeout--;

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

  // Starvation: max 1 kitten per tick, 5-second cooldown
  const catnipPerTick = prod.catnip - consume;
  if (state.kittens.current > 0 && state.resources.catnip.amount <= 0 && catnipPerTick < 0) {
    state.starvingTicks++;
    if (state.deathTimeout <= 0 && state.starvingTicks >= 1) {
      if (state.kittens.current > 0) {
        notify('😿 A kitten has died from starvation!', 'warning');
        killKitten();
        state.deathTimeout = 5;
        state.starvingTicks = 0;
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

function renderSeasonInfo() {
  const bar = document.getElementById('season-bar');
  if (!state.techs.calendar || state.tick < 1) {
    bar.classList.add('hidden');
    return;
  }
  if (state.starvingTicks > 0 && state.kittens.current > 0) {
    bar.classList.add('hidden');
    return;
  }
  bar.classList.remove('hidden');

  const icons = ['🌸','☀️','🍂','❄️'];
  const names = ['Spring','Summer','Autumn','Winter'];
  const effects = ['Catnip ×1.5','Catnip ×1.0','Catnip ×1.0','Catnip ×0.25'];

  document.getElementById('season-icon').textContent = icons[state.season];
  document.getElementById('season-name').textContent = names[state.season];
  document.getElementById('season-effect').textContent = effects[state.season];

  const pct = (state.seasonTick / state.seasonLength) * 100;
  document.getElementById('season-fill').style.width = Math.min(pct, 100) + '%';

  const remaining = state.seasonLength - state.seasonTick;
  document.getElementById('season-progress').textContent = `${remaining}s`;
}

function updateUI() {
  renderResourceBar();
  renderStarvationBar();
  renderSeasonInfo();
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
    const cooldown = state.deathTimeout;
    const maxCooldown = 5;
    const pct = cooldown > 0 ? ((maxCooldown - cooldown) / maxCooldown) * 100 : 100;
    fill.style.width = pct + '%';
    if (pct < 40) fill.style.background = '#e8c84a';
    else if (pct < 70) fill.style.background = '#e89840';
    else fill.style.background = '#d46040';
    if (cooldown > 0) {
      text.textContent = `⚠️ ${Math.ceil(cooldown / 5)}s until next death`;
    } else {
      text.textContent = '😿 Kittens are starving!';
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

const RESOURCE_TIER = {
  catnip:0, wood:0,
  minerals:1, coal:1,
  iron:2, titanium:2, gold:2,
  science:3, culture:3, faith:3,
  beam:4, slab:4, plate:4,
  steel:5,
  gear:6, scaffold:6, parchment:6,
  manuscript:7
};

function isResourceUnlocked(id) {
  const res = state.resources[id];
  if (res && res.unlocked) return true;
  switch (id) {
    case 'minerals': case 'coal': return state.techs.mining;
    case 'iron': return state.techs.metalworking;
    case 'titanium': return state.techs.navigation;
    case 'gold': return state.techs.currency;
    case 'science': return state.buildings.library > 0 || state.techs.calendar;
    case 'culture': return state.buildings.amphitheatre > 0;
    case 'faith': return state.buildings.chapel > 0 || state.buildings.temple > 0;
    case 'beam': case 'slab': case 'plate': return state.buildings.workshop > 0;
    case 'steel': case 'gear': return state.techs.metalworking;
    case 'scaffold': return state.buildings.workshop > 0;
    case 'parchment': case 'manuscript': return state.buildings.workshop > 0;
    default: return true;
  }
}

function renderResourceBar() {
  const container = document.getElementById('resources-scroll');
  const scrollLeft = container.scrollLeft;
  container.innerHTML = '';
  const order = Object.keys(RESOURCE_TIER).filter(id => state.resources[id]?.unlocked || isResourceUnlocked(id)).sort((a,b) => RESOURCE_TIER[a] - RESOURCE_TIER[b]);
  for (const id of order) {
    const r = state.resources[id];
    const cfg = R[id];
    const delta = r.perTickCached || 0;

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
      const tradeCost = getTradeCost();
      html += `<div class="gathering-section">
        <p>👆 Tap the map above to gather Catnip!</p>
        <button class="trade-btn" ${state.resources.catnip.amount >= tradeCost && state.resources.wood.amount < state.resources.wood.cap ? '' : 'disabled'}>
          🔄 Trade ${tradeCost} 🌿 → 1 🪵
        </button>`;

      if (state.resources.wood.amount > 0 && !hasHut) {
        html += `<p class="gathering-hint">🏗️ Go to the <b>Build</b> tab to build a Hut!</p>`;
      }
      if (state.resources.catnip.amount < tradeCost) {
        html += `<p class="gathering-hint">Need ${tradeCost} Catnip to trade for Wood</p>`;
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

  const tradeCost = getTradeCost();
  const canTrade = state.resources.catnip.amount >= tradeCost && state.resources.wood.amount < state.resources.wood.cap;
  html += `<div class="trade-row">
    <button class="trade-btn" ${canTrade ? '' : 'disabled'}>🔄 Trade ${tradeCost} 🌿 → 1 🪵</button>
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
  const map = { farmer:'catnip', woodcutter:'wood', miner:'minerals', scholar:'science', priest:'faith', engineer:'craft' };
  const res = map[jId];
  if (res === 'craft') return 'auto';
  const count = state.jobs[jId] || 1;
  const total = prod[res] || 0;
  return (total / count).toFixed(3);
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
  markEffectsDirty();
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
    case 'loghouse':
      state.kittens.max += 2;
      break;
    case 'mansion':
      state.kittens.max += 4;
      break;
    case 'library':
      break;
    case 'mine':
      break;
    case 'smelter':
      break;
    case 'field':
      break;
    case 'warehouse':
    case 'pasture':
    case 'academy':
    case 'amphitheatre':
    case 'chapel':
    case 'temple':
    case 'mint':
    case 'harbor':
    case 'factory':
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
  markEffectsDirty();
  switch (tId) {
    case 'mining':
      state.unlockedJobs.miner = true;
      break;
    case 'calendar':
      state.seasonTick = 0;
      state.season = 0;
      break;
    case 'construction':
      state.unlockedJobs.engineer = true;
      break;
    case 'theology':
      state.unlockedJobs.priest = true;
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
    const hasRoom = state.resources[c.output]?.amount < state.resources[c.output]?.cap;
    const ratio = 1 + getEffect(cId + 'CraftRatio');
    const showBonus = ratio > 1;

    html += `<div class="craft-card">
      <span class="c-icon">${c.icon}</span>
      <div class="c-info">
        <div class="c-name">${c.name}</div>
        <div class="c-cost">${renderCost(c.inputs)}</div>
        ${showBonus ? `<div class="c-bonus">×${ratio.toFixed(1)} output</div>` : ''}
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
  const res = state.resources[c.output];
  if (res && res.amount >= res.cap) return;
  spend(c.inputs);
  const ratio = 1 + getEffect(cId + 'CraftRatio');
  const qty = Math.round(c.outputQty * ratio * 100) / 100;
  if (res) res.amount += qty;
  notify(`🔨 Crafted ${c.name} ×${qty.toFixed(1)}!`, 'success');
  updateUI();
}

function isUpgradeLocked(uId) {
  for (const [id, u] of Object.entries(UPGRADES)) {
    if (u.unlocks?.upgrades?.includes(uId) && !state.upgrades[id]) {
      return true;
    }
  }
  return false;
}

function renderUpgradeTab(panel) {
  let html = '';
  for (const uId of UPGRADE_ORDER) {
    const u = UPGRADES[uId];
    const researched = state.upgrades[uId];
    const affordable = canAffordPriceList(u.prices);
    const isLocked = !researched && isUpgradeLocked(uId);

    if (researched) {
      html += `<div class="upgrade-card researched">
        <span class="u-icon">${u.icon}</span>
        <div class="u-info">
          <div class="u-name">${u.name} <span class="u-researched">✅</span></div>
          <div class="u-desc">${u.desc}</div>
        </div>
      </div>`;
    } else {
      let status = '';
      if (isLocked) status = '<span class="u-status locked">🔒 Locked</span>';

      html += `<div class="upgrade-card ${!affordable || isLocked ? 'disabled' : ''}">
        <span class="u-icon">${u.icon}</span>
        <div class="u-info">
          <div class="u-name">${u.name}</div>
          <div class="u-desc">${u.desc}</div>
          <div class="u-cost">${renderPriceList(u.prices)}</div>
          ${status}
        </div>
        <button class="upgrade-btn" data-upgrade="${uId}" ${!affordable || isLocked ? 'disabled' : ''}>
          Research
        </button>
      </div>`;
    }
  }
  panel.innerHTML = html;

  panel.querySelectorAll('.upgrade-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      const uId = btn.dataset.upgrade;
      purchaseUpgrade(uId);
    });
  });
}

function renderPriceList(prices) {
  return prices.map(p => {
    const have = state.resources[p.name]?.amount ?? 0;
    const cls = have >= p.val ? 'met' : 'unmet';
    const icon = R[p.name]?.icon || '';
    return `<span class="cost-item ${cls}">${icon} ${fmt(p.val)}</span>`;
  }).join(' ');
}

function purchaseUpgrade(uId) {
  const u = UPGRADES[uId];
  if (state.upgrades[uId]) return;

  if (isUpgradeLocked(uId)) return;

  if (!canAffordPriceList(u.prices)) return;

  spendPriceList(u.prices);
  state.upgrades[uId] = true;
  markEffectsDirty();

  notify(`🔧 Researched ${u.name}!`, 'success');
  updateUI();
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
