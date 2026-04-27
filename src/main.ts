import { drawRect, run, setCameraPosition, setCameraSmoothing, setCameraTarget, updateCamera } from "snuggy";
import { Type } from "@/consts.ts";
import { active, isDestroyed, posX, posY, type } from "@/data.ts";
import { drawPlayer, setupPlayer, updatePlayer } from "@/entities/player.ts";
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

  for (const i of active) {
    if (isDestroyed[i]) {
      continue;
    }

    switch (type[i]) {
      case Type.PLAYER:
        updatePlayer(i);
        setCameraTarget(posX[i], posY[i]);
        break;
    }

    updateCamera();

    drawRect(0, 0, 2000, 2000, "slategrey", true);

    switch (type[i]) {
      case Type.PLAYER:
        drawPlayer(i);
        break;
    }
  }
}

run(640, 360, setup, update);
