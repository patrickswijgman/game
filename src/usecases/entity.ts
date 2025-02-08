import { SpriteId } from "@/consts/assets.js";
import { COMBAT_LOG_DURATION } from "@/consts/entity.js";
import { FONT_HEIGHT, SHADOW_ALPHA } from "@/consts/render.js";
import { SceneId } from "@/consts/scene.js";
import { StateId } from "@/consts/state.js";
import { Type } from "@/consts/type.js";
import { Entity } from "@/data/entity.js";
import { onAttackEnter, onAttackExit, onAttackUpdate } from "@/states/attack.js";
import { onStaggerEnter, onStaggerExit, onStaggerUpdate } from "@/states/stagger.js";
import { getScene } from "@/usecases/game.js";
import { getItem } from "@/usecases/item.js";
import { nextEntity } from "@/usecases/scene.js";
import { getSprite } from "@/usecases/sprite.js";
import { drawTextOutlined } from "@/usecases/ui.js";
import { addVector, addVectorScaled, applyCameraTransform, copyVector, drawSprite, getDelta, resetTimer, resetTransform, resetVector, rotateTransform, scaleTransform, setAlpha, setRectangle, setVector, tickTimer, translateTransform, tween } from "ridder";

export function addEntity(type: Type, sceneId: SceneId, x: number, y: number) {
  const scene = getScene(sceneId);
  const e = nextEntity(scene);
  e.type = type;
  setVector(e.start, x, y);
  setVector(e.position, x, y);
  return e;
}

export function setSprites(e: Entity, spriteId: SpriteId, shadowId = SpriteId.NONE, flashId = SpriteId.NONE, outlineId = SpriteId.NONE) {
  e.spriteId = spriteId;
  e.shadowId = shadowId;
  e.flashId = flashId;
  e.outlineId = outlineId;
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
    switch (e.stateId) {
      case StateId.ATTACK:
        onAttackExit(e);
        break;
      case StateId.STAGGER:
        onStaggerExit(e);
        break;
      default:
        onExit(e);
        break;
    }

    resetTimer(e.stateTimer);
    resetVector(e.velocity);
    resetTween(e);

    e.stateId = e.stateNextId;

    switch (e.stateId) {
      case StateId.ATTACK:
        onAttackEnter(e);
        break;
      case StateId.STAGGER:
        onStaggerEnter(e);
        break;
      default:
        onEnter(e);
        break;
    }
  }

  switch (e.stateId) {
    case StateId.ATTACK:
      onAttackUpdate(e);
      break;
    case StateId.STAGGER:
      onStaggerUpdate(e);
      break;
    default:
      onUpdate(e);
      break;
  }
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

export function updateCombatLog(e: Entity) {
  if (e.isLogEnabled && tickTimer(e.logTimer, COMBAT_LOG_DURATION)) {
    e.log.length = 0;
  }
}

export function addToCombatLog(e: Entity, message: string) {
  e.log.push(message);
  resetTimer(e.logTimer);
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
    const shadow = getSprite(e.shadowId);
    setAlpha(SHADOW_ALPHA);
    drawSprite(e.shadowId, -shadow.pivot.x, -shadow.pivot.y);
    setAlpha(1);
  }

  translateTransform(e.tweenPosition.x, e.tweenPosition.y);
  scaleTransform(e.tweenScale.x, e.tweenScale.y);
  rotateTransform(e.tweenAngle);

  const sprite = getSprite(e.spriteId);

  if (e.isFlashing) {
    drawSprite(e.flashId, -sprite.pivot.x, -sprite.pivot.y);
  } else {
    if (e.spriteId) {
      drawSprite(e.spriteId, -sprite.pivot.x, -sprite.pivot.y);
    }

    if (e.sheet.armorId) {
      const item = getItem(e.sheet.armorId);
      drawSprite(item.equipSpriteId, -sprite.pivot.x, -sprite.pivot.y);
    }

    if (e.sheet.weaponId) {
      const item = getItem(e.sheet.weaponId);
      drawSprite(item.equipSpriteId, -sprite.pivot.x, -sprite.pivot.y);
    }

    if (e.sheet.offhandId) {
      const item = getItem(e.sheet.offhandId);
      drawSprite(item.equipSpriteId, -sprite.pivot.x, -sprite.pivot.y);
    }
  }

  if (e.isOutlineVisible) {
    drawSprite(e.outlineId, -sprite.pivot.x, -sprite.pivot.y);
  }
}

export function renderCombatLog(e: Entity) {
  if (e.isLogEnabled && e.log.length) {
    const scene = getScene(e.sceneId);

    resetTransform();
    applyCameraTransform(scene.camera);
    translateTransform(e.position.x, e.position.y - e.hitbox.h - 12);
    scaleTransform(0.5, 0.5);
    setAlpha(1 - tween(0, 1, COMBAT_LOG_DURATION, "easeInCirc", e.logTimer.elapsed));

    for (const log of e.log) {
      drawTextOutlined(log, 0, 0, getCombatLogColor(e, log), "center");
      translateTransform(0, -FONT_HEIGHT);
    }

    setAlpha(1);
  }
}

function getCombatLogColor(e: Entity, log: string) {
  switch (true) {
    case log.startsWith("+"):
      return "lime";
    case e.isPlayer:
      return "red";
    case log.endsWith("!"):
      return "orange";
    default:
      return "white";
  }
}

export function destroyIfExpired(e: Entity) {
  if (e.lifeTime && tickTimer(e.lifeTimer, e.lifeTime)) {
    destroyEntity(e);
  }
}

export function destroyIfDead(e: Entity) {
  if (e.sheet.stats.healthMax && e.sheet.stats.health === 0) {
    destroyEntity(e);
  }
}

export function destroyEntity(e: Entity) {
  e.isDestroyed = true;

  const scene = getScene(e.sceneId);
  scene.destroyed.push(e.id);
}
