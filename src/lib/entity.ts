import { addCameraTransform, delta, getDistance, rotateTransform, scaleTransform, translateTransform } from "snuggy";
import type { Type } from "@/consts.ts";
import { angle, anim, animAngle, animScaleX, animScaleY, animX, animY, cooldownTime, health, healthDeplete, healthDepleteTime, immuneTime, posX, posY, recoveryTime, staggerTime, startX, startY, type, velX, velY } from "@/data.ts";
import { nextEntity } from "@/lib/entities.ts";
import { tickTimer } from "@/lib/timer.ts";

export function setupEntity(t: Type, x: number, y: number) {
  const id = nextEntity();
  type[id] = t;
  posX[id] = x;
  posY[id] = y;
  startX[id] = x;
  startY[id] = y;
  animScaleX[id] = 1;
  animScaleY[id] = 1;
  return id;
}

export function updatePosition(id: number) {
  posX[id] += velX[id] * delta;
  posY[id] += velY[id] * delta;
}

export function updateHealthBar(id: number) {
  if (healthDepleteTime[id] === 0) {
    healthDeplete[id] = Math.max(health[id], healthDeplete[id] - (healthDeplete[id] / health[id]) * 2 * delta);
  }
}

export function updateTimers(id: number) {
  tickTimer(staggerTime, id);
  tickTimer(cooldownTime, id);
  tickTimer(recoveryTime, id);
  tickTimer(immuneTime, id);
  tickTimer(healthDepleteTime, id);
}

export function setAnimation(id: number, a: number) {
  if (anim[id] !== a) {
    anim[id] = a;
    animX[id] = 0;
    animY[id] = 0;
    animScaleX[id] = 1;
    animScaleY[id] = 1;
    animAngle[id] = 0;
  }
}

export function setOrbitPosition(id: number, anchorX: number, anchorY: number, targetX: number, targetY: number, distance: number) {
  posX[id] = anchorX;
  posY[id] = anchorY;
  const dx = targetX - anchorX;
  const dy = targetY - anchorY;
  const d = getDistance(0, 0, dx, dy);
  if (d) {
    posX[id] += (dx / d) * distance;
    posY[id] += (dy / d) * distance;
  }
}

export function addEntityTransform(id: number, isInWorld: boolean, isFlipped: boolean) {
  translateTransform(posX[id], posY[id]);
  if (isInWorld) {
    addCameraTransform();
  }
  if (isFlipped) {
    scaleTransform(-1, 1);
  }
  rotateTransform(angle[id]);
}

export function addAnimationTransform(id: number) {
  scaleTransform(animScaleX[id], animScaleY[id]);
  translateTransform(animX[id], animY[id]);
  rotateTransform(animAngle[id]);
}
