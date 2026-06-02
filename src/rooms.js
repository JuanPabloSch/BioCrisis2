export const ROOMS = {
  shore: {
    name: "Orilla / moto rota",
    zone: "forest",
    backgroundImage: { key: "bg_shore", path: "src/background/orilla.png" },
    showWallVisuals: false,
    playerStart: { x: 200, y: 250, angle: 0 },
    walls: [
      { x: 0, y: 0, w: 800, h: 150 },
      { x: 0, y: 150, w: 150, h: 600 },
      { x: 720, y: 150, w: 80, h: 600 },
      { x: 150, y: 280, w: 250, h: 50 },
      { x: 330, y: 330, w: 112, h: 45 },
      { x: 400, y: 380, w: 250, h: 45 },
      { x: 618, y: 420, w: 160, h: 42 },
      { x: 400, y: 150, w: 200, h: 10 },
      ],
    doors: [
      { id: "shore_to_forest", x: 650, y: 150, w: 64, h: 118, to: "forest_path", spawn: "from_shore", label: "Bosque" },
    ],
    spawns: {
      from_forest: { x: 680, y: 210, angle: 180 },
    },
    props: [],
  },
  forest_path: {
    name: "Camino del bosque",
    zone: "forest",
    backgroundImage: { key: "bg_forest", path: "src/background/forest.png" },
    showWallVisuals: false,
    playerStart: { x: 95, y: 300, angle: 0 },
    walls: [
      { x: 0, y: 0, w: 800, h: 150 },
      { x: 0, y: 552, w: 800, h: 60 },
      { x: 0, y: 0, w: 80, h: 600 },
      { x: 758, y: 0, w: 80, h: 600 },
      { x: 230, y: 48, w: 150, h: 160 },
      { x: 170, y: 340, w: 600, h: 222 },
    ],
    doors: [
      { id: "forest_to_shore", x: 78, y: 260, w: 32, h: 88, to: "shore", spawn: "from_forest", label: "Orilla" },
      { id: "forest_to_control", x: 700, y: 200, w: 42, h: 88, to: "control_room", spawn: "from_forest", label: "Control" },
    ],
    spawns: {
      from_shore: { x: 110, y: 302, angle: 0 },
      from_control: { x: 700, y: 302, angle: 180 },
    },
    props: [],
    enemies: [
      { id: "forest_zombie_01", type: "zombie", x: 100, y: 440, speed: 65, aggroRange: 280, damage: 12, health: 60 },
    ],
  },
  control_room: {
    name: "Pantallas de control",
    zone: "control",
    backgroundImage: { key: "bg_control", path: "src/background/control.png" },
    showWallVisuals: false,
    walls: [
      { x: 0, y: 0, w: 800, h: 130 },
      { x: 0, y: 552, w: 800, h: 48 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 740, y: 0, w: 42, h: 600 },
      { x: 40, y: 450, w: 170, h: 90 },
      { x: 470, y: 130, w: 120, h: 90 },
      { x: 480, y: 480, w: 300, h: 70 },
    ],
    doors: [
      { id: "control_to_forest", x: 28, y: 260, w: 60, h: 88, to: "forest_path", spawn: "from_control", label: "Bosque" },
      { id: "control_to_entry", x: 740, y: 260, w: 42, h: 180, to: "building_entry", spawn: "from_control", label: "Edificio" },
    ],
    spawns: {
      from_forest: { x: 92, y: 302, angle: 0 },
      from_entry: { x: 700, y: 302, angle: 180 },
    },
    props: [],
    items: [
      { id: "lab_key", type: "key", name: "Llave lab", x: 610, y: 150, color: 0xe6c84f, description: "Abre la puerta del pasillo bloqueado desde el hall." },
    ],
  },
  building_entry: {
    name: "Entrada del edificio",
    zone: "building",
    backgroundImage: { key: "bg_entry", path: "src/background/recepcion.png" },
    showWallVisuals: false,
    walls: [
      { x: 0, y: 0, w: 800, h: 120 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
      { x: 260, y: 100, w: 270, h: 100 },
      { x: 55, y: 400, w: 180, h: 156 },
      { x: 600, y: 448, w: 80, h: 56 },
    ],
    doors: [
      { id: "entry_to_control", x: 18, y: 175, w: 42, h: 150, to: "control_room", spawn: "from_entry", label: "Control" },
      { id: "entry_to_hall", x: 700, y: 180, w: 42, h: 140, to: "main_hall", spawn: "from_entry", label: "Hall" },
      { id: "entry_to_safe", x: 330, y: 520, w: 140, h: 42, to: "safe_room", spawn: "from_entry", label: "Sala segura" },
    ],
    spawns: {
      from_control: { x: 92, y: 302, angle: 0 },
      from_hall: { x: 700, y: 302, angle: 180 },
      from_safe: { x: 400, y: 498, angle: 270 },
    },
    props: [],
    items: [
      { id: "ammo_entry_01", type: "ammo", name: "Balas x9", x: 400, y: 210, color: 0xd6d6d6, amount: 9 },
    ],
    enemies: [
      { id: "building_zombie_01", type: "zombie", x: 600, y: 440, speed: 65, aggroRange: 280, damage: 12, health: 60 },
    ],
  },
  safe_room: {
    name: "Sala segura",
    zone: "building",
    backgroundImage: { key: "bg_safe", path: "src/background/safe.png" },
    showWallVisuals: false,
    walls: [
      { x: 0, y: 0, w: 800, h: 80 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 80, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
      { x: 66, y: 120, w: 140, h: 90 },
      { x: 66, y: 250, w: 140, h: 90 },
      { x: 612, y: 160, w: 190, h: 90 },
      { x: 80, y: 405, w: 180, h: 164 },
      { x: 680, y: 380, w: 80, h: 200 },
      { x: 580, y: 380, w: 80, h: 100 },
      { x: 480, y: 480, w: 80, h: 100 },
    ],
    doors: [
      { id: "safe_to_entry", x: 350, y: 80, w: 120, h: 42, to: "building_entry", spawn: "from_safe", label: "Entrada" },
    ],
    spawns: {
      from_entry: { x: 400, y: 92, angle: 90 },
    },
    props: [],
    enemies: [
      { id: "safe_zombie_01", type: "zombie", x: 200, y: 440, speed: 65, aggroRange: 280, damage: 12, health: 60 },
      { id: "safe_zombie_02", type: "zombie", x: 600, y: 440, speed: 65, aggroRange: 280, damage: 12, health: 60 },
    ],
    items: [
      { id: "medikit_safe_01", type: "medikit", name: "Medikit", x: 180, y: 280, color: 0x5fd178, heal: 35 },
      {
        id: "note_switch_puzzle_01",
        type: "note",
        name: "Nota de paneles",
        x: 700,
        y: 400,
        color: 0xf0e6cf,
        text: "El cierre sellado usa tres paneles. El patron quedo marcado como estado de luces: verde, rojo, verde.",
      },
    ],
  },
  main_hall: {
    name: "Hall principal",
    zone: "lab",
    backgroundImage: { key: "bg_hall", path: "src/background/hall.png" },
    showWallVisuals: false,
    requiresPower: false,
    walls: [
      { x: 0, y: 0, w: 800, h: 142 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
      { x: 40, y: 132, w: 60, h: 100 },
      { x: 652, y: 142, w: 80, h: 120 },
      { x: 320, y: 150, w: 170, h: 60 },
      { x: 320, y: 500, w: 170, h: 60 },
      { x: 60, y: 450, w: 170, h: 120 },
      { x: 600, y: 450, w: 170, h: 120 },
    ],
    doors: [
      { id: "hall_to_entry", x: 18, y: 260, w: 42, h: 158, to: "building_entry", spawn: "from_hall", label: "Entrada" },
      { id: "hall_to_locked", x: 740, y: 260, w: 42, h: 158, to: "locked_corridor", spawn: "from_hall", label: "Pasillo", lockedBy: "lab_key" },
    ],
    spawns: {
      from_entry: { x: 92, y: 302, angle: 0 },
      from_locked: { x: 700, y: 302, angle: 180 },
    },
    items: [
      { id: "ammo_hall_01", type: "ammo", name: "Balas x9", x: 400, y: 210, color: 0xd6d6d6, amount: 9 },
    ],
    props: [],
    enemies: [
      { id: "hall_zombie_01", type: "zombie", x: 400, y: 440, speed: 65, aggroRange: 280, damage: 12, health: 60 },
    ],
  },
  locked_corridor: {
    name: "Pasillo bloqueado",
    zone: "locked",
    backgroundImage: { key: "bg_pasillo", path: "src/background/pasillo.png" },
    showWallVisuals: false,
    requiresPower: true,
    walls: [
      { x: 0, y: 0, w: 800, h: 42 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 708, y: 0, w: 80, h: 600 },
      { x: 338, y: 120, w: 200, h: 305 },
    ],
    doors: [
      { id: "locked_to_hall", x: 18, y: 260, w: 42, h: 88, to: "main_hall", spawn: "from_locked", label: "Hall" },
      { id: "locked_to_storage", x: 320, y: 18, w: 80, h: 42, to: "laboratory_storage", spawn: "from_corridor", label: "Deposito" },
      { id: "locked_to_generator", x: 320, y: 540, w: 120, h: 42, to: "generator_room", spawn: "from_corridor", label: "Generador" },
    ],
    spawns: {
      from_hall: { x: 92, y: 302, angle: 0 },
      from_storage: { x: 400, y: 92, angle: 90 },
      from_generator: { x: 400, y: 500, angle: 270 },
    },
    props: [],
    items: [{
        id: "note_power_01",
        type: "note",
        name: "Nota arrugada",
        x: 620,
        y: 255,
        color: 0xf0e6cf,
        description: "Una nota de mantenimiento.",
        text: "El generador no arranca sin fusible. Si vuelve la energia, la puerta de mantenimiento deberia destrabarse.",
      },],
    enemies: [
      { id: "locked_runner_01", type: "runner", x: 80, y: 80, speed: 125, aggroRange: 360, damage: 8, health: 35 },
      { id: "locked_runner_02", type: "runner", x: 620, y: 380, speed: 135, aggroRange: 360, damage: 8, health: 35 },
    ],
  },
  laboratory_storage: {
    name: "Deposito de laboratorio",
    zone: "lab",
    backgroundImage: { key: "bg_deposito", path: "src/background/deposito.png" },
    showWallVisuals: false,
    requiresPower: false,
    walls: [
      { x: 0, y: 0, w: 800, h: 142 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 102, h: 600 },
      { x: 708, y: 0, w: 142, h: 600 },
      { x: 620, y: 420, w: 170, h: 90 },
    ],
    doors: [
      { id: "storage_to_locked", x: 350, y: 500, w: 120, h: 42, to: "locked_corridor", spawn: "from_storage", label: "Pasillo" },
    ],
    spawns: {
      from_corridor: { x: 400, y: 500, angle: 270 },
    },
    props: [],
    items: [
      { id: "ammo_storage_01", type: "ammo", name: "Balas x9", x: 610, y: 130, color: 0xd6d6d6, amount: 9 },
      { id: "fuse_01", type: "key", name: "Fusible", x: 100, y: 255, color: 0x8ce6ff, description: "Pieza electrica para activar el generador." },
      ],
    enemies: [
      { id: "storage_sleeper_01", type: "sleeper", x: 590, y: 205, speed: 92, wakeRange: 95, aggroRange: 310, damage: 13, health: 70 },
      { id: "storage_sleeper_02", type: "sleeper", x: 130, y: 305, speed: 82, wakeRange: 105, aggroRange: 310, damage: 13, health: 70 },
    ],
  },
generator_room: {
    name: "Sala del generador",
    zone: "service",
    backgroundImage: { key: "bg_generador", path: "src/background/generador.png" },
    showWallVisuals: false,
    requiresPower: true,
    walls: [
      { x: 0, y: 0, w: 800, h: 82 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 102, h: 600 },
      { x: 758, y: 0, w: 102, h: 600 },
      { x: 200, y: 422, w: 40, h: 40 },
      { x: 265, y: 222, w: 200, h: 120 },
      { x: 520, y: 415, w: 220, h: 130 },
    ],
    doors: [
      { id: "generator_to_locked", x: 340, y: 60, w: 120, h: 42, to: "locked_corridor", spawn: "from_generator", label: "Pasillo" },
      { id: "generator_to_maintenance", x: 740, y: 230, w: 42, h: 118, to: "maintenance_access", spawn: "from_generator", label: "Mantenimiento", powerLocked: true },
      
      // 🔓 FIJADO: Eliminamos lockedBy y lockedMessage. Ahora responde al puzzle remoto de los paneles.
      { 
        id: "generator_to_underground", 
        x: 330, y: 500, w: 120, h: 42, 
        to: "underground_entry", 
        spawn: "from_generator", 
        label: "Subsuelo", 
        objectiveLocked: "switchPuzzleSolved" 
      },
    ],
    spawns: {
      from_corridor: { x: 400, y: 92, angle: 90 },
      from_maintenance: { x: 700, y: 302, angle: 180 },
      from_underground: { x: 400, y: 450, angle: 270 }, // Ajustado el Y para que el jugador no spawnee pisando el trigger de la puerta de nuevo
    },
    props: [],
    interactables: [
      {
        id: "generator_switch",
        type: "generator",
        label: "activar generador",
        x: 400, y: 300, w: 140, h: 90,
        requiresItem: "fuse_01",
        offVisual: { color: 0xc9a633, alpha: 0.72, strokeColor: 0x332500 },
        onVisual: { color: 0x7fe28a, alpha: 0.72, strokeColor: 0x17361b },
      },
    ],
    items: [
      { id: "medikit_generator_01", type: "medikit", name: "Medikit", x: 560, y: 125, color: 0x5fd178, heal: 35 },
    ],
    enemies: [
      { id: "generator_zombie_02", type: "zombie", x: 525, y: 330, speed: 58, aggroRange: 240, damage: 12, health: 60 },
    ],
  },
switch_room: {
    name: "Sala de paneles",
    zone: "service",
    backgroundImage: { key: "bg_paneles", path: "src/background/paneles.png" },
    showWallVisuals: false,
    requiresPower: true,
    walls: [
      { x: 0, y: 0, w: 800, h: 112 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 680, y: 0, w: 42, h: 600 },
      { x: 320, y: 220, w: 180, h: 150 },
      { x: 40, y: 340, w: 90, h: 200 },
      { x: 150, y: 440, w: 90, h: 100 },
      { x: 550, y: 440, w: 200, h: 100 },
      { x: 550, y: 100, w: 90, h: 100 },
    ],
    doors: [
      { id: "switch_to_maintenance", x: 18, y: 200, w: 42, h: 88, to: "maintenance_access", spawn: "from_switch", label: "Mantenimiento" },
      { id: "switch_to_sealed", x: 360, y: 118, w: 80, h: 42, to: "sealed_room", spawn: "from_switch", label: "Sala sellada", objectiveLocked: "switchPuzzleSolved" },
    ],
    enemies: [
      // 🧟 Te la dejé con el fix de la coordenada X para que el Tank aparezca adentro de la pantalla
      { id: "service_tank_01", type: "tank", x: 580, y: 275, speed: 42, aggroRange: 250, damage: 22, health: 150 },
    ],
    spawns: {
      from_maintenance: { x: 92, y: 302, angle: 0 },
      from_sealed: { x: 400, y: 152, angle: 90 },
    },
    props: [],
    items: [
      { id: "flashlight_01", type: "tool", name: "Linterna", x: 110, y: 400, color: 0xfff1a6, description: "Sirve para moverse por zonas sin electricidad." },
    ],
    interactables: [
      {
        id: "switch_a", type: "puzzle_switch", switchId: "a", label: "alternar panel A", x: 325, y: 260, w: 10, h: 10,
        offVisual: { color: 0x8c3d38, alpha: 0.84, strokeColor: 0x35110f },
        onVisual: { color: 0x65d17a, alpha: 0.9, strokeColor: 0x12381a },
      },
      {
        id: "switch_b", type: "puzzle_switch", switchId: "b", label: "alternar panel B", x: 400, y: 260, w: 10, h: 10,
        offVisual: { color: 0x8c3d38, alpha: 0.84, strokeColor: 0x35110f },
        onVisual: { color: 0x65d17a, alpha: 0.9, strokeColor: 0x12381a },
      },
      {
        id: "switch_c", type: "puzzle_switch", switchId: "c", label: "alternar panel C", x: 485, y: 260, w: 10, h: 10,
        offVisual: { color: 0x8c3d38, alpha: 0.84, strokeColor: 0x35110f },
        onVisual: { color: 0x65d17a, alpha: 0.9, strokeColor: 0x12381a },
      },
    ],
  },
  
  maintenance_access: {
    name: "Acceso de mantenimiento",
    zone: "service",
    backgroundImage: { key: "mantenimiento", path: "src/background/mantenimiento.png" },
    showWallVisuals: false,
    walls: [
      { x: 0, y: 0, w: 800, h: 152 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
      { x: 100, y: 115, w: 140, h: 70 },
      { x: 550, y: 135, w: 160, h: 100 },
      { x: 240, y: 355, w: 100, h: 78 },
      { x: 600, y: 455, w: 150, h: 118 },
    ],
    doors: [
      { id: "maintenance_to_generator", x: 18, y: 260, w: 42, h: 118, to: "generator_room", spawn: "from_maintenance", label: "Generador" },
      { id: "maintenance_to_switch", x: 740, y: 260, w: 42, h: 118, to: "switch_room", spawn: "from_maintenance", label: "Paneles" },
    ],
    spawns: {
      from_generator: { x: 92, y: 302, angle: 0 },
      from_switch: { x: 700, y: 302, angle: 180 },
    },
    props: [],
    items: [
      { id: "ammo_maintenance_01", type: "ammo", name: "Balas x9", x: 140, y: 180, color: 0xd6d6d6, amount: 9 },
      ],
    enemies: [
      { id: "maintenance_runner_01", type: "runner", x: 590, y: 310, speed: 118, aggroRange: 340, damage: 8, health: 35 },
      { id: "maintenance_runner_02", type: "runner", x: 620, y: 380, speed: 135, aggroRange: 360, damage: 8, health: 35 },
    ],
  },
  generator_room: {
    name: "Sala del generador",
    zone: "service",
    backgroundImage: { key: "bg_generador", path: "src/background/generador.png" },
    showWallVisuals: false,
    requiresPower: true,
    walls: [
      { x: 0, y: 0, w: 800, h: 82 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 102, h: 600 },
      { x: 758, y: 0, w: 102, h: 600 },
      { x: 200, y: 422, w: 40, h: 40 },
      { x: 265, y: 222, w: 200, h: 120 },
      { x: 520, y: 415, w: 220, h: 130 },
    ],
    doors: [
      { id: "generator_to_locked", x: 340, y: 60, w: 120, h: 42, to: "locked_corridor", spawn: "from_generator", label: "Pasillo" },
      { id: "generator_to_maintenance", x: 740, y: 230, w: 42, h: 118, to: "maintenance_access", spawn: "from_generator", label: "Mantenimiento", powerLocked: true },
      
      // 🔓 MODIFICADO: Ahora esta puerta se destraba automágicamente desde la otra punta del mapa
      { 
        id: "generator_to_underground", 
        x: 330, y: 500, w: 120, h: 42, 
        to: "underground_entry", 
        spawn: "from_generator", 
        label: "Subsuelo", 
        objectiveLocked: "switchPuzzleSolved" // 👈 Vinculado al puzzle de la switch_room
      },
    ],
    spawns: {
      from_corridor: { x: 400, y: 92, angle: 90 },
      from_maintenance: { x: 700, y: 302, angle: 180 },
      from_underground: { x: 400, y: 450, angle: 270 },
    },
    props: [],
    interactables: [
      {
        id: "generator_switch",
        type: "generator",
        label: "activar generador",
        x: 400, y: 300, w: 140, h: 90,
        requiresItem: "fuse_01",
        offVisual: { color: 0xc9a633, alpha: 0.72, strokeColor: 0x332500 },
        onVisual: { color: 0x7fe28a, alpha: 0.72, strokeColor: 0x17361b },
      },
    ],
    items: [
      { id: "medikit_generator_01", type: "medikit", name: "Medikit", x: 560, y: 125, color: 0x5fd178, heal: 35 },
    ],
    enemies: [
      { id: "generator_zombie_02", type: "zombie", x: 525, y: 330, speed: 58, aggroRange: 240, damage: 12, health: 60 },
    ],
  },
  underground_entry: {
    name: "Entrada subterranea",
    zone: "underground",
    backgroundImage: { key: "bg_under", path: "src/background/underground.png" },
    backgroundImageDry: { key: "bg_under_dry", path: "src/background/underground_dry.png" },
    showWallVisuals: false,
    requiresFlashlight: true,
    walls: [
      { x: 0, y: 0, w: 800, h: 92 },
      { x: 0, y: 558, w: 800, h: 122 },
      { x: 0, y: 0, w: 112, h: 600 },
      { x: 718, y: 0, w: 122, h: 600 },
      { x: 115, y: 110, w: 100, h: 118 },
      { x: 500, y: 100, w: 150, h: 50 },
      { x: 550, y: 375, w: 170, h: 170 },
      { x: 130, y: 425, w: 70, h: 70 },
      { x: 240, y: 475, w: 70, h: 70 },
    ],
    doors: [
      { id: "underground_to_generator", x: 320, y: 118, w: 120, h: 42, to: "generator_room", spawn: "from_underground", label: "Generador" },
      { id: "underground_to_pumps", x: 710, y: 240, w: 42, h: 128, to: "underground_pumps", spawn: "from_entry", label: "Bombas" },
      
      // PUERTA 2 CORREGIDA: Limpiada la duplicidad y configurada hacia la nueva zona
      { 
        id: "locked_to_pump", 
        x: 320, 
        y: 340, 
        w: 120, 
        h: 42, 
        to: "flooded_zone", // 🟢 Apunta al nuevo túnel drenado
        spawn: "from_underground", // El spawn donde aparecerá en el túnel
        label: "Zona Drenada", 
        objectiveLocked: "pumpSolved",
        lockedMessage: "El camino está inundado. Debes activar las bombas primero."
      },
    ],
    spawns: {
      from_generator: { x: 400, y: 92, angle: 90 },
      from_pumps: { x: 700, y: 302, angle: 180 },
      from_flooded_zone: { x: 400, y: 320, angle: 90 }, // Spawn por si vuelve de la zona nueva
    },
    props: [],
    items: [
      { id: "ammo_underground_01", type: "ammo", name: "Balas x9", x: 180, y: 455, color: 0xd6d6d6, amount: 9 },
    ],
    enemies: [
      { id: "underground_sleeper_01", type: "sleeper", x: 585, y: 355, speed: 78, wakeRange: 90, aggroRange: 280, damage: 13, health: 70 },
    ],
  },

  underground_pumps: {
    name: "Sala de bombas",
    zone: "underground",
    backgroundImage: { key: "bg_bombas", path: "src/background/bombas.png" },
    backgroundImageDry: { key: "bg_bombas_dry", path: "src/background/bombas_dry.png" },
    requiresFlashlight: true,
    showWallVisuals: false,
    walls: [
      { x: 0, y: 0, w: 800, h: 82 },
      { x: 0, y: 518, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 728, y: 0, w: 42, h: 600 },
      { x: 300, y: 230, w: 200, h: 120 },
      { x: 565, y: 10, w: 190, h: 110 },
      { x: 560, y: 425, w: 150, h: 82 },
      { x: 65, y: 10, w: 190, h: 110 },
    ],
    doors: [
      { id: "pumps_to_underground", x: 50, y: 220, w: 42, h: 128, to: "underground_entry", spawn: "from_pumps", label: "Subsuelo" },
    ],
    spawns: {
      from_entry: { x: 92, y: 302, angle: 0 },
    },
    props: [],
    items: [
      { id: "medikit_pumps_01", type: "medikit", name: "Medikit", x: 610, y: 455, color: 0x5fd178, heal: 35 },
    ],
    enemies: [
      // 📍 Reubicado lejos de muros y configurado para durar 7-8 disparos
      { id: "pumps_tank_01", type: "tank", x: 620, y: 300, speed: 45, aggroRange: 280, damage: 22, health: 75 },
    ],
    interactables: [
      {
        id: "pump_switch",
        type: "pump",
        label: "activar bomba",
        x: 400, y: 300, w: 140, h: 90,
        offVisual: { color: 0xc9a633, alpha: 0.72, strokeColor: 0x332500 },
        onVisual: { color: 0x7fe28a, alpha: 0.72, strokeColor: 0x17361b },
      },
    ],
  },
  sealed_room: {
    name: "Sala sellada",
    zone: "lab",
    requiresPower: true,
    backgroundImage: { key: "bg_sellada", path: "src/background/sellada.png" },
    showWallVisuals: false,
    walls: [
      { x: 0, y: 0, w: 800, h: 112 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 708, y: 0, w: 42, h: 600 },
      { x: 155, y: 155, w: 180, h: 86 },
      { x: 520, y: 235, w: 110, h: 226 },
      { x: 130, y: 325, w: 140, h: 72 },
    ],
    doors: [
      { id: "sealed_to_switch", x: 340, y: 540, w: 120, h: 42, to: "switch_room", spawn: "from_sealed", label: "Paneles" },
    ],
    spawns: {
      from_switch: { x: 400, y: 500, angle: 270 },
    },
    props: [],
    items: [
      { id: "sealed_note_01", type: "note", name: "Informe viejo", x: 230, y: 228, color: 0xf0e6cf, text: "No todos los cierres dependen de llaves. Algunos paneles cambian el estado de puertas completas." },
      { id: "sealed_medikit_01", type: "medikit", name: "Medikit", x: 570, y: 278, color: 0x5fd178, heal: 35 },
    ],
    enemies: [
      { id: "sealed_tank_01", type: "tank", x: 400, y: 300, speed: 45, aggroRange: 260, damage: 22, health: 150 },
    ],
  },
  flooded_zone: {
    name: "Túnel Drenado",
    zone: "underground", // Para que mantenga el color de la zona
    backgroundImage: { key: "bg_tunel1", path: "src/background/tunel1.png" },
    showWallVisuals: false,
    requiresFlashlight: false,
    requiresPower: false,
    walls: [
      { x: 0, y: 0, w: 800, h: 180 },
      { x: 0, y: 428, w: 800, h: 120 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 708, y: 0, w: 180, h: 600 },
      
    ],
    doors: [
      // PUERTA 1 (ARRIBA - EN EL MEDIO): Vuelve a la Entrada Subterránea
      {
        id: "tunnel_to_underground",
        x: 340, // Centrada en el medio (X)
        y: 200,  // Pegada a la pared de arriba (Y)
        w: 120, 
        h: 20,  
        label: "Volver al Subsuelo",
        to: "underground_entry",
        spawn: "from_flooded_zone" // Recordá que este spawn lo agregamos antes en under_entry
      },
      // PUERTA 2 (A LA IZQUIERDA): Conecta con el Túnel 2
      {
        id: "tunnel_to_tunnel2",
        x: 40,  // Pegada a la pared izquierda (X)
        y: 240, // Centrada verticalmente (Y)
        w: 20, 
        h: 120, 
        label: "Ir al Túnel 2",
        to: "underground_tunnel2",
        spawn: "from_tunnel1" // Registrá este nombre para cuando crees la otra sala
      }
    ],
    items: [],
    interactables: [],
    enemies: [
      // Metemos un sleeper que se despierte al verte en esta nueva zona
      { id: "tunnel_zombie_02", type: "sleeper", x: 100, y: 250, wakeRange: 100, aggroRange: 200, speed: 120, health: 50, damage: 20 },
      { id: "tunnel_zombie_03", type: "sleeper", x: 100, y: 350, wakeRange: 80, aggroRange: 200, speed: 120, health: 50, damage: 20 },
      { id: "tunnel_zombie_04", type: "sleeper", x: 600, y: 250, wakeRange: 100, aggroRange: 200, speed: 120, health: 50, damage: 20 }
    ],
    props: [],
    spawns: {
      // Punto de aparición cuando el jugador entra desde la Entrada Subterránea (baja desde arriba)
      from_underground: { x: 400, y: 190, angle: 90 },
      // Punto de aparición cuando el jugador vuelve desde el Túnel 2 (entra desde la izquierda)
      from_tunnel2: { x: 90, y: 300, angle: 0 }
    },
  },
  underground_tunnel2: {
    name: "Túnel Secundario",
    zone: "underground",
    backgroundImage: { key: "bg_tunel2", path: "src/background/tunel2.png" },
    requiresFlashlight: false,
    requiresPower: false,
    showWallVisuals: false,
    walls: [
      { x: 0, y: 0, w: 800, h: 140 },
      { x: 0, y: 450, w: 800, h: 40 },
      { x: 0, y: 40, w: 40, h: 520 },
      { x: 760, y: 40, w: 40, h: 520 },
    ],
    doors: [
      // PUERTA 1 (DERECHA): Vuelve al Túnel Drenado (flooded_zone)
      {
        id: "tunnel2_to_tunnel1",
        x: 740, // Pegada a la pared derecha (X)
        y: 240, // Centrada verticalmente (Y)
        w: 20,
        h: 120,
        label: "Volver al Túnel 1",
        to: "flooded_zone",
        spawn: "from_tunnel2" // Le dice a flooded_zone dónde reubicarte
      },
      // PUERTA 2 (IZQUIERDA): Reservada para lo que agregues después
      {
        id: "tunnel2_to_tunnel3",
        x: 40,  // Pegada a la pared izquierda (X)
        y: 240, // Centrada verticalmente (Y)
        w: 20,
        h: 120,
        label: "Ir al Túnel 3",
        to: "underground_tunnel3", // 🟢 Cambiado: Ahora va al Túnel 3
        spawn: "from_tunnel2"
      },
      // PUERTA 3 (ARRIBA - EN EL MEDIO): ¡Ahora sí conecta!
      {
        id: "tunnel2_to_pipes",
        x: 340, // Centrada en el medio (X)
        y: 140,  // Pegada al techo (Y)
        w: 120,
        h: 20,
        label: "Subir a Sala de Tuberías",
        to: "underground_pipes", // 🟢 Cambiado: Ahora te lleva a las tuberías
        spawn: "from_tunnel2"
      }
    ],
    spawns: {
      // Reacciona cuando el jugador entra desde el primer túnel (entra por la derecha)
      from_tunnel1: { x: 710, y: 300, angle: 180 },
      // Puntos de spawn de reserva para cuando uses las otras puertas en el futuro:
      from_left: { x: 90, y: 300, angle: 0 },
      from_top: { x: 400, y: 200, angle: 90 }
    },
    props: [],
    items: [],
    enemies: [
      { id: "tunnel_rat_01", type: "rat", x: 200, y: 200, speed: 110, aggroRange: 300, damage: 3, health: 5 },
      { id: "tunnel_rat_02", type: "rat", x: 200, y: 200, speed: 120, aggroRange: 300, damage: 3, health: 5 },
      { id: "tunnel_rat_03", type: "rat", x: 200, y: 200, speed: 140, aggroRange: 300, damage: 3, health: 5 },
      { id: "tunnel_rat_04", type: "rat", x: 200, y: 200, speed: 130, aggroRange: 300, damage: 3, health: 5 },
      { id: "tunnel_rat_05", type: "rat", x: 200, y: 200, speed: 135, aggroRange: 300, damage: 3, health: 5 },
      { id: "tunnel_rat_06", type: "rat", x: 200, y: 400, speed: 110, aggroRange: 300, damage: 3, health: 5 },
      { id: "tunnel_rat_07", type: "rat", x: 200, y: 400, speed: 120, aggroRange: 300, damage: 3, health: 5 },
      { id: "tunnel_rat_08", type: "rat", x: 200, y: 400, speed: 140, aggroRange: 300, damage: 3, health: 5 },
      { id: "tunnel_rat_09", type: "rat", x: 200, y: 400, speed: 130, aggroRange: 300, damage: 3, health: 5 },
    ]
  },
  underground_pipes: {
    name: "Sala de Tuberías",
    zone: "underground",
    requiresPower: false,
    backgroundImage: { key: "bg_pipes", path: "src/background/pipe.png" }, // 🟢 Tu fondo "pipe"
    showWallVisuals: true,
    walls: [
      { x: 0, y: 0, w: 800, h: 40 },
      { x: 0, y: 560, w: 800, h: 40 },
      { x: 0, y: 40, w: 340, h: 520 },
      { x: 430, y: 40, w: 40, h: 520 },
    ],
    doors: [
      // PUERTA (ABAJO - EN EL MEDIO): Para volver al Túnel 2
      {
        id: "pipes_to_tunnel2",
        x: 340,  // Centrada en el medio (X)
        y: 540,  // Pegada al suelo (Y) para bajar
        w: 120,
        h: 20,
        label: "Bajar al Túnel 2",
        to: "underground_tunnel2",
        spawn: "from_top" // Te escupe en el spawn de arriba del túnel 2
      }
    ],
    spawns: {
      // Apareces abajo (Y: 510) mirando hacia arriba cuando subes desde el Túnel 2
      from_tunnel2: { x: 400, y: 510, angle: 270 }
    },
    props: [],
    items: [
      // 🟢 Tu caja de balas bien ubicada en el mapa
      { id: "ammo_pipes_01", type: "ammo", name: "Balas x9", x: 400, y: 250, color: 0xd6d6d6, amount: 9 },
    ],
    enemies: []
  },
  underground_tunnel3: {
    name: "Túnel Oscuro",
    zone: "underground",
    backgroundImage: { key: "bg_tunel3", path: "src/background/tunel3.png" },
    requiresPower: false,
    requiresFlashlight: true, // Sigue pidiendo linterna
    showWallVisuals: false,
    walls: [
      { x: 0, y: 0, w: 800, h: 80 },
      { x: 230, y: 150, w: 600, h: 80 },
      { x: 0, y: 560, w: 800, h: 40 },
      { x: 0, y: 40, w: 80, h: 520 },
      { x: 240, y: 150, w: 80, h: 420 },
      { x: 760, y: 40, w: 40, h: 520 },
    ],
    doors: [
      // PUERTA 1: PARED DERECHA - BIEN ARRIBA (Vuelve al Túnel 2)
      {
        id: "tunnel3_to_tunnel2",
        x: 740,   // Acoplada a la derecha
        y: 60,    // Bien arriba (Y: 60)
        w: 20,    // Puerta vertical
        h: 120,
        label: "Volver al Túnel 2",
        to: "underground_tunnel2",
        spawn: "from_left" // Te saca por la izquierda del túnel 2
      },
      // PUERTA 2: PARED DE ABAJO - CERCA DE LA IZQUIERDA (Bloqueada por ahora)
      {
        id: "tunnel3_to_lab1",
        x: 120, y: 540, w: 120, h: 20, // Puerta horizontal abajo a la izquierda
        label: "Ingresar al Laboratorio",
        to: "underground_lab1", 
        spawn: "from_tunnel3"
      }
    ],
    spawns: {
      // 🟢 CORREGIDO: Ahora aparecés bien arriba a la derecha (X: 700, Y: 120)
      // mirando hacia la izquierda (angle: 180) justo al cruzar la puerta
      from_tunnel2: { x: 700, y: 120, angle: 180 },
      
      // Spawn de reserva por si en el futuro volvés desde la puerta de abajo
      from_lab: { x: 180, y: 500, angle: 270 }
    },
    props: [],
    items: [],
    enemies: [
      { id: "tunnel3_rat_1", type: "rat", x: 200, y: 400, speed: 155, aggroRange: 300, damage: 3, health: 5 },
      { id: "tunnel3_rat_1", type: "rat", x: 200, y: 400, speed: 135, aggroRange: 300, damage: 3, health: 5 },
      { id: "tunnel3_rat_1", type: "rat", x: 200, y: 400, speed: 125, aggroRange: 300, damage: 3, health: 5 },
    ]
  },
  // ==========================================
  //            ZONA: LABORATORIO Under
  // ==========================================

underground_lab1: {
    name: "Laboratorio Principal (Sector 1)",
    backgroundImage: { key: "bg_lab1", path: "src/background/lab1.png" },
    zone: "underground", requiresPower: false, showWallVisuals: false,
    walls: [{ x: 0, y: 0, w: 800, h: 80 }, { x: 0, y: 520, w: 800, h: 40 }, { x: 0, y: 40, w: 120, h: 520 }, { x: 700, y: 40, w: 40, h: 520 }, { x: 650, y: 80, w: 40, h: 100 }, { x: 110, y: 80, w: 40, h: 100 }, { x: 300, y: 260, w: 220, h: 100 }],
    doors: [
      { id: "lab1_to_tunnel3", x: 340, y: 80, w: 120, h: 20, label: "Subir al Túnel 3", to: "underground_tunnel3", spawn: "from_lab" },
      { id: "lab1_to_lab5", x: 100, y: 240, w: 20, h: 120, label: "Ir al Lab 5 (Oeste)", to: "underground_lab5", spawn: "from_lab1" },
      { id: "lab1_to_lab2", x: 700, y: 240, w: 20, h: 120, label: "Ir al Lab 2 (Este)", to: "underground_lab2", spawn: "from_lab1" },
      { 
        id: "lab1_to_lab4", x: 340, y: 540, w: 120, h: 20, label: "Bajar al Lab 4 (Sur)", to: "underground_lab4", spawn: "from_lab1",
        objectiveLocked: "lab4AccessGranted",
        lockedMessage: "Compuerta hidráulica sellada. Requiere autorización desde la consola del Almacén Biológico (Lab 3)."
      }
    ],
    spawns: { from_tunnel3: { x: 400, y: 100, angle: 90 }, from_lab5: { x: 90, y: 300, angle: 0 }, from_lab2: { x: 710, y: 300, angle: 180 }, from_lab4: { x: 400, y: 500, angle: 270 } },
    props: [], items: [{ id: "lab1_ammo_01", type: "ammo", name: "Balas x9", x: 400, y:310, color: 0xd6d6d6, amount: 9   }], enemies: []
  },

  underground_lab2: {
    name: "Laboratorio de Ensayos (Sector 2)",
    zone: "underground", requiresPower: false, showWallVisuals: false,
    backgroundImage: { key: "bg_lab2", path: "src/background/lab2.png" },
    walls: [{ x: 0, y: 0, w: 800, h: 80 }, { x: 0, y: 500, w: 800, h: 40 }, { x: 0, y: 40, w: 100, h: 520 }, { x: 700, y: 40, w: 40, h: 520 },{ x: 350, y: 140, w: 100, h: 200 },{ x: 270, y: 200, w: 50, h: 80 },{ x: 480, y: 200, w: 50, h: 140 },{ x: 280, y: 410, w: 240, h: 20 }],
    doors: [
      { id: "lab2_to_lab1", x: 80, y: 240, w: 20, h: 120, label: "Volver al Lab 1", to: "underground_lab1", spawn: "from_lab2" },
      { id: "lab2_to_lab3", x: 700, y: 240, w: 20, h: 120, label: "Ir al Lab 3", to: "underground_lab3", spawn: "from_lab2" }
    ],
    spawns: {
      from_lab1: { x: 90, y: 300, angle: 0 },
      from_lab3: { x: 710, y: 300, angle: 180 }
    },
    props: [], items: [], enemies: [
      { id: "lab2_zombie_01", type: "zombie", x: 600, y: 300, speed: 90, aggroRange: 250, damage: 15, health: 60 },
      { id: "lab2_zombie_02", type: "zombie", x: 200, y: 400, speed: 80, aggroRange: 250, damage: 15, health: 60 } // Corregido Y: 500 a 400 para que no spawnee adentro de la colisión inferior
    ]
  },

  underground_lab3: {
    name: "Almacén Biológico (Sector 3)",
    zone: "underground", requiresPower: false, showWallVisuals: false,
    backgroundImage: { key: "bg_lab3", path: "src/background/lab3.png" },
    walls: [{ x: 0, y: 0, w: 800, h: 80 }, { x: 0, y: 520, w: 800, h: 40 }, { x: 0, y: 40, w: 60, h: 520 }, { x: 660, y: 40, w: 40, h: 520 }, { x: 320, y: 210, w: 150, h: 120 }, { x: 70, y: 430, w: 200, h: 100 }, { x: 570, y: 430, w: 100, h: 100 }],
    doors: [{ id: "lab3_to_lab2", x: 60, y: 220, w: 20, h: 120, label: "Volver al Lab 2", to: "underground_lab2", spawn: "from_lab3" }],
    spawns: { from_lab2: { x: 90, y: 300, angle: 0 } },
    props: [], items: [], 
    enemies: [{ id: "lab3_runner_01", type: "runner", x: 500, y: 300, speed: 90, aggroRange: 250, damage: 15, health: 60 }, { id: "lab3_runner_02", type: "runner", x: 500, y: 150, speed: 90, aggroRange: 250, damage: 15, health: 60 }],
    interactables: [
      // 🖥️ MOVIDO MÁS A LA IZQUIERDA (X: 590) para despegarlo por completo del muro sólido
      { id: "lab3_console", type: "lab_terminal", x: 650, y: 350, w: 50, h: 60, label: "Consola de Seguridad Este" }
    ]
  },

underground_lab4: {
    name: "Cámara de Desechos (Sector 4)",
    zone: "underground", requiresPower: false, showWallVisuals: false,
    backgroundImage: { key: "bg_lab4", path: "src/background/lab4.png" },
    walls: [
      { x: 0, y: 0, w: 800, h: 90 }, 
      { x: 0, y: 560, w: 800, h: 40 }, 
      { x: 180, y: 150, w: 40, h: 360, isPrisonGate: true }, 
      { x: 670, y: 40, w: 40, h: 520 }, 
      { x: 40, y: 90, w: 40, h: 100 }, 
      { x: 90, y: 150, w: 100, h: 40 }, 
      { x: 440, y: 330, w: 180, h: 100 }, 
      { x: 560, y: 460, w: 100, h: 100 }, 
      { x: 560, y: 60, w: 100, h: 100 }, 
      { x: 40, y: 490, w: 40, h: 100 }, 
      { x: 90, y: 470, w: 100, h: 40 }, 
      { x: 0, y: 250, w: 200, h: 20 }, 
      { x: 0, y: 350, w: 200, h: 20 }, 
      { x: 0, y: 480, w: 200, h: 20 }, 
      { x: 0, y: 150, w: 200, h: 20 }
    ],
    doors: [
      { id: "lab4_to_lab1", x: 340, y: 80, w: 120, h: 20, label: "Volver al Lab 1", to: "underground_lab1", spawn: "from_lab4" }
    ],
    spawns: { from_lab1: { x: 400, y: 90, angle: 90 } },
    props: [], 
    // 🔑 AGREGAMOS LA LLAVE AQUÍ DIRECTAMENTE TAMBIÉN:
    items: [
      { id: "rare_key", name: "Tarjeta de Acceso - Nivel 1", type: "key", x: 100, y: 230, color: 0x3a7dba, isPrisonReward: true }
    ], 
    // 🧟 AGREGAMOS LOS TANKS AQUÍ:
    enemies: [
      { id: "lab4_tank_01", type: "tank", x: 100, y: 200, speed: 40, aggroRange: 250, damage: 22, health: 150, isPrisonEnemy: true },
      { id: "lab4_tank_02", type: "tank", x: 100, y: 400, speed: 40, aggroRange: 250, damage: 22, health: 150, isPrisonEnemy: true }
    ],
    interactables: [
      { id: "prison_panel", type: "prison_release", x: 150, y: 500, w: 40, h: 40, label: "Panel de Control de Celdas" }
    ]
  },

  underground_lab5: {
    name: "Criogenia (Sector 5)",
    zone: "underground", requiresPower: false, showWallVisuals: false,
    backgroundImage: { key: "bg_lab5", path: "src/background/lab5.png" },
    walls: [{ x: 0, y: 0, w: 800, h: 110 }, { x: 0, y: 560, w: 800, h: 40 }, { x: 0, y: 40, w: 40, h: 520 }, { x: 760, y: 40, w: 40, h: 520 }, { x: 280, y: 200, w: 200, h: 80 }, { x: 280, y: 335, w: 270, h: 140 }, { x: 40, y: 360, w: 80, h: 190 }, { x: 680, y: 340, w: 80, h: 220 }, { x: 600, y: 60, w: 140, h: 120 }],
    doors: [
      { id: "lab5_to_lab6", x: 40, y: 240, w: 20, h: 120, label: "Ir al Lab 6", to: "underground_lab6", spawn: "from_lab5" },
      { id: "lab5_to_lab1", x: 740, y: 240, w: 20, h: 120, label: "Volver al Lab 1", to: "underground_lab1", spawn: "from_lab5" }
    ],
    spawns: {
      from_lab1: { x: 710, y: 300, angle: 180 },
      from_lab6: { x: 90, y: 300, angle: 0 }
    },
    props: [], items: [{ id: "lab5_ammo_01", type: "ammo", name: "Balas x9", x: 100, y:410, color: 0xd6d6d6, amount: 9}], enemies: [
      { id: "lab5_runner_01", type: "runner", x: 200, y: 300, speed: 80, wakeRange: 90, aggroRange: 250, damage: 15, health: 60 },
      { id: "lab5_runner_02", type: "runner", x: 200, y: 400, speed: 80, wakeRange: 90, aggroRange: 250, damage: 15, health: 60 },

    ]
  },

underground_lab6: {
    name: "Laboratorio Químico (Sector 6)",
    zone: "underground", requiresPower: false, showWallVisuals: false,
    backgroundImage: { key: "bg_lab6", path: "src/background/lab6.png" },
    walls: [{ x: 0, y: 0, w: 800, h: 120 }, { x: 0, y: 560, w: 800, h: 40 }, { x: 200, y: 520, w: 450, h: 40 }, { x: 60, y: 40, w: 40, h: 520 }, { x: 700, y: 40, w: 40, h: 520 }, { x: 340, y: 230, w: 100, h: 140 }, { x: 170, y: 340, w: 80, h: 80 }, { x: 540, y: 320, w: 80, h: 50 }, { x: 600, y: 120, w: 80, h: 50 }],
    doors: [
      { 
        id: "lab6_to_elevator", 
        x: 340, y: 110, w: 120, h: 20, 
        label: "Usar Ascensor de Carga", 
        to: "elec_elevator_exit", 
        spawn: "from_elevator", // 👈 Tu puerta busca este ID al volver
        lockedBy: "key_card_lvl2",
        lockedMessage: "Código de seguridad requerido. Inserte Tarjeta de Nivel 2."
      },
      { 
        id: "lab6_to_lab7", 
        x: 100, y: 280, w: 20, h: 120, 
        label: "Ir al Lab 7", 
        to: "underground_lab7", 
        spawn: "from_lab6",
        lockedBy: "rare_key",
        lockedMessage: "Cerrado. Requiere Tarjeta de Acceso - Nivel 1."
      },
      { id: "lab6_to_lab5", x: 700, y: 280, w: 20, h: 120, label: "Volver al Lab 5", to: "underground_lab5", spawn: "from_lab6" }
    ],
    spawns: {
      from_lab5: { x: 710, y: 300, angle: 180 },
      from_lab7: { x: 120, y: 300, angle: 0 },
      // 🟢 NUEVO: Posicionamos al jugador saliendo del ascensor mirando hacia ABAJO (90°)
      from_elevator: { x: 400, y: 100, angle: 90 } 
    },
    props: [], items: [], enemies: []
  },

underground_lab7: {
    name: "Sala de Servidores Central (Sector 7)",
    zone: "underground", requiresPower: false, showWallVisuals: false,
    backgroundImage: { key: "bg_lab7", path: "src/background/lab7.png" },
    walls: [
      { x: 0, y: 0, w: 800, h: 110 }, 
      { x: 0, y: 530, w: 800, h: 40 }, 
      { x: 10, y: 40, w: 40, h: 520 }, 
      { x: 740, y: 40, w: 40, h: 520 }
    ],
    doors: [
      { id: "lab7_to_lab6", x: 740, y: 240, w: 20, h: 120, label: "Volver al Lab 6", to: "underground_lab6", spawn: "from_lab7" }
    ],
    spawns: {
      from_lab6: { x: 710, y: 300, angle: 180 }
    },
    props: [], 
    items: [
      // 🎁 La tarjeta final en el centro
      { id: "key_card_lvl2", name: "Tarjeta de Acceso - Nivel 2", type: "key", x: 400, y: 300, color: 0xb94235 }
    ], 
    enemies: [
      // 🧟 NUEVO BOSS: Custodio del Sector 7 (Configuración base tipo Tank)
      { id: "lab7_boss_server", type: "tank", x: 200, y: 300, speed: 48, aggroRange: 350, damage: 25, health: 90 }
    ]
  },

// ===================================================
  //   ZONA NUEVA: SECTOR ELÉCTRICO (PUZZLE DE FASES)
  // ===================================================

  elec_elevator_exit: {
    name: "Piso Técnico - Salida del Ascensor (Sector E1)",
    zone: "electrical", requiresPower: false, showWallVisuals: false,
    backgroundImage: { key: "bg_e1", path: "src/background/e1.png" },
    // Muros perimetrales + cajas de herramientas como obstáculos en las esquinas
    walls: [
      { x: 0, y: 0, w: 800, h: 90 }, { x: 0, y: 540, w: 800, h: 40 }, { x: 0, y: 40, w: 40, h: 520 }, { x: 730, y: 40, w: 40, h: 520 },
      { x: 460, y: 190, w: 20, h: 200 }, { x: 320, y: 190, w: 160, h: 20 }, { x: 320, y: 390, w: 160, h: 20 } // Cajas / Obstáculos
    ],
    doors: [
      { id: "elec_elev_to_lab6", x: 400, y: 240, w: 20, h: 120, label: "Bajar por el Ascensor", to: "underground_lab6", spawn: "from_elevator" },
      { id: "elec_elev_to_e2", x: 40, y: 200, w: 20, h: 120, label: "Ir a Sector E2", to: "elec_corridor_down", spawn: "from_elevator" }
    ],
    spawns: { from_elevator: { x: 350, y: 260, angle: 270 }, from_e2: { x: 100, y: 300, angle: 0 } },
    props: [], items: [], enemies: []
  },

  elec_corridor_down: {
    name: "Pasillo Técnico Inferior (Sector E2) - FASE 2",
    zone: "electrical", requiresPower: false, showWallVisuals: false,
    backgroundImage: { key: "bg_e2", path: "src/background/e2.png" },
    // Bloques en el centro que te obligan a caminar en forma de "S" para esquivar zombies o a Mr. X
    walls: [
      { x: 0, y: 0, w: 800, h: 80 }, { x: 0, y: 560, w: 800, h: 40 }, { x: 100, y: 40, w: 40, h: 520 }, { x: 700, y: 40, w: 40, h: 520 },
      // { x: 250, y: 40, w: 300, h: 160 }, // Turbina central superior
      { x: 240, y: 160, w: 110, h: 270 }, { x: 460, y: 160, w: 110, h: 270 }   // Banco de carga inferior
    ],
    doors: [
      { id: "e2_to_elec_elev", x: 740, y: 220, w: 20, h: 120, label: "Volver al Ascensor", to: "elec_elevator_exit", spawn: "from_e2" },
      { id: "e2_to_e3", x: 340, y: 60, w: 120, h: 20, label: "Subir a Sector E3", to: "elec_corridor_mid", spawn: "from_e2" }
    ],
    interactables: [
      {
        id: "switch_phase_2",
        type: "phase_switch",
        label: "Accionar Disyuntor: FASE 2",
        x: 335, y: 350, w: 80, h: 60,
        visual: { color: 0x3a7dba, strokeColor: 0x1a3d5c }
      }
    ],
    spawns: { from_elevator: { x: 700, y: 300, angle: 180 }, from_e3: { x: 400, y: 100, angle: 90 } },
    props: [], items: [{id: "e2_ammo_01", type: "ammo", name: "Balas x9", x: 130, y: 440, color: 0xd6d6d6, amount: 9}], enemies: [{ id: "e2_zombie_01", type: "zombie", x: 300, y: 120, speed: 80, aggroRange: 250, damage: 15, health: 60 }, { id: "e2_zombie_02", type: "zombie", x: 400, y: 500, speed: 80, aggroRange: 250, damage: 15, health: 60 }]
  },

  elec_corridor_mid: {
    name: "Distribuidor Eléctrico Medio (Sector E3) - FASE 3",
    zone: "electrical", requiresPower: false, showWallVisuals: false,
    backgroundImage: { key: "bg_e3", path: "src/background/e3.png" },
    // Dos grandes generadores en paralelo en el medio de la sala
    walls: [
      { x: 0, y: 0, w: 800, h: 70 }, { x: 0, y: 560, w: 800, h: 40 }, { x: 2, y: 40, w: 40, h: 520 }, { x: 730, y: 40, w: 40, h: 520 },
      { x: 220, y: 160, w: 120, h: 220 }, // Generador Izquierdo
      { x: 460, y: 160, w: 120, h: 220 },
      { x: 40, y: 390, w: 100, h: 150 }  // Generador Derecho
    ],
    doors: [
      { id: "e3_to_e2", x: 340, y: 540, w: 120, h: 20, label: "Bajar a Sector E2", to: "elec_corridor_down", spawn: "from_e3" },
      { id: "e3_to_e4", x: 340, y: 60, w: 120, h: 20, label: "Subir a Sector E4", to: "elec_corridor_top", spawn: "from_e3" }
    ],
    interactables: [
      {
        id: "switch_phase_3",
        type: "phase_switch",
        label: "Accionar Disyuntor: FASE 3",
        x: 300, y: 280, w: 80, h: 60, // Justo entre medio de los dos generadores
        visual: { color: 0x3a7dba, strokeColor: 0x1a3d5c }
      }
    ],
    spawns: { from_e2: { x: 400, y: 480, angle: 270 }, from_e4: { x: 400, y: 100, angle: 90 } },
    props: [], items: [], enemies: [{ id: "e3_sleeper_01", type: "sleeper", x: 300, y: 120, speed: 92, wakeRange: 95, aggroRange: 310, damage: 13, health: 70 }, { id: "e3_sleeper_02", type: "sleeper", x: 650, y: 200, speed: 92, wakeRange: 95, aggroRange: 310, damage: 13, health: 70}]
  },

  elec_corridor_top: {
    name: "Subestación de Alta Tensión (Sector E4) - FASE 1",
    zone: "electrical", requiresPower: false, showWallVisuals: false,
    backgroundImage: { key: "bg_e4", path: "src/background/e4.png" },
    // Laberinto de transformadores chicos (bobinas) esparcidas
    walls: [
      { x: 0, y: 0, w: 800, h: 80 }, { x: 0, y: 560, w: 800, h: 40 }, { x: 80, y: 40, w: 40, h: 520 }, { x: 730, y: 40, w: 40, h: 520 },
      { x: 240, y: 200, w: 110, h: 230 }, { x: 450, y: 200, w: 110, h: 230 },
      { x: 120, y: 80, w: 60, h: 150 }, { x: 660, y: 360, w: 60, h: 220 }
    ],
    doors: [
      { id: "e4_to_e3", x: 340, y: 540, w: 120, h: 20, label: "Bajar a Sector E3", to: "elec_corridor_mid", spawn: "from_e4" },
      { id: "e4_to_core", x: 740, y: 240, w: 20, h: 120, label: "Ir al Núcleo", to: "elec_core", spawn: "from_e4" }
    ],
    interactables: [
      {
        id: "switch_phase_1",
        type: "phase_switch",
        label: "Accionar Disyuntor: FASE 1",
        x: 400, y: 60, w: 80, h: 40,
        visual: { color: 0x3a7dba, strokeColor: 0x1a3d5c }
      }
    ],
    spawns: { from_e3: { x: 400, y: 480, angle: 270 }, from_core: { x: 700, y: 300, angle: 180 } },
    props: [], items: [{id: "e4_ammo_01", type: "ammo", name: "Balas x9", x: 130, y: 440, color: 0xd6d6d6, amount: 9}], enemies: [{ id: "tank_01", type: "tank", x: 300, y: 120, speed: 40, aggroRange: 250, damage: 22, health: 150 }]
  },

  elec_core: {
    name: "Núcleo de Control de Energía",
    zone: "electrical", requiresPower: false, showWallVisuals: false,
    backgroundImage: { key: "bg_nucleo", path: "src/background/nucleo.png" },
    // Consola central grande tipo isla que te permite rodearla corriendo
    walls: [
      { x: 0, y: 0, w: 800, h: 80 }, { x: 0, y: 560, w: 800, h: 40 }, { x:20, y: 40, w: 40, h: 520 }, { x: 700, y: 40, w: 40, h: 520 },
      { x: 160, y: 120, w: 60, h: 60 }, { x: 460, y: 120, w: 60, h: 100 }, { x: 460, y: 280, w: 60, h: 60 }, { x: 460, y: 400, w: 60, h: 60 }, { x: 260, y: 180, w: 60, h: 60 }, { x: 260, y: 280, w: 60, h: 60 }, { x: 260, y: 400, w: 60, h: 60 }, { x: 580, y: 180, w: 60, h: 60 }, { x: 580, y: 420, w: 60, h: 60 }, { x: 80, y: 320, w: 60, h: 60 }, { x: 150, y: 490, w: 60, h: 60 }  // Computadora central isla
    ],
    doors: [
      { id: "core_to_e4", x: 40, y: 220, w: 20, h: 120, label: "Volver a Sector E4", to: "elec_corridor_top", spawn: "from_core" },
      { id: "core_to_escape", x: 340, y: 540, w: 120, h: 20, label: "Bajar al Hangar de Escape", to: "elec_escape", spawn: "from_core", puzzleLocked: "fasesCompletas" }
    ],
    interactables: [
      {
        id: "main_power_console",
        type: "core_console",
        label: "Consola Principal: Sincronizar Sistema",
        x: 400, y: 80, w: 80, h: 40
      }
    ],
    spawns: { from_e4: { x: 100, y: 300, angle: 0 }, from_escape: { x: 400, y: 480, angle: 270 } },
    props: [], items: [], enemies: []
  },

  elec_escape: {
    name: "Hangar Técnico (Arena de Emergencia)",
    zone: "electrical", requiresPower: false, showWallVisuals: true,
    backgroundImage: { key: "bg_hangar", path: "src/background/hangar.png" },
    // Espacio 100% limpio en el centro para poder correr, rodar y balear al Boss
    walls: [
      { x: 0, y: 0, w: 800, h: 40 }, { x: 0, y: 560, w: 800, h: 40 }, { x: 0, y: 40, w: 40, h: 520 }, { x: 760, y: 40, w: 40, h: 520 }
    ],
    doors: [
      { id: "escape_to_core", x: 340, y: 40, w: 120, h: 20, label: "Volver al Núcleo", to: "elec_core", spawn: "from_escape" },
      // 🟢 PUERTA DE SALIDA: Mañana hacés que se desbloquee cuando la vida de Mr. X llegue a 0
      { id: "escape_to_final", x: 340, y: 560, w: 120, h: 20, label: "Puerta de Evacuación", to: "elec_final_escape", spawn: "from_hangar", bossLocked: true, lockedMessage: "La compuerta está sellada por el protocolo de combate." }
    ],
    spawns: { 
      from_core: { x: 400, y: 100, angle: 90 },
      from_final: { x: 700, y: 300, angle: 180 }
    },
    props: [], 
    items: [], 
    enemies: [
      // 👑 MR. X - COMBATE FINAL DE EMERGENCIA
      // Vos aparecés arriba (y: 100). Lo ponemos a él abajo (y: 450) custodiando la salida.
      { 
        id: "mr_x_final_boss", 
        type: "tank", 
        x: 400, 
        y: 450, 
        speed: 53,       // Un puntito más rápido para meter presión en el llano
        aggroRange: 500,  // Te detecta apenas cruzás la puerta de arriba
        damage: 35,       // Golpea durísimo
        health: 150       // 5 tiros limpios si tus balas hacen 30 de daño
      }
    ]
  },

  elec_final_escape: {
    name: "Túnel de Salida Exterior",
    zone: "electrical", requiresPower: false, showWallVisuals: true,
    backgroundImage: { key: "bg_escape", path: "src/background/escape.png"},
    // Un pasillo ancho que va hacia la derecha con la moto esperándote
    walls: [
      { x: 0, y: 0, w: 800, h: 120 }, // Techo bajo para dar sensación de túnel de escape
      { x: 0, y: 480, w: 800, h: 120 },
      { x: 0, y: 120, w: 40, h: 360 }  // Fondo izquierdo tapado excepto la puerta
    ],
    doors: [
      { id: "final_to_escape", x: 40, y: 240, w: 20, h: 120, label: "Volver al Hangar", to: "elec_escape", spawn: "from_final" }
    ],
    interactables: [
      {
        id: "escape_motorcycle",
        type: "vehicle_escape",
        label: "Subir a la Moto y Escapar a la Chota",
        x: 500, y: 260, w: 100, h: 80
      }
    ],
    spawns: { 
      from_hangar: { x: 90, y: 300, angle: 0 } 
    },
    props: [], items: [], enemies: []
  }
  
};
