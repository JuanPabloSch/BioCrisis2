import { HEIGHT, ROOM_COLORS, WIDTH } from "./constants.js";
import { getEnemyType } from "./enemyTypes.js";
import * as inventoryOverlay from "./inventory.js";
import { ROOMS } from "./rooms.js";
import { createInitialWorldState, loadGameData, normalizeWorldState, saveGameData } from "./saveSystem.js";

const WEAPONS = {
  pistol: { name: "Pistola", magazineSize: 6, delay: 260, reloadTime: 700, damage: 25, speed: 520, bulletRadius: 5, color: 0xf4e9b8, pellets: 1, spread: 0 },
  shotgun: { name: "Escopeta", magazineSize: 4, delay: 620, reloadTime: 950, damage: 22, speed: 470, bulletRadius: 5, color: 0xffd28a, pellets: 5, spread: 0.34 },
  rocket: { name: "Rocket", magazineSize: 1, delay: 1100, reloadTime: 1300, damage: 140, speed: 360, bulletRadius: 10, color: 0xff8166, pellets: 1, spread: 0 },
};

const WEAPON_KEYS = {
  ONE: "pistol",
  TWO: "shotgun",
  THREE: "rocket",
};

const PLAYER_SPRITES = {
  pistol: { key: "player_pistol", path: "src/assets/player_pistol.png", frameWidth: 100, frameHeight: 130 },
  shotgun: { key: "player_shotgun", path: "src/assets/player_shotgun.png", frameWidth: 110, frameHeight: 130 },
  rocket: { key: "player_rocket", path: "src/assets/player_rocket.png", frameWidth: 110, frameHeight: 120 },
};

const PLAYER_SCALE = 0.7;
const ZOMBIE_SPRITE = { key: "zombie", path: "src/assets/zombie.png", frameWidth: 100, frameHeight: 130, scale: 0.7 };

const MAP_NODES = {
  // --- HILERA SUPERIOR ---
  laboratory_storage: { label: "Deposito", x: 612, y: 80 },
  sealed_room: { label: "Sellada", x: 720, y: 80 },

  // --- HILERA PRINCIPAL ---
  shore: { label: "Orilla", x: 82, y: 155 },
  forest_path: { label: "Bosque", x: 185, y: 155 },
  control_room: { label: "Control", x: 288, y: 155 },
  building_entry: { label: "Entrada", x: 392, y: 155 },
  main_hall: { label: "Hall", x: 502, y: 155 },
  locked_corridor: { label: "Pasillo", x: 612, y: 155 },
  switch_room: { label: "Paneles", x: 720, y: 155 },

  // --- HILERA MEDIA ---
  safe_room: { label: "Sala segura", x: 392, y: 230 },
  generator_room: { label: "Generador", x: 612, y: 230 },
  maintenance_access: { label: "Mant.", x: 720, y: 230 },

  // --- SUBSUELO PARTE 1 ---
  underground_entry: { label: "Subsuelo", x: 612, y: 305 },
  underground_pumps: { label: "Bombas", x: 720, y: 305 },
  underground_pipes: { label: "Tuberías", x: 502, y: 305 },

  // --- SUBSUELO PARTE 2 ---
  flooded_zone: { label: "Túnel", x: 612, y: 380 },
  underground_tunnel2: { label: "Túnel 2", x: 502, y: 380 },
  underground_tunnel3: { label: "Túnel 3", x: 392, y: 380 },

  // --- COMPLEJO DE LABORATORIOS UNDER ---
  underground_lab1: { label: "Lab 1", x: 392, y: 455 },
  underground_lab2: { label: "Lab 2", x: 492, y: 455 },
  underground_lab3: { label: "Lab 3", x: 592, y: 455 },
  underground_lab4: { label: "Lab 4", x: 392, y: 520 },
  underground_lab5: { label: "Lab 5", x: 292, y: 455 },
  underground_lab6: { label: "Lab 6", x: 192, y: 455 },
  underground_lab7: { label: "Lab 7", x: 92,  y: 455 },

  // --- 🟢 NUEVA ZONA: RECTÁNGULOS BLANCOS (ALINEACIÓN IZQUIERDA) ---
  elec_elevator_exit: { label: "Sector E1", x: 192, y: 380 }, // Arriba de Lab 6
  elec_corridor_down: { label: "Sector E2", x: 92,  y: 380 }, // Al lado del ascensor
  elec_corridor_mid:  { label: "Sector E3", x: 92,  y: 305 }, // Subiendo...
  elec_corridor_top:  { label: "Sector E4", x: 92,  y: 230 }, // Esquina superior izquierda
  elec_core:          { label: "Núcleo",    x: 192, y: 230 }, // Centro del bucle blanco
 elec_escape:        { label: "Hangar E",  x: 292, y: 305 }, // Arena de pelea con Mr. X
  elec_final_escape:  { label: "Salida",    x: 392, y: 305 }  // 🟢 Nueva: Acá está la moto tranqui
};

const MAP_LINKS = [
  // --- CONEXIONES ORIGINALES (Revisá que no falte ninguna coma) ---
  ["shore", "forest_path"],
  ["forest_path", "control_room"],
  ["control_room", "building_entry"],
  ["building_entry", "main_hall"],
  ["building_entry", "safe_room"],
  ["main_hall", "locked_corridor"],
  ["locked_corridor", "laboratory_storage"],
  ["locked_corridor", "generator_room"],
  ["generator_room", "maintenance_access"],
  ["generator_room", "underground_entry"],
  ["maintenance_access", "switch_room"],
  ["switch_room", "sealed_room"],
  ["underground_entry", "underground_pumps"],
  ["underground_entry", "flooded_zone"],
  ["flooded_zone", "underground_tunnel2"],
  ["underground_tunnel2", "underground_pipes"],
  ["underground_tunnel2", "underground_tunnel3"],
  ["underground_tunnel3", "underground_lab1"],
  ["underground_lab1", "underground_lab2"],
  ["underground_lab2", "underground_lab3"],
  ["underground_lab1", "underground_lab4"],
  ["underground_lab1", "underground_lab5"],
  ["underground_lab5", "underground_lab6"],
  ["underground_lab6", "underground_lab7"],

  // --- 🟢 NUEVAS CONEXIONES BLANCAS (Controlá los corchetes de estas) ---
  ["underground_lab6", "elec_elevator_exit"],
  ["elec_elevator_exit", "elec_corridor_down"],
  ["elec_corridor_down", "elec_corridor_mid"],
  ["elec_corridor_mid",  "elec_corridor_top"],
  ["elec_corridor_top",  "elec_core"],
  ["elec_core",          "elec_escape"],
  ["elec_escape",        "elec_final_escape"] // 🟢 Conexión nueva
]; // <-- Asegurate de que cierre con ];

class PrototypeScene extends Phaser.Scene {
  constructor() {
    super("PrototypeScene");
  }

