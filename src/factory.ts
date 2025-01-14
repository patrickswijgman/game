import { setupPlayer } from "@/entities/player.js";
import { setupPineTree } from "@/entities/tree-pine.js";
import { EntityType } from "@/entity.js";
import { getScene } from "@/game.js";
import { nextEntity } from "@/scene.js";
import { setVector } from "ridder";

export function addEntity(type: EntityType, sceneId: number, x: number, y: number) {
  const scene = getScene(sceneId);
  const e = nextEntity(scene);

  e.type = type;

  setVector(e.position, x, y);

  switch (type) {
    case EntityType.PLAYER:
      setupPlayer(e);
      break;
    case EntityType.TREE_PINE:
      setupPineTree(e);
      break;
  }

  return e;
}
