import { Entity } from "@/data/entity.js";
import { Scene } from "@/data/scene.js";
import { setupPlayer } from "@/entities/player.js";
import { setupTree } from "@/entities/tree.js";
import { EntityType } from "@/enum/entity.js";
import { SpriteId } from "@/enum/sprite.js";
import { getScene } from "@/usecases/game.js";
import { nextEntity } from "@/usecases/scene.js";
import { addVectorScaled, applyCameraTransform, drawSprite, getDelta, resetTransform, rotateTransform, scaleTransform, setVector, translateTransform } from "ridder";

export function addEntity(type: EntityType, sceneId: number, x: number, y: number) {
  const scene = getScene(sceneId);
  const e = nextEntity(scene);

  e.type = type;
  setVector(e.position, x, y);

  switch (type) {
    case EntityType.PLAYER:
      setupPlayer(e);
      break;
    case EntityType.TREE:
      setupTree(e);
      break;
  }

  return e;
}

export function setSprite(e: Entity, id: SpriteId, pivotX: number, pivotY: number) {
  e.spriteId = id;
  setVector(e.pivot, pivotX, pivotY);
}

export function setShadow(e: Entity, id: SpriteId, pivotX: number, pivotY: number) {
  e.shadowId = id;
  setVector(e.shadowPivot, pivotX, pivotY);
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

  translateTransform(e.tweenPosition.x, e.tweenPosition.y);
  scaleTransform(e.tweenScale.x, e.tweenScale.y);
  rotateTransform(e.tweenAngle);

  if (e.shadowId) {
    drawSprite(e.shadowId, -e.shadowPivot.x, -e.shadowPivot.y);
  }

  if (e.spriteId) {
    drawSprite(e.spriteId, -e.pivot.x, -e.pivot.y);
  }
}
