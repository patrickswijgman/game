import { drawRect, run, setCameraPosition, setCameraSmoothing, setCameraTarget, updateCamera } from "snuggy";
import { EnemyVariant, Type } from "@/consts.ts";
import { active, isDestroyed, posX, posY, type } from "@/data.ts";
import { setupEnemy, updateEnemy } from "@/entities/enemy.ts";
import { setupPlayer, updatePlayer } from "@/entities/player.ts";
import { drawFramesPerSecond, drawHitboxes } from "@/lib/debug.ts";
import { addNewEntities, removeDestroyedEntities, setupEntities, sortEntities } from "@/lib/entities.ts";
import { loadResources } from "@/lib/resources.ts";

async function setup() {
  await loadResources();

  const x = 100;
  const y = 100;

  setCameraPosition(x, y);
  setCameraSmoothing(0.1);

  setupEntities();

  setupPlayer(x, y);

  setupEnemy(300, 100, EnemyVariant.MELEE);
  setupEnemy(350, 100, EnemyVariant.MELEE);
  setupEnemy(350, 150, EnemyVariant.MELEE);
}

function update() {
  removeDestroyedEntities();
  addNewEntities();
  sortEntities();

  drawRect(0, 0, 2000, 2000, "slategrey", true);

  for (const id of active) {
    if (isDestroyed[id]) {
      continue;
    }

    switch (type[id]) {
      case Type.PLAYER:
        updatePlayer(id);
        setCameraTarget(posX[id], posY[id]);
        break;
      case Type.ENEMY:
        updateEnemy(id);
        break;
    }
  }

  updateCamera();

  drawHitboxes();
  drawFramesPerSecond();
}

run(640, 360, setup, update);