  preload() {
    
    for (const room of Object.values(ROOMS)) {
      // Carga la imagen normal (con agua)
      if (room.backgroundImage) {
        this.load.image(room.backgroundImage.key, room.backgroundImage.path);
      }
      
      // 🟢 NUEVO: Si la habitación tiene fondo seco, lo precarga automáticamente también
      if (room.backgroundImageDry) {
        this.load.image(room.backgroundImageDry.key, room.backgroundImageDry.path);
      }
    }
    this.load.image("foto_linterna", "src/background/linterna.png"); 
    this.load.image("foto_labo", "src/background/labo.png");
    this.load.image("foto_superficie", "src/background/superficie.png");
    this.load.image("victory_screen", "src/background/victory.png");
    for (const sprite of Object.values(PLAYER_SPRITES)) {
      this.load.spritesheet(sprite.key, sprite.path, {
        frameWidth: sprite.frameWidth,
        frameHeight: sprite.frameHeight,
      });
    }
    this.load.spritesheet(ZOMBIE_SPRITE.key, ZOMBIE_SPRITE.path, {
      frameWidth: ZOMBIE_SPRITE.frameWidth,
      frameHeight: ZOMBIE_SPRITE.frameHeight,
    });
  }

  create() {
    this.currentRoomId = "shore";
    this.nearDoor = null;
    this.nearItem = null;
    this.nearInteractable = null;
    this.worldState = createInitialWorldState();
    this.lastShotAt = 0;
    this.lastDamageAt = 0;
    this.isReloading = false;
    this.inventorySelectedIndex = 0;
    this.playerWalkTime = 0;

    this.cameras.main.setBackgroundColor("#101010");

    this.roomLayer = this.add.container(0, 0);
    this.darknessLayer = this.add.container(0, 0);
    this.darknessLayer.setDepth(900);
    this.uiLayer = this.add.container(0, 0);

    this.wallGroup = this.physics.add.staticGroup();
    this.doorGroup = this.physics.add.staticGroup();
    this.itemGroup = this.physics.add.staticGroup();
    this.interactableGroup = this.physics.add.staticGroup();
    this.enemyGroup = this.physics.add.group();
    this.bulletGroup = this.physics.add.group();

    this.player = this.add.sprite(120, 300, PLAYER_SPRITES.pistol.key, 0);
    this.player.setScale(PLAYER_SCALE);
    this.physics.add.existing(this.player);
    this.configurePlayerBody();
    this.player.body.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.wallGroup);
    this.physics.add.collider(this.enemyGroup, this.wallGroup);
    this.physics.add.collider(this.bulletGroup, this.wallGroup, this.onBulletHitWall, null, this);
    this.physics.add.overlap(this.bulletGroup, this.enemyGroup, this.onBulletHitEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemyGroup, this.onPlayerTouchEnemy, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.actionKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.useMedikitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.reloadKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.saveKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
    this.loadKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.mapKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    this.inventoryKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    this.weaponKeys = {
      pistol: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
      shotgun: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
      rocket: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
    };
    this.input.on("pointerdown", this.onPointerDown, this);

    this.titleText = this.add.text(20, 18, "", {
      fontFamily: "Arial",
      fontSize: "22px",
      color: "#f4eddc",
    });
    this.promptText = this.add.text(400, 560, "", {
      fontFamily: "Arial",
      fontSize: "18px",
      color: "#f4eddc",
      backgroundColor: "#161616",
      padding: { x: 10, y: 6 },
    });
    this.promptText.setOrigin(0.5);
    this.promptText.setVisible(false);
    this.healthText = this.add.text(20, 52, "", {
      fontFamily: "Arial",
      fontSize: "15px",
      color: "#d6ccb8",
    });
    this.ammoText = this.add.text(20, 74, "", {
      fontFamily: "Arial",
      fontSize: "15px",
      color: "#d6ccb8",
    });
    this.uiLayer.add([this.titleText, this.healthText, this.ammoText, this.promptText]);

    this.loadRoom(this.currentRoomId);
    this.createMapOverlay();
    this.createInventoryOverlay();
    this.updateInventoryText();
    this.updateHealthText();
    this.updateAmmoText();
  }

  update(time) {
    const speed = 190;
    const body = this.player.body;
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.wasd.left.isDown) vx -= speed;
    if (this.cursors.right.isDown || this.wasd.right.isDown) vx += speed;
    if (this.cursors.up.isDown || this.wasd.up.isDown) vy -= speed;
    if (this.cursors.down.isDown || this.wasd.down.isDown) vy += speed;

    if (vx !== 0 && vy !== 0) {
      vx *= 0.7071;
      vy *= 0.7071;
    }

    body.setVelocity(vx, vy);

    this.updatePlayerAimSprite();
    this.updatePlayerWalkMotion(time, vx !== 0 || vy !== 0);

    if (Phaser.Input.Keyboard.JustDown(this.mapKey)) {
      this.toggleMap();
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.inventoryKey)) {
      this.toggleInventory();
      return;
    }

    if (this.inventoryLayer?.visible) {
      body.setVelocity(0, 0);
      this.updateInventorySelection();
      return;
    }

    if (this.mapLayer?.visible) {
      body.setVelocity(0, 0);
      return;
    }

    for (const [weaponId, key] of Object.entries(this.weaponKeys)) {
      if (Phaser.Input.Keyboard.JustDown(key)) {
        this.switchWeapon(weaponId);
        return;
      }
    }

    this.cleanupBullets();
    this.updateEnemies();
    this.updateNearestInteraction();
    this.updateFlashlightDarkness();

    if (Phaser.Input.Keyboard.JustDown(this.actionKey)) {
      if (this.nearItem) {
        this.collectItem(this.nearItem);
        return;
      }

      if (this.nearInteractable) {
        this.useInteractable(this.nearInteractable);
        return;
      }

      if (this.nearDoor) {
        if (this.isDoorLocked(this.nearDoor)) {
          this.tryUnlockDoor(this.nearDoor);
          return;
        }

        this.loadRoom(this.nearDoor.to, this.nearDoor.spawn);
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.useMedikitKey)) {
      this.useMedikit();
    }

    if (Phaser.Input.Keyboard.JustDown(this.reloadKey)) {
      this.reloadWeapon();
    }

    if (Phaser.Input.Keyboard.JustDown(this.saveKey)) {
      this.saveGame();
    }

    if (Phaser.Input.Keyboard.JustDown(this.loadKey)) {
      this.loadGame();
    }

  }
