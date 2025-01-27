import { newSheet, Sheet } from "@/data/sheet.js";
import { SpriteId } from "@/enums/assets.js";
import { SceneId } from "@/enums/scene.js";
import { StateId } from "@/enums/state.js";
import { Type } from "@/enums/type.js";
import { rect, Rectangle, setVector, timer, Timer, vec, Vector, zero } from "ridder";

export type Entity = {
  // Memory allocation
  isAllocated: boolean;
  id: number;

  // Archetype
  type: Type;

  // Physics
  isPhysicsEnabled: boolean;
  start: Vector;
  position: Vector;
  velocity: Vector;
  direction: Vector;

  // Render
  spriteId: SpriteId;
  pivot: Vector;
  angle: number;
  depth: number;
  isFlipped: boolean;

  shadowId: SpriteId;
  shadowPivot: Vector;

  outlineId: SpriteId;
  isOutlineVisible: boolean;

  flashId: SpriteId;
  isFlashing: boolean;

  // Animation
  tweenPosition: Vector;
  tweenScale: Vector;
  tweenAngle: number;
  tweenTime: number;
  tweenTimer: Timer;

  // Relation
  sceneId: SceneId;

  // State management
  stateId: StateId;
  stateNextId: StateId;
  stateTimer: Timer;

  // Misc
  lifeTime: number;
  lifeTimer: Timer;

  // Steering
  ahead: Vector;
  avoid: Vector;
  radius: number;

  // Combat
  center: Vector;
  centerOffset: Vector;
  hitbox: Rectangle;
  hitboxOffset: Vector;
  sheet: Sheet;
  attackId: number;
  isPlayer: boolean;
  isEnemy: boolean;

  // Combat log
  isLogEnabled: boolean;
  log: Array<string>;
  logTimer: Timer;

  // Attack
  casterId: number;
  blacklist: Array<number>;
};

export function newEntity(): Entity {
  return {
    // Memory allocation
    isAllocated: false,
    id: 0,

    // Archetype
    type: Type.NONE,

    // Physics
    isPhysicsEnabled: false,
    start: vec(),
    position: vec(),
    velocity: vec(),
    direction: vec(),

    // Render
    spriteId: SpriteId.NONE,
    pivot: vec(),
    angle: 0,
    depth: 0,
    isFlipped: false,

    shadowId: SpriteId.NONE,
    shadowPivot: vec(),

    outlineId: SpriteId.NONE,
    isOutlineVisible: false,

    flashId: SpriteId.NONE,
    isFlashing: false,

    // Animation
    tweenPosition: vec(),
    tweenScale: vec(1, 1),
    tweenAngle: 0,
    tweenTime: 0,
    tweenTimer: timer(),

    // Relation
    sceneId: SceneId.NONE,

    // State management
    stateId: StateId.NONE,
    stateNextId: StateId.NONE,
    stateTimer: timer(),

    // Misc
    lifeTime: 0,
    lifeTimer: timer(),

    // Steering
    ahead: vec(),
    avoid: vec(),
    radius: 0,

    // Combat
    center: vec(),
    centerOffset: vec(),
    hitbox: rect(),
    hitboxOffset: vec(),
    sheet: newSheet(),
    attackId: 0,
    isPlayer: false,
    isEnemy: false,

    // Combat log
    isLogEnabled: false,
    log: [],
    logTimer: timer(),

    // Attack
    casterId: 0,
    blacklist: [],
  };
}

export function zeroEntity(e: Entity) {
  zero(e);
  setVector(e.tweenScale, 1, 1);
  e.blacklist.length = 0;
  e.log.length = 0;
}
