import type { Vec } from "@/data.ts";

export function setVec(v: Vec, x: number, y: number) {
  v.x = x;
  v.y = y;
}

export function addVec(a: Vec, b: Vec) {
  a.x += b.x;
  a.y += b.y;
}

export function subVec(a: Vec, b: Vec) {
  a.x -= b.x;
  a.y -= b.y;
}

export function copyVec(a: Vec, b: Vec) {
  a.x = b.x;
  a.y = b.y;
}

export function scaleVec(v: Vec, s: number) {
  v.x *= s;
  v.y *= s;
}

export function normalizeVec(v: Vec) {
  const len = getVecLength(v);
  if (len) {
    v.x /= len;
    v.y /= len;
  }
}

export function getVecLength(v: Vec) {
  const x = v.x * v.x;
  const y = v.y * v.y;
  return Math.sqrt(x + y);
}

export function isVecValid(v: Vec) {
  return v.x !== 0 || v.y !== 0;
}
