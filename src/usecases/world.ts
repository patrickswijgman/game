import { COLOR_GRASS } from "@/consts/colors.js";
import { MAX_ENEMIES } from "@/consts/entity.js";
import { entities } from "@/data/entities.js";
import { world } from "@/data/world.js";
import { writeRandomPointInPerimeterBetweenRectangles } from "@/engine/rectangle.js";
import { addMeleeEnemy } from "@/entities/enemy-melee.js";
import { addPlayer } from "@/entities/player.js";
import { addTree } from "@/entities/tree.js";
import { getEntity } from "@/usecases/entity.js";
import { copyRectangle, doesRectangleContain, random, rect, Rectangle, resetTimer, setBackgroundColor, setCameraPosition, setRectangle, tickTimer, vec } from "ridder";

const w = 400;
const h = 300;
const outside = rect(-50, -50, w + 100, h + 100);
const border = rect(0, 0, w, h);
const field = rect(50, 50, w - 100, h - 100);
const pos = vec();

export function setupWorld() {
  setBackgroundColor(COLOR_GRASS);

  // Boundary
  setRectangle(world.bounds, 0, 0, w, h);
  addBody(rect(0, 0, w, 40));
  addBody(rect(0, 0, 40, h));
  addBody(rect(w - 40, 0, 40, h));
  addBody(rect(0, h - 40, w, 40));

  // Camera
  world.camera.smoothing = 0.1;
  world.camera.shakeReduction = 0.1;
  copyRectangle(world.camera.bounds, world.bounds);
  setCameraPosition(world.camera, w / 2, h / 2);

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

export function updateWorld() {
  if (tickTimer(world.spawnTimer, world.spawnTime)) {
    const player = getEntity(world.playerId);

    if (player.isPlayer && player.stats.health && entities.enemies.length < MAX_ENEMIES) {
      writeRandomPointInPerimeterBetweenRectangles(outside, border, pos);
      addMeleeEnemy(pos.x, pos.y);
      world.spawnTime = Math.max(100, world.spawnTime - 10);
    }

    resetTimer(world.spawnTimer);
  }
}

export function addBody(body: Rectangle) {
  world.bodies.push(body);
}