loadRoom(roomId, spawnId) {
    // 📸 CASO 1: CINEMÁTICA ENTRADA SUBTERRÁNEA (linterna.png)
    if (roomId === "underground_entry" && !this.playingTransition && !this.worldState?.objectives?.undergroundVisited) {
      this.playingTransition = true;
      this.player.body.setVelocity(0, 0);
      this.physics.world.pause();
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        const img = this.add.image(WIDTH / 2, HEIGHT / 2, "foto_linterna").setDisplaySize(WIDTH, HEIGHT).setDepth(9999);
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.time.delayedCall(2500, () => {
          this.cameras.main.fadeOut(400, 0, 0, 0);
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            img.destroy();
            this.physics.world.resume();
            if (this.worldState?.objectives) this.worldState.objectives.undergroundVisited = true;
            this.loadRoom(roomId, spawnId);
            this.cameras.main.fadeIn(400, 0, 0, 0);
          });
        });
      });
      return;
    }
    
    // 📸 CASO 2: CINEMÁTICA LABORATORIO PRINCIPAL (labo.png)
    else if (roomId === "underground_lab1" && !this.playingTransition && !this.worldState?.objectives?.lab1Visited) {
      this.playingTransition = true;
      this.player.body.setVelocity(0, 0);
      this.physics.world.pause();
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        const img = this.add.image(WIDTH / 2, HEIGHT / 2, "foto_labo").setDisplaySize(WIDTH, HEIGHT).setDepth(9999);
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.time.delayedCall(2500, () => {
          this.cameras.main.fadeOut(400, 0, 0, 0);
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            img.destroy();
            this.physics.world.resume();
            if (this.worldState?.objectives) this.worldState.objectives.lab1Visited = true;
            this.loadRoom(roomId, spawnId);
            this.cameras.main.fadeIn(400, 0, 0, 0);
          });
        });
      });
      return;
    }

    // 📸 CASO 3: NUEVA CINEMÁTICA SALIDA A LA SUPERFICIE (superficie.png)
    else if (roomId === "elec_elevator_exit" && !this.playingTransition && !this.worldState?.objectives?.surfaceVisited) {
      this.playingTransition = true;
      this.player.body.setVelocity(0, 0);
      this.physics.world.pause();

      // Fade Out a negro
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        
        // Dibujamos "superficie.png" a pantalla completa
        const img = this.add.image(WIDTH / 2, HEIGHT / 2, "foto_superficie")
                        .setDisplaySize(WIDTH, HEIGHT)
                        .setDepth(9999);

        this.cameras.main.fadeIn(400, 0, 0, 0);

        // Aguantamos la imagen en pantalla por 2.5 segundos
        this.time.delayedCall(2500, () => {
          this.cameras.main.fadeOut(400, 0, 0, 0);
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            img.destroy();
            this.physics.world.resume();
            
            // 🚩 Guardamos que ya vio esta cinemática para que no se repita
            if (this.worldState?.objectives) {
              this.worldState.objectives.surfaceVisited = true;
            }
            
            // Cargamos el Sector E1 real de juego
            this.loadRoom(roomId, spawnId);
            this.cameras.main.fadeIn(400, 0, 0, 0);
          });
        });
      });
      return;
    }

    // Si no entra en ninguna cinemática o ya se vieron, limpiamos el flag temporal
    this.playingTransition = false;

    this.worldState = normalizeWorldState(this.worldState);
    if (this.skipSavingCurrentRoomOnce) {
      this.skipSavingCurrentRoomOnce = false;
    } else {
      this.saveCurrentRoomEnemies();
    }
    
    // 🌊 Refuerzo preventivo blindado contra crashes inesperados
    if (this.worldState?.objectives?.pumpSolved && typeof ROOMS !== 'undefined') {
      if (ROOMS["underground_entry"]?.backgroundImage) {
        ROOMS["underground_entry"].backgroundImage.key = "bg_under_dry";
      }
      if (ROOMS["underground_pumps"]?.backgroundImage) {
        ROOMS["underground_pumps"].backgroundImage.key = "bg_bombas_dry";
      }
    }

    const room = typeof ROOMS !== 'undefined' ? ROOMS[roomId] : null;
    if (!room) {
      console.error("No se encontró la habitación: " + roomId);
      return;
    }

    this.currentRoomId = roomId;
    this.nearDoor = null;
    this.nearItem = null;
    this.nearInteractable = null;
    this.promptText.setVisible(false);

    this.wallGroup.clear(false, false);
    this.doorGroup.clear(false, false);
    this.itemGroup.clear(false, false);
    this.interactableGroup.clear(false, false);
    this.enemyGroup.clear(false, false);
    this.bulletGroup.clear(true, true);
    this.roomLayer.removeAll(true);
    this.darknessLayer.removeAll(true);
    this.darknessRects = null;

    const bg = room.backgroundImage
      ? this.add.image(WIDTH / 2, HEIGHT / 2, room.backgroundImage.key).setDisplaySize(WIDTH, HEIGHT)
      : this.add.rectangle(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT, ROOM_COLORS[room.zone]);
    if (bg.setStrokeStyle) bg.setStrokeStyle(4, 0x0b0b0b);
    this.roomLayer.add(bg);

    // 🧱 1. GENERACIÓN DE MUROS (CON REJA DINÁMICA)
    for (const wall of room.walls) {
      if (wall.isPrisonGate && this.worldState.objectives.cellsOpened) {
        continue;
      }

      const rect = this.add.rectangle(wall.x + wall.w / 2, wall.y + wall.h / 2, wall.w, wall.h, 0x171717);
      if (room.showWallVisuals === false) {
        rect.setVisible(false);
      } else {
        rect.setStrokeStyle(2, 0x4b4b43);
      }
      this.roomLayer.add(rect);
      this.wallGroup.add(rect);
    }

    for (const door of room.doors) {
      const color = this.isDoorLocked(door) ? 0xb94235 : 0x248cd8;
      const rect = this.add.rectangle(door.x + door.w / 2, door.y + door.h / 2, door.w, door.h, color, 0.85);
      rect.setData("door", door);
      rect.setStrokeStyle(2, 0xd7d0bb);
      this.roomLayer.add(rect);
      this.doorGroup.add(rect);
    }

    // 🔑 2. GENERACIÓN DE ITEMS
    for (const item of room.items ?? []) {
      if (this.worldState.collectedItems[item.id]) continue;

      const marker = this.add.star(item.x, item.y, 5, 8, 17, item.color ?? 0xffffff);
      marker.setData("item", item);
      marker.setStrokeStyle(2, 0x161616);
      this.roomLayer.add(marker);
      this.itemGroup.add(marker);
    }

    // 🖥️ 3. GENERACIÓN DE INTERACTUABLES
    for (const interactable of room.interactables ?? []) {
      const visual = this.getInteractableVisual(interactable);
      const marker = this.add.rectangle(interactable.x, interactable.y, interactable.w, interactable.h, visual.color, visual.alpha);
      marker.setData("interactable", interactable);
      marker.setData("baseAlpha", visual.alpha);
      marker.setStrokeStyle(2, visual.strokeColor);
      this.roomLayer.add(marker);
      this.interactableGroup.add(marker);
    }

