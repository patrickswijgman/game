import { Entity } from "entity.js";
import { addScene, game } from "game.js";
import { camera, Camera, rect, Rectangle, remove, uuid, vec, Vector } from "ridder";

export type Scene = {
  id: string;
  type: string;
  entities: Record<string, Entity>;
  active: Array<string>;
  visible: Array<string>;
  enemies: Array<string>;
  allies: Array<string>;
  destroyed: Array<string>;
  camera: Camera;
  bounds: Rectangle;
  backgroundTextureId: string;
  roomType: string;
  roomLevel: number;
  playerId: string;
  playerStart: Vector;
  safeArea: Rectangle;
  sessionId: string;
};

export function newScene(type: string): Scene {
  return addScene({
    id: uuid(),
    type,
    entities: {},
    active: [],
    visible: [],
    enemies: [],
    allies: [],
    destroyed: [],
    camera: camera(),
    bounds: rect(),
    backgroundTextureId: "",
    roomType: "",
    roomLevel: 0,
    playerId: "",
    playerStart: vec(),
    safeArea: rect(),
    sessionId: "",
  });
}

export function newRoom(type: string, roomType: string, roomLevel: number) {
  const scene = newScene(type);
  scene.roomType = roomType;
  scene.roomLevel = roomLevel;
  scene.sessionId = game.session.id;
  return scene;
}

export function cleanupDestroyedEntities(scene: Scene) {
  if (scene.destroyed.length) {
    for (const id of scene.destroyed) {
      remove(scene.active, id);
      remove(scene.visible, id);
      remove(scene.enemies, id);
      remove(scene.allies, id);
    }

    scene.destroyed.length = 0;
  }
}

export function sortEntitiesOnDepth(scene: Scene) {
  scene.visible.sort((idA, idB) => {
    const a = scene.entities[idA];
    const b = scene.entities[idB];
    return a.position.y - b.position.y;
  });
}

export function initCamera(scene: Scene) {
  scene.camera.smoothing = 0.05;
  scene.camera.shakeReduction = 0.01;
  scene.camera.bounds = scene.bounds;
}

export function addEntity(scene: Scene, e: Entity) {
  scene.entities[e.id] = e;
  scene.active.push(e.id);
  scene.visible.push(e.id);
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
