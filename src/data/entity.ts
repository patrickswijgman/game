import { SpriteId } from "@/enums/assets.js";
import { CardId } from "@/enums/card.js";
import { EntityType } from "@/enums/entity.js";
import { setVector, timer, Timer, vec, Vector, zero } from "ridder";

export type Entity = {
  // Memory allocation
  id: number;
  isAssigned: boolean;

  // Archetype
  type: EntityType;

  // Physics
  isPhysicsEnabled: boolean;
  position: Vector;
  velocity: Vector;

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

  // Overlay (UI)
  isOverlay: boolean;
  cardId: CardId;

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
    isPhysicsEnabled: false,
    position: vec(),
    velocity: vec(),

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

    // Overlay (UI)
    isOverlay: false,
    cardId: CardId.NONE,

    // Player
    isPlayer: false,
  };
}

export function zeroEntity(e: Entity) {
  zero(e);
  setVector(e.tweenScale, 1, 1);
}
