import { Entity } from "entity.js";
import { addScene } from "game.js";
import { camera, Camera, rect, Rectangle, remove, timer, Timer, uuid } from "ridder";

export type Scene = {
  id: string;
  type: string;
  entities: Record<string, Entity>;
  update: Array<string>;
  render: Array<string>;
  enemies: Array<string>;
  allies: Array<string>;
  destroyed: Array<string>;
  bodies: Array<Rectangle>;
  camera: Camera;
  bounds: Rectangle;
  safeArea: Rectangle;
  backgroundTextureId: string;
  enemySpawnDuration: number;
  enemySpawnTimer: Timer;
  playerId: string;
  buildTab: string;
};

export function newScene(type: string): Scene {
  return addScene({
    id: uuid(),
    type,
    entities: {},
    update: [],
    render: [],
    enemies: [],
    allies: [],
    destroyed: [],
    bodies: [],
    camera: camera(),
    bounds: rect(),
    safeArea: rect(),
    backgroundTextureId: "",
    enemySpawnDuration: 3000,
    enemySpawnTimer: timer(),
    playerId: "",
    buildTab: "",
  });
}

export function cleanupDestroyedEntities(scene: Scene) {
  if (scene.destroyed.length) {
    for (const id of scene.destroyed) {
      const e = scene.entities[id];
      remove(scene.update, id);
      remove(scene.render, id);
      remove(scene.enemies, id);
      remove(scene.allies, id);
      remove(scene.bodies, e.body);
    }

    scene.destroyed.length = 0;
  }
}

export function sortEntitiesOnDepth(scene: Scene) {
  scene.render.sort((idA, idB) => {
    const a = scene.entities[idA];
    const b = scene.entities[idB];
    return a.position.y + a.depth - b.position.y + b.depth;
  });
}

export function initCamera(scene: Scene) {
  scene.camera.smoothing = 0.05;
  scene.camera.shakeReduction = 0.01;
  scene.camera.bounds = scene.bounds;
}

export function addEntity(scene: Scene, e: Entity) {
  scene.entities[e.id] = e;
  scene.update.push(e.id);
  scene.render.push(e.id);
  return e;
}

export function addPlayer(scene: Scene, e: Entity) {
  scene.playerId = e.id;
  scene.allies.push(e.id);
  return e;
}

export function addEnemy(scene: Scene, e: Entity) {
  scene.enemies.push(e.id);
  return e;
}

export function addBody(scene: Scene, body: Rectangle) {
  scene.bodies.push(body);
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
  scene.bodies.length = 0;
}
