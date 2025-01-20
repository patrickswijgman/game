import { Entity, newEntity } from "@/data/entity.js";
import { CardId } from "@/enums/card.js";
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
  playerChosenCardId: CardId;
  playerHandCardEntityIds: Array<number>;

  enemyId: number;
  enemyChosenCardEntityId: number;
  enemyChosenCardId: CardId;

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
    playerChosenCardId: CardId.NONE,
    playerHandCardEntityIds: [],

    enemyId: 0,
    enemyChosenCardEntityId: 0,
    enemyChosenCardId: CardId.NONE,

    // State management
    stateId: SceneStateId.NONE,
    stateNextId: SceneStateId.NONE,
  };
}
