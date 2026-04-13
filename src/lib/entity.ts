import { addCameraTransform, delta, resetTransform, scaleTransform, translateTransform } from "snuggy";
import { type Entity, entities, zeroVec } from "@/data.ts";
import { isRectValid, setRect, writeRectIntersection } from "@/lib/rect.ts";
import { addVec, copyVec, isVecValid, setVec, setVecMagnitude } from "@/lib/vec.ts";

export function setBody(e: Entity, x: number, y: number, w: number, h: number) {
  setVec(e.bodyOffset, x, y);
  setRect(e.body, 0, 0, w, h);
  updateBody(e);
}

export function updateBody(e: Entity) {
  copyVec(e.body, e.pos);
  addVec(e.body, e.bodyOffset);
}

export function setHitbox(e: Entity, x: number, y: number, w: number, h: number) {
  setVec(e.hitboxOffset, x, y);
  setRect(e.hitbox, 0, 0, w, h);
  updateHitbox(e);
}

export function updateHitbox(e: Entity) {
  copyVec(e.hitbox, e.pos);
  addVec(e.hitbox, e.hitboxOffset);
}

export function moveAndCollide(e: Entity, list: Array<number>) {
  if (isVecValid(e.vel)) {
    setVecMagnitude(e.vel, e.speed * delta);
    addVec(e.pos, e.vel);

    if (isRectValid(e.body)) {
      updateBody(e);

      zeroVec(e.bodyIntersection);

      for (const idx of list) {
        const other = entities[idx];
        writeRectIntersection(e.body, other.body, e.vel, e.bodyIntersection);
      }

      addVec(e.body, e.bodyIntersection);
      addVec(e.pos, e.bodyIntersection);
    }

    if (isRectValid(e.hitbox)) {
      updateHitbox(e);
    }

    zeroVec(e.vel);
  }
}

export function setEntityTransform(e: Entity, inWorld: boolean) {
  resetTransform();

  if (inWorld) {
    addCameraTransform();
  }

  translateTransform(e.pos.x, e.pos.y);

  if (e.isFlipped) {
    scaleTransform(-1, 1);
  }
}
