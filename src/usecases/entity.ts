import { SpriteId } from "@/consts/assets.js";
import { COLOR_HEALTH } from "@/consts/colors.js";
import { Type } from "@/consts/entity.js";
import { SHADOW_ALPHA } from "@/consts/render.js";
import { SceneId } from "@/consts/scene.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { onEntityStateEnter, onEntityStateExit, onEntityStateUpdate } from "@/states/entity.js";
import { getScene } from "@/usecases/game.js";
import { nextEntity } from "@/usecases/scene.js";
import { drawBar } from "@/usecases/ui.js";
import { addVector, addVectorScaled, applyCameraTransform, copyVector, drawSprite, getDelta, resetTimer, resetTransform, resetVector, rotateTransform, scaleTransform, setAlpha, setRectangle, setVector, tickTimer, translateTransform } from "ridder";

export function addEntity(type: Type, sceneId: SceneId, x: number, y: number) {
  const scene = getScene(sceneId);
  const e = nextEntity(scene);
  e.type = type;
  setVector(e.start, x, y);
  setVector(e.position, x, y);
  return e;
}

export function setSprite(e: Entity, spriteId: SpriteId, pivotX: number, pivotY: number, flashId = SpriteId.NONE, outlineId = SpriteId.NONE) {
  e.spriteId = spriteId;
  e.flashId = flashId;
  e.outlineId = outlineId;
  setVector(e.pivot, pivotX, pivotY);
}

export function setShadow(e: Entity, id: SpriteId, offsetX: number, offsetY: number) {
  e.shadowId = id;
  setVector(e.shadowOffset, offsetX, offsetY);
}

export function setCenter(e: Entity, x: number, y: number) {
  setVector(e.centerOffset, x, y);
  updateCenter(e);
}

export function setCenterFromHitbox(e: Entity) {
  setVector(e.centerOffset, 0, 1 - Math.ceil(e.hitbox.h / 2));
  updateCenter(e);
}

export function setHitbox(e: Entity, x: number, y: number, w: number, h: number) {
  setVector(e.hitboxOffset, x, y);
  setRectangle(e.hitbox, 0, 0, w, h);
  updateHitbox(e);
}

export function setState(e: Entity, stateId: StateId) {
  e.stateNextId = stateId;
}

export function updateState(e: Entity, onEnter: (e: Entity) => void, onUpdate: (e: Entity) => void, onExit: (e: Entity) => void) {
  if (e.stateNextId !== e.stateId) {
    onEntityStateExit(e, onExit);
    e.stateId = e.stateNextId;
    onEntityStateEnter(e, onEnter);
  }
  onEntityStateUpdate(e, onUpdate);
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

export function renderEntity(e: Entity) {
  const scene = getScene(e.sceneId);

  resetTransform();
  applyCameraTransform(scene.camera);
  translateTransform(e.position.x, e.position.y);
  scaleTransform(e.scale.x, e.scale.y);
  rotateTransform(e.angle);

  if (e.isFlipped) {
    scaleTransform(-1, 1);
  }

  if (e.shadowId) {
    setAlpha(SHADOW_ALPHA);
    drawSprite(e.shadowId, -e.pivot.x + e.shadowOffset.x, -e.pivot.y + e.shadowOffset.y);
    setAlpha(1);
  }

  translateTransform(e.tweenPosition.x, e.tweenPosition.y);
  scaleTransform(e.tweenScale.x, e.tweenScale.y);
  rotateTransform(e.tweenAngle);

  if (e.isFlashing) {
    drawSprite(e.flashId, -e.pivot.x, -e.pivot.y);
  } else if (e.spriteId) {
    drawSprite(e.spriteId, -e.pivot.x, -e.pivot.y);
  }

  if (e.isOutlineVisible) {
    drawSprite(e.outlineId, -e.pivot.x, -e.pivot.y);
  }
}

export function renderEntityStatus(e: Entity) {
  if (e.stats.health < e.stats.healthMax) {
    const scene = getScene(e.sceneId);
    resetTransform();
    applyCameraTransform(scene.camera);
    translateTransform(e.position.x, e.position.y - e.hitbox.h - 5);
    drawBar(-5, 0, e.stats.health, e.stats.healthMax, COLOR_HEALTH, 10, 3);
  }
}

export function destroyIfExpired(e: Entity) {
  if (e.lifeTime && tickTimer(e.lifeTimer, e.lifeTime)) {
    destroyEntity(e);
  }
}

export function destroyIfDead(e: Entity) {
  if (e.stats.healthMax && e.stats.health === 0) {
    destroyEntity(e);
  }
}

export function destroyEntity(e: Entity) {
  e.isDestroyed = true;
  const scene = getScene(e.sceneId);
  scene.destroyed.push(e.id);
}
