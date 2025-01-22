import { newSheet, Sheet } from "@/data/sheet.js";
import { SpriteId } from "@/enums/assets.js";
import { CardId } from "@/enums/card.js";
import { EntityType } from "@/enums/entity.js";
import { InteractionId } from "@/enums/interaction.js";
import { SceneId } from "@/enums/scene.js";
import { rect, Rectangle, setVector, timer, Timer, vec, Vector, zero } from "ridder";

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
  outlineId: SpriteId;
  isOutlineVisible: boolean;
  isFlipped: boolean;
  isOverlay: boolean;

  // Animation
  tweenPosition: Vector;
  tweenScale: Vector;
  tweenAngle: number;
  tweenTime: number;
  tweenTimer: Timer;

  // Relation
  sceneId: SceneId;

  // UI
  cardId: CardId;
  interactionId: InteractionId;
  hitarea: Rectangle;

  // Combat
  sheet: Sheet;
  isPlayer: boolean;
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
    outlineId: SpriteId.NONE,
    isOutlineVisible: false,
    isFlipped: false,
    isOverlay: false,

    // Animation
    tweenPosition: vec(),
    tweenScale: vec(1, 1),
    tweenAngle: 0,
    tweenTime: 0,
    tweenTimer: timer(),

    // Relation
    sceneId: SceneId.NONE,

    // UI
    cardId: CardId.NONE,
    interactionId: InteractionId.NONE,
    hitarea: rect(),

    // Combat
    sheet: newSheet(),
    isPlayer: false,
    isEnemy: false,
  };
}

export function zeroEntity(e: Entity) {
  zero(e);
  setVector(e.tweenScale, 1, 1);
}
