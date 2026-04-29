import { addCameraTransform, resetTransform, rotateTransform, scaleTransform, translateTransform } from "snuggy";
import type { Type } from "@/consts.ts";
import { animAngle, animScaleX, animScaleY, animX, animY, isFlipped, posX, posY, type } from "@/data.ts";
import { nextEntity } from "@/lib/entities.ts";

export function setupEntity(t: Type, x: number, y: number) {
  const i = nextEntity();
  type[i] = t;
  posX[i] = x;
  posY[i] = y;
  animScaleX[i] = 1;
  animScaleY[i] = 1;
  return i;
}

export function setEntityTransform(id: number, isInWorld: boolean) {
  resetTransform();
  translateTransform(posX[id], posY[id]);
  if (isInWorld) {
    addCameraTransform();
  }
  if (isFlipped[id]) {
    scaleTransform(-1, 1);
  }
}

export function addEntityAnimationTransform(id: number) {
  translateTransform(animX[id], animY[id]);
  scaleTransform(animScaleX[id], animScaleY[id]);
  rotateTransform(animAngle[id]);
}

export function resetEntityAnimation(id: number) {
  animX[id] = 0;
  animY[id] = 0;
  animScaleX[id] = 1;
  animScaleY[id] = 1;
  animAngle[id] = 0;
}
