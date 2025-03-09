import { SpriteId } from "@/consts/assets.js";
import { Type } from "@/consts/entity.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { game } from "@/data/game.js";
import { onEntityStateEnter, onEntityStateExit, onEntityStateUpdate } from "@/states/entity.js";
import { drawHealthBar, drawTextOutlined } from "@/usecases/ui.js";
import { addBody } from "@/usecases/world.js";
import { addVector, addVectorScaled, applyCameraTransform, clamp, copyVector, drawSprite, getDelta, resetTimer, resetTransform, resetVector, rotateTransform, scaleTransform, setAlpha, setRectangle, setVector, tickTimer, translateTransform, writeIntersectionBetweenRectangles } from "ridder";

export function getEntity(id: number) {
  return game.entities[id];
}

export function addEntity(type: Type, x: number, y: number) {
  let id = game.nextId;
  let e = game.entities[id];

  if (e.isAllocated) {
    id = game.entities.findIndex((e) => !e.isAllocated);
    if (id === -1) {
      throw new Error("Out of entities :(");
    }

    e = game.entities[id];
    game.nextId = clamp(id + 1, 0, game.entities.length - 1);
  }

  e.id = id;
  e.isAllocated = true;
  e.type = type;
  setVector(e.start, x, y);
  setVector(e.position, x, y);

  game.update.push(e.id);
  game.render.push(e.id);

  return e;
}

export function addToAllies(e: Entity) {
  game.allies.push(e.id);
}

export function addToEnemies(e: Entity) {
  game.enemies.push(e.id);
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

export function setHitbox(e: Entity, x: number, y: number, w: number, h: number) {
  setVector(e.hitboxOffset, x, y);
  setRectangle(e.hitbox, 0, 0, w, h);
  updateHitbox(e);
}

export function setBody(e: Entity, x: number, y: number, w: number, h: number) {
  setVector(e.bodyOffset, x, y);
  setRectangle(e.body, 0, 0, w, h);
  updateBody(e);
  addBody(e.body);
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

export function updateCollisions(e: Entity) {
  if (e.isCollisionsEnabled) {
    updateBody(e);
    resetVector(e.bodyIntersection);

    for (const body of game.bodies) {
      if (body === e.body) {
        continue;
      }
      writeIntersectionBetweenRectangles(e.body, body, e.velocity, e.bodyIntersection);
    }

    if (e.bodyIntersection.x) {
      e.position.x += e.bodyIntersection.x;
      e.velocity.x = 0;
    }
    if (e.bodyIntersection.y) {
      e.position.y += e.bodyIntersection.y;
      e.velocity.y = 0;
    }

    updateBody(e);
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

export function updateBody(e: Entity) {
  copyVector(e.body, e.position);
  addVector(e.body, e.bodyOffset);
}

export function resetEntity(e: Entity) {
  resetVector(e.velocity);
  resetTimer(e.stateTimer);
  resetTimer(e.tweenTimer);
  resetVector(e.tweenPosition);
  setVector(e.tweenScale, 1, 1);
  e.tweenAngle = 0;
  e.tweenTime = 0;
}

export function renderEntity(e: Entity) {
  resetTransform();
  applyCameraTransform(game.camera);
  translateTransform(e.position.x, e.position.y);
  scaleTransform(e.scale.x, e.scale.y);
  rotateTransform(e.angle);

  if (e.isFlipped) {
    scaleTransform(-1, 1);
  }

  if (e.shadowId) {
    setAlpha(0.3);
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

  if (e.text) {
    drawTextOutlined(e.text, 0, 0, e.textColor, "center", "middle");
  }
}

export function renderEntityStatus(e: Entity) {
  if (e.stats.health < e.stats.healthMax) {
    resetTransform();
    applyCameraTransform(game.camera);
    translateTransform(e.position.x, e.position.y - e.hitbox.h - 5);
    drawHealthBar(-5, 0, e.stats, 10, 3);
  }
}

export function destroyIfExpired(e: Entity) {
  if (e.lifeTime && tickTimer(e.lifeTimer, e.lifeTime)) {
    destroyEntity(e);
    return true;
  }

  return false;
}

export function destroyIfDead(e: Entity) {
  if (e.stats.healthMax && e.stats.health === 0) {
    destroyEntity(e);
    return true;
  }

  return false;
}

export function destroyEntity(e: Entity) {
  e.isDestroyed = true;
  game.destroyed.push(e.id);
}
