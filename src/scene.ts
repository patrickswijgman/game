import { Entity } from "entity.js";
import { addScene, removeScene } from "game.js";
import { camera, Camera, rect, Rectangle, remove } from "ridder";

export type Scene = {
  id: string;
  entities: Record<string, Entity>;
  active: Array<string>;
  visible: Array<string>;
  enemies: Array<string>;
  destroyed: Array<string>;
  camera: Camera;
  bounds: Rectangle;
  backgroundTextureId: string;
  playerId: string;
};

export function newScene(id: string): Scene {
  return addScene(id, {
    id,
    entities: {},
    active: [],
    visible: [],
    enemies: [],
    destroyed: [],
    camera: camera(),
    bounds: rect(),
    backgroundTextureId: "",
    playerId: "",
  });
}

export function cleanupDestroyedEntities(scene: Scene) {
  if (scene.destroyed.length) {
    for (const id of scene.destroyed) {
      remove(scene.active, id);
      remove(scene.visible, id);
      remove(scene.enemies, id);
    }

    scene.destroyed.length = 0;
  }
}

export function sortEntitiesOnDepth(scene: Scene) {
  scene.visible.sort((idA, idB) => {
    const a = scene.entities[idA];
    const b = scene.entities[idB];
    return a.pos.y - b.pos.y;
  });
}

export function addEntity(scene: Scene, e: Entity) {
  scene.entities[e.id] = e;
  scene.active.push(e.id);
  scene.visible.push(e.id);
  return e;
}

export function addEnemy(scene: Scene, e: Entity) {
  scene.enemies.push(e.id);
  return e;
}

export function destroyEntity(scene: Scene, e: Entity) {
  e.isDestroyed = true;
  scene.destroyed.push(e.id);
}

export function getEntity(scene: Scene, id: string) {
  return scene.entities[id];
}

export function getPlayer(scene: Scene) {
  return scene.entities[scene.playerId];
}

export function destroyScene(scene: Scene) {
  delete scene.entities;
  removeScene(scene);
}
