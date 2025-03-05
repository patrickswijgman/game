import { MAX_ENTITIES, SceneId } from "@/consts/scene.js";
import { Entity, newEntity } from "@/data/entity.js";
import { Camera, camera, rect, Rectangle, table, Table, timer, Timer } from "ridder";

export type Scene = {
  id: SceneId;

  // Memory management
  entityId: number;

  // Tables
  entities: Table<Entity>;

  // Entity support lists
  update: Array<number>;
  render: Array<number>;
  destroyed: Array<number>;

  // Entity groups
  allies: Array<number>;
  enemies: Array<number>;

  // World
  camera: Camera;
  bounds: Rectangle;
  bodies: Array<Rectangle>;
  spawnTime: number;
  spawnTimer: Timer;
  playerId: number;
};

export function newScene(id: SceneId): Scene {
  return {
    id,

    // Memory management
    entityId: 0,

    // Tables
    entities: table(MAX_ENTITIES, newEntity),

    // Entity support lists
    update: [],
    render: [],
    destroyed: [],

    // Entity groups
    allies: [],
    enemies: [],

    // World
    camera: camera(),
    bounds: rect(),
    spawnTime: 2000,
    spawnTimer: timer(),
    bodies: [],
    playerId: 0,
  };
}
