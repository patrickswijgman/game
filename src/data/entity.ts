import { newSheet, Sheet } from "@/data/sheet.js";
import { SpriteId } from "@/enums/assets.js";
import { CardId } from "@/enums/card.js";
import { EntityType } from "@/enums/entity.js";
import { SceneId } from "@/enums/scene.js";
import { setVector, timer, Timer, vec, Vector, zero } from "ridder";

export type Entity = {
  // Memory allocation
  isAllocated: boolean;
  id: number;

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
  sceneId: SceneId;

  // Overlay (UI)
  isOverlay: boolean;
  cardId: CardId;

  // Combat
  sheet: Sheet;

  // Player
  isPlayer: boolean;

  // Enemy
  isEnemy: boolean;
};

export function newEntity(): Entity {
  return {
    // Memory allocation
    isAllocated: false,
    id: 0,

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
    sceneId: SceneId.NONE,

    // Overlay (UI)
    isOverlay: false,
    cardId: CardId.NONE,

    // Combat
    sheet: newSheet(),

    // Player
    isPlayer: false,

    // Enemy
    isEnemy: false,
  };
}

export function zeroEntity(e: Entity) {
  zero(e);
  setVector(e.tweenScale, 1, 1);
}
