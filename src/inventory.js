import { HEIGHT, WIDTH } from "./constants.js";

export function createInventoryOverlay() {
  this.inventoryLayer = this.add.container(0, 0);
  this.inventoryLayer.setDepth(1001);
  this.inventoryLayer.setVisible(false);

  const backdrop = this.add.rectangle(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT, 0x050505, 0.88);
  const panel = this.add.rectangle(WIDTH / 2, HEIGHT / 2, 720, 500, 0x171614, 0.97);
  panel.setStrokeStyle(2, 0x716957);

  this.inventoryTitle = this.add.text(60, 64, "INVENTARIO", {
    fontFamily: "Arial",
    fontSize: "24px",
    color: "#f0e6cf",
  });

  this.inventoryHelpText = this.add.text(60, 506, "I: cerrar | W/S o flechas: seleccionar", {
    fontFamily: "Arial",
    fontSize: "14px",
    color: "#9f9888",
  });

  this.inventoryLayer.add([backdrop, panel, this.inventoryTitle, this.inventoryHelpText]);
}

export function toggleInventory() {
  if (!this.inventoryLayer) return;

  const isVisible = !this.inventoryLayer.visible;
  if (isVisible && this.mapLayer?.visible) this.toggleMap();
  this.inventoryLayer.setVisible(isVisible);

  if (isVisible) {
    this.drawInventoryOverlay();
  } else {
    this.clearInventoryDrawing();
  }
}

export function clearInventoryDrawing() {
  for (const child of [...this.inventoryLayer.getAll()]) {
    if (child.getData?.("inventoryDynamic")) child.destroy();
  }
}

export function drawInventoryOverlay() {
  this.clearInventoryDrawing();
  const entries = this.getInventoryEntries();
  this.inventorySelectedIndex = Phaser.Math.Clamp(this.inventorySelectedIndex, 0, Math.max(0, entries.length - 1));

  for (const [index, entry] of entries.entries()) {
    const y = 118 + index * 42;
    const selected = index === this.inventorySelectedIndex;
    const row = this.add.rectangle(65, y - 6, 300, 34, selected ? 0x3a3529 : 0x23211d, selected ? 0.95 : 0.7);
    row.setOrigin(0, 0);
    row.setStrokeStyle(1, selected ? 0xd8b24a : 0x4f493d);
    row.setData("inventoryDynamic", true);

    const name = this.add.text(82, y, entry.name, {
      fontFamily: "Arial",
      fontSize: "16px",
      color: selected ? "#fff0b8" : "#e0d6c3",
    });
    name.setData("inventoryDynamic", true);
    this.inventoryLayer.add([row, name]);
  }

  const selectedEntry = entries[this.inventorySelectedIndex];
  const detailPanel = this.add.rectangle(400, 112, 330, 330, 0x22201c, 0.82);
  detailPanel.setOrigin(0, 0);
  detailPanel.setStrokeStyle(1, 0x5f5849);
  detailPanel.setData("inventoryDynamic", true);

  const detailTitle = this.add.text(425, 136, selectedEntry.name, {
    fontFamily: "Arial",
    fontSize: "20px",
    color: "#f0e6cf",
  });
  detailTitle.setData("inventoryDynamic", true);

  const detailText = this.add.text(425, 178, selectedEntry.description, {
    fontFamily: "Arial",
    fontSize: "16px",
    color: "#d6ccb8",
    wordWrap: { width: 280 },
    lineSpacing: 5,
  });
  detailText.setData("inventoryDynamic", true);

  this.inventoryLayer.add([detailPanel, detailTitle, detailText]);
}

export function getInventoryEntries() {
  const ammoEntries = [
    {
      id: "ammo_pistol",
      name: "Municion de pistola",
      description: `Cargador: ${this.worldState.weaponAmmo.pistol.magazine}/6. Reserva: ${this.worldState.weaponAmmo.pistol.reserve}.`,
    },
    {
      id: "ammo_shotgun",
      name: "Cartuchos de escopeta",
      description: `Cargador: ${this.worldState.weaponAmmo.shotgun.magazine}/4. Reserva: ${this.worldState.weaponAmmo.shotgun.reserve}. Dispara varios perdigones.`,
    },
    {
      id: "ammo_rocket",
      name: "Cohetes",
      description: `Cargador: ${this.worldState.weaponAmmo.rocket.magazine}/1. Reserva: ${this.worldState.weaponAmmo.rocket.reserve}. Muy lento, muy fuerte.`,
    },
  ];

  const items = this.worldState.inventory.map((item) => ({
    id: item.id,
    name: item.name,
    description: this.getItemDescription(item),
  }));

  return [...ammoEntries, ...items];
}

export function getItemDescription(item) {
  if (item.text) return item.text;
  if (item.description) return item.description;
  if (item.type === "medikit") return `Cura ${item.heal ?? 35} puntos de vida. Se usa rapido con Q.`;
  if (item.id === "fuse_01") return "Pieza electrica para activar el generador.";
  if (item.type === "key") return "Sirve para abrir una puerta o mecanismo especifico.";
  return "Objeto guardado en el inventario.";
}

export function updateInventorySelection() {
  const entries = this.getInventoryEntries();
  if (entries.length <= 1) return;

  const up = Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.wasd.up);
  const down = Phaser.Input.Keyboard.JustDown(this.cursors.down) || Phaser.Input.Keyboard.JustDown(this.wasd.down);

  if (!up && !down) return;

  const offset = up ? -1 : 1;
  this.inventorySelectedIndex = Phaser.Math.Wrap(this.inventorySelectedIndex + offset, 0, entries.length);
  this.drawInventoryOverlay();
}

export function updateInventoryText() {
  if (this.inventoryLayer?.visible) this.drawInventoryOverlay();
}
