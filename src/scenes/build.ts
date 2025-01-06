import { COLOR_DARK, COLOR_PRIMARY, COLOR_TEXT, HEIGHT, WIDTH } from "consts.js";
import { game, switchScene } from "game.js";
import { getItem } from "items.js";
import { drawRect, drawText, InputCode, isInputPressed, resetTransform, scaleTransform, translateTransform } from "ridder";
import { newScene, Scene } from "scene.js";
import { newStartRoomScene } from "scenes/rooms/start.js";
import { Stats } from "stats.js";

export function newBuildScene() {
  const scene = newScene("build");

  scene.backgroundTextureId = "menu_bg";

  return scene;
}

export function updateBuildScene(scene: Scene) {
  if (isInputPressed(InputCode.KEY_ENTER)) {
    const next = newStartRoomScene();
    switchScene(next.id);
  }
}

export function renderBuildScene(scene: Scene) {
  resetTransform();
  translateTransform(WIDTH / 2, 20);
  scaleTransform(1.5, 1.5);
  drawText("BUILD", 0, 0, COLOR_TEXT, "center");

  resetTransform();
  translateTransform(WIDTH - 20, HEIGHT - 20);
  drawText("Press [Enter] to confirm", 0, 0, COLOR_TEXT, "right");

  drawAbilityScores(100, 70);

  drawItem(WIDTH / 2, 70, game.session.sheet.weaponId, "Weapon");
  drawItem(WIDTH / 2, 250, game.session.sheet.armorId, "Armor");
  drawStatBlock(WIDTH - 100, 70);
}

function drawAbilityScores(x: number, y: number) {
  resetTransform();
  translateTransform(x, y);
  scaleTransform(1.25, 1.25);
  drawText("Ability scores", 0, 0, COLOR_PRIMARY, "center");

  resetTransform();
  translateTransform(x, y);
  translateTransform(0, 20);
  drawStat(game.session.sheet.stats, "Constitution", "constitution");
  drawStat(game.session.sheet.stats, "Endurance", "endurance");
  drawStat(game.session.sheet.stats, "Strength", "strength");
  drawStat(game.session.sheet.stats, "Dexterity", "dexterity");
  drawStat(game.session.sheet.stats, "Intelligence", "intelligence");
}

function drawItem(x: number, y: number, id: string, name: string) {
  const item = getItem(id);

  resetTransform();
  translateTransform(x, y);
  scaleTransform(1.25, 1.25);
  drawText(name, 0, 0, COLOR_PRIMARY, "center");

  if (item) {
    resetTransform();
    translateTransform(x, y);
    translateTransform(0, 20);
    drawText(item.name, 0, 0, COLOR_TEXT, "center");
    resetTransform();
    translateTransform(x, y);
    translateTransform(0, 40);
    drawItemStat(item.stats, "Damage", "damage");
    drawItemStat(item.stats, "Stun Damage", "stunDamage");
    drawItemStat(item.stats, "Strength Scaling", "strengthScaling");
    drawItemStat(item.stats, "Dexterity Scaling", "dexterityScaling");
    drawItemStat(item.stats, "Intelligence Scaling", "intelligenceScaling");
    drawItemStat(item.stats, "Stamina Regen", "staminaRegen");
    drawItemStat(item.stats, "Movement Speed", "movementSpeed");
    drawItemStat(item.stats, "Range", "range");
  }
}

function drawItemStat(stats: Stats, name: string, key: keyof Stats) {
  const value = stats[key];
  if (value) {
    drawStat(stats, name, key);
  }
}

function drawStatBlock(x: number, y: number) {
  resetTransform();
  translateTransform(x, y);
  scaleTransform(1.25, 1.25);
  drawText("Stats", 0, 0, COLOR_PRIMARY, "center");
  resetTransform();
  translateTransform(x, y);
  translateTransform(0, 20);
  drawStat(game.session.sheet.stats, "Health", "healthMax");
  drawStat(game.session.sheet.stats, "Stamina", "staminaMax");
  drawStat(game.session.sheet.stats, "Stamina Regen", "staminaRegen");
  drawStat(game.session.sheet.stats, "Stun", "stunMax");
  drawStat(game.session.sheet.stats, "Damage", "damage");
  drawStat(game.session.sheet.stats, "Movement Speed", "movementSpeed");
}

function drawStat(stats: Stats, name: string, key: keyof Stats) {
  translateTransform(-65, 0);
  drawText(name, 0, 0, COLOR_TEXT);
  translateTransform(130, 0);
  drawText(stats[key].toString(), 0, 0, COLOR_TEXT, "right");
  translateTransform(-130, 12);
  drawRect(0, 0, 130, 1, COLOR_DARK);
  translateTransform(65, 10);
}
