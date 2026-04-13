import { addCameraTransform, delta, resetTransform, scaleTransform, translateTransform } from "snuggy";
import { type Entity, entities, zeroVec } from "@/data.ts";
import { isRectValid, setRect, writeRectIntersection } from "@/lib/rect.ts";
import { addVec, copyVec, isVecValid, normalizeVec, scaleVec, setVec } from "@/lib/vec.ts";

export function setBody(e: Entity, x: number, y: number, w: number, h: number) {
  setVec(e.bodyOffset, x, y);
  setRect(e.body, 0, 0, w, h);
  updateBody(e);
}

export function updateBody(e: Entity) {
  copyVec(e.body, e.pos);
  addVec(e.body, e.bodyOffset);
}

export function moveAndCollide(self: Entity, list: Array<number>) {
  if (isVecValid(self.vel)) {
    normalizeVec(self.vel);
    scaleVec(self.vel, self.speed);
    scaleVec(self.vel, delta);
    addVec(self.pos, self.vel);

    if (isRectValid(self.body)) {
      updateBody(self);

      zeroVec(self.bodyIntersection);

      for (const idx of list) {
        const other = entities[idx];
        writeRectIntersection(self.body, other.body, self.vel, self.bodyIntersection);
      }

      addVec(self.body, self.bodyIntersection);
      addVec(self.pos, self.bodyIntersection);
    }

    zeroVec(self.vel);
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
