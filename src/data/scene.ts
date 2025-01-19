import { Entity, newEntity } from "@/data/entity.js";
import { SceneId, SceneStateId } from "@/enums/scene.js";
import { Camera, camera, rect, Rectangle, table, Table } from "ridder";

export type Scene = {
  id: SceneId;

  // Tables
  entities: Table<Entity>;

  // Table support lists
  update: Array<number>;
  render: Array<number>;
  destroyed: Array<number>;

  // World
  camera: Camera;
  bounds: Rectangle;

  // Combat
  playerId: number;
  enemyId: number;

  // State management
  stateId: SceneStateId;
  stateNextId: SceneStateId;
};

export function newScene(id: SceneId, maxEntityCount: number): Scene {
  return {
    id,

    // Tables
    entities: table(maxEntityCount, newEntity),

    // Table support lists
    update: [],
    render: [],
    destroyed: [],

    // World
    camera: camera(),
    bounds: rect(),

    // Combat
    playerId: 0,
    enemyId: 0,

    // State management
    stateId: SceneStateId.NONE,
    stateNextId: SceneStateId.NONE,
  };
}
