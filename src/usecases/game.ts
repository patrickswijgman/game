import { COLOR_GRASS } from "@/consts/colors.js";
import { UpgradeId } from "@/consts/upgrade.js";
import { ENEMY_SPAWN_TIME_MAX } from "@/consts/world.js";
import { game } from "@/data/game.js";
import { addPlayer } from "@/entities/player.js";
import { addTree } from "@/entities/tree.js";
import { addUpgradeToPool } from "@/usecases/upgrade.js";
import { addBody } from "@/usecases/world.js";
import { copyRectangle, doesRectangleContain, random, rect, setBackgroundColor, setCameraPosition, setRectangle } from "ridder";

export function setup() {
  const w = 400;
  const h = 300;

  game.spawnTime = ENEMY_SPAWN_TIME_MAX;

  setBackgroundColor(COLOR_GRASS);

  // Boundary
  setRectangle(game.bounds, 0, 0, w, h);
  setRectangle(game.boundsOutside, -50, -50, w + 100, h + 100);
  setRectangle(game.boundsInside, 50, 50, w - 100, h - 100);
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
  addUpgradeToPool(UpgradeId.HEALTH, 2);
  addUpgradeToPool(UpgradeId.DAMAGE, 4);
  addUpgradeToPool(UpgradeId.RANGE, 2);
  addUpgradeToPool(UpgradeId.CRIT_CHANCE, 3);
  addUpgradeToPool(UpgradeId.PICKUP_RANGE, 2);
  addUpgradeToPool(UpgradeId.MOVEMENT_SPEED, 2);

  // Entities
  addPlayer(w / 2, h / 2);

  for (let i = -4; i <= w; i += 12) {
    for (let j = -4; j <= h; j += 12) {
      const x = i + random(4, 8);
      const y = j + random(4, 8);

      if (doesRectangleContain(game.boundsInside, x, y)) {
        continue;
      }

      addTree(x, y);
    }
  }
}