// 🧟 4. GENERACIÓN DE ENEMIGOS
    for (const enemy of room.enemies ?? []) {
      const enemyState = this.getEnemyState(enemy);

      // 🚨 INYECTOR ANTIBUGS SEGURO PARA TODOS LOS BOSSES:
      if (enemy.id === "lab7_boss_server" || enemy.id === "pumps_tank_01" || enemy.id === "mr_x_final_boss") {
        
        // Si la vida se rompió en la partida guardada (NaN o undefined), la reseteamos con la del mapa
        if (enemyState.health === undefined || isNaN(enemyState.health)) {
          enemyState.dead = false;
          enemyState.health = enemy.health; 
        }
        
        // Forzamos SIEMPRE la posición del archivo ROOMS.js (adiós paredes)
        enemyState.x = enemy.x;
        enemyState.y = enemy.y;
      }

      if (enemyState.dead || enemyState.health <= 0) continue;

      const enemyType = getEnemyType(enemy);
      const marker = enemy.type === "zombie"
        ? this.add.sprite(enemyState.x, enemyState.y, ZOMBIE_SPRITE.key, 0).setScale(ZOMBIE_SPRITE.scale)
        : this.add.circle(enemyState.x, enemyState.y, enemyType.radius, enemyType.color);
      if (enemy.type === "sleeper" && !enemyState.awake) marker.setAlpha(0.58);
      marker.setData("enemy", enemy);
      marker.setData("enemyState", enemyState);
      marker.setData("enemyType", enemyType);
      if (marker.setStrokeStyle) marker.setStrokeStyle(2, enemyType.strokeColor);
      this.roomLayer.add(marker);
      this.physics.add.existing(marker);
      if (enemy.type === "zombie") {
        marker.body.setCircle(enemyType.radius, marker.frame.width / 2 - enemyType.radius, marker.frame.height / 2 - enemyType.radius);
      } else {
        marker.body.setCircle(enemyType.radius);
      }
      marker.body.setCollideWorldBounds(true);
      this.enemyGroup.add(marker);
    }

    for (const prop of room.props ?? []) {
      const label = this.add.text(prop.x, prop.y, this.getPropText(prop), {
        fontFamily: "Arial",
        fontSize: "15px",
        color: "#d9d1bf",
        align: "center",
      });
      label.setOrigin(0.5);
      this.roomLayer.add(label);
    }

    if (this.isPowerOffRoom(room)) {
      const darkness = this.add.rectangle(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT, 0x000000, 0.42);
      this.roomLayer.add(darkness);
    }

    if (room.requiresFlashlight) {
      this.createFlashlightDarkness();
    }

    this.titleText.setText(room.name);
    this.children.bringToTop(this.player);
    this.children.bringToTop(this.uiLayer);

    const spawn = room.spawns?.[spawnId] ?? room.playerStart ?? { x: 400, y: 300, angle: 0 };
    this.player.setPosition(spawn.x, spawn.y);
    this.player.rotation = 0;
    this.setPlayerFrameFromAngle(Phaser.Math.DegToRad(spawn.angle));
    this.player.body.setVelocity(0, 0);
    this.updateFlashlightDarkness();
  }

  createMapOverlay() {
    this.mapLayer = this.add.container(0, 0);
    this.mapLayer.setDepth(1000);
    this.mapLayer.setVisible(false);

    const backdrop = this.add.rectangle(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT, 0x050505, 0.86);
    const panel = this.add.rectangle(WIDTH / 2, HEIGHT / 2, 730, 500, 0x151714, 0.96);
    panel.setStrokeStyle(2, 0x6b6655);

    this.mapTitle = this.add.text(60, 66, "MAPA DEL COMPLEJO", {
      fontFamily: "Arial",
      fontSize: "24px",
      color: "#f0e6cf",
    });

    this.mapStatusText = this.add.text(60, 102, "", {
      fontFamily: "Arial",
      fontSize: "15px",
      color: "#d6ccb8",
    });

    this.mapHelpText = this.add.text(60, 505, "M: cerrar mapa", {
      fontFamily: "Arial",
      fontSize: "14px",
      color: "#9f9888",
    });

    this.mapLayer.add([backdrop, panel, this.mapTitle, this.mapStatusText, this.mapHelpText]);
  }

  toggleMap() {
    if (!this.mapLayer) return;

    const isVisible = !this.mapLayer.visible;
    if (isVisible && this.inventoryLayer?.visible) this.toggleInventory();
    this.mapLayer.setVisible(isVisible);

    if (isVisible) {
      this.drawMapOverlay();
    } else {
      this.clearMapDrawing();
    }
  }

  clearMapDrawing() {
    for (const child of this.mapLayer.getAll()) {
      if (child.getData?.("mapDynamic")) child.destroy();
    }
  }

  drawMapOverlay() {
    this.clearMapDrawing();
    this.mapStatusText.setText(`Energia: ${this.worldState.objectives.generatorOn ? "ON" : "OFF"} | Habitacion: ${ROOMS[this.currentRoomId].name}`);

    for (const [from, to] of MAP_LINKS) {
      const start = MAP_NODES[from];
      const end = MAP_NODES[to];
      const line = this.add.line(0, 0, start.x, start.y, end.x, end.y, 0x7f7868, 0.78);
      line.setOrigin(0, 0);
      line.setLineWidth(3);
      line.setData("mapDynamic", true);
      this.mapLayer.add(line);
    }

    for (const [roomId, node] of Object.entries(MAP_NODES)) {
      const isCurrent = roomId === this.currentRoomId;
      const fill = isCurrent ? 0xd8b24a : 0x28302d;
      const stroke = isCurrent ? 0xffefaa : 0x8c8778;
      const marker = this.add.rectangle(node.x, node.y, 86, 42, fill, 0.96);
      marker.setStrokeStyle(2, stroke);
      marker.setData("mapDynamic", true);

      const label = this.add.text(node.x, node.y, node.label, {
        fontFamily: "Arial",
        fontSize: "13px",
        color: isCurrent ? "#17140a" : "#e6ddc9",
        align: "center",
      });
      label.setOrigin(0.5);
      label.setData("mapDynamic", true);

      this.mapLayer.add([marker, label]);
    }
  }

  updateNearestInteraction() {
    this.updateNearestItem();
    if (this.nearItem) return;
    this.updateNearestInteractable();
    if (this.nearInteractable) return;
    this.updateNearestDoor();
  }

  updateNearestInteractable() {
    const interactables = this.interactableGroup.getChildren();
    let closest = null;
    let closestDistance = 9999;

    for (const interactableMarker of interactables) {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, interactableMarker.x, interactableMarker.y);
      interactableMarker.setAlpha(interactableMarker.getData("baseAlpha"));

      if (distance < 78 && distance < closestDistance) {
        closest = interactableMarker;
        closestDistance = distance;
      }
    }

    if (!closest) {
      this.nearInteractable = null;
      return;
    }

    closest.setAlpha(1);
    this.nearInteractable = closest.getData("interactable");
    this.nearDoor = null;
    this.promptText.setText(`ESPACIO: ${this.nearInteractable.label}`);
    this.promptText.setVisible(true);
  }

  updateEnemies() {
    for (const enemyMarker of this.enemyGroup.getChildren()) {
      const enemy = enemyMarker.getData("enemy");
      const enemyState = enemyMarker.getData("enemyState");
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemyMarker.x, enemyMarker.y);

      if (enemy.type === "sleeper" && !enemyState.awake) {
        if (distance > enemy.wakeRange) {
          enemyMarker.body.setVelocity(0, 0);
          continue;
        }

        enemyState.awake = true;
        enemyMarker.setAlpha(1);
        this.flashPrompt("Algo se levanto");
      }

      if (distance > enemy.aggroRange || this.worldState.health <= 0) {
        enemyMarker.body.setVelocity(0, 0);
        continue;
      }

      this.physics.moveToObject(enemyMarker, this.player, enemy.speed);
      this.updateEnemyFacing(enemyMarker);
    }
  }

  updateEnemyFacing(enemyMarker) {
    const enemy = enemyMarker.getData("enemy");
    if (enemy.type !== "zombie") return;

    const velocity = enemyMarker.body.velocity;
    if (Math.abs(velocity.x) < 1 && Math.abs(velocity.y) < 1) return;

    const angle = Math.atan2(velocity.y, velocity.x);
    this.setDirectionalFrame(enemyMarker, angle);
  }

  onPlayerTouchEnemy(player, enemyMarker) {
    const now = this.time.now;
    if (now - this.lastDamageAt < 900 || this.worldState.health <= 0) return;

    const enemy = enemyMarker.getData("enemy");
    this.lastDamageAt = now;
    this.worldState.health = Math.max(0, this.worldState.health - enemy.damage);
    this.updateHealthText();
    this.flashDamage();

    if (this.worldState.health <= 0) {
      this.flashPrompt("Estas herido de muerte");
    }
  }

  saveCurrentRoomEnemies() {
    if (!this.enemyGroup) return;

    for (const enemyMarker of this.enemyGroup.getChildren()) {
      const enemy = enemyMarker.getData("enemy");
      const enemyState = enemyMarker.getData("enemyState");
      if (!enemy || !enemyState) continue;

      enemyState.x = enemyMarker.x;
      enemyState.y = enemyMarker.y;
      enemyState.health = enemyState.health ?? enemy.health;
      this.worldState.enemies[enemy.id] = enemyState;
    }
  }

  getEnemyState(enemy) {
    this.worldState = normalizeWorldState(this.worldState);

    if (!this.worldState.enemies[enemy.id]) {
      this.worldState.enemies[enemy.id] = {
        x: enemy.x,
        y: enemy.y,
        health: enemy.health,
        dead: false,
        awake: enemy.awake ?? enemy.type !== "sleeper",
      };
    }

    return this.worldState.enemies[enemy.id];
  }

  updateNearestItem() {
    const items = this.itemGroup.getChildren();
    let closest = null;
    let closestDistance = 9999;

    for (const itemMarker of items) {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, itemMarker.x, itemMarker.y);
      itemMarker.setScale(1);

      if (distance < 58 && distance < closestDistance) {
        closest = itemMarker;
        closestDistance = distance;
      }
    }

    if (!closest) {
      this.nearItem = null;
      return;
    }

    closest.setScale(1.15);
    this.nearItem = closest.getData("item");
    this.nearDoor = null;
    this.nearInteractable = null;
    this.promptText.setText(`ESPACIO: agarrar ${this.nearItem.name}`);
    this.promptText.setVisible(true);
  }

  updateNearestDoor() {
    const doors = this.doorGroup.getChildren();
    let closest = null;
    let closestDistance = 9999;

    for (const doorRect of doors) {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, doorRect.x, doorRect.y);
      doorRect.setAlpha(0.85);

      if (distance < 74 && distance < closestDistance) {
        closest = doorRect;
        closestDistance = distance;
      }
    }

    if (!closest) {
      this.nearDoor = null;
      this.promptText.setVisible(false);
      return;
    }

    closest.setAlpha(1);
    const door = closest.getData("door");
    this.nearDoor = door;
    this.nearInteractable = null;
    const action = this.isDoorLocked(door) ? `abrir ${door.label}` : door.label;
    this.promptText.setText(`ESPACIO: ${action}`);
    this.promptText.setVisible(true);
  }

  collectItem(item) {
    this.worldState.collectedItems[item.id] = true;
    if (item.type === "ammo") {
      this.addAmmo(item.weapon ?? "pistol", item.amount);
      this.updateAmmoText();
    } else {
      this.worldState.inventory.push(item);
    }
    this.updateInventoryText();
    this.reloadCurrentRoomAtPlayerPosition();
    this.flashPrompt(`Agarraste: ${item.name}`);
  }

  reloadCurrentRoomAtPlayerPosition() {
    const position = {
      x: this.player.x,
      y: this.player.y,
      frame: this.player.frame.name,
    };

    this.loadRoom(this.currentRoomId);
    this.player.setPosition(position.x, position.y);
    this.player.setFrame(position.frame);
    this.player.body.setVelocity(0, 0);
  }

  hasItem(itemId) {
    return this.worldState.inventory.some((item) => item.id === itemId);
  }

