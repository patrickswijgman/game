import { SHADOW_ALPHA } from "@/consts.js";
import { Entity } from "@/data/entity.js";
import { Scene } from "@/data/scene.js";
import { SpriteId } from "@/enums/assets.js";
import { SceneId } from "@/enums/scene.js";
import { Type } from "@/enums/type.js";
import { getScene } from "@/usecases/game.js";
import { getItem } from "@/usecases/item.js";
import { nextEntity } from "@/usecases/scene.js";
import { addVector, addVectorScaled, applyCameraTransform, copyVector, drawSprite, getDelta, resetTimer, resetTransform, resetVector, rotateTransform, scaleTransform, setAlpha, setRectangle, setVector, translateTransform } from "ridder";

export function addEntity(type: Type, sceneId: SceneId, x: number, y: number) {
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

export function setCenter(e: Entity, x: number, y: number) {
  setVector(e.centerOffset, x, y);
  updateCenter(e);
}

export function setHitbox(e: Entity, x: number, y: number, w: number, h: number) {
  setVector(e.hitboxOffset, x, y);
  setRectangle(e.hitbox, 0, 0, w, h);
  updateHitbox(e);
}

export function setState(e: Entity, stateId: number) {
  e.stateNextId = stateId;
}

export function updateState(e: Entity, onEnter: (e: Entity) => void, onUpdate: (e: Entity) => void, onExit: (e: Entity) => void) {
  if (e.stateNextId !== e.stateId) {
    onExit(e);
    resetTimer(e.stateTimer);
    resetVector(e.velocity);
    resetTween(e);
    e.stateId = e.stateNextId;
    onEnter(e);
  }
  onUpdate(e);
}

export function updatePhysics(e: Entity) {
  if (e.isPhysicsEnabled) {
    addVectorScaled(e.position, e.velocity, getDelta());
    updateCenter(e);
    updateHitbox(e);
  }
}

export function updateCenter(e: Entity) {
  copyVector(e.center, e.position);
  addVector(e.center, e.centerOffset);
}

export function updateHitbox(e: Entity) {
  copyVector(e.hitbox, e.position);
  addVector(e.hitbox, e.hitboxOffset);
}

export function resetTween(e: Entity) {
  resetTimer(e.tweenTimer);
  resetVector(e.tweenPosition);
  setVector(e.tweenScale, 1, 1);
  e.tweenAngle = 0;
  e.tweenTime = 0;
}

export function renderEntity(e: Entity, scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);
  translateTransform(e.position.x, e.position.y);
  rotateTransform(e.angle);

  if (e.isFlipped) {
    scaleTransform(-1, 1);
  }

  translateTransform(e.tweenPosition.x, e.tweenPosition.y);
  scaleTransform(e.tweenScale.x, e.tweenScale.y);
  rotateTransform(e.tweenAngle);

  if (e.shadowId) {
    setAlpha(SHADOW_ALPHA);
    drawSprite(e.shadowId, -e.shadowPivot.x, -e.shadowPivot.y);
    setAlpha(1);
  }

  if (e.spriteId) {
    drawSprite(e.spriteId, -e.pivot.x, -e.pivot.y);
  }

  if (e.sheet.weaponId) {
    const item = getItem(e.sheet.weaponId);
    drawSprite(item.spriteId, -e.pivot.x, -e.pivot.y);
  }

  if (e.outlineId && e.isOutlineVisible) {
    drawSprite(e.outlineId, -e.pivot.x, -e.pivot.y);
  }
}

export function destroyEntity(e: Entity) {
  const scene = getScene(e.sceneId);
  scene.destroyed.push(e.id);
}
