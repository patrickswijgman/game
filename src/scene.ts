import { Entity } from "entity.js";
import { addSceneToGame } from "game.js";
import { remove } from "ridder";

export type Scene = {
  entities: Record<string, Entity>;
  active: Array<string>;
  visible: Array<string>;
  destroyed: Array<string>;
  playerId: string;
};

export function newScene(setup?: (scene: Scene) => string): Scene {
  const scene: Scene = {
    entities: {},
    active: [],
    visible: [],
    destroyed: [],
    playerId: "",
  };

  if (setup) {
    const id = setup(scene);
    addSceneToGame(id, scene);
  }

  return scene;
}

export function addEntityToScene(scene: Scene, e: Entity) {
  scene.entities[e.id] = e;
  scene.active.push(e.id);
  scene.visible.push(e.id);
}

export function destroyEntity(scene: Scene, e: Entity) {
  scene.destroyed.push(e.id);
}

export function getEntity(scene: Scene, id: string) {
  return scene.entities[id];
}

export function cleanupDestroyedEntities(scene: Scene) {
  if (scene.destroyed.length) {
    for (const id of scene.destroyed) {
      delete scene.entities[id];
      remove(scene.active, id);
      remove(scene.visible, id);
    }

    scene.destroyed.length = 0;
  }
}

export function depthSortEntities(scene: Scene) {
  scene.visible.sort((idA, idB) => {
    const a = scene.entities[idA];
    const b = scene.entities[idB];
    return a.pos.y - b.pos.y;
  });
}