isDoorLocked(door) {

    // 🔒 NUEVO - Control de Boss 2: Sala de Servidores (Lab 7)
    if (this.currentRoomId === "underground_lab7" && door.id === "lab7_to_lab6") {
      const bossState = this.getEnemyState ? this.getEnemyState({ id: "lab7_boss_server" }) : this.worldState?.enemies?.["lab7_boss_server"];
      if (bossState && !bossState.dead) {
        door.lockedMessage = "🚨 ALERTA: Servidores bajo asedio orgánico. Puerta bloqueada por seguridad.";
        return true;
      }
    }

    // Tu código normal de llaves o condiciones sigue acá abajo...
    if (door.powerLocked && !this.worldState.objectives.generatorOn) return true;
    if (door.objectiveLocked && !this.worldState.objectives[door.objectiveLocked]) return true;
    
    // 🟢 NUEVAS CONDICIONES: Si no se cumplen, la puerta sigue trabada (return true)
    if (door.puzzleLocked === "fasesCompletas" && !this.worldState.objectives.coreOverloaded) return true;
    if (door.bossLocked && !this.worldState.objectives.bossDefeated) return true;

    return door.lockedBy && !this.worldState.unlockedDoors[door.id];
  }

  tryUnlockDoor(door) {
    // --- LÓGICA VIEJA INTACTA ---
    if (door.powerLocked && !this.worldState.objectives.generatorOn) {
      this.flashPrompt("Sin energia");
      return;
    }

    if (door.objectiveLocked && !this.worldState.objectives[door.objectiveLocked]) {
      this.flashPrompt("Bloqueada por el panel");
      return;
    }

    // --- 🟢 NUEVOS MENSAJES PARA LA ZONA ELÉCTRICA ---
    // Si la puerta requiere el Núcleo y todavía no sobrecargaste el sistema
    if (door.puzzleLocked === "fasesCompletas" && !this.worldState.objectives.coreOverloaded) {
      this.flashPrompt(door.lockedMessage ?? "Compuerta sin energía. Sincronice el Núcleo.");
      return;
    }

    // Si la puerta requiere que muera Mr. X y todavía sigue vivo
    if (door.bossLocked && !this.worldState.objectives.bossDefeated) {
      this.flashPrompt(door.lockedMessage ?? "Protocolo de combate activo. Elimine la amenaza.");
      return;
    }

    // --- CONTINÚA LÓGICA VIEJA INTACTA ---
    if (!this.hasItem(door.lockedBy)) {
      this.flashPrompt(door.lockedMessage ?? "Necesitas una llave");
      return;
    }

    this.worldState.unlockedDoors[door.id] = true;
    this.reloadCurrentRoomAtPlayerPosition();
    this.flashPrompt("Puerta desbloqueada");
  }

  

