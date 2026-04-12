import type { Vector } from "@/data.ts";

export function setVector(v: Vector, x: number, y: number) {
  v.x = x;
  v.y = y;
}

export function addVectors(a: Vector, b: Vector) {
  a.x += b.x;
  a.y += b.y;
}

export function subVectors(a: Vector, b: Vector) {
  a.x -= b.x;
  a.y -= b.y;
}

export function multiplyVectors(a: Vector, b: Vector) {
  a.x *= b.x;
  a.y *= b.y;
}

export function scaleVector(v: Vector, s: number) {
  v.x *= s;
  v.y *= s;
}

export function getVectorLength(v: Vector) {
  const x = v.x * v.x;
  const y = v.y * v.y;
  return Math.sqrt(x + y);
}

export function setVectorLength(v: Vector, l: number) {
  normalizeVector(v);
  scaleVector(v, l);
}

export function normalizeVector(v: Vector) {
  const len = getVectorLength(v);
  if (len) {
    v.x /= len;
    v.y /= len;
  }
}

export function resetVector(v: Vector) {
  v.x = 0;
  v.y = 0;
}
