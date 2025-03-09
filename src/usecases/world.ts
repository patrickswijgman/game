import { COLOR_GRASS } from "@/consts/colors.js";
import { MAX_ENEMIES } from "@/consts/entity.js";
import { UpgradeId } from "@/consts/upgrade.js";
import { ENEMY_SPAWN_TIME_MAX, ENEMY_SPAWN_TIME_MIN, ENEMY_SPAWN_TIME_REDUCE } from "@/consts/world.js";
import { Entity } from "@/data/entity.js";
import { game } from "@/data/game.js";
import { writeRandomPointInPerimeterBetweenRectangles } from "@/engine/rectangle.js";
import { addMeleeEnemy } from "@/entities/enemy-melee.js";
import { addPlayer } from "@/entities/player.js";
import { addTree } from "@/entities/tree.js";
import { getEntity } from "@/usecases/entity.js";
import { isPlayerAlive } from "@/usecases/player.js";
import { addUpgradeToPool } from "@/usecases/upgrade.js";
import { clamp, copyRectangle, doesRectangleContain, random, rect, Rectangle, resetTimer, setBackgroundColor, setCameraPosition, setRectangle, tickTimer, vec } from "ridder";

const w = 400;
const h = 300;
const outside = rect(-50, -50, w + 100, h + 100);
const border = rect(0, 0, w, h);
const field = rect(50, 50, w - 100, h - 100);
const pos = vec();

export function setup() {
  setBackgroundColor(COLOR_GRASS);

  // Boundary
  setRectangle(game.bounds, 0, 0, w, h);
  addBody(rect(0, 0, w, 40));
  addBody(rect(0, 0, 40, h));
  addBody(rect(w - 40, 0, 40, h));
  addBody(rect(0, h - 40, w, 40));

  // Camera
  game.camera.smoothing = 0.1;
  game.camera.shakeReduction = 0.1;
  copyRectangle(game.camera.bounds, game.bounds);
  setCameraPosition(game.camera, w / 2, h / 2);

  // Upgrades
  addUpgradeToPool(UpgradeId.DAMAGE, 4);

  // Entities
  addPlayer(w / 2, h / 2);

  for (let i = -4; i <= w; i += 12) {
    for (let j = -4; j <= h; j += 12) {
      const x = i + random(4, 8);
      const y = j + random(4, 8);

      if (doesRectangleContain(field, x, y)) {
        continue;
      }

      addTree(x, y);
    }
  }
}

export function spawnEnemies() {
  if (tickTimer(game.spawnTimer, game.spawnTime)) {
    if (isPlayerAlive() && game.enemies.length < MAX_ENEMIES) {
      writeRandomPointInPerimeterBetweenRectangles(outside, border, pos);
      addMeleeEnemy(pos.x, pos.y);
      game.spawnTime = clamp(game.spawnTime - ENEMY_SPAWN_TIME_REDUCE, ENEMY_SPAWN_TIME_MIN, ENEMY_SPAWN_TIME_MAX);
    }

    resetTimer(game.spawnTimer);
  }
}

export function setPlayer(e: Entity) {
  game.playerId = e.id;
}

export function getPlayer() {
  return getEntity(game.playerId);
}

export function addBody(body: Rectangle) {
  game.bodies.push(body);
}
