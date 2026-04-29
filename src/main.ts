import { drawRect, run, setCameraPosition, setCameraSmoothing, setCameraTarget, setFont, setFontOffset, updateCamera } from "snuggy";
import { EnemyVariant, Font, Type } from "@/consts.ts";
import { active, isDestroyed, posX, posY, staggerTime, type } from "@/data.ts";
import { setupEnemy, updateEnemy } from "@/entities/enemy.ts";
import { setupPlayer, updatePlayer } from "@/entities/player.ts";
import { drawFramesPerSecond, drawHitboxes } from "@/lib/debug.ts";
import { addNewEntities, removeDestroyedEntities, setupEntities, sortEntities } from "@/lib/entities.ts";
import { isStaggered } from "@/lib/entity.ts";
import { setupItems } from "@/lib/items.ts";
import { loadResources } from "@/lib/resources.ts";
import { setupSprites } from "@/lib/sprites.ts";
import { tickTimer } from "@/lib/timer.ts";

const WIDTH = 640;
const HEIGHT = 360;

async function setup() {
  await loadResources();

  const x = WIDTH / 2;
  const y = HEIGHT / 2;

  setCameraPosition(x, y);
  setCameraSmoothing(0.1);

  setFont(Font.DEFAULT);
  setFontOffset(0.5, -0.5);

  setupSprites();
  setupItems();
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

    tickTimer(staggerTime, id);

    if (isStaggered(id)) {
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

run(WIDTH, HEIGHT, setup, update);
