import { SHADOW_ALPHA } from "@/consts.js";
import { Entity } from "@/data/entity.js";
import { Scene } from "@/data/scene.js";
import { SpriteId } from "@/enums/assets.js";
import { EntityType } from "@/enums/entity.js";
import { SceneId } from "@/enums/scene.js";
import { getScene } from "@/usecases/game.js";
import { nextEntity } from "@/usecases/scene.js";
import { addVectorScaled, applyCameraTransform, drawSprite, getDelta, rotateTransform, scaleTransform, setAlpha, setRectangle, setVector, translateTransform } from "ridder";

export function addEntity(type: EntityType, sceneId: SceneId, x: number, y: number) {
  const scene = getScene(sceneId);
  const e = nextEntity(scene);
  e.type = type;
  setVector(e.position, x, y);
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

export function setOutline(e: Entity, id: SpriteId) {
  e.outlineId = id;
}

export function setHitarea(e: Entity, x: number, y: number, w: number, h: number) {
  setRectangle(e.hitarea, e.position.x + x, e.position.y + y, w, h);
}

export function updatePhysics(e: Entity) {
  if (e.isPhysicsEnabled) {
    addVectorScaled(e.position, e.velocity, getDelta());
  }
}

export function applyEntityTransform(e: Entity, scene: Scene) {
  if (!e.isOverlay) {
    applyCameraTransform(scene.camera);
  }

  translateTransform(e.position.x, e.position.y);

  if (e.isFlipped) {
    scaleTransform(-1, 1);
  }
}

export function applyEntityAnimationTransform(e: Entity) {
  translateTransform(e.tweenPosition.x, e.tweenPosition.y);
  scaleTransform(e.tweenScale.x, e.tweenScale.y);
  rotateTransform(e.tweenAngle);
}

export function renderEntitySprite(e: Entity) {
  if (e.spriteId) {
    drawSprite(e.spriteId, -e.pivot.x, -e.pivot.y);
  }
}

export function renderEntityOutline(e: Entity) {
  if (e.outlineId && e.isOutlineVisible) {
    drawSprite(e.outlineId, -e.pivot.x, -e.pivot.y);
  }
}

export function renderEntityShadow(e: Entity) {
  if (e.shadowId) {
    setAlpha(SHADOW_ALPHA);
    drawSprite(e.shadowId, -e.shadowPivot.x, -e.shadowPivot.y);
    setAlpha(1);
  }
}
