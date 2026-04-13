import { run, setCameraPosition, setCameraSmoothing, setCameraTarget, updateCamera } from "snuggy";
import { Type } from "@/consts.ts";
import { activeEntities, entities } from "@/data.ts";
import { addEnemy, drawEnemy, updateEnemy } from "@/entities/enemy.ts";
import { addPlayer, drawPlayer, getPlayerIfAlive, updatePlayer } from "@/entities/player.ts";
import { drawFramesPerSecond, drawHitboxes } from "@/lib/debug.ts";
import { cleanupDestroyedEntities, sortEntitiesOnDepth } from "@/lib/entities.ts";
import { moveAndCollide } from "@/lib/entity.ts";
import { loadResources } from "@/lib/resources.ts";

async function setup() {
  await loadResources();

  const x = 100;
  const y = 100;

  setCameraPosition(x, y);
  setCameraSmoothing(0.1);

  addPlayer(x, y);
  addEnemy(x + 20, y);
}

function update() {
  activeEntities.sort(sortEntitiesOnDepth);

  for (const idx of activeEntities) {
    const e = entities[idx];

    if (!e.isActive) {
      continue;
    }

    switch (e.type) {
      case Type.PLAYER:
        updatePlayer(e);
        break;
      case Type.ENEMY:
        updateEnemy(e);
        break;
    }

    moveAndCollide(e, activeEntities);

    switch (e.type) {
      case Type.PLAYER:
        drawPlayer(e);
        break;
      case Type.ENEMY:
        drawEnemy(e);
        break;
    }
  }

  const player = getPlayerIfAlive();
  if (player) {
    setCameraTarget(player.pos.x, player.pos.y);
  }

  updateCamera();

  cleanupDestroyedEntities();

  drawHitboxes();
  drawFramesPerSecond();
}

run(640, setup, update);
