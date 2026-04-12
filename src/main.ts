import { delta, drawText, fps, resetTransform, run, scaleTransform, setCameraPosition, setCameraSmoothing, setCameraTarget, translateTransform, updateCamera } from "snuggy";
import { Type } from "@/consts.ts";
import { activeEntities, entities } from "@/data.ts";
import { addPlayer, drawPlayer, getPlayerIfAlive, updatePlayer } from "@/entities/player.ts";
import { cleanupDestroyedEntities, sortActiveEntities } from "@/lib/entities.ts";
import { loadResources } from "@/lib/resources.ts";
import { addVectors, setVectorLength } from "@/lib/vector.ts";

async function setup() {
  await loadResources();

  const x = 100;
  const y = 100;

  setCameraPosition(x, y);
  setCameraSmoothing(0.1);

  addPlayer(x, y);
}

function update() {
  sortActiveEntities();

  for (const idx of activeEntities) {
    const e = entities[idx];

    if (!e.isActive) {
      continue;
    }

    switch (e.type) {
      case Type.PLAYER:
        updatePlayer(e);
        break;
    }

    setVectorLength(e.vel, e.speed * delta);
    addVectors(e.pos, e.vel);

    switch (e.type) {
      case Type.PLAYER:
        drawPlayer(e);
        break;
    }
  }

  const player = getPlayerIfAlive();
  if (player) {
    setCameraTarget(player.pos.x, player.pos.y);
  }

  updateCamera();

  cleanupDestroyedEntities();

  resetTransform();
  translateTransform(1, 1);
  scaleTransform(0.5, 0.5);
  drawText(fps.toString(), 0, 0, "lime", "left", "top");
}

run(640, setup, update);
