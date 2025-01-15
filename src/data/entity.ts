import { SpriteId } from "@/assets.js";
import { vec, Vector } from "ridder";

export const enum EntityType {
  NONE,
  PLAYER,
  TREE_PINE,
}

export type Entity = {
  // Memory allocation
  id: number;
  isAssigned: boolean;

  // Archetype
  type: EntityType;

  // Physics
  position: Vector;
  velocity: Vector;
  isPhysicsEnabled: boolean;

  // Render
  spriteId: SpriteId;
  pivot: Vector;
  shadowId: SpriteId;
  shadowOffset: Vector;
  isFlipped: boolean;

  // Relation
  sceneId: number;

  // Player
  isPlayer: boolean;
};

export function newEntity(): Entity {
  return {
    // Memory allocation
    id: 0,
    isAssigned: false,

    // Archetype
    type: EntityType.NONE,

    // Physics
    position: vec(),
    velocity: vec(),
    isPhysicsEnabled: false,

    // Render
    spriteId: SpriteId.NONE,
    pivot: vec(),
    shadowId: SpriteId.NONE,
    shadowOffset: vec(),
    isFlipped: false,

    // Relation
    sceneId: 0,

    // Player
    isPlayer: false,
  };
}
