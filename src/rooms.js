export const ROOMS = {
  shore: {
    name: "Orilla / moto rota",
    zone: "forest",
    playerStart: { x: 120, y: 300, angle: 0 },
    walls: [
      { x: 0, y: 0, w: 800, h: 42 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
      { x: 120, y: 92, w: 180, h: 80 },
      { x: 96, y: 424, w: 260, h: 70 },
    ],
    doors: [
      { id: "shore_to_forest", x: 740, y: 260, w: 42, h: 88, to: "forest_path", spawn: "from_shore", label: "Bosque" },
    ],
    spawns: {
      from_forest: { x: 700, y: 302, angle: 180 },
    },
    props: [
      { x: 150, y: 295, text: "MOTO DE AGUA ROTA" },
    ],
  },
  forest_path: {
    name: "Camino del bosque",
    zone: "forest",
    playerStart: { x: 95, y: 300, angle: 0 },
    walls: [
      { x: 0, y: 0, w: 800, h: 48 },
      { x: 0, y: 552, w: 800, h: 48 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
      { x: 230, y: 48, w: 90, h: 250 },
      { x: 470, y: 300, w: 90, h: 252 },
    ],
    doors: [
      { id: "forest_to_shore", x: 18, y: 260, w: 42, h: 88, to: "shore", spawn: "from_forest", label: "Orilla" },
      { id: "forest_to_control", x: 740, y: 260, w: 42, h: 88, to: "control_room", spawn: "from_forest", label: "Control" },
    ],
    spawns: {
      from_shore: { x: 92, y: 302, angle: 0 },
      from_control: { x: 700, y: 302, angle: 180 },
    },
    props: [
      { x: 395, y: 116, text: "BOSQUE" },
      { x: 395, y: 492, text: "SENDA" },
    ],
  },
  control_room: {
    name: "Pantallas de control",
    zone: "control",
    walls: [
      { x: 0, y: 0, w: 800, h: 48 },
      { x: 0, y: 552, w: 800, h: 48 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
      { x: 160, y: 130, w: 170, h: 90 },
      { x: 470, y: 130, w: 170, h: 90 },
      { x: 300, y: 390, w: 200, h: 70 },
    ],
    doors: [
      { id: "control_to_forest", x: 18, y: 260, w: 42, h: 88, to: "forest_path", spawn: "from_control", label: "Bosque" },
      { id: "control_to_entry", x: 740, y: 260, w: 42, h: 88, to: "building_entry", spawn: "from_control", label: "Edificio" },
    ],
    spawns: {
      from_forest: { x: 92, y: 302, angle: 0 },
      from_entry: { x: 700, y: 302, angle: 180 },
    },
    props: [
      { x: 245, y: 175, text: "MONITORES" },
      { x: 555, y: 175, text: "CONSOLA" },
    ],
    items: [
      { id: "lab_key", type: "key", name: "Llave lab", x: 400, y: 430, color: 0xe6c84f, description: "Abre la puerta del pasillo bloqueado desde el hall." },
    ],
  },
  building_entry: {
    name: "Entrada del edificio",
    zone: "building",
    walls: [
      { x: 0, y: 0, w: 800, h: 42 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
      { x: 155, y: 98, w: 490, h: 56 },
      { x: 155, y: 448, w: 490, h: 56 },
      { x: 370, y: 154, w: 60, h: 125 },
    ],
    doors: [
      { id: "entry_to_control", x: 18, y: 260, w: 42, h: 88, to: "control_room", spawn: "from_entry", label: "Control" },
      { id: "entry_to_hall", x: 740, y: 260, w: 42, h: 88, to: "main_hall", spawn: "from_entry", label: "Hall" },
      { id: "entry_to_safe", x: 360, y: 520, w: 80, h: 42, to: "safe_room", spawn: "from_entry", label: "Sala segura" },
    ],
    spawns: {
      from_control: { x: 92, y: 302, angle: 0 },
      from_hall: { x: 700, y: 302, angle: 180 },
      from_safe: { x: 400, y: 498, angle: 270 },
    },
    props: [
      { x: 400, y: 340, text: "RECEPCION" },
    ],
    items: [
      { id: "ammo_entry_01", type: "ammo", name: "Balas x6", x: 400, y: 390, color: 0xd6d6d6, amount: 6 },
    ],
  },
  safe_room: {
    name: "Sala segura",
    zone: "building",
    walls: [
      { x: 0, y: 0, w: 800, h: 42 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
      { x: 96, y: 120, w: 190, h: 90 },
      { x: 512, y: 120, w: 190, h: 90 },
      { x: 110, y: 405, w: 580, h: 64 },
    ],
    doors: [
      { id: "safe_to_entry", x: 360, y: 18, w: 80, h: 42, to: "building_entry", spawn: "from_safe", label: "Entrada" },
    ],
    spawns: {
      from_entry: { x: 400, y: 92, angle: 90 },
    },
    props: [
      { x: 190, y: 165, text: "GUARDADO" },
      { x: 607, y: 165, text: "BAUL" },
      { x: 400, y: 438, text: "DESCANSO" },
    ],
    items: [
      { id: "medikit_safe_01", type: "medikit", name: "Medikit", x: 400, y: 310, color: 0x5fd178, heal: 35 },
    ],
  },
  main_hall: {
    name: "Hall principal",
    zone: "lab",
    requiresPower: true,
    walls: [
      { x: 0, y: 0, w: 800, h: 42 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
      { x: 148, y: 112, w: 140, h: 340 },
      { x: 512, y: 112, w: 140, h: 340 },
      { x: 325, y: 270, w: 150, h: 60 },
    ],
    doors: [
      { id: "hall_to_entry", x: 18, y: 260, w: 42, h: 88, to: "building_entry", spawn: "from_hall", label: "Entrada" },
      { id: "hall_to_locked", x: 740, y: 260, w: 42, h: 88, to: "locked_corridor", spawn: "from_hall", label: "Pasillo", lockedBy: "lab_key" },
    ],
    spawns: {
      from_entry: { x: 92, y: 302, angle: 0 },
      from_locked: { x: 700, y: 302, angle: 180 },
    },
    props: [
      { x: 400, y: 300, text: "PUERTA AL RESTO DEL MAPA" },
    ],
    enemies: [
      { id: "hall_zombie_01", type: "zombie", x: 400, y: 130, speed: 65, aggroRange: 280, damage: 12, health: 60 },
    ],
  },
  locked_corridor: {
    name: "Pasillo bloqueado",
    zone: "locked",
    requiresPower: true,
    walls: [
      { x: 0, y: 0, w: 800, h: 42 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
    ],
    doors: [
      { id: "locked_to_hall", x: 18, y: 260, w: 42, h: 88, to: "main_hall", spawn: "from_locked", label: "Hall" },
      { id: "locked_to_storage", x: 360, y: 18, w: 80, h: 42, to: "laboratory_storage", spawn: "from_corridor", label: "Deposito" },
      { id: "locked_to_generator", x: 360, y: 540, w: 80, h: 42, to: "generator_room", spawn: "from_corridor", label: "Generador" },
    ],
    spawns: {
      from_hall: { x: 92, y: 302, angle: 0 },
      from_storage: { x: 400, y: 92, angle: 90 },
      from_generator: { x: 400, y: 500, angle: 270 },
    },
    props: [
      { x: 400, y: 300, text: "MAS ADELANTE" },
    ],
    enemies: [
      { id: "locked_runner_01", type: "runner", x: 430, y: 300, speed: 125, aggroRange: 360, damage: 8, health: 35 },
    ],
  },
  laboratory_storage: {
    name: "Deposito de laboratorio",
    zone: "lab",
    requiresPower: true,
    walls: [
      { x: 0, y: 0, w: 800, h: 42 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
      { x: 120, y: 120, w: 170, h: 90 },
      { x: 510, y: 120, w: 170, h: 90 },
      { x: 310, y: 300, w: 180, h: 78 },
      { x: 95, y: 420, w: 210, h: 66 },
      { x: 545, y: 420, w: 160, h: 66 },
    ],
    doors: [
      { id: "storage_to_locked", x: 360, y: 540, w: 80, h: 42, to: "locked_corridor", spawn: "from_storage", label: "Pasillo" },
    ],
    spawns: {
      from_corridor: { x: 400, y: 500, angle: 270 },
    },
    props: [
      { x: 205, y: 165, text: "ESTANTES" },
      { x: 595, y: 165, text: "MUESTRAS" },
      { x: 400, y: 340, text: "MESA CENTRAL" },
    ],
    items: [
      { id: "ammo_storage_01", type: "ammo", name: "Balas x6", x: 610, y: 455, color: 0xd6d6d6, amount: 6 },
      { id: "fuse_01", type: "key", name: "Fusible", x: 205, y: 455, color: 0x8ce6ff, description: "Pieza electrica para activar el generador." },
      {
        id: "note_power_01",
        type: "note",
        name: "Nota arrugada",
        x: 400,
        y: 235,
        color: 0xf0e6cf,
        description: "Una nota de mantenimiento.",
        text: "El generador no arranca sin fusible. Si vuelve la energia, la puerta de mantenimiento deberia destrabarse.",
      },
    ],
  },
  generator_room: {
    name: "Sala del generador",
    zone: "service",
    requiresPower: true,
    walls: [
      { x: 0, y: 0, w: 800, h: 42 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
      { x: 125, y: 92, w: 140, h: 120 },
      { x: 535, y: 92, w: 140, h: 120 },
      { x: 290, y: 235, w: 220, h: 130 },
      { x: 112, y: 430, w: 190, h: 70 },
      { x: 500, y: 430, w: 190, h: 70 },
    ],
    doors: [
      { id: "generator_to_locked", x: 360, y: 18, w: 80, h: 42, to: "locked_corridor", spawn: "from_generator", label: "Pasillo" },
      { id: "generator_to_maintenance", x: 740, y: 260, w: 42, h: 88, to: "maintenance_access", spawn: "from_generator", label: "Mantenimiento", powerLocked: true },
    ],
    spawns: {
      from_corridor: { x: 400, y: 92, angle: 90 },
      from_maintenance: { x: 700, y: 302, angle: 180 },
    },
    props: [
      { x: 400, y: 300, text: "GENERADOR APAGADO", powerText: { on: "GENERADOR ENCENDIDO" } },
      { x: 207, y: 465, text: "CAJAS" },
      { x: 595, y: 465, text: "TABLERO" },
    ],
    interactables: [
      {
        id: "generator_switch",
        type: "generator",
        label: "activar generador",
        x: 400,
        y: 300,
        w: 140,
        h: 90,
        requiresItem: "fuse_01",
        offVisual: { color: 0xc9a633, alpha: 0.72, strokeColor: 0x332500 },
        onVisual: { color: 0x7fe28a, alpha: 0.72, strokeColor: 0x17361b },
      },
    ],
    items: [
      { id: "medikit_generator_01", type: "medikit", name: "Medikit", x: 610, y: 145, color: 0x5fd178, heal: 35 },
    ],
    enemies: [
      { id: "generator_zombie_01", type: "zombie", x: 185, y: 330, speed: 58, aggroRange: 240, damage: 12, health: 60 },
    ],
  },
  maintenance_access: {
    name: "Acceso de mantenimiento",
    zone: "service",
    walls: [
      { x: 0, y: 0, w: 800, h: 42 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
      { x: 140, y: 115, w: 140, h: 100 },
      { x: 500, y: 115, w: 160, h: 100 },
      { x: 250, y: 355, w: 300, h: 78 },
    ],
    doors: [
      { id: "maintenance_to_generator", x: 18, y: 260, w: 42, h: 88, to: "generator_room", spawn: "from_maintenance", label: "Generador" },
      { id: "maintenance_to_switch", x: 740, y: 260, w: 42, h: 88, to: "switch_room", spawn: "from_maintenance", label: "Paneles" },
    ],
    spawns: {
      from_generator: { x: 92, y: 302, angle: 0 },
      from_switch: { x: 700, y: 302, angle: 180 },
    },
    props: [
      { x: 210, y: 165, text: "REPUESTOS" },
      { x: 580, y: 165, text: "CONDUCTOS" },
      { x: 400, y: 394, text: "PUERTA FUTURA" },
    ],
    items: [
      { id: "ammo_maintenance_01", type: "ammo", name: "Balas x6", x: 580, y: 450, color: 0xd6d6d6, amount: 6 },
    ],
    enemies: [
      { id: "maintenance_runner_01", type: "runner", x: 590, y: 310, speed: 118, aggroRange: 340, damage: 8, health: 35 },
    ],
  },
  switch_room: {
    name: "Sala de paneles",
    zone: "service",
    requiresPower: true,
    walls: [
      { x: 0, y: 0, w: 800, h: 42 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
      { x: 130, y: 110, w: 540, h: 80 },
      { x: 130, y: 420, w: 540, h: 72 },
    ],
    doors: [
      { id: "switch_to_maintenance", x: 18, y: 260, w: 42, h: 88, to: "maintenance_access", spawn: "from_switch", label: "Mantenimiento" },
      { id: "switch_to_sealed", x: 360, y: 18, w: 80, h: 42, to: "sealed_room", spawn: "from_switch", label: "Sala sellada", objectiveLocked: "switchPuzzleSolved" },
    ],
    spawns: {
      from_maintenance: { x: 92, y: 302, angle: 0 },
      from_sealed: { x: 400, y: 92, angle: 90 },
    },
    props: [
      { x: 400, y: 150, text: "CODIGO: VERDE ROJO VERDE" },
      { x: 400, y: 456, text: "PANELES DE SEGURIDAD" },
    ],
    interactables: [
      {
        id: "switch_a",
        type: "puzzle_switch",
        switchId: "a",
        label: "alternar panel A",
        x: 245,
        y: 300,
        w: 68,
        h: 68,
        offVisual: { color: 0x8c3d38, alpha: 0.84, strokeColor: 0x35110f },
        onVisual: { color: 0x65d17a, alpha: 0.9, strokeColor: 0x12381a },
      },
      {
        id: "switch_b",
        type: "puzzle_switch",
        switchId: "b",
        label: "alternar panel B",
        x: 400,
        y: 300,
        w: 68,
        h: 68,
        offVisual: { color: 0x8c3d38, alpha: 0.84, strokeColor: 0x35110f },
        onVisual: { color: 0x65d17a, alpha: 0.9, strokeColor: 0x12381a },
      },
      {
        id: "switch_c",
        type: "puzzle_switch",
        switchId: "c",
        label: "alternar panel C",
        x: 555,
        y: 300,
        w: 68,
        h: 68,
        offVisual: { color: 0x8c3d38, alpha: 0.84, strokeColor: 0x35110f },
        onVisual: { color: 0x65d17a, alpha: 0.9, strokeColor: 0x12381a },
      },
    ],
  },
  sealed_room: {
    name: "Sala sellada",
    zone: "lab",
    requiresPower: true,
    walls: [
      { x: 0, y: 0, w: 800, h: 42 },
      { x: 0, y: 558, w: 800, h: 42 },
      { x: 0, y: 0, w: 42, h: 600 },
      { x: 758, y: 0, w: 42, h: 600 },
      { x: 120, y: 135, w: 220, h: 86 },
      { x: 460, y: 135, w: 220, h: 86 },
      { x: 230, y: 405, w: 340, h: 72 },
    ],
    doors: [
      { id: "sealed_to_switch", x: 360, y: 540, w: 80, h: 42, to: "switch_room", spawn: "from_sealed", label: "Paneles" },
    ],
    spawns: {
      from_switch: { x: 400, y: 500, angle: 270 },
    },
    props: [
      { x: 230, y: 178, text: "ARCHIVO" },
      { x: 570, y: 178, text: "MEDICINA" },
      { x: 400, y: 442, text: "PUERTA SELLADA" },
    ],
    items: [
      { id: "sealed_note_01", type: "note", name: "Informe viejo", x: 230, y: 278, color: 0xf0e6cf, text: "No todos los cierres dependen de llaves. Algunos paneles cambian el estado de puertas completas." },
      { id: "sealed_medikit_01", type: "medikit", name: "Medikit", x: 570, y: 278, color: 0x5fd178, heal: 35 },
    ],
  },
};
