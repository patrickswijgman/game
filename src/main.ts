import { drawText, fps, resetTransform, run, scaleTransform, setCameraPosition, setCameraSmoothing, setCameraTarget, translateTransform, updateCamera } from "snuggy";
import { Type } from "@/consts.ts";
import { activeEntities } from "@/data.ts";
import { addPlayer, drawPlayer, updatePlayer } from "@/entities/player.ts";
import { cleanupDestroyedEntities, sortActiveEntities } from "@/lib/entities.ts";
import { loadResources } from "@/lib/resources.ts";
import { addVectors } from "@/lib/vector.ts";

async function setup() {
  await loadResources();

  addPlayer(100, 100);

  setCameraPosition(100, 100);
  setCameraSmoothing(0.1);
}

function update() {
  sortActiveEntities();

  for (const e of activeEntities) {
    if (!e.isActive) {
      continue;
    }

    switch (e.type) {
      case Type.PLAYER:
        updatePlayer(e);
        setCameraTarget(e.pos.x, e.pos.y);
        break;
    }

    addVectors(e.pos, e.vel);

    switch (e.type) {
      case Type.PLAYER:
        drawPlayer(e);
        break;
    }
  }

  updateCamera();

  cleanupDestroyedEntities();

  resetTransform();
  translateTransform(1, 1);
  scaleTransform(0.5, 0.5);
  drawText(fps.toString(), 0, 0, "lime", "left", "top");
}

run(640, setup, update);