useInteractable(interactable) {

  // 🏍️ CONTROL DE ESCAPE FINAL (Subirse a la moto)
  if (interactable.id === "escape_motorcycle" || interactable.type === "vehicle_escape") {
    
    // 1. Congelamos al jugador para que no se mueva ni dispare mientras corre la animación
    if (this.player && this.player.body) {
      this.player.body.setVelocity(0, 0);
    }
    this.physics.pause(); 

    // 2. Tiramos el cartel dinámico con tu label original
    this.flashPrompt("🏍️ ¡Arrancando motor... Escapando de las instalaciones!");

    // 3. Efecto cinematográfico: Fundido a negro (fade out) de 1.5 segundos (1500 ms)
    this.cameras.main.fadeOut(1500, 0, 0, 0);

    // 4. Cuando la pantalla se apague por completo, mostramos la pantalla de victoria
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      
      // Hacemos un fade in invisible (en negro) para poder dibujar encima sin parpadeos
      this.cameras.main.fadeIn(0, 0, 0, 0); 
      
      // Creamos la imagen justo en el centro de la pantalla (400x300 en resolución 800x600)
      const victoryImg = this.add.image(400, 300, "victory_screen");
      
      // Le damos un efecto pop-up animado espectacular para que aparezca desde el centro
      victoryImg.setScale(0);
      this.tweens.add({
        targets: victoryImg,
        scale: 1,           // Escala original
        duration: 1000,     // Tarda 1 segundo en agrandarse
        ease: 'Back.easeOut' // Efecto rebote suave al final
      });

      // Cartel final en pantalla
      this.flashPrompt("🏆 ¡FELICITACIONES! COMPLETADO DESDE EL TÚNEL DE ESCAPE.");
    });
    
    return; // Cortamos la función acá para que no intente hacer otra cosa
  }

  // 1. CASO: INTERRUPTORES DE PUZZLES
  if (interactable.type === "puzzle_switch") {
    this.togglePuzzleSwitch(interactable);
    return;
  }

  // 2. CASO: GENERADOR ELÉCTRICO
  if (interactable.type === "generator") {
    if (this.worldState.objectives.generatorOn) {
      this.flashPrompt("El generador ya esta encendido");
      return;
    }

    if (!this.hasItem(interactable.requiresItem)) {
      this.flashPrompt("Falta un fusible");
      return;
    }

    this.consumeItem(interactable.requiresItem);
    this.worldState.objectives.generatorOn = true;
    this.updateInventoryText();
    this.reloadCurrentRoomAtPlayerPosition();
    this.flashPrompt("Generador encendido");
    return;
  }

  // 3. CASO: BOMBA DE AGUA (Drenaje)
  if (interactable.type === "pump") {
    const bossState = this.worldState?.enemies?.["pumps_tank_01"];
    if (!bossState?.dead) {
      this.cameras.main.shake(100, 0.004);
      this.flashPrompt("Consola inactiva: interferencia biologica en el area.");
      return;
    }

    if (this.worldState.objectives.pumpSolved) {
      this.flashPrompt("Las bombas ya estan funcionando");
      return;
    }

    this.player.body.setVelocity(0, 0);
    this.worldState.objectives.pumpSolved = true;

    if (ROOMS["underground_entry"] && ROOMS["underground_entry"].backgroundImage) {
      ROOMS["underground_entry"].backgroundImage.key = "bg_under_dry"; 
    }
    if (ROOMS["underground_pumps"] && ROOMS["underground_pumps"].backgroundImage) {
      ROOMS["underground_pumps"].backgroundImage.key = "bg_bombas_dry";
    }

    this.flashPrompt("Activando sistema de drenaje...");
    this.cameras.main.fadeOut(500, 0, 0, 0);

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.reloadCurrentRoomAtPlayerPosition();

      this.time.delayedCall(1000, () => {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.flashPrompt("Bomba activada. Zona drenada con exito.");
      });
    });

    return;
  }

  // 4. CASO: CONSOLA DE SEGURIDAD ESTE (LAB 3)
  if (interactable.type === "lab_terminal") {
    if (this.worldState.objectives.lab4AccessGranted) {
      this.flashPrompt("Terminal en línea. Los bloqueos del Sector Sur (Lab 4) ya fueron removidos.");
      return;
    }

    this.worldState.objectives.lab4AccessGranted = true;
    this.cameras.main.flash(300, 0, 150, 250); // Destello cyan de pc
    this.flashPrompt("SISTEMA DE DESECHOS ABIERTO: Se liberó el acceso al Lab 4.");
    return;
  }

  // 5. CASO: PANEL DE APERTURA DE CELDAS (LAB 4) - ¡ACTUALIZADO Y SEGURO!
  if (interactable.type === "prison_release") {
    if (this.worldState.objectives.cellsOpened) {
      this.flashPrompt("Las celdas ya se encuentran abiertas.");
      return;
    }

    this.worldState.objectives.cellsOpened = true;
    
    // Efectos visuales en la pantalla del jugador
    this.cameras.main.shake(500, 0.02);
    this.cameras.main.flash(500, 255, 0, 0); 
    this.flashPrompt("⚠️ ALERTA: Celdas de contención abiertas. Sujetos liberados.");

    // Recargamos la sala actual. El método loadRoom se encarga del resto.
    this.reloadCurrentRoomAtPlayerPosition(); 
    return;
  }


    // =========================================================================
    // 🟢 NUEVAS MECÁNICAS (Agregadas al final de forma segura sin tocar lo viejo)
    // =========================================================================

    // A) DISYUNTORES DE FASES
    if (interactable.type === "phase_switch") {
      let flagName = "";
      if (interactable.id === "switch_phase_1") flagName = "phase1On";
      if (interactable.id === "switch_phase_2") flagName = "phase2On";
      if (interactable.id === "switch_phase_3") flagName = "phase3On";

      if (flagName && !this.worldState.objectives[flagName]) {
        this.worldState.objectives[flagName] = true;
        this.flashPrompt(`${interactable.label.toUpperCase()}: CONECTADA`);
        this.reloadCurrentRoomAtPlayerPosition(); // Refresca para pintar el switch de verde
      } else {
        this.flashPrompt("Esta fase ya se encuentra activa.");
      }
      return;
    }

    // B) CONSOLA DEL NÚCLEO
    if (interactable.type === "core_console") {
      const f1 = this.worldState.objectives.phase1On;
      const f2 = this.worldState.objectives.phase2On;
      const f3 = this.worldState.objectives.phase3On;

      if (!f1 || !f2 || !f3) {
        let faltan = [];
        if (!f1) faltan.push("Fase 1");
        if (!f2) faltan.push("Fase 2");
        if (!f3) faltan.push("Fase 3");
        this.flashPrompt(`ERROR: Líneas caídas. Falta: ${faltan.join(", ")}`);
        return;
      }

      if (this.worldState.objectives.coreOverloaded) {
        this.flashPrompt("El núcleo ya está sobrecargado. ¡Huye al Hangar E!");
        return;
      }

      this.worldState.objectives.coreOverloaded = true;
      this.cameras.main.flash(600, 200, 0, 0); // Destello rojo de alarma
      this.flashPrompt("SOBRECARGA COMPLETA. COMPUERTA DEL HANGAR LIBERADA.");
      return;
    }

    // C) MOTO DE ESCAPE FINAL
    if (interactable.type === "vehicle_escape") {
      this.player.body.setVelocity(0, 0);
      this.flashPrompt("Arrancando motor... ¡Saliendo a la chota!");
      
      this.cameras.main.fadeOut(1500, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        alert("¡FIN DE LA TECH DEMO! Lograste escapar del complejo en la moto.");
        window.location.reload();
      });
      return;
    }
  }

  getPuzzleSwitches() {
    this.worldState.objectives.switchPuzzle ??= { a: false, b: false, c: false };
    return this.worldState.objectives.switchPuzzle;
  }

  togglePuzzleSwitch(interactable) {
    if (this.worldState.objectives.switchPuzzleSolved) {
      this.flashPrompt("Panel resuelto");
      return;
    }

    const switches = this.getPuzzleSwitches();
    switches[interactable.switchId] = !switches[interactable.switchId];

    const solved = switches.a && !switches.b && switches.c;
    if (solved) {
      this.worldState.objectives.switchPuzzleSolved = true;
      this.reloadCurrentRoomAtPlayerPosition();
      this.flashPrompt("Puerta sellada desbloqueada");
      return;
    }

    this.reloadCurrentRoomAtPlayerPosition();
    this.flashPrompt(`Panel ${interactable.switchId.toUpperCase()}: ${switches[interactable.switchId] ? "ON" : "OFF"}`);
  }

  consumeItem(itemId) {
    const index = this.worldState.inventory.findIndex((item) => item.id === itemId);
    if (index !== -1) this.worldState.inventory.splice(index, 1);
  }

  getPropText(prop) {
    if (prop.powerText && this.worldState.objectives.generatorOn) return prop.powerText.on;
    return prop.text;
  }

  getInteractableVisual(interactable) {
    if (interactable.type === "puzzle_switch") {
      const isOn = Boolean(this.getPuzzleSwitches()[interactable.switchId]);
      const visual = isOn ? interactable.onVisual : interactable.offVisual;

      return {
        color: visual?.color ?? (isOn ? 0x7fe28a : 0x8c3d38),
        alpha: visual?.alpha ?? 0.82,
        strokeColor: visual?.strokeColor ?? 0x151515,
      };
    }

    const isOn = interactable.type === "generator" && this.worldState.objectives.generatorOn;
    const visual = isOn ? interactable.onVisual : interactable.offVisual;

    return {
      color: visual?.color ?? 0xe4c542,
      alpha: visual?.alpha ?? 0.8,
      strokeColor: visual?.strokeColor ?? 0x151515,
    };
  }

  isPowerOffRoom(room) {
    return room.requiresPower && !this.worldState.objectives.generatorOn;
  }

  hasFlashlight() {
    return this.hasItem("flashlight_01");
  }

  createFlashlightDarkness() {
    this.darknessRects = {
      top: this.add.rectangle(0, 0, WIDTH, HEIGHT, 0x000000, 0.92).setOrigin(0, 0),
      bottom: this.add.rectangle(0, 0, WIDTH, HEIGHT, 0x000000, 0.92).setOrigin(0, 0),
      left: this.add.rectangle(0, 0, WIDTH, HEIGHT, 0x000000, 0.92).setOrigin(0, 0),
      right: this.add.rectangle(0, 0, WIDTH, HEIGHT, 0x000000, 0.92).setOrigin(0, 0),
    };
    this.flashlightGlow = this.add.circle(0, 0, 40, 0xf4e9b8, 0.12);
    this.darknessLayer.add([...Object.values(this.darknessRects), this.flashlightGlow]);
  }

  updateFlashlightDarkness() {
    if (!this.darknessRects) return;

    const radius = this.hasFlashlight() ? 155 : 58;
    const left = Phaser.Math.Clamp(this.player.x - radius, 0, WIDTH);
    const right = Phaser.Math.Clamp(this.player.x + radius, 0, WIDTH);
    const top = Phaser.Math.Clamp(this.player.y - radius, 0, HEIGHT);
    const bottom = Phaser.Math.Clamp(this.player.y + radius, 0, HEIGHT);

    this.darknessRects.top.setPosition(0, 0).setSize(WIDTH, top);
    this.darknessRects.bottom.setPosition(0, bottom).setSize(WIDTH, HEIGHT - bottom);
    this.darknessRects.left.setPosition(0, top).setSize(left, bottom - top);
    this.darknessRects.right.setPosition(right, top).setSize(WIDTH - right, bottom - top);
    this.flashlightGlow.setPosition(this.player.x, this.player.y);
    this.flashlightGlow.setRadius(radius);
  }

  useMedikit() {
    const medikitIndex = this.worldState.inventory.findIndex((item) => item.type === "medikit");

    if (medikitIndex === -1) {
      this.flashPrompt("No tenes medikit");
      return;
    }

    if (this.worldState.health >= 100) {
      this.flashPrompt("No hace falta curarse");
      return;
    }

    const medikit = this.worldState.inventory[medikitIndex];
    this.worldState.inventory.splice(medikitIndex, 1);
    this.worldState.health = Math.min(100, this.worldState.health + medikit.heal);
    this.updateInventoryText();
    this.updateHealthText();
    this.flashHeal();
    this.flashPrompt(`Usaste ${medikit.name}`);
  }

  updateHealthText() {
    this.healthText.setText(`Vida: ${this.worldState.health}`);
  }

  configurePlayerBody() {
    const frameWidth = this.player.frame.width;
    const frameHeight = this.player.frame.height;
    this.player.body.setCircle(13, frameWidth / 2 - 13, frameHeight / 2 - 13);
  }

  updatePlayerWeaponSprite() {
    const sprite = PLAYER_SPRITES[this.worldState.weaponId] ?? PLAYER_SPRITES.pistol;
    const frame = this.player.frame?.name ?? 0;
    this.player.setTexture(sprite.key);
    this.player.setScale(PLAYER_SCALE);
    this.player.setFrame(Math.min(Number(frame) || 0, 3));
    this.configurePlayerBody();
  }

  updatePlayerAimSprite() {
    const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.activePointer.x, this.input.activePointer.y);
    this.setPlayerFrameFromAngle(angle);
  }

  updatePlayerWalkMotion(time, isMoving) {
    if (!isMoving || this.worldState.health <= 0) {
      this.player.setScale(PLAYER_SCALE);
      this.player.setAngle(0);
      return;
    }

    const step = Math.sin(time * 0.018);
    const bob = Math.abs(step);
    this.player.setScale(PLAYER_SCALE * (1 + bob * 0.035), PLAYER_SCALE * (1 - bob * 0.025));
    this.player.setAngle(step * 2.2);
  }

  setPlayerFrameFromAngle(angle) {
    this.setDirectionalFrame(this.player, angle);
  }

  setDirectionalFrame(sprite, angle) {
    const degrees = Phaser.Math.RadToDeg(angle);
    let frame = 3;
    if (degrees > 45 && degrees <= 135) frame = 0;
    else if (degrees < -45 && degrees >= -135) frame = 1;
    else if (Math.abs(degrees) > 135) frame = 2;
    sprite.setFrame(frame);
  }

  getCurrentWeapon() {
    return WEAPONS[this.worldState.weaponId] ?? WEAPONS.pistol;
  }

  getMagazineAmmo(weaponId) {
    return this.worldState.weaponAmmo?.[weaponId]?.magazine ?? 0;
  }

  getReserveAmmo(weaponId) {
    return this.worldState.weaponAmmo?.[weaponId]?.reserve ?? 0;
  }

  addAmmo(weaponId, amount) {
    const targetWeapon = WEAPONS[weaponId] ? weaponId : "pistol";
    this.worldState.weaponAmmo[targetWeapon].reserve += amount;
  }

  switchWeapon(weaponId) {
    if (!WEAPONS[weaponId] || this.worldState.weaponId === weaponId) return;
    if (this.isReloading) {
      this.flashPrompt("Recargando");
      return;
    }
    this.worldState.weaponId = weaponId;
    this.updatePlayerWeaponSprite();
    this.updatePlayerAimSprite();
    this.updateAmmoText();
    this.flashPrompt(`Arma: ${WEAPONS[weaponId].name}`);
  }

  updateAmmoText() {
    const status = this.isReloading ? " recargando" : "";
    const weapon = this.getCurrentWeapon();
    const weaponId = this.worldState.weaponId;
    this.ammoText.setText(`${weapon.name}: ${this.getMagazineAmmo(weaponId)}/${weapon.magazineSize} | Reserva: ${this.getReserveAmmo(weaponId)}${status}`);
  }

  onPointerDown(pointer) {
    if (this.mapLayer?.visible || this.inventoryLayer?.visible) return;

    if (pointer.leftButtonDown()) {
      this.shoot(pointer);
      return;
    }

    if (pointer.rightButtonDown()) {
      this.reloadWeapon();
    }
  }

  shoot(pointer) {
    const now = this.time.now;
    const weapon = this.getCurrentWeapon();
    if (now - this.lastShotAt < weapon.delay) return;

    if (this.isReloading) {
      this.flashPrompt("Recargando");
      return;
    }

    if (this.getMagazineAmmo(this.worldState.weaponId) <= 0) {
      this.flashPrompt("Cargador vacio");
      return;
    }

    this.lastShotAt = now;
    this.worldState.weaponAmmo[this.worldState.weaponId].magazine -= 1;
    this.updateAmmoText();

    const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x, pointer.y);
    const pelletStart = -(weapon.pellets - 1) / 2;
    for (let index = 0; index < weapon.pellets; index++) {
      const pelletAngle = angle + (pelletStart + index) * weapon.spread;
      this.createBullet(pelletAngle, weapon);
    }
  }

  createBullet(angle, weapon) {
    const bullet = this.add.circle(this.player.x, this.player.y, weapon.bulletRadius, weapon.color);
    this.physics.add.existing(bullet);
    bullet.body.setCircle(weapon.bulletRadius);
    bullet.body.setAllowGravity(false);
    bullet.setData("damage", weapon.damage);
    bullet.setData("bornAt", this.time.now);
    this.bulletGroup.add(bullet);
    this.physics.velocityFromRotation(angle, weapon.speed, bullet.body.velocity);
  }

  reloadWeapon() {
    if (this.isReloading) return;
    const weaponId = this.worldState.weaponId;
    const weapon = this.getCurrentWeapon();

    if (this.getMagazineAmmo(weaponId) >= weapon.magazineSize) {
      this.flashPrompt("Cargador lleno");
      return;
    }

    if (this.getReserveAmmo(weaponId) <= 0) {
      this.flashPrompt("Sin reserva");
      return;
    }

    this.isReloading = true;
    this.flashPrompt("Recargando...");
    this.time.delayedCall(weapon.reloadTime, () => {
      const ammo = this.worldState.weaponAmmo[weaponId];
      const needed = weapon.magazineSize - ammo.magazine;
      const loaded = Math.min(needed, ammo.reserve);
      ammo.magazine += loaded;
      ammo.reserve -= loaded;
      this.isReloading = false;
      this.updateAmmoText();
      this.flashPrompt("Lista");
    });
  }

  saveGame() {
    this.saveCurrentRoomEnemies();

    const saveData = {
      currentRoomId: this.currentRoomId,
      player: {
        x: this.player.x,
        y: this.player.y,
        rotation: this.player.rotation,
      },
      worldState: this.worldState,
    };

    saveGameData(saveData);
    this.flashPrompt("Partida guardada");
  }

  loadGame() {
    const saveData = loadGameData();

    if (!saveData) {
      this.flashPrompt("No hay partida guardada");
      return;
    }

    this.worldState = saveData.worldState;
    this.isReloading = false;
    this.skipSavingCurrentRoomOnce = true;
    this.loadRoom(saveData.currentRoomId);
    this.updatePlayerWeaponSprite();
    this.player.setPosition(saveData.player.x, saveData.player.y);
    this.player.rotation = 0;
    this.updatePlayerAimSprite();
    this.player.body.setVelocity(0, 0);
    this.updateInventoryText();
    this.updateHealthText();
    this.updateAmmoText();
    this.flashPrompt("Partida cargada");
  }

  cleanupBullets() {
    for (const bullet of this.bulletGroup.getChildren()) {
      const tooOld = this.time.now - bullet.getData("bornAt") > 900;
      const outside = bullet.x < -20 || bullet.x > WIDTH + 20 || bullet.y < -20 || bullet.y > HEIGHT + 20;
      if (tooOld || outside) bullet.destroy();
    }
  }

  onBulletHitWall(bullet) {
    bullet.destroy();
  }

