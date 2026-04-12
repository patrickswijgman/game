import { addCameraTransform, delta, resetTransform, scaleTransform, translateTransform } from "snuggy";
import { type Entity, entities } from "@/data.ts";
import { isRectValid, resolveIntersection, setRect } from "@/lib/rect.ts";
import { addVec, copyVec, isVecValid, resetVec, setVec, setVecLength, subVec } from "@/lib/vec.ts";

export function setHitbox(e: Entity, x: number, y: number, w: number, h: number) {
  setVec(e.hitboxOffset, x, y);
  setRect(e.hitbox, 0, 0, w, h);
  updateHitbox(e);
}

export function updateHitbox(e: Entity) {
  copyVec(e.hitbox, e.pos);
  addVec(e.hitbox, e.hitboxOffset);
}

export function moveAndCollide(self: Entity, list: Array<number>) {
  if (isVecValid(self.vel)) {
    setVecLength(self.vel, self.speed * delta);
    addVec(self.pos, self.vel);

    if (isRectValid(self.hitbox)) {
      updateHitbox(self);
      resetVec(self.hitboxIntersection);

      for (const idx of list) {
        const other = entities[idx];
        resolveIntersection(self.hitbox, other.hitbox, self.vel, self.hitboxIntersection);
      }

      addVec(self.hitbox, self.hitboxIntersection);
      copyVec(self.pos, self.hitbox);
      subVec(self.pos, self.hitboxOffset);
    }
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
