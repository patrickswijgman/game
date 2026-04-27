import { drawRect, run, setCameraPosition, setCameraSmoothing, setCameraTarget, updateCamera } from "snuggy";
import { Type } from "@/consts.ts";
import { active, isDestroyed, posX, posY, type } from "@/data.ts";
import { setupPlayer, updatePlayer } from "@/entities/player.ts";
import { drawFramesPerSecond } from "@/lib/debug.ts";
import { addNewEntities, removeDestroyedEntities, sortEntities } from "@/lib/entity.ts";
import { loadResources } from "@/lib/resources.ts";

async function setup() {
  await loadResources();

  const x = 100;
  const y = 100;

  setCameraPosition(x, y);
  setCameraSmoothing(0.1);

  setupPlayer(x, y);
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
    }
  }

  updateCamera();

  drawFramesPerSecond();
}

run(640, 360, setup, update);
