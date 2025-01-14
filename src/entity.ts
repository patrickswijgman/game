import { SpriteId } from "@/assets.js";
import { SceneId } from "@/game.js";
import { Scene } from "@/scene.js";
import { addVectorScaled, applyCameraTransform, drawSprite, getDelta, resetTransform, scaleTransform, setVector, translateTransform, vec, Vector } from "ridder";

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
  sceneId: SceneId;

  // Player
  isPlayer: boolean;
};

export function newEntity(id: number): Entity {
  return {
    // Memory allocation
    id,
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

export function setSprite(e: Entity, id: SpriteId, pivotX: number, pivotY: number) {
  e.spriteId = id;
  setVector(e.pivot, pivotX, pivotY);
}

export function setShadow(e: Entity, id: SpriteId, offsetX: number, offsetY: number) {
  e.shadowId = id;
  setVector(e.shadowOffset, offsetX, offsetY);
}

export function updatePhysics(e: Entity) {
  if (e.isPhysicsEnabled) {
    addVectorScaled(e.position, e.velocity, getDelta());
  }
}

export function renderEntity(e: Entity, scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);
  translateTransform(e.position.x, e.position.y);

  if (e.isFlipped) {
    scaleTransform(-1, 1);
  }

  if (e.shadowId) {
    drawSprite(e.shadowId, -e.pivot.x + e.shadowOffset.x, -e.pivot.y + e.shadowOffset.y);
  }

  if (e.spriteId) {
    drawSprite(e.spriteId, -e.pivot.x, -e.pivot.y);
  }
}
