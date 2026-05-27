import { HEIGHT, ROOM_COLORS, WIDTH } from "./constants.js";
import { getEnemyType } from "./enemyTypes.js";
import * as inventoryOverlay from "./inventory.js";
import { ROOMS } from "./rooms.js";
import { createInitialWorldState, loadGameData, normalizeWorldState, saveGameData } from "./saveSystem.js";

const MAP_NODES = {
  shore: { label: "Orilla", x: 82, y: 235 },
  forest_path: { label: "Bosque", x: 185, y: 235 },
  control_room: { label: "Control", x: 288, y: 235 },
  building_entry: { label: "Entrada", x: 392, y: 235 },
  safe_room: { label: "Sala segura", x: 392, y: 340 },
  main_hall: { label: "Hall", x: 502, y: 235 },
  locked_corridor: { label: "Pasillo", x: 612, y: 235 },
  laboratory_storage: { label: "Deposito", x: 612, y: 130 },
  generator_room: { label: "Generador", x: 612, y: 340 },
  maintenance_access: { label: "Mant.", x: 720, y: 340 },
  switch_room: { label: "Paneles", x: 720, y: 235 },
  sealed_room: { label: "Sellada", x: 720, y: 130 },
};

const MAP_LINKS = [
  ["shore", "forest_path"],
  ["forest_path", "control_room"],
  ["control_room", "building_entry"],
  ["building_entry", "safe_room"],
  ["building_entry", "main_hall"],
  ["main_hall", "locked_corridor"],
  ["locked_corridor", "laboratory_storage"],
  ["locked_corridor", "generator_room"],
  ["generator_room", "maintenance_access"],
  ["maintenance_access", "switch_room"],
  ["switch_room", "sealed_room"],
];

class PrototypeScene extends Phaser.Scene {
  constructor() {
    super("PrototypeScene");
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

    this.cameras.main.setBackgroundColor("#101010");

    this.roomLayer = this.add.container(0, 0);
    this.uiLayer = this.add.container(0, 0);

    this.wallGroup = this.physics.add.staticGroup();
    this.doorGroup = this.physics.add.staticGroup();
    this.itemGroup = this.physics.add.staticGroup();
    this.interactableGroup = this.physics.add.staticGroup();
    this.enemyGroup = this.physics.add.group();
    this.bulletGroup = this.physics.add.group();

    this.player = this.add.triangle(120, 300, 0, -18, 16, 16, -16, 16, 0xded8bf);
    this.player.setStrokeStyle(2, 0x111111);
    this.physics.add.existing(this.player);
    this.player.body.setCircle(13, -13, -13);
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

    this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.activePointer.x, this.input.activePointer.y) + Math.PI / 2;

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

    this.cleanupBullets();
    this.updateEnemies();
    this.updateNearestInteraction();

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
    this.worldState = normalizeWorldState(this.worldState);
    this.saveCurrentRoomEnemies();

    const room = ROOMS[roomId];
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

    const bg = this.add.rectangle(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT, ROOM_COLORS[room.zone]);
    bg.setStrokeStyle(4, 0x0b0b0b);
    this.roomLayer.add(bg);

