// ============================
// DATA DEFINITIONS
// ============================
const R = {
    catnip:    { name:'Catnip',    icon:'🌿', baseCap:100, color:'#00FF00', type:'common', craftable:false, transient:false, visible:true, calculatePerTick:true, desc:'Thức ăn cho mèo. Nếu về 0, cả làng sẽ chết đói.' },
    wood:      { name:'Wood',      icon:'🪵', baseCap:100, color:'#8B4513', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:true, desc:'Vật liệu xây dựng cơ bản. Đổi từ Catnip hoặc chặt cây.' },
    minerals:  { name:'Minerals',  icon:'🪨', baseCap:100, color:'#808080', type:'common', craftable:false, transient:false, visible:true, calculatePerTick:true, desc:'Đá và quặng cho các công trình nâng cao.' },
    coal:      { name:'Coal',      icon:'🖤', baseCap:50,  color:'#333333', type:'common', craftable:false, transient:false, visible:true, calculatePerTick:true, desc:'Nhiên liệu cho lò nung Smelter.' },
    iron:      { name:'Iron',      icon:'⛏️', baseCap:50,  color:'#B7410E', type:'common', craftable:false, transient:false, visible:true, calculatePerTick:true, desc:'Đúc từ Minerals và Coal.' },
    titanium:  { name:'Titanium',  icon:'💎', baseCap:10,  color:'#C0C0C0', type:'common', craftable:false, transient:false, visible:true, calculatePerTick:true, desc:'Kim loại hiếm sâu dưới lòng đất.' },
    gold:      { name:'Gold',      icon:'🪙', baseCap:25,  color:'#FFD700', type:'common', craftable:false, transient:false, visible:true, calculatePerTick:true, desc:'Tiền vàng cho nghiên cứu nâng cao.' },
    science:   { name:'Science',   icon:'🔬', baseCap:100, color:'#01A9DB', type:'common', craftable:false, transient:true,  visible:true, calculatePerTick:true, desc:'Điểm tri thức dùng để Nghiên cứu công nghệ mới.' },
    culture:   { name:'Culture',   icon:'🎭', baseCap:100, color:'#DF01D7', type:'common', craftable:false, transient:true,  visible:true, calculatePerTick:true, desc:'Nghệ thuật và giải trí của mèo.' },
    faith:     { name:'Faith',     icon:'🕯️', baseCap:100, color:'#808080', type:'common', craftable:false, transient:true,  visible:true, calculatePerTick:true, desc:'Độ sùng bái thần linh của ngôi làng.' },
    beam:      { name:'Beam',      icon:'📐', baseCap:50,  color:'#8B6914', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'Chế tạo từ Gỗ trong tab Craft.' },
    slab:      { name:'Slab',      icon:'▣',  baseCap:50,  color:'#808080', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'Chế tạo từ Khoáng sản trong tab Craft.' },
    plate:     { name:'Plate',     icon:'🛡️', baseCap:50,  color:'#B7410E', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'Chế tạo từ Sắt trong tab Craft.' },
    steel:     { name:'Steel',     icon:'⚔️', baseCap:50,  color:'#708090', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'Hợp kim của Than và Sắt.' },
    gear:      { name:'Gear',      icon:'⚙️', baseCap:25,  color:'#A0A0A0', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'Bánh răng cơ khí chính xác.' },
    scaffold:  { name:'Scaffold',  icon:'🏗️', baseCap:25,  color:'#CD853F', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'Khung giàn giáo xây dựng.' },
    parchment: { name:'Parchment', icon:'📜', baseCap:50,  color:'#F5DEB3', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'Giấy da làm từ Catnip.' },
    manuscript:{ name:'Manuscript',icon:'📖', baseCap:25,  color:'#D2B48C', type:'common', craftable:true,  transient:false, visible:true, calculatePerTick:false, desc:'Sách viết tay lưu trữ tri thức cao cấp.' }
};

const R_ORDER = ['catnip','wood','minerals','coal','iron','titanium','gold','science','culture','faith','beam','slab','plate','steel','gear','scaffold','parchment','manuscript'];

const JOBS = {
    farmer:     { name:'Farmer',     icon:'🌾', unlockTech:null,          produces:'catnip',   desc:'Sản xuất Catnip. Cực kỳ quan trọng để sống sót.' },
    woodcutter: { name:'Woodcutter', icon:'🪓', unlockTech:null,          produces:'wood',     desc:'Chặt cây tự động tạo ra Gỗ.' },
    miner:      { name:'Miner',      icon:'⛏️', unlockTech:'mining',      produces:'minerals', desc:'Khai thác khoáng sản.' },
    scholar:    { name:'Scholar',    icon:'📖', unlockTech:null,          produces:'science',  desc:'Nghiên cứu tạo ra Điểm khoa học Science.' },
    priest:     { name:'Priest',     icon:'✝️', unlockTech:'theology',    produces:'faith',    desc:'Tạo ra Faith tại nhà thờ.' },
    engineer:   { name:'Engineer',   icon:'🔧', unlockTech:'construction',produces:'craft',    desc:'Tự động hóa chế tạo trong Workshop.' }
};

const JOB_ORDER = ['farmer','woodcutter','miner','scholar','priest','engineer'];