onBulletHitEnemy(bullet, enemyMarker) {
    const enemyState = enemyMarker.getData("enemyState");
    const enemyData = enemyMarker.getData("enemy"); // 👈 Traemos la data del enemigo para identificar su ID

    enemyState.health -= bullet.getData("damage");
    bullet.destroy();

    if (enemyState.health <= 0) {
      enemyState.dead = true;

      // 🚩 REGISTRO SEGURO: Guardamos el estado muerto en el worldState global
      if (this.worldState && this.worldState.enemies && enemyData) {
        this.worldState.enemies[enemyData.id] = enemyState;
      }

      enemyMarker.destroy();

      // 🎉 Carteles dinámicos según el jefe que elimines
      if (enemyData?.id === "pumps_tank_01") {
        this.flashPrompt("💥 ¡Amenaza erradicada! El protocolo de bioseguridad se ha desactivado.");
      } else if (enemyData?.id === "lab7_boss_server") {
        this.flashPrompt("💥 Servidores liberados. Las puertas de salida se han desbloqueado.");
      } else if (enemyData?.id === "mr_x_final_boss") {
        this.worldState.objectives.bossDefeated = true;
        this.flashPrompt("💥 Amenaza final eliminada. La compuerta de evacuación se abrió.");
        this.reloadCurrentRoomAtPlayerPosition();
      } else {
        this.flashPrompt("Enemigo abatido");
      }
      return;
    }

    // --- Tu parpadeo visual original intacto ---
    const enemyType = enemyMarker.getData("enemyType");
    if (enemyMarker.setTint) {
      enemyMarker.setTint(enemyType.hitColor);
    } else {
      enemyMarker.setFillStyle(enemyType.hitColor);
    }
    this.time.delayedCall(120, () => {
      if (!enemyMarker.active) return;
      if (enemyMarker.clearTint) {
        enemyMarker.clearTint();
      } else {
        enemyMarker.setFillStyle(enemyType.color);
      }
    });
  }

  flashHeal() {
    this.player.setTint(0x8ce69b);
    this.time.delayedCall(180, () => {
      this.player.clearTint();
    });
  }

  flashDamage() {
    this.player.setTint(0xe07162);
    this.cameras.main.shake(90, 0.006);
    this.time.delayedCall(140, () => {
      this.player.clearTint();
    });
  }

  flashPrompt(text) {
    this.promptText.setText(text);
    this.promptText.setVisible(true);
    this.time.delayedCall(650, () => this.updateNearestInteraction());
  }
}

Object.assign(PrototypeScene.prototype, inventoryOverlay);

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: "#101010",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: PrototypeScene,
};

new Phaser.Game(config);