    for (const wall of room.walls) {
      const rect = this.add.rectangle(wall.x + wall.w / 2, wall.y + wall.h / 2, wall.w, wall.h, 0x171717);
      rect.setStrokeStyle(2, 0x4b4b43);
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

    for (const item of room.items ?? []) {
      if (this.worldState.collectedItems[item.id]) continue;

      const marker = this.add.star(item.x, item.y, 5, 8, 17, item.color ?? 0xffffff);
      marker.setData("item", item);
      marker.setStrokeStyle(2, 0x161616);
      this.roomLayer.add(marker);
      this.itemGroup.add(marker);
    }

    for (const interactable of room.interactables ?? []) {
      const visual = this.getInteractableVisual(interactable);
      const marker = this.add.rectangle(interactable.x, interactable.y, interactable.w, interactable.h, visual.color, visual.alpha);
      marker.setData("interactable", interactable);
      marker.setData("baseAlpha", visual.alpha);
      marker.setStrokeStyle(2, visual.strokeColor);
      this.roomLayer.add(marker);
      this.interactableGroup.add(marker);
    }

    for (const enemy of room.enemies ?? []) {
      const enemyState = this.getEnemyState(enemy);
      if (enemyState.dead) continue;
      const enemyType = getEnemyType(enemy);

      const marker = this.add.circle(enemyState.x, enemyState.y, enemyType.radius, enemyType.color);
      marker.setData("enemy", enemy);
      marker.setData("enemyState", enemyState);
      marker.setData("enemyType", enemyType);
      marker.setStrokeStyle(2, enemyType.strokeColor);
      this.roomLayer.add(marker);
      this.physics.add.existing(marker);
      marker.body.setCircle(enemyType.radius);
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

    this.titleText.setText(room.name);
    this.children.bringToTop(this.player);
    this.children.bringToTop(this.uiLayer);

    const spawn = room.spawns?.[spawnId] ?? room.playerStart ?? { x: 400, y: 300, angle: 0 };
    this.player.setPosition(spawn.x, spawn.y);
    this.player.rotation = Phaser.Math.DegToRad(spawn.angle) + Math.PI / 2;
    this.player.body.setVelocity(0, 0);
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
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemyMarker.x, enemyMarker.y);

      if (distance > enemy.aggroRange || this.worldState.health <= 0) {
        enemyMarker.body.setVelocity(0, 0);
        continue;
      }

      this.physics.moveToObject(enemyMarker, this.player, enemy.speed);
    }
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
      this.worldState.reserveAmmo += item.amount;
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
      rotation: this.player.rotation,
    };

    this.loadRoom(this.currentRoomId);
    this.player.setPosition(position.x, position.y);
    this.player.rotation = position.rotation;
    this.player.body.setVelocity(0, 0);
  }

  hasItem(itemId) {
    return this.worldState.inventory.some((item) => item.id === itemId);
  }

  isDoorLocked(door) {
    if (door.powerLocked && !this.worldState.objectives.generatorOn) return true;
    if (door.objectiveLocked && !this.worldState.objectives[door.objectiveLocked]) return true;
    return door.lockedBy && !this.worldState.unlockedDoors[door.id];
  }

  tryUnlockDoor(door) {
    if (door.powerLocked && !this.worldState.objectives.generatorOn) {
      this.flashPrompt("Sin energia");
      return;
    }

    if (door.objectiveLocked && !this.worldState.objectives[door.objectiveLocked]) {
      this.flashPrompt("Bloqueada por el panel");
      return;
    }

    if (!this.hasItem(door.lockedBy)) {
      this.flashPrompt("Necesitas una llave");
      return;
    }

    this.worldState.unlockedDoors[door.id] = true;
    this.reloadCurrentRoomAtPlayerPosition();
    this.flashPrompt("Puerta desbloqueada");
  }

  useInteractable(interactable) {
    if (interactable.type === "puzzle_switch") {
      this.togglePuzzleSwitch(interactable);
      return;
    }

    if (interactable.type !== "generator") return;

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

  updateAmmoText() {
    const status = this.isReloading ? " recargando" : "";
    this.ammoText.setText(`Cargador: ${this.worldState.magazineAmmo}/6 | Reserva: ${this.worldState.reserveAmmo}${status}`);
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
    if (now - this.lastShotAt < 260) return;

    if (this.isReloading) {
      this.flashPrompt("Recargando");
      return;
    }

    if (this.worldState.magazineAmmo <= 0) {
      this.flashPrompt("Cargador vacio");
      return;
    }

    this.lastShotAt = now;
    this.worldState.magazineAmmo -= 1;
    this.updateAmmoText();

    const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x, pointer.y);
    const bullet = this.add.circle(this.player.x, this.player.y, 5, 0xf4e9b8);
    this.physics.add.existing(bullet);
    bullet.body.setCircle(5);
    bullet.body.setAllowGravity(false);
    bullet.setData("damage", 25);
    bullet.setData("bornAt", now);
    this.bulletGroup.add(bullet);
    this.physics.velocityFromRotation(angle, 520, bullet.body.velocity);
  }

  reloadWeapon() {
    if (this.isReloading) return;

    if (this.worldState.magazineAmmo >= 6) {
      this.flashPrompt("Cargador lleno");
      return;
    }

    if (this.worldState.reserveAmmo <= 0) {
      this.flashPrompt("Sin reserva");
      return;
    }

    this.isReloading = true;
    this.flashPrompt("Recargando...");
    this.time.delayedCall(700, () => {
      const needed = 6 - this.worldState.magazineAmmo;
      const loaded = Math.min(needed, this.worldState.reserveAmmo);
      this.worldState.magazineAmmo += loaded;
      this.worldState.reserveAmmo -= loaded;
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
    this.loadRoom(saveData.currentRoomId);
    this.player.setPosition(saveData.player.x, saveData.player.y);
    this.player.rotation = saveData.player.rotation;
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
    enemyState.health -= bullet.getData("damage");
    bullet.destroy();

    if (enemyState.health <= 0) {
      enemyState.dead = true;
      enemyMarker.destroy();
      this.flashPrompt("Enemigo abatido");
      return;
    }

    const enemyType = enemyMarker.getData("enemyType");
    enemyMarker.setFillStyle(enemyType.hitColor);
    this.time.delayedCall(120, () => {
      if (enemyMarker.active) enemyMarker.setFillStyle(enemyType.color);
    });
  }

  flashHeal() {
    this.player.setFillStyle(0x8ce69b);
    this.time.delayedCall(180, () => {
      this.player.setFillStyle(0xded8bf);
    });
  }

  flashDamage() {
    this.player.setFillStyle(0xe07162);
    this.cameras.main.shake(90, 0.006);
    this.time.delayedCall(140, () => {
      this.player.setFillStyle(0xded8bf);
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
