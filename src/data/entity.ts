import { SpriteId } from "@/enum/assets.js";
import { EntityType } from "@/enum/entity.js";
import { setVector, timer, Timer, vec, Vector, zero } from "ridder";

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
  shadowPivot: Vector;
  isFlipped: boolean;

  // Animation
  tweenPosition: Vector;
  tweenScale: Vector;
  tweenAngle: number;
  tweenTime: number;
  tweenTimer: Timer;

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
    shadowPivot: vec(),
    isFlipped: false,

    // Animation
    tweenPosition: vec(),
    tweenScale: vec(1, 1),
    tweenAngle: 0,
    tweenTime: 0,
    tweenTimer: timer(),

    // Relation
    sceneId: 0,

    // Player
    isPlayer: false,
  };
}

export function zeroEntity(e: Entity) {
  zero(e);
  setVector(e.tweenScale, 1, 1);
}
