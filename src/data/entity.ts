import { SpriteId } from "@/consts/assets.js";
import { AttackId } from "@/consts/attack.js";
import { Type } from "@/consts/entity.js";
import { SceneId } from "@/consts/scene.js";
import { StateId } from "@/consts/state.js";
import { newStats, Stats } from "@/data/stats.js";
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

  // Collisions
  isCollisionsEnabled: boolean;
  body: Rectangle;
  bodyOffset: Vector;
  bodyIntersection: Vector;

  // Render
  spriteId: SpriteId;
  pivot: Vector;
  scale: Vector;
  angle: number;
  depth: number;
  isFlipped: boolean;

  shadowId: SpriteId;
  shadowOffset: Vector;

  outlineId: SpriteId;
  isOutlineVisible: boolean;

  flashId: SpriteId;
  isFlashing: boolean;

  text: string;
  textColor: string;

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

  // Life cycle
  isDestroyed: boolean;
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
  stats: Stats;
  attackId: AttackId;
  isPlayer: boolean;
  isEnemy: boolean;

  // Attack
  casterId: number;
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

    // Collisions
    isCollisionsEnabled: false,
    body: rect(),
    bodyOffset: vec(),
    bodyIntersection: vec(),

    // Render
    spriteId: SpriteId.NONE,
    pivot: vec(0, 0),
    scale: vec(1, 1),
    angle: 0,
    depth: 0,
    isFlipped: false,

    shadowId: SpriteId.NONE,
    shadowOffset: vec(),

    outlineId: SpriteId.NONE,
    isOutlineVisible: false,

    flashId: SpriteId.NONE,
    isFlashing: false,

    text: "",
    textColor: "white",

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

    // Life cycle
    isDestroyed: false,
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
    stats: newStats(),
    attackId: AttackId.NONE,
    isPlayer: false,
    isEnemy: false,

    // Attack
    casterId: 0,
  };
}

export function zeroEntity(e: Entity) {
  zero(e);
  setVector(e.scale, 1, 1);
  setVector(e.tweenScale, 1, 1);
}
