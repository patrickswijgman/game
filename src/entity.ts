import { Scene } from "@/scene.js";
import { addVectorScaled, applyCameraTransform, drawSprite, getDelta, resetTransform, scaleTransform, translateTransform, vec, Vector } from "ridder";

export const enum EntityType {
  NONE = 0,
  PLAYER = 1,
}

export type Entity = {
  // Memory allocation
  id: number;
  isAssigned: boolean;

  // Arche type
  type: EntityType;

  // Physics
  position: Vector;
  velocity: Vector;

  // Render
  spriteId: string;
  pivot: Vector;
  isFlipped: boolean;

  // Relation
  sceneId: number;
};

export function newEntity(): Entity {
  return {
    // Memory allocation
    id: 0,
    isAssigned: false,

    // Arche type
    type: EntityType.NONE,

    // Physics
    position: vec(),
    velocity: vec(),

    // Render
    spriteId: "",
    pivot: vec(),
    isFlipped: false,

    // Relation
    sceneId: 0,
  };
}

export function updatePhysics(e: Entity) {
  addVectorScaled(e.position, e.velocity, getDelta());
}

export function renderEntity(e: Entity, scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);
  translateTransform(e.position.x, e.position.y);

  if (e.isFlipped) {
    scaleTransform(-1, 1);
  }

  if (e.spriteId) {
    drawSprite(e.spriteId, -e.pivot.x, -e.pivot.y);
  }
}
