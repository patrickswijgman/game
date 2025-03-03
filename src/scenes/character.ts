import { COLOR_BG, COLOR_LINE, COLOR_PRIMARY, COLOR_SURFACE } from "@/consts/colors.js";
import { FONT_HEIGHT } from "@/consts/render.js";
import { SceneId } from "@/consts/scene.js";
import { game } from "@/data/game.js";
import { Scene } from "@/data/scene.js";
import { getScene, switchScene } from "@/usecases/game.js";
import { drawRect, drawText, getHeight, getWidth, InputCode, isInputPressed, resetTransform, scaleTransform, translateTransform } from "ridder";

export function setupCharacterScene() {
  const scene = getScene(SceneId.CHARACTER);

  return scene;
}

export function updateCharacterScene(scene: Scene) {
  if (isInputPressed(InputCode.KEY_ESCAPE)) {
    switchScene(SceneId.WORLD);
    return;
  }
}

export function renderCharacterScene(scene: Scene) {
  resetTransform();
  drawRect(0, 0, getWidth(), getHeight(), COLOR_BG, true);
  drawText("Character", 10, 10);

  resetTransform();
  translateTransform((getWidth() / 3) * 2, 30);

  drawRect(-60, 0, 120, getHeight() - 60, COLOR_SURFACE, true);
  drawRect(-60, 0, 120, 1, COLOR_PRIMARY, true);

  translateTransform(-50, 5);
  scaleTransform(0.5, 0.5);
  renderStat("Health", `${game.sheet.stats.health} / ${game.sheet.stats.healthMax}`);
  renderStat("Mana", `${game.sheet.stats.mana} / ${game.sheet.stats.manaMax}`);
  renderStat("Damage", game.sheet.stats.damage);
  renderStat("Critical Chance", `${game.sheet.stats.critChance * 100}%`);
  renderStat("Critical Damage", `${game.sheet.stats.critDamage * 100}%`);
  renderStat("Armor", game.sheet.stats.armor);
  renderStat("Movement Speed", `${(game.sheet.stats.movementSpeed / 1) * 100}%`);
}

function renderStat(label: string, value: string | number) {
  drawText(label, 0, 0, "white");
  drawText(value.toString(), 200, 0, "white", "right");
  drawRect(0, FONT_HEIGHT, 200, 2, COLOR_LINE, true);
  translateTransform(0, FONT_HEIGHT + 5);
}