const B = {
    field:{
        name:'Catnip Field', icon:'🌱', cost:{ wood:5 },
        effect:'+0.125 catnip/s base',
        desc:'Một mảnh vườn nhỏ trồng cỏ mèo tự động.',
        unlockTech:null, color:'type-field', maxCount:5,
        effects:{ catnipPerTickBase:0.125 },
        mapPositions:[[30,55],[18,68],[42,68],[25,80],[50,80]]
    },
    hut:{
        name:'Hut', icon:'🏠', cost:{ wood:5 },
        effect:'+2 max kitten',
        desc:'Túp lều nhỏ bằng gỗ. Thêm chỗ ở cho 2 chú mèo mới.',
        unlockTech:null, color:'type-hut', maxCount:10,
        effects:{ maxKittens:2 },
        mapPositions:[[5,45],[14,52],[8,62],[22,55],[18,70],[30,50],[40,75],[55,55],[65,50],[70,65]]
    },
    barn:{
        name:'Barn', icon:'🏚️', cost:{ wood:10 },
        effect:'+100 kho chứa cơ bản',
        desc:'Tăng giới hạn chứa cho Catnip, Wood, Minerals.',
        unlockTech:'agriculture', color:'type-barn', maxCount:3,
        effects:{ catnipMax:100, woodMax:200, mineralsMax:250 },
        mapPositions:[[25,38],[40,35],[55,38]]
    },
    pasture:{
        name:'Pasture', icon:'🌿', cost:{ wood:10, catnip:10 },
        effect:'+3% tỷ lệ sản xuất catnip',
        desc:'Đồng cỏ cho mèo thả dáng gặm nhấm, tăng năng suất.',
        unlockTech:'agriculture', color:'type-pasture', maxCount:5,
        effects:{ catnipRatio:0.03 },
        mapPositions:[[35,60],[45,65],[55,60],[42,72],[52,75]]
    },
    mine:{
        name:'Mine', icon:'⛰️', cost:{ wood:15, minerals:10 },
        effect:'+20% hiệu suất thợ mỏ',
        desc:'Mỏ đá sâu. Tăng hiệu suất khai khoáng cho thợ mỏ.',
        unlockTech:'mining', color:'type-mine', maxCount:5,
        effects:{ mineralsRatio:0.2 },
        mapPositions:[[72,30],[82,38],[85,50],[88,60],[80,70]]
    },
    workshop:{
        name:'Workshop', icon:'🔨', cost:{ wood:20, minerals:15 },
        effect:'Mở khóa tính năng Chế tạo (Craft)',
        desc:'Xưởng mộc chế tạo. Cho phép ghép tài nguyên cao cấp.',
        unlockTech:'mining', color:'type-workshop', maxCount:2,
        effects:{},
        mapPositions:[[5,30],[12,38]]
    },
    library:{
        name:'Library', icon:'📚', cost:{ wood:25 },
        effect:'+10% tốc độ Science, +250 giới hạn chứa Science',
        desc:'Thư viện lưu giữ tri thức. Bắt buộc để Học giả (Scholar) làm việc.',
        unlockTech:null, color:'type-library', maxCount:5,
        effects:{ scienceRatio:0.1, scienceMax:250 },
        mapPositions:[[38,18],[52,18],[30,8],[48,8],[60,12]]
    },
    smelter:{
        name:'Smelter', icon:'🔥', cost:{ wood:25, minerals:15 },
        effect:'Tự động đúc Sắt (Iron) từ Đá và Than',
        desc:'Lò nung luyện kim cao cấp.',
        unlockTech:'metalworking', color:'type-smelter', maxCount:3,
        effects:{},
        mapPositions:[[68,18],[82,25],[75,35]]
    },
    warehouse:{
        name:'Warehouse', icon:'🏭', cost:{ wood:30, minerals:20 },
        effect:'+75% giới hạn kho chứa',
        desc:'Nhà kho công nghiệp lớn tăng mạnh sức chứa.',
        unlockTech:'construction', color:'type-warehouse', maxCount:3,
        effects:{ warehouseStorageRatio:0.75 },
        mapPositions:[[20,42],[30,45],[40,48]]
    },
    loghouse:{
        name:'Log House', icon:'🪵', cost:{ wood:40, minerals:10 },
        effect:'+4 max kittens',
        desc:'Nhà gỗ kiên cố, chứa được nhiều mèo hơn.',
        unlockTech:'construction', color:'type-loghouse', maxCount:5,
        effects:{ maxKittens:4 },
        mapPositions:[[10,48],[22,50],[35,52],[48,48],[58,52]]
    },
    academy:{
        name:'Academy', icon:'🎓', cost:{ wood:50, minerals:30, beam:5 },
        effect:'+20% tốc độ Science, +500 max Science',
        desc:'Học viện khoa học hoàng gia cho mèo siêu trí tuệ.',
        unlockTech:'education', color:'type-academy', maxCount:5,
        effects:{ scienceRatio:0.2, scienceMax:500 },
        mapPositions:[[45,10],[58,12],[70,15]]
    },
    amphitheatre:{
        name:'Amphitheatre', icon:'🎭', cost:{ wood:40, minerals:25 },
        effect:'+0.1 culture/s, +5% hạnh phúc',
        desc:'Nhà hát opera nâng cao đời sống văn nghệ cho làng.',
        unlockTech:'philosophy', color:'type-amphitheatre', maxCount:5,
        effects:{ culturePerTickBase:0.1, happinessBonus:0.05 },
        mapPositions:[[15,20],[25,25],[35,22]]
    },
    chapel:{
        name:'Chapel', icon:'⛪', cost:{ wood:30, minerals:15 },
        effect:'+0.05 faith/s',
        desc:'Nhà nguyện nhỏ cầu nguyện thần linh.',
        unlockTech:'theology', color:'type-chapel', maxCount:5,
        effects:{ faithPerTickBase:0.05 },
        mapPositions:[[60,22],[70,25],[80,20]]
    },
    temple:{
        name:'Temple', icon:'🏛️', cost:{ wood:60, minerals:40, slab:10 },
        effect:'+0.15 faith/s, +500 max faith',
        desc:'Đền thờ mèo thần vĩ đại.',
        unlockTech:'theology', color:'type-temple', maxCount:2,
        effects:{ faithPerTickBase:0.15, faithMax:500 },
        mapPositions:[[65,30],[78,32]]
    },
    mint:{
        name:'Mint', icon:'🪙', cost:{ wood:75, minerals:50, plate:10 },
        effect:'+0.05 gold/s (tiêu tốn văn hóa)',
        desc:'Xưởng đúc tiền vàng từ điểm văn hóa.',
        unlockTech:'currency', color:'type-mint', maxCount:3,
        effects:{ goldPerTickBase:0.05 },
        mapPositions:[[42,5],[55,5],[68,5]]
    },
    mansion:{
        name:'Mansion', icon:'🏰', cost:{ wood:100, minerals:60, slab:15 },
        effect:'+8 max kittens',
        desc:'Biệt thự xa hoa lộng lẫy cho giới quý tộc mèo.',
        unlockTech:'engineering', color:'type-mansion', maxCount:5,
        effects:{ maxKittens:8 },
        mapPositions:[[65,42],[75,45],[82,50],[88,55],[75,58]]
    },
    harbor:{
        name:'Harbor', icon:'⚓', cost:{ wood:120, minerals:80, beam:15 },
        effect:'+50% kho chứa cơ bản',
        desc:'Cảng biển giao thương, tăng cực mạnh giới hạn chứa đồ.',
        unlockTech:'navigation', color:'type-harbor', maxCount:3,
        effects:{ harborStorageRatio:0.5 },
        mapPositions:[[10,70],[20,75],[30,78]]
    },
    factory:{
        name:'Factory', icon:'🏭', cost:{ wood:150, minerals:100, steel:20, gear:5 },
        effect:'+50% hiệu suất Craft đồ',
        desc:'Nhà máy cơ khí thúc đẩy dây chuyền chế tạo đồ.',
        unlockTech:'mechanization', color:'type-factory', maxCount:3,
        effects:{ craftRatio:0.5 },
        mapPositions:[[58,42],[70,45],[82,48]]
    }
};

const B_ORDER = ['field','hut','barn','pasture','mine','workshop','library','smelter','warehouse','loghouse','academy','amphitheatre','chapel','temple','mint','mansion','harbor','factory'];

const TECHS = {
    calendar:{ name:'Calendar', cost:10, icon:'📅', unlocks:'Chu kỳ mùa màng', desc:'Hiểu biết về thời tiết và các mùa trong năm.', prereq:null },
    agriculture:{ name:'Agriculture', cost:30, icon:'🌾', unlocks:'Barn, Pasture, Nghề Nông dân', desc:'Kỹ thuật canh tác nâng cao.', prereq:'calendar' },
    mining:{ name:'Mining', cost:120, icon:'⛏️', unlocks:'Nghề Thợ mỏ, Mine, Workshop', desc:'Khai thác sâu trong lòng đất.', prereq:'agriculture' },
    writing:{ name:'Writing', cost:300, icon:'✍️', unlocks:'Nghiên cứu tri thức cao cấp', desc:'Ghi lại kiến thức lên giấy da.', prereq:'mining' },
    metalworking:{ name:'Metalworking', cost:200, icon:'⚒️', unlocks:'Lò đúc Smelter, Sắt Iron', desc:'Luyện kim và chế tạo công cụ sắt.', prereq:'mining' },
    construction:{ name:'Construction', cost:400, icon:'🏗️', unlocks:'Warehouse, Log House, Kỹ sư', desc:'Kiến trúc xây dựng nhà cửa lớn vững chắc hơn.', prereq:'mining' },
    education:{ name:'Education', cost:600, icon:'🎓', unlocks:'Học viện Academy', desc:'Nâng tầm dân trí cho cư dân làng.', prereq:'writing' },
    philosophy:{ name:'Philosophy', cost:800, icon:'💭', unlocks:'Nhà hát Amphitheatre', desc:'Nghệ thuật tư duy trừu tượng.', prereq:'writing' },
    theology:{ name:'Theology', cost:1200, icon:'✝️', unlocks:'Chapel, Temple, Linh mục', desc:'Tìm kiếm đức tin và sự bảo hộ từ Thần Mèo.', prereq:'philosophy' },
    engineering:{ name:'Engineering', cost:1500, icon:'⚙️', unlocks:'Biệt thự Mansion', desc:'Kỹ nghệ cơ khí và kết cấu phức tạp.', prereq:'construction' },
    navigation:{ name:'Navigation', cost:2500, icon:'🧭', unlocks:'Cảng biển Harbor', desc:'Đóng tàu vượt biển giao thương.', prereq:'engineering' },
    currency:{ name:'Currency', cost:3000, icon:'🪙', unlocks:'Nhà đúc tiền Mint', desc:'Tiêu chuẩn hóa hệ thống tiền tệ thương mại.', prereq:'engineering' },
    mechanization:{ name:'Mechanization', cost:5000, icon:'⚡', unlocks:'Nhà máy Factory', desc:'Cách mạng công nghiệp tự động hóa.', prereq:'engineering' }
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

const UPGRADES = {
    mineralHoes:{
        name:'Mineral Hoes', icon:'⛏️',
        desc:'Cuốc bọc đá. +50% hiệu suất nông dân.',
        effects:{ catnipJobRatio:0.5 },
        prices:[{name:'minerals',val:275},{name:'science',val:100}],
        unlocks:{ upgrades:['ironHoes'] }
    },
    ironHoes:{
        name:'Iron Hoes', icon:'⛏️',
        desc:'Cuốc sắt bén. +30% hiệu suất nông dân.',
        effects:{ catnipJobRatio:0.3 },
        prices:[{name:'iron',val:25},{name:'science',val:200}]
    },
    mineralAxes:{
        name:'Mineral Axes', icon:'🪓',
        desc:'Rìu đá mài. +70% hiệu suất tiều phu.',
        effects:{ woodJobRatio:0.7 },
        prices:[{name:'minerals',val:500},{name:'science',val:100}],
        unlocks:{ upgrades:['ironAxes'] }
    },
    ironAxes:{
        name:'Iron Axes', icon:'🪓',
        desc:'Rìu sắt nặng. +50% hiệu suất tiều phu.',
        effects:{ woodJobRatio:0.5 },
        prices:[{name:'iron',val:50},{name:'science',val:200}],
        unlocks:{ upgrades:['steelAxe'] }
    },
    steelAxe:{
        name:'Steel Axe', icon:'🪓',
        desc:'Rìu thép tôi. +50% hiệu suất tiều phu.',
        effects:{ woodJobRatio:0.5 },
        prices:[{name:'steel',val:5},{name:'science',val:500}]
    },
    mineralPickaxes:{
        name:'Mineral Pickaxes', icon:'⛏️',
        desc:'Cuốc chim đá. +50% hiệu suất thợ mỏ.',
        effects:{ mineralsJobRatio:0.5 },
        prices:[{name:'minerals',val:750},{name:'science',val:100}],
        unlocks:{ upgrades:['ironPickaxes'] }
    },
    ironPickaxes:{
        name:'Iron Pickaxes', icon:'⛏️',
        desc:'Cuốc chim sắt. +50% hiệu suất thợ mỏ.',
        effects:{ mineralsJobRatio:0.5 },
        prices:[{name:'iron',val:75},{name:'science',val:200}],
        unlocks:{ upgrades:['steelPickaxes'] }
    },
    steelPickaxes:{
        name:'Steel Pickaxes', icon:'⛏️',
        desc:'Cuốc chim thép. +50% hiệu suất thợ mỏ.',
        effects:{ mineralsJobRatio:0.5 },
        prices:[{name:'steel',val:10},{name:'science',val:500}]
    },
    reinforcedSaw:{
        name:'Reinforced Saw', icon:'🪚',
        desc:'+100% sản lượng chế tạo Beam (X2 đầu ra).',
        effects:{ beamCraftRatio:1 },
        prices:[{name:'iron',val:5},{name:'science',val:250}]
    },
    blastFurnace:{
        name:'Blast Furnace', icon:'🔥',
        desc:'+100% sản lượng luyện Steel (X2 đầu ra).',
        effects:{ steelCraftRatio:1 },
        prices:[{name:'steel',val:10},{name:'science',val:1000}]
    },
    underwaterFloor:{
        name:'Underwater Floor', icon:'💧',
        desc:'+100% sản lượng chế tạo Giấy Parchment.',
        effects:{ parchmentCraftRatio:1 },
        prices:[{name:'iron',val:10},{name:'science',val:500}]
    },
    cuneiform:{
        name:'Cuneiform', icon:'✍️',
        desc:'+100% sản lượng chế tạo Manuscript.',
        effects:{ manuscriptCraftRatio:1 },
        prices:[{name:'gold',val:10},{name:'science',val:2000}]
    },
    printingPress:{
        name:'Printing Press', icon:'📰',
        desc:'+100% sản lượng chế tạo Manuscript.',
        effects:{ manuscriptCraftRatio:1 },
        prices:[{name:'steel',val:20},{name:'gear',val:10},{name:'science',val:5000}]
    },
    efficientRefining:{
        name:'Efficient Refining', icon:'⚗️',
        desc:'+50% sản lượng luyện Steel.',
        effects:{ steelCraftRatio:0.5 },
        prices:[{name:'titanium',val:5},{name:'science',val:10000}]
    },
    reinforcedBarn:{
        name:'Reinforced Barn', icon:'🏚️',
        desc:'+100% sức chứa của nhà kho Barn.',
        effects:{ barnStorageRatio:1 },
        prices:[{name:'iron',val:10},{name:'science',val:500}]
    },
    cargoShips:{
        name:'Cargo Ships', icon:'🚢',
        desc:'+100% sức chứa của cảng Harbor.',
        effects:{ harborStorageRatio:1 },
        prices:[{name:'steel',val:20},{name:'gold',val:10},{name:'science',val:3000}]
    },
    deepMining:{
        name:'Deep Mining', icon:'⛰️',
        desc:'+0.003 than/s từ các hầm mỏ.',
        effects:{ coalPerTickBase:0.003 },
        prices:[{name:'steel',val:15},{name:'science',val:2000}]
    },
    hydraulicPress:{
        name:'Hydraulic Press', icon:'🔧',
        desc:'+100% sản lượng chế tạo Bánh răng Gear.',
        effects:{ gearCraftRatio:1 },
        prices:[{name:'gear',val:10},{name:'science',val:5000}]
    },
    factoryLogistics:{
        name:'Factory Logistics', icon:'📦',
        desc:'+50% hiệu suất Craft đồ toàn cục.',
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
        notify('🪵 Kho Gỗ đầy mất rồi!', 'warning');
        return;
    }
    state.resources.catnip.amount -= cost;
    state.resources.wood.amount++;
    state.tradeCount++;
    notify(`🪵 Đã đổi ${cost} Catnip lấy 1 Wood!`, 'success');
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
        unlockedJobs:{ farmer:true, woodcutter:true, miner:false, scholar:false, priest:false, engineer:false },
        techs:{},
        upgrades:{},
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
        tradeCount:0,
        hutProgress:[],
        starvingTicks:0,
        deathTimeout:0,
        catnipLowWarned:false,
        winterWarned:false,
        year:0,
        gameOver:false,
        gameSpeed:1,
        happinessPenalty:0,
        lastSaveTick:0
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
    happiness -= state.happinessPenalty;
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

// Cơ chế mèo ăn nhiều hơn vào mùa đông x1.25
function getCatnipConsumption() {
    let baseConsume = state.kittens.current * 0.75;
    if (state.season === 3) {
        baseConsume *= 1.25;
    }
    return baseConsume;
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
        resConsumption = getCatnipConsumption();
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

// ============================
// NOTIFICATION SUPPRESSION
// ============================
let _suppressNotif = false;
let notifTimers = [];

function notify(text, type = 'info') {
    if (_suppressNotif) return;
    const container = document.getElementById('notification-container');
    const el = document.createElement('div');
    el.className = `notification ${type}`;
    el.textContent = text;
    container.appendChild(el);
    const t = setTimeout(() => { el.remove(); }, 3500);
    notifTimers.push(t);
}

// ============================
// GAME TICK
// ============================
function processTick() {
    state.tick++;

    // Happiness penalty decay
    if (state.happinessPenalty > 0) {
        state.happinessPenalty = Math.max(0, state.happinessPenalty - 0.001);
    }

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

    // Cảnh báo thông minh nếu kho đầy mà người chơi chưa biết làm gì ở đầu game
    if (state.resources.catnip.amount >= state.resources.catnip.cap && state.buildings.hut === 0 && state.tick % 15 === 0) {
        notify('💡 Mẹo: Kho Cỏ đầy rồi! Vào tab Village để đổi sang Gỗ 🪵 và xây nhà nhé!', 'success');
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
                    notify('🐱 Chú mèo đầu tiên đã tới và tự động làm Nông dân!', 'success');
                } else {
                    notify('🐱 Một chú mèo mới đã chuyển đến làng!', 'success');
                }
                state.hutProgress[i] = 5;
            }
        }
    }

    // Starvation: max 1 kitten per tick, 5-second cooldown
    const catnipPerTick = prod.catnip - consume;
    if (state.kittens.current > 0 && state.resources.catnip.amount <= 0 && catnipPerTick < 0) {
        state.starvingTicks++;
        if (state.deathTimeout <= 0 && state.starvingTicks >= 1) {
            if (state.kittens.current > 0) {
                notify('😿 Một chú mèo đã chết vì đói! Hãy bổ sung Farmer.', 'warning');
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
            notify('🌿 Sản lượng cỏ rất thấp! Coi chừng mùa đông.', 'warning');
        }
    } else {
        state.catnipLowWarned = false;
    }

    state.seasonTick++;
    if (state.seasonTick >= state.seasonLength && state.techs.calendar) {
        state.seasonTick = 0;
        state.season = (state.season + 1) % 4;
        const seasonNames = ['Mùa Xuân','Mùa Hạ','Mùa Thu','Mùa Đông'];
        notify(`🍂 ${seasonNames[state.season]} đã đến rồi!`, 'info');
        if (state.season === 3 && !state.winterWarned) {
            notify('❄️ Mùa Đông khắc nghiệt: Sản lượng Cỏ giảm mạnh & Mèo ăn nhiều hơn!', 'warning');
            state.winterWarned = true;
        }
        if (state.season === 0) {
            state.year++;
            notify(`🎉 Năm thứ ${state.year} đã đến!`, 'success');
        }
    }
}

function tick() {
    if (state.gameOver) return;

    const speed = state.gameSpeed;
    if (speed === 0) {
        updateUI();
        return;
    }

    for (let i = 0; i < speed; i++) {
        _suppressNotif = (i < speed - 1);
        processTick();
    }
    _suppressNotif = false;

    autoSave();
    updateCats();
    updateUI();
    checkTutorial();
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
    const names = ['Mùa Xuân','Mùa Hạ','Mùa Thu','Mùa Đông'];
    const effects = ['Catnip ×1.5','Catnip ×1.0','Catnip ×1.0','❄️ Cỏ ×0.25 & Mèo ăn ×1.25'];

    document.getElementById('season-icon').textContent = icons[state.season];
    document.getElementById('season-name').textContent = names[state.season];
    document.getElementById('season-effect').textContent = effects[state.season];
    document.getElementById('season-year').textContent = `📅 Năm ${state.year + 1}`;

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
            text.textContent = `⚠️ Còn ${Math.ceil(cooldown)}s cho đến khi 1 bé mèo tiếp theo đi đời`;
        } else {
            text.textContent = '😿 Đàn mèo đang chết đói!';
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
        <p>🐱 <b>Một chú mèo đang trên đường tới Hamlet...</b></p>
        <div class="wait-track"><div class="wait-fill" style="width:${((5 - remaining) / 5) * 100}%"></div></div>
        <p class="gathering-hint">Sẽ đến sau ~${remaining}s nữa</p>
      </div>`;
        } else {
            const tradeCost = getTradeCost();
            html += `<div class="gathering-section">
        <p>👆 Hãy bấm liên tục vào bản đồ phía trên để hái Catnip!</p>
        <button class="trade-btn" ${state.resources.catnip.amount >= tradeCost && state.resources.wood.amount < state.resources.wood.cap ? '' : 'disabled'}>
          🔄 Đổi ${tradeCost} 🌿 → 1 Gỗ 🪵
        </button>`;

            if (state.resources.wood.amount > 0 && !hasHut) {
                html += `<p class="gathering-hint" style="color:#d4a574; font-weight:700;">🏗️ Đã có gỗ! Hãy bấm tab [Build] ở dưới để xây lều Hut rước mèo về làng!</p>`;
            }
            if (state.resources.catnip.amount < tradeCost) {
                html += `<p class="gathering-hint">Cần tích lũy đủ ${tradeCost} Catnip để đổi lấy Gỗ</p>`;
            }
            if (state.resources.wood.amount >= state.resources.wood.cap) {
                html += `<p class="gathering-hint">🪵 Kho Gỗ đầy rồi! Đi xây lều Hut ngay.</p>`;
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
    const isWinter = state.season === 3;

    let html = `<div class="village-header">
    <div class="village-stat">😺 <span class="stat-label">Mèo</span> ${k.current} / ${k.max}</div>
    <div class="village-stat">❤️ <span class="stat-label">Hạnh phúc</span> ${state.happiness}%</div>
    <div class="village-stat ${netCatnip < 0 || isWinter ? 'warning' : ''}">
      🌿 <span class="stat-label">Cỏ tiêu thụ/s</span> ${prod.catnip.toFixed(2)} - ${consume.toFixed(2)}${isWinter ? ' (<b style="color:#e88060;">❄️ x1.25 Đói</b>)' : ''} = ${netCatnip.toFixed(2)}/s
    </div>
  </div>`;

    const tradeCost = getTradeCost();
    const canTrade = state.resources.catnip.amount >= tradeCost && state.resources.wood.amount < state.resources.wood.cap;
    html += `<div class="trade-row">
    <button class="trade-btn" ${canTrade ? '' : 'disabled'}>🔄 Đổi ${tradeCost} 🌿 → 1 Gỗ 🪵</button>
  </div>`;

    for (const jId of JOB_ORDER) {
        const job = JOBS[jId];
        const count = state.jobs[jId];

        // Tự động mở khóa Scholar ngay khi số lượng Library > 0
        let unlocked = state.unlockedJobs[jId];
        if (jId === 'scholar' && state.buildings.library > 0) {
            unlocked = true;
        }

        if (!unlocked) {
            // Hiển thị thông báo yêu cầu chính xác thay vì "Chưa mở khóa công nghệ" chung chung
            const lockMsg = jId === 'scholar' ? 'Yêu cầu xây Library 📚' : 'Chưa mở khóa công nghệ';

            html += `<div class="job-row job-locked">
        <span class="job-icon">🔒</span>
        <span class="job-name">${job.name}</span>
        <span class="job-produces">${lockMsg}</span>
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

        // UX cải tiến: Ẩn hoàn toàn công trình nếu chưa mở khóa công nghệ tiên quyết để tránh rối mắt
        if (locked) continue;

        const cost = getCost(bId, count);
        const affordable = canAfford(cost);
        const atMax = count >= cfg.maxCount;
        const canBuild = affordable && !atMax;

        html += `<div class="build-card ${!canBuild && !atMax ? 'disabled' : ''}">
      <span class="b-icon">${cfg.icon}</span>
      <div class="b-info">
        <div class="b-name">${cfg.name} ${count > 0 ? `<span class="b-owned">(${count})</span>` : ''}</div>
        <div class="b-desc">${cfg.desc}</div>
        <div class="b-cost">${renderCost(cost)}</div>
        ${atMax ? `<div class="b-locked" style="color:#6aaf6a;">✅ Đã xây tối đa</div>` : ''}
      </div>
      <button class="build-btn" data-building="${bId}" ${!canBuild ? 'disabled' : ''}>
        Xây
      </button>
    </div>`;
    }

    if (html === '') {
        html = '<div class="craft-locked-msg">Chưa mở khóa công trình mới. Hãy đi nghiên cứu thêm công nghệ!</div>';
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
    notify(`🏗️ Đã xây dựng thành công ${cfg.name}!`, 'success');
    renderMap();
    updateUI();
    checkTutorial();
}

function applyBuildingEffects(bId) {
    markEffectsDirty();
    switch (bId) {
        case 'hut':
            state.kittens.max += 2;
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
            state.kittens.max += 4;
            state.hutProgress.push(5);
            break;
        case 'mansion':
            state.kittens.max += 8;
            state.hutProgress.push(5);
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

        if (!prereqMet && !done) continue; // Ẩn các công nghệ quá cao siêu chưa đạt điều kiện trước

        html += `<div class="tech-card ${done ? 'researched' : ''}">
      <span class="t-icon">${t.icon}</span>
      <div class="t-info">
        <div class="t-name">${t.name}</div>
        <div class="t-desc">${t.desc} — <b>Mở khóa:</b> ${t.unlocks}</div>
        <div class="t-cost">🔬 ${fmt(t.cost)} Science</div>
      </div>
      ${!done ? `<button class="research-btn" data-tech="${tId}" ${!canResearch ? 'disabled' : ''}>Nghiên cứu</button>` : ''}
      ${done ? '<span class="t-status done">Đã học xong ✅</span>' : ''}
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
    notify(`🔬 Nghiên cứu thành công: ${t.name}!`, 'success');
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
    state.happinessPenalty = Math.min(0.5, state.happinessPenalty + 0.1);
    for (let i = JOB_ORDER.length - 1; i >= 0; i--) {
        const jId = JOB_ORDER[i];
        if (state.jobs[jId] > 0) {
            state.jobs[jId]--;
            break;
        }
    }
    for (let i = 0; i < state.hutProgress.length; i++) {
        state.hutProgress[i] = 5;
    }
    notify('🔄 Một chú mèo đã ra đi. Làng đang chuẩn bị đón mèo mới...', 'warning');
}

function renderCraftTab(panel) {
    if (!state.craftsUnlocked) {
        panel.innerHTML = '<div class="craft-locked-msg">🔒 Hãy xây nhà xưởng Workshop 🔨 để mở khóa chức năng chế tạo đồ cao cấp.</div>';
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
        ${showBonus ? `<div class="c-bonus">×${ratio.toFixed(1)} sản phẩm đầu ra</div>` : ''}
      </div>
      <button class="craft-btn" data-craft="${cId}" ${!affordable || !hasRoom ? 'disabled' : ''}>
        Chế tạo
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
    notify(`🔨 Đã chế tạo thành công ${c.name} ×${qty.toFixed(1)}!`, 'success');
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

        if (isLocked) continue; // Ẩn nâng cấp nếu chưa học các công cụ cấp dưới

        if (researched) {
            html += `<div class="upgrade-card researched">
        <span class="u-icon">${u.icon}</span>
        <div class="u-info">
          <div class="u-name">${u.name} <span class="u-researched">✅ Đã hoàn thành</span></div>
          <div class="u-desc">${u.desc}</div>
        </div>
      </div>`;
        } else {
            html += `<div class="upgrade-card ${!affordable ? 'disabled' : ''}">
        <span class="u-icon">${u.icon}</span>
        <div class="u-info">
          <div class="u-name">${u.name}</div>
          <div class="u-desc">${u.desc}</div>
          <div class="u-cost">${renderPriceList(u.prices)}</div>
        </div>
        <button class="upgrade-btn" data-upgrade="${uId}" ${!affordable ? 'disabled' : ''}>
          Nâng cấp
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

    notify(`🔧 Đã nâng cấp kỹ thuật công cụ: ${u.name}!`, 'success');
    updateUI();
}

// ============================
// TUTORIAL CHỈNH SỬA (HẾT KẸT)
// ============================
let lastShownStep = -1;

function checkTutorial() {
    if (!state.tutorial.active || state.tutorial.completed) return;

    // Các bước Tutorial rõ ràng, hướng dẫn nút bấm và tự động nhảy tab cho người chơi
    const steps = [
        { text:'🐱 <b>Chào mừng tới Meow Hamlet!</b><br><br>Hãy nhấp chuột liên tục vào <b>Vùng đất bản đồ cỏ xanh phía trên</b> để thu hoạch những cọng Catnip 🌿 đầu tiên nhé!', tab:null, check:() => state.totalTaps >= 1 },
        { text:'Rất tốt! Bây giờ kho chứa cỏ sắp đầy rồi, hãy nhìn nút đổi ở phía dưới, bấm nút <b>"🔄 Đổi Catnip → 1 Gỗ"</b> để lấy thanh Gỗ 🪵 đầu tiên.', tab:'village', check:() => state.resources.wood.amount >= 1 },
        { text:'Đã có gỗ quý! Hãy nhấn sang tab <b>Build</b> ở thanh menu dưới, tìm công trình <b>Hut 🏠</b> và bấm nút <b>"Xây"</b> để mở rộng làng rước bé mèo đầu tiên tới ở nhé.', tab:'build', check:() => state.buildings.hut >= 1 },
        { text:'Trong khi đợi bé mèo di cư đến, hãy hái thêm cỏ đổi lấy gỗ. Vào tab <b>Build</b> và xây dựng nhà <b>Library 📚</b> (Tốn 25 Gỗ). Nhà sách này là điều kiện bắt buộc để <b>Mở khóa tính năng Nghiên cứu (Research)</b>!', tab:'build', check:() => state.buildings.library >= 1 },
        { text:'Thư viện đã dựng xong! Bé mèo của bạn cũng đã đến làng. Hãy vào ngay tab <b>Village</b>, tìm dòng công việc <b>Scholar 📖 (Học giả)</b> và bấm dấu <b>[+]</b> để phân công chú mèo đi làm nghiên cứu tạo ra Điểm khoa học (Science 🔬).', tab:'village', check:() => state.jobs.scholar >= 1 },
        { text:'Học giả đang miệt mài tạo ra Điểm Khoa học. Khi tích đủ 10 Điểm Science 🔬, hãy sang tab <b>Research</b> mới mở, tìm công nghệ <b>Calendar 📅</b> và kích hoạt <b>"Nghiên cứu"</b> để bắt đầu theo dõi vòng quay bốn mùa!', tab:'research', check:() => state.techs.calendar },
        { text:'<b>Chúc mừng bạn đã làm chủ Meow Hamlet!</b> 🎉 Từ giờ bạn đã biết cách phân vai, tích lũy điểm Science để mở khóa công nghệ mới trong tab [Research]. Hãy cẩn thận: Vào Mùa Đông thời tiết khắc nghiệt, mèo sẽ đói hơn (Ăn x1.25) và sản lượng nông trại sụt giảm nghiêm trọng. Hãy chuẩn bị kho chứa thật tốt nha! 🐱', tab:'village', check:() => false }
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
// SPEED CONTROL
// ============================
function setGameSpeed(speed) {
    state.gameSpeed = speed;
    document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.speed-btn[data-speed="${speed}"]`);
    if (btn) btn.classList.add('active');
    updateUI();
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
                const text = parent.querySelector('.b-locked')?.textContent || parent.querySelector('.t-status')?.textContent || 'Chưa đủ tài nguyên yêu cầu';
                showTooltip(e, text);
            }
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.build-btn, .research-btn, .craft-btn, .job-btn')) hideTooltip();
    });

    // Speed buttons
    document.querySelectorAll('.speed-btn[data-speed]').forEach(btn => {
        btn.addEventListener('click', () => {
            const speed = parseInt(btn.dataset.speed);
            if (!isNaN(speed)) setGameSpeed(speed);
        });
    });

    // Save button
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveGame();
            notify('💾 Đã lưu game thành công!', 'success');
        });
    }

    // Load button
    const loadBtn = document.getElementById('load-btn');
    if (loadBtn) {
        loadBtn.addEventListener('click', () => {
            if (confirm('Tải lại game từ lần lưu trước? Tiến trình hiện tại sẽ bị mất.')) {
                loadGame();
                renderMap();
                updateUI();
                notify('📂 Đã tải game thành công!', 'success');
            }
        });
    }

    // New Game button
    const newGameBtn = document.getElementById('newgame-btn');
    if (newGameBtn) {
        newGameBtn.addEventListener('click', () => {
            if (confirm('Bắt đầu game mới? Toàn bộ dữ liệu cũ sẽ bị xóa!')) {
                deleteSave();
                state = createState();
                markEffectsDirty();
                state.tutorial.active = true;
                state.tutorial.step = 0;
                state.tutorial.completed = false;
                lastShownStep = -1;
                prevAmounts = {};
                notifTimers.forEach(t => clearTimeout(t));
                notifTimers = [];
                document.getElementById('notification-container').innerHTML = '';
                document.getElementById('tutorial-overlay').classList.add('hidden');
                renderMap();
                updateUI();
                switchTab('village');
                setTimeout(() => checkTutorial(), 500);
                notify('🆕 Đã bắt đầu game mới!', 'success');
            }
        });
    }

    window.addEventListener('beforeunload', () => {
        saveGame();
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
// SAVE / LOAD
// ============================
function getSaveData() {
    return {
        resources: state.resources,
        buildings: state.buildings,
        jobs: state.jobs,
        unlockedJobs: state.unlockedJobs,
        techs: state.techs,
        upgrades: state.upgrades,
        craftsUnlocked: state.craftsUnlocked,
        season: state.season,
        seasonTick: state.seasonTick,
        seasonLength: state.seasonLength,
        kittens: state.kittens,
        tick: state.tick,
        totalCatnipHarvested: state.totalCatnipHarvested,
        totalTaps: state.totalTaps,
        tradeCount: state.tradeCount,
        hutProgress: state.hutProgress,
        starvingTicks: state.starvingTicks,
        deathTimeout: state.deathTimeout,
        catnipLowWarned: state.catnipLowWarned,
        winterWarned: state.winterWarned,
        gameOver: state.gameOver,
        gameSpeed: state.gameSpeed,
        happinessPenalty: state.happinessPenalty,
        year: state.year,
        tutorial: state.tutorial
    };
}

function saveGame() {
    try {
        const data = getSaveData();
        localStorage.setItem('meowHamletSave', JSON.stringify(data));
        state.lastSaveTick = state.tick;
    } catch (e) {
        console.warn('Save failed:', e);
    }
}

function loadGame() {
    try {
        const raw = localStorage.getItem('meowHamletSave');
        if (!raw) return false;
        const data = JSON.parse(raw);
        for (const key of Object.keys(data)) {
            if (key in state) {
                state[key] = data[key];
            }
        }
        if (state.tutorial?.completed) {
            state.tutorial.active = false;
        }
        markEffectsDirty();
        return true;
    } catch (e) {
        console.warn('Load failed:', e);
        return false;
    }
}

function deleteSave() {
    localStorage.removeItem('meowHamletSave');
}

function autoSave() {
    if (state.gameOver) return;
    if (state.tick - state.lastSaveTick >= 30) {
        saveGame();
    }
}

// ============================
// INIT
// ============================
function init() {
    state = createState();
    const loaded = loadGame();
    initEvents();
    setGameSpeed(state.gameSpeed || 1);
    renderMap();
    updateUI();
    switchTab('village');
    if (loaded) {
        notify('📂 Đã tải game từ lần trước!', 'success');
    }
    setTimeout(() => checkTutorial(), 500);
    setInterval(tick, 1000);
}

document.addEventListener('DOMContentLoaded', init);